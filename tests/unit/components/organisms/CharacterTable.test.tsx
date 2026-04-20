import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { vi } from 'vitest';

import CharacterTable from '@/components/organisms/CharacterTable';
import type { Character } from '@/types';

const character: Character = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth',
    url: '',
  },
  location: {
    name: 'Citadel of Ricks',
    url: '',
  },
  image: 'https://example.com/rick.png',
  episode: [],
  url: '',
  created: '',
};

const defaultProps = {
  characters: [character],
  loading: false,
  error: null,
  page: 1,
  pages: 2,
  onPageChange: vi.fn(),
  onRowSelect: vi.fn(),
  visibleColumns: ['name', 'status', 'species', 'gender'] as (
    | 'name'
    | 'status'
    | 'species'
    | 'gender'
  )[],
};

describe('CharacterTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the empty state inside the content region', () => {
    render(<CharacterTable {...defaultProps} characters={[]} pages={1} />);

    const content = screen.getByTestId('character-table-content');
    const emptyState = screen.getByTestId('character-table-empty-state');

    expect(content).toContainElement(emptyState);
    expect(within(emptyState).getByText('No characters found')).toBeVisible();
  });

  it('keeps pagination rendered and outside the content region when empty', () => {
    render(<CharacterTable {...defaultProps} characters={[]} pages={1} />);

    const content = screen.getByTestId('character-table-content');
    const pagination = screen.getByTestId('character-table-pagination');

    expect(pagination).toBeVisible();
    expect(content).not.toContainElement(pagination);
  });

  it('keeps pagination rendered while loading', () => {
    render(
      <CharacterTable
        {...defaultProps}
        characters={[]}
        loading={true}
        pages={1}
      />
    );

    expect(screen.getByRole('status')).toHaveTextContent(
      'Loading characters...'
    );
    expect(screen.getByTestId('character-table-pagination')).toBeVisible();
    expect(
      screen.queryByTestId('character-table-empty-state')
    ).not.toBeInTheDocument();
  });

  it('centers the error state in content and keeps pagination rendered', () => {
    render(
      <CharacterTable
        {...defaultProps}
        characters={[]}
        error='Network failed'
        pages={1}
      />
    );

    const content = screen.getByTestId('character-table-content');
    const errorState = screen.getByTestId('character-table-error-state');

    expect(content).toContainElement(errorState);
    expect(errorState).toHaveClass(
      'flex',
      'h-full',
      'min-h-[260px]',
      'items-center',
      'justify-center',
      'p-8',
      'text-center'
    );
    expect(screen.getByText('Network failed')).toBeVisible();
    expect(screen.getByTestId('character-table-pagination')).toBeVisible();
  });
});
