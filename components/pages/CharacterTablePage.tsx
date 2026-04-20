'use client';

import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useApolloClient } from '@apollo/client/react';

import { GET_CHARACTERS_TABLE } from '../../lib/graphql/queries/characterTable';
import { useTableUrlState } from '../../hooks/useTableUrlState';
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback';
import { useKeyboardNavigation } from '../organisms/AccessibilityEnhancements';
import CharacterTableTemplate from '../templates/CharacterTableTemplate';
import type {
  FilterCharacter,
  GetCharactersTableQuery,
  GetCharactersTableQueryVariables,
} from '../../src/__generated__/graphql';

import { Character } from '@/types';

interface QueryState {
  loading: boolean;
  error: string | null;
  data: GetCharactersTableQuery | null;
}

function isAbortError(error: unknown) {
  const maybeError = error as {
    message?: string;
    name?: string;
    networkError?: { message?: string; name?: string };
  };

  return (
    maybeError?.name === 'AbortError' ||
    maybeError?.networkError?.name === 'AbortError' ||
    maybeError?.message?.toLowerCase().includes('aborted') ||
    maybeError?.networkError?.message?.toLowerCase().includes('aborted')
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;

  const maybeError = error as { message?: string };

  return maybeError?.message || 'Unable to fetch characters';
}

export function CharacterTablePage() {
  // Enable keyboard navigation
  useKeyboardNavigation();
  const apolloClient = useApolloClient();

  // Use the URL state management hook
  const {
    page: currentPage,
    search: urlSearchValue,
    status: statusFilter,
    gender: genderFilter,
    species: speciesFilter,
    columns: visibleColumns,
    selectedCharacter,
    setPage,
    setSearch,
    setStatusFilter,
    setGenderFilter,
    setVisibleColumns,
    setSelectedCharacter,
  } = useTableUrlState();

  // Local state for immediate UI updates
  const [filterValue, setFilterValue] = useState(urlSearchValue);
  const [querySearchValue, setQuerySearchValue] = useState(urlSearchValue);
  const [queryState, setQueryState] = useState<QueryState>({
    loading: false,
    error: null,
    data: null,
  });

  const activeRequestRef = useRef<AbortController | null>(null);
  const requestGenerationRef = useRef(0);
  const latestInputRef = useRef(urlSearchValue);
  const pendingSearchUrlSyncRef = useRef(false);
  const setSearchRef = useRef(setSearch);

  useEffect(() => {
    setSearchRef.current = setSearch;
  }, [setSearch]);

  // Sync local state with URL state, without letting stale router updates undo typing.
  useEffect(() => {
    if (
      pendingSearchUrlSyncRef.current &&
      urlSearchValue !== latestInputRef.current
    ) {
      return;
    }

    pendingSearchUrlSyncRef.current = false;
    latestInputRef.current = urlSearchValue;
    setFilterValue(urlSearchValue);
    setQuerySearchValue(urlSearchValue);
  }, [urlSearchValue]);

  const commitSearch = useCallback((value: string) => {
    setQuerySearchValue(value);
    setSearchRef.current(value);
  }, []);

  // Debounced function to commit the value that drives URL and API calls.
  const debouncedCommitSearch = useDebouncedCallback(commitSearch, 100);

  // Handle search input changes
  const handleSearchChange = useCallback(
    (value: string) => {
      if (value === latestInputRef.current) return;

      latestInputRef.current = value;
      pendingSearchUrlSyncRef.current = true;
      setFilterValue(value);
      activeRequestRef.current?.abort();
      activeRequestRef.current = null;
      requestGenerationRef.current += 1;
      debouncedCommitSearch(value);
    },
    [debouncedCommitSearch]
  );

  // Track if we're waiting for debounced search
  const isSearchPending = filterValue !== querySearchValue;

  const statusServerFilter =
    statusFilter.length === 1 ? statusFilter[0] : undefined;
  const genderServerFilter =
    genderFilter.length === 1 ? genderFilter[0] : undefined;
  const speciesServerFilter =
    speciesFilter.length === 1 ? speciesFilter[0] : undefined;

  // Build filter object for GraphQL query (server-side filtering)
  const filter = useMemo(() => {
    const filterObj: FilterCharacter = {};

    // Use the debounced query value for API calls.
    if (querySearchValue) {
      filterObj.name = querySearchValue;
    }

    // Use server-side filtering for single selections
    if (statusServerFilter) {
      filterObj.status = statusServerFilter;
    }
    if (genderServerFilter) {
      filterObj.gender = genderServerFilter;
    }
    if (speciesServerFilter) {
      filterObj.species = speciesServerFilter;
    }

    return Object.keys(filterObj).length > 0 ? filterObj : undefined;
  }, [
    querySearchValue,
    statusServerFilter,
    genderServerFilter,
    speciesServerFilter,
  ]);

  const queryVariables = useMemo<GetCharactersTableQueryVariables>(
    () => ({
      page: currentPage,
      filter,
    }),
    [currentPage, filter]
  );

  const variablesKey = useMemo(
    () => JSON.stringify(queryVariables),
    [queryVariables]
  );

  // Execute query when debounced query variables change.
  useEffect(() => {
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    const generation = requestGenerationRef.current + 1;

    requestGenerationRef.current = generation;

    const cached = apolloClient.readQuery<
      GetCharactersTableQuery,
      GetCharactersTableQueryVariables
    >({
      query: GET_CHARACTERS_TABLE,
      variables: queryVariables,
    });

    if (cached) {
      setQueryState({
        loading: false,
        error: null,
        data: cached,
      });

      return;
    }

    const controller = new AbortController();

    activeRequestRef.current = controller;
    setQueryState(prevState => ({
      ...prevState,
      loading: true,
      error: null,
    }));

    apolloClient
      .query<GetCharactersTableQuery, GetCharactersTableQueryVariables>({
        query: GET_CHARACTERS_TABLE,
        variables: queryVariables,
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
        context: {
          fetchOptions: {
            signal: controller.signal,
          },
        },
      })
      .then(result => {
        if (
          generation !== requestGenerationRef.current ||
          controller.signal.aborted
        ) {
          return;
        }

        setQueryState({
          loading: false,
          error:
            result.errors?.map(queryError => queryError.message).join(', ') ||
            null,
          data: result.data,
        });
      })
      .catch(queryError => {
        if (
          generation !== requestGenerationRef.current ||
          controller.signal.aborted ||
          isAbortError(queryError)
        ) {
          return;
        }

        setQueryState(prevState => ({
          ...prevState,
          loading: false,
          error: getErrorMessage(queryError),
        }));
      })
      .finally(() => {
        if (generation === requestGenerationRef.current) {
          activeRequestRef.current = null;
        }
      });
  }, [apolloClient, queryVariables, variablesKey]);

  useEffect(() => {
    return () => {
      activeRequestRef.current?.abort();
      requestGenerationRef.current += 1;
    };
  }, []);

  // Transform API data to component format
  const characters: Character[] = useMemo(() => {
    const data = queryState.data;

    if (!data?.characters?.results) return [];

    let transformedCharacters = data.characters.results
      .filter(character => character !== null)
      .map(character => ({
        id: character!.id || '',
        name: character!.name || 'Unknown',
        status:
          (character!.status as 'Alive' | 'Dead' | 'unknown') || 'unknown',
        species: character!.species || '',
        type: character!.type || '',
        gender:
          (character!.gender as 'Female' | 'Male' | 'Genderless' | 'unknown') ||
          'unknown',
        origin: {
          name: character!.origin?.name || 'Unknown',
          url: '',
        },
        location: {
          name: character!.location?.name || 'Unknown',
          url: '',
        },
        image: character!.image || '',
        episode:
          character!.episode
            ?.filter(ep => ep !== null)
            .map(ep => ep!.id || '') || [],
        url: '',
        created: character!.created || '',
      }));

    // Apply client-side filtering only for multiple selections (server-side can't handle multiple values)
    const needsClientSideFiltering =
      statusFilter.length > 1 ||
      genderFilter.length > 1 ||
      speciesFilter.length > 1;

    if (needsClientSideFiltering) {
      transformedCharacters = transformedCharacters.filter(character => {
        const statusMatch =
          statusFilter.length === 0 || statusFilter.includes(character.status);
        const genderMatch =
          genderFilter.length === 0 || genderFilter.includes(character.gender);
        const speciesMatch =
          speciesFilter.length === 0 ||
          speciesFilter.includes(character.species);

        return statusMatch && genderMatch && speciesMatch;
      });
    }

    return transformedCharacters;
  }, [queryState.data, statusFilter, genderFilter, speciesFilter]);

  // Get pagination info
  const totalPages = queryState.data?.characters?.info?.pages || 1;

  // Find selected character for drawer
  const selectedCharacterData = selectedCharacter
    ? characters.find(char => char.id === selectedCharacter) || null
    : null;

  // Handle character selection and drawer
  const handleCharacterSelect = useCallback(
    (characterId: string) => {
      setSelectedCharacter(characterId);
    },
    [setSelectedCharacter]
  );

  const handleCloseDrawer = useCallback(() => {
    setSelectedCharacter('');
  }, [setSelectedCharacter]);

  const handleSearchClear = useCallback(() => {
    handleSearchChange('');
  }, [handleSearchChange]);

  // Render the template with all required props
  return (
    <CharacterTableTemplate
      characters={characters}
      currentPage={currentPage}
      error={queryState.error}
      filterValue={filterValue}
      genderFilter={genderFilter}
      isSearchPending={isSearchPending}
      loading={queryState.loading}
      selectedCharacter={selectedCharacter}
      selectedCharacterData={selectedCharacterData}
      statusFilter={statusFilter}
      totalPages={totalPages}
      visibleColumns={
        visibleColumns as ('name' | 'status' | 'species' | 'gender')[]
      }
      onCharacterSelect={handleCharacterSelect}
      onCloseDrawer={handleCloseDrawer}
      onColumnsChange={setVisibleColumns}
      onGenderChange={setGenderFilter}
      onPageChange={setPage}
      onSearchChange={handleSearchChange}
      onSearchClear={handleSearchClear}
      onStatusChange={setStatusFilter}
    />
  );
}

export default CharacterTablePage;
