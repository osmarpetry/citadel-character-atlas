import type { Meta, StoryObj } from '@storybook/react';

import CharacterTable from './CharacterTable';

import { Character } from '@/types';

// Simple mock function for story actions
const mockFn = () => {};

// Mock character data
const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: ['1', '2', '3'],
    url: '',
    created: '2017-11-04T18:48:46.250Z',
  },
  {
    id: '2',
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'unknown', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: ['1', '2'],
    url: '',
    created: '2017-11-04T18:50:21.651Z',
  },
  {
    id: '3',
    name: 'Summer Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Female',
    origin: { name: 'Earth (Replacement Dimension)', url: '' },
    location: { name: 'Earth (Replacement Dimension)', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    episode: ['6', '7', '8'],
    url: '',
    created: '2017-11-04T19:09:56.428Z',
  },
  {
    id: '4',
    name: 'Beth Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Female',
    origin: { name: 'Earth (Replacement Dimension)', url: '' },
    location: { name: 'Earth (Replacement Dimension)', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    episode: ['6', '7'],
    url: '',
    created: '2017-11-04T19:22:43.665Z',
  },
  {
    id: '5',
    name: 'Jerry Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth (Replacement Dimension)', url: '' },
    location: { name: 'Earth (Replacement Dimension)', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
    episode: ['6', '8'],
    url: '',
    created: '2017-11-04T19:26:56.301Z',
  },
];

const deadCharacter: Character = {
  id: '6',
  name: 'Birdperson',
  status: 'Dead',
  species: 'Bird-Person',
  type: '',
  gender: 'Male',
  origin: { name: 'Bird World', url: '' },
  location: { name: 'Bird World', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
  episode: ['16'],
  url: '',
  created: '2017-11-05T08:48:30.776Z',
};

const unknownCharacter: Character = {
  id: '7',
  name: 'Alien Parasite',
  status: 'unknown',
  species: 'Parasite',
  type: 'Memory Parasite',
  gender: 'unknown',
  origin: { name: 'unknown', url: '' },
  location: { name: 'unknown', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/100.jpeg',
  episode: ['15'],
  url: '',
  created: '2017-11-05T09:48:30.776Z',
};

const meta: Meta<typeof CharacterTable> = {
  title: 'Organisms/CharacterTable',
  component: CharacterTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Character table component displaying Citadel atlas characters with pagination, loading states, error handling, and responsive design. Features avatar images, status indicators, and interactive row selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    characters: {
      control: 'object',
      description: 'Array of character data to display',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state indicator',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    page: {
      control: 'number',
      description: 'Current page number',
    },
    pages: {
      control: 'number',
      description: 'Total number of pages',
    },
    visibleColumns: {
      control: 'object',
      description: 'Array of visible column keys',
    },
    onPageChange: {
      action: 'page changed',
      description: 'Callback when page changes',
    },
    onRowSelect: {
      action: 'row selected',
      description: 'Callback when row is selected',
    },
  },
  args: {
    characters: mockCharacters,
    loading: false,
    error: null,
    page: 1,
    pages: 5,
    visibleColumns: ['name', 'status', 'species', 'gender'],
    onPageChange: mockFn,
    onRowSelect: mockFn,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default State',
  parameters: {
    docs: {
      description: {
        story: 'Default character table with sample Citadel atlas characters.',
      },
    },
  },
};

export const Loading: Story = {
  name: 'Loading State',
  args: {
    characters: [],
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Character table in loading state with skeleton placeholders.',
      },
    },
  },
};

export const Error: Story = {
  name: 'Error State',
  args: {
    characters: [],
    loading: false,
    error:
      'Failed to load characters from the multiverse database. The portal connection is unstable.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Character table displaying an error message with Citadel theming.',
      },
    },
  },
};

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    characters: [],
    loading: false,
    error: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Character table with no characters found, showing helpful empty state message.',
      },
    },
  },
};

export const SinglePage: Story = {
  name: 'Single Page',
  args: {
    characters: mockCharacters.slice(0, 3),
    pages: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Character table with only one page of results.',
      },
    },
  },
};

export const MultiplePages: Story = {
  name: 'Multiple Pages',
  args: {
    page: 3,
    pages: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Character table with multiple pages showing pagination controls.',
      },
    },
  },
};

export const DifferentStatuses: Story = {
  name: 'Different Character Statuses',
  args: {
    characters: [
      mockCharacters[0], // Alive
      deadCharacter, // Dead
      unknownCharacter, // Unknown
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Character table showing characters with different status values (Alive, Dead, Unknown) and their corresponding color indicators.',
      },
    },
  },
};

export const LimitedColumns: Story = {
  name: 'Limited Columns',
  args: {
    visibleColumns: ['name', 'status'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Character table with only name and status columns visible.',
      },
    },
  },
};

export const AllColumns: Story = {
  name: 'All Columns',
  args: {
    visibleColumns: ['name', 'status', 'species', 'gender'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Character table with all available columns displayed.',
      },
    },
  },
};

export const InteractiveTable: Story = {
  name: 'Interactive Table',
  parameters: {
    docs: {
      description: {
        story:
          'Testing table interactions including row clicks and pagination.',
      },
    },
  },
};

export const ResponsiveLayout: Story = {
  name: 'Responsive Layout',
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1200px', height: '800px' },
        },
      },
    },
    docs: {
      description: {
        story:
          'Character table responsive behavior. On mobile, some text is hidden and layout adjusts for smaller screens.',
      },
    },
  },
};

export const AccessibilityTest: Story = {
  name: 'Accessibility Test',
  parameters: {
    docs: {
      description: {
        story:
          'Testing accessibility features including ARIA labels, keyboard navigation, and screen reader support.',
      },
    },
  },
};

export const LongCharacterNames: Story = {
  name: 'Long Character Names',
  args: {
    characters: [
      {
        ...mockCharacters[0],
        name: 'Rick Sanchez from Dimension C-137 with a Very Long Name That Should Wrap',
      },
      {
        ...mockCharacters[1],
        name: 'Morty Smith Jr. III Esquire',
        species: 'Human-Alien Hybrid with Multiple Species Designations',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Character table handling long character names and species that might wrap or truncate.',
      },
    },
  },
};

export const PerformanceTest: Story = {
  name: 'Performance Test (Many Characters)',
  args: {
    characters: Array.from({ length: 20 }, (_, i) => ({
      ...mockCharacters[i % mockCharacters.length],
      id: `${i + 1}`,
      name: `${mockCharacters[i % mockCharacters.length].name} ${i + 1}`,
    })),
    pages: 100,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Character table with many characters to test rendering performance and scrolling behavior.',
      },
    },
  },
};
