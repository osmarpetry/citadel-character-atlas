import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CharacterTablePage } from '@/components/pages/CharacterTablePage';
import type { GetCharactersTableQuery } from '@/src/__generated__/graphql';

const mocks = vi.hoisted(() => ({
  apolloClient: {
    readQuery: vi.fn(),
    query: vi.fn(),
  },
  setSearch: vi.fn(),
  urlState: {} as any,
  lastTemplateProps: null as any,
}));

vi.mock('@apollo/client/react', () => ({
  useApolloClient: () => mocks.apolloClient,
}));

vi.mock('@/hooks/useTableUrlState', () => ({
  useTableUrlState: () => mocks.urlState,
}));

vi.mock('@/components/templates/CharacterTableTemplate', async () => {
  const React = await import('react');

  return {
    default: (props: any) => {
      mocks.lastTemplateProps = props;

      return React.createElement(
        'div',
        null,
        React.createElement('input', {
          'aria-label': 'Search characters',
          value: props.filterValue,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
            props.onSearchChange(event.target.value),
        }),
        React.createElement(
          'div',
          { 'data-testid': 'loading' },
          String(props.loading)
        ),
        React.createElement(
          'div',
          { 'data-testid': 'pending' },
          String(props.isSearchPending)
        ),
        React.createElement(
          'div',
          { 'data-testid': 'characters' },
          props.characters
            .map((character: { name: string }) => character.name)
            .join(',')
        ),
        React.createElement(
          'div',
          { 'data-testid': 'error' },
          props.error || ''
        )
      );
    },
  };
});

type PendingRequest = {
  variables: any;
  signal: AbortSignal;
  resolve: (value: {
    data: GetCharactersTableQuery;
    errors?: undefined;
  }) => void;
  reject: (reason?: unknown) => void;
};

function makeUrlState(overrides: Record<string, unknown> = {}) {
  return {
    page: 1,
    search: '',
    status: [],
    gender: [],
    species: [],
    columns: ['name', 'status', 'species', 'gender'],
    selectedCharacter: '',
    setPage: vi.fn(),
    setSearch: mocks.setSearch,
    setStatusFilter: vi.fn(),
    setGenderFilter: vi.fn(),
    setSpeciesFilter: vi.fn(),
    setVisibleColumns: vi.fn(),
    setSelectedCharacter: vi.fn(),
    resetFilters: vi.fn(),
    updateURL: vi.fn(),
    ...overrides,
  };
}

function makeQueryData(name: string): GetCharactersTableQuery {
  return {
    characters: {
      info: {
        count: 1,
        pages: 1,
        next: null,
        prev: null,
      },
      results: [
        {
          id: '1',
          name,
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth',
          },
          location: {
            name: 'Earth',
          },
          image: '',
          episode: [],
          created: '',
        },
      ],
    },
  };
}

function mockNetworkQueue() {
  const requests: PendingRequest[] = [];

  mocks.apolloClient.query.mockImplementation((options: any) => {
    return new Promise((resolve, reject) => {
      requests.push({
        variables: options.variables,
        signal: options.context.fetchOptions.signal,
        resolve,
        reject,
      });
    });
  });

  return requests;
}

async function flushAsyncWork() {
  await act(async () => {
    await Promise.resolve();
  });
}

describe('CharacterTablePage request orchestration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mocks.apolloClient.readQuery.mockReturnValue(null);
    mocks.apolloClient.query.mockReset();
    mocks.setSearch.mockReset();
    mocks.urlState = makeUrlState();
    mocks.lastTemplateProps = null;
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('aborts the active request immediately and starts the next request after 100ms', async () => {
    const requests = mockNetworkQueue();

    render(<CharacterTablePage />);

    await flushAsyncWork();
    expect(requests).toHaveLength(1);

    fireEvent.change(screen.getByLabelText('Search characters'), {
      target: { value: 'Ri' },
    });

    expect(requests[0].signal.aborted).toBe(true);
    expect(requests).toHaveLength(1);
    expect(screen.getByLabelText('Search characters')).toHaveValue('Ri');
    expect(screen.getByTestId('pending')).toHaveTextContent('true');

    await act(async () => {
      vi.advanceTimersByTime(99);
    });

    expect(requests).toHaveLength(1);
    expect(mocks.setSearch).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(1);
    });

    await flushAsyncWork();
    expect(requests).toHaveLength(2);
    expect(requests[1].variables).toEqual({
      page: 1,
      filter: { name: 'Ri' },
    });
    expect(mocks.setSearch).toHaveBeenCalledWith('Ri');
  });

  it('does not let a stale request overwrite the current rendered data', async () => {
    const requests = mockNetworkQueue();

    render(<CharacterTablePage />);
    await flushAsyncWork();
    expect(requests).toHaveLength(1);

    fireEvent.change(screen.getByLabelText('Search characters'), {
      target: { value: 'Rick' },
    });

    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    await flushAsyncWork();
    expect(requests).toHaveLength(2);

    await act(async () => {
      requests[0].resolve({ data: makeQueryData('Stale Result') });
    });
    await flushAsyncWork();

    expect(screen.getByTestId('characters')).not.toHaveTextContent(
      'Stale Result'
    );

    await act(async () => {
      requests[1].resolve({ data: makeQueryData('Rick Sanchez') });
    });
    await flushAsyncWork();

    expect(screen.getByTestId('characters')).toHaveTextContent('Rick Sanchez');
  });

  it('uses Apollo cache without starting a network request for cached variables', async () => {
    mocks.urlState = makeUrlState({ search: 'Rick' });
    mocks.apolloClient.readQuery.mockReturnValue(makeQueryData('Rick Sanchez'));
    mockNetworkQueue();

    render(<CharacterTablePage />);

    await flushAsyncWork();

    expect(screen.getByTestId('characters')).toHaveTextContent('Rick Sanchez');
    expect(mocks.apolloClient.query).not.toHaveBeenCalled();
    expect(mocks.apolloClient.readQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          page: 1,
          filter: { name: 'Rick' },
        },
      })
    );
  });

  it('does not let an older URL search value overwrite pending input', async () => {
    const requests = mockNetworkQueue();
    const view = render(<CharacterTablePage />);

    await flushAsyncWork();
    expect(requests).toHaveLength(1);

    fireEvent.change(screen.getByLabelText('Search characters'), {
      target: { value: 'Rick' },
    });

    mocks.urlState = makeUrlState({ search: 'Ri' });
    view.rerender(<CharacterTablePage />);

    expect(screen.getByLabelText('Search characters')).toHaveValue('Rick');
    expect(screen.getByTestId('pending')).toHaveTextContent('true');
  });

  it('does not refetch when URL array values are recreated with the same contents', async () => {
    const requests = mockNetworkQueue();
    const view = render(<CharacterTablePage />);

    await flushAsyncWork();
    expect(requests).toHaveLength(1);

    mocks.urlState = makeUrlState({
      status: [],
      gender: [],
      species: [],
      columns: ['name', 'status', 'species', 'gender'],
    });
    view.rerender(<CharacterTablePage />);
    await flushAsyncWork();

    expect(requests).toHaveLength(1);
  });
});
