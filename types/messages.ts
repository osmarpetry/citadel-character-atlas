/**
 * Type-safe internationalization messages
 * Ensures consistency across all language files and provides TypeScript support
 */

export interface Messages {
  navigation: {
    title: string;
    home: string;
    characters: string;
    episodes: string;
    locations: string;
  };
  characters: {
    title: string;
    loading: string;
    loadingTitle: string;
    loadingSubtitle: string;
    loadingMore: string;
    loadingCharacter: string;
    loadingCharacterSubtitle: string;
    loadingError: string;
    loadingErrorDefault: string;
    searching: string;
    error: string;
    search: string;
    searchAriaLabel: string;
    searchHelpText: string;
    tableAriaLabel: string;
    noCharactersFound: string;
    skipToMain: string;
    status: string;
    species: string;
    gender: string;
    origin: string;
    location: string;
    episodes: string;
    retry: string;
  };
  common: {
    search: string;
    filter: string;
    sort: string;
    loading: string;
    error: string;
    retry: string;
    close: string;
    next: string;
    previous: string;
  };
  theme: {
    toggle: string;
    light: string;
    dark: string;
  };
}

// Type for message keys - useful for useTranslations hook
export type MessageKeys = keyof Messages;
export type NavigationKeys = keyof Messages['navigation'];
export type CharacterKeys = keyof Messages['characters'];
export type CommonKeys = keyof Messages['common'];
export type ThemeKeys = keyof Messages['theme'];

// Helper type for nested message paths
export type MessagePath<T = Messages> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${K & string}.${MessagePath<T[K]> & string}`
        : K & string;
    }[keyof T]
  : never;

// Validation function to ensure message structure compliance
export function validateMessages(messages: unknown): messages is Messages {
  if (!messages || typeof messages !== 'object') {
    return false;
  }

  const msg = messages as Record<string, unknown>;

  // Check navigation section
  if (!msg.navigation || typeof msg.navigation !== 'object') return false;
  const nav = msg.navigation as Record<string, unknown>;

  if (
    !nav.title ||
    !nav.home ||
    !nav.characters ||
    !nav.episodes ||
    !nav.locations
  ) {
    return false;
  }

  // Check characters section
  if (!msg.characters || typeof msg.characters !== 'object') return false;
  const chars = msg.characters as Record<string, unknown>;
  const requiredCharacterKeys = [
    'title',
    'loading',
    'loadingTitle',
    'loadingSubtitle',
    'loadingMore',
    'loadingCharacter',
    'loadingCharacterSubtitle',
    'loadingError',
    'loadingErrorDefault',
    'searching',
    'error',
    'search',
    'searchAriaLabel',
    'searchHelpText',
    'tableAriaLabel',
    'noCharactersFound',
    'skipToMain',
    'status',
    'species',
    'gender',
    'origin',
    'location',
    'episodes',
    'retry',
  ];

  for (const key of requiredCharacterKeys) {
    if (!chars[key] || typeof chars[key] !== 'string') {
      return false;
    }
  }

  // Check common section
  if (!msg.common || typeof msg.common !== 'object') return false;
  const common = msg.common as Record<string, unknown>;
  const requiredCommonKeys = [
    'search',
    'filter',
    'sort',
    'loading',
    'error',
    'retry',
    'close',
    'next',
    'previous',
  ];

  for (const key of requiredCommonKeys) {
    if (!common[key] || typeof common[key] !== 'string') {
      return false;
    }
  }

  // Check theme section
  if (!msg.theme || typeof msg.theme !== 'object') return false;
  const theme = msg.theme as Record<string, unknown>;

  if (!theme.toggle || !theme.light || !theme.dark) {
    return false;
  }

  return true;
}

// Default messages (English) - used as fallback
export const defaultMessages: Messages = {
  navigation: {
    title: 'Citadel Atlas',
    home: 'Home',
    characters: 'Characters',
    episodes: 'Episodes',
    locations: 'Locations',
  },
  characters: {
    title: 'Citadel Character Atlas',
    loading: 'Loading characters...',
    loadingTitle: 'Scanning the Multiverse',
    loadingSubtitle: 'Searching for characters across dimensions...',
    loadingMore: 'Loading more characters...',
    loadingCharacter: 'Loading character details...',
    loadingCharacterSubtitle: 'Accessing interdimensional database...',
    loadingError: 'Connection Error',
    loadingErrorDefault: 'Failed to connect to the multiverse database',
    searching: 'Searching the multiverse...',
    error: 'Failed to load characters',
    search: 'Search characters...',
    searchAriaLabel: 'Search characters by name',
    searchHelpText:
      'Type to search for characters. Results will appear as you type.',
    tableAriaLabel: 'Citadel character table with pagination and filtering',
    noCharactersFound: 'No characters found matching your search criteria',
    skipToMain: 'Skip to main content',
    status: 'Status',
    species: 'Species',
    gender: 'Gender',
    origin: 'Origin',
    location: 'Location',
    episodes: 'Episodes',
    retry: 'Retry',
  },
  common: {
    search: 'Search characters...',
    filter: 'Filter',
    sort: 'Sort',
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Retry',
    close: 'Close',
    next: 'Next',
    previous: 'Previous',
  },
  theme: {
    toggle: 'Toggle theme',
    light: 'Light mode',
    dark: 'Dark mode',
  },
};
