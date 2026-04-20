import type { Meta, StoryObj } from '@storybook/react';

import CharacterTableTemplate from './CharacterTableTemplate';

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
];

const meta: Meta<typeof CharacterTableTemplate> = {
  title: 'Templates/CharacterTableTemplate',
  component: CharacterTableTemplate,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Character table template component following Atomic Design principles. This is a pure presentational component that receives all data as props and focuses solely on layout and rendering without business logic.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    characters: {
      control: 'object',
      description: 'Array of character data to display',
    },
    selectedCharacterData: {
      control: 'object',
      description: 'Selected character data for drawer',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state indicator',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    isSearchPending: {
      control: 'boolean',
      description: 'Search pending state',
    },
    filterValue: {
      control: 'text',
      description: 'Current search filter value',
    },
    statusFilter: {
      control: 'object',
      description: 'Selected status filter values',
    },
    genderFilter: {
      control: 'object',
      description: 'Selected gender filter values',
    },
    visibleColumns: {
      control: 'object',
      description: 'Array of visible column keys',
    },
    currentPage: {
      control: 'number',
      description: 'Current page number',
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
    },
    selectedCharacter: {
      control: 'text',
      description: 'Selected character ID',
    },
    onSearchChange: { action: 'search changed' },
    onSearchClear: { action: 'search cleared' },
    onStatusChange: { action: 'status filter changed' },
    onGenderChange: { action: 'gender filter changed' },
    onColumnsChange: { action: 'columns changed' },
    onPageChange: { action: 'page changed' },
    onCharacterSelect: { action: 'character selected' },
    onCloseDrawer: { action: 'drawer closed' },
  },
  args: {
    characters: mockCharacters,
    selectedCharacterData: null,
    loading: false,
    error: null,
    isSearchPending: false,
    filterValue: '',
    statusFilter: [],
    genderFilter: [],
    visibleColumns: ['name', 'status', 'species', 'gender'],
    currentPage: 1,
    totalPages: 5,
    selectedCharacter: '',
    onSearchChange: mockFn,
    onSearchClear: mockFn,
    onStatusChange: mockFn,
    onGenderChange: mockFn,
    onColumnsChange: mockFn,
    onPageChange: mockFn,
    onCharacterSelect: mockFn,
    onCloseDrawer: mockFn,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default State',
  parameters: {
    docs: {
      description: {
        story:
          'Default character table template with sample data and no filters applied.',
      },
    },
  },
};

export const WithSearchAndFilters: Story = {
  name: 'With Search and Filters',
  args: {
    filterValue: 'Rick',
    statusFilter: ['Alive'],
    genderFilter: ['Male'],
    visibleColumns: ['name', 'status'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Template with search term and filters applied, showing how the search bar displays active filters.',
      },
    },
  },
};

export const LoadingState: Story = {
  name: 'Loading State',
  args: {
    characters: [],
    loading: true,
    filterValue: 'Searching...',
    isSearchPending: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Template in loading state with search pending indicator.',
      },
    },
  },
};

export const ErrorState: Story = {
  name: 'Error State',
  args: {
    characters: [],
    loading: false,
    error:
      'Failed to connect to the multiverse database. Portal gun needs recalibration.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Template displaying error state with Citadel themed error message.',
      },
    },
  },
};

export const EmptyResults: Story = {
  name: 'Empty Results',
  args: {
    characters: [],
    loading: false,
    error: null,
    filterValue: 'Nonexistent Character',
    statusFilter: ['Dead'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Template showing empty results state with search filters applied.',
      },
    },
  },
};

export const WithSelectedCharacter: Story = {
  name: 'With Selected Character',
  args: {
    selectedCharacter: '1',
    selectedCharacterData: mockCharacters[0],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Template with character drawer open showing selected character details.',
      },
    },
  },
};

export const PaginationStates: Story = {
  name: 'Pagination States',
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>First Page</h3>
        <div className='h-96'>
          <CharacterTableTemplate
            characters={mockCharacters}
            currentPage={1}
            error={null}
            filterValue=''
            genderFilter={[]}
            isSearchPending={false}
            loading={false}
            selectedCharacter=''
            selectedCharacterData={null}
            statusFilter={[]}
            totalPages={10}
            visibleColumns={['name', 'status', 'species', 'gender']}
            onCharacterSelect={mockFn}
            onCloseDrawer={mockFn}
            onColumnsChange={mockFn}
            onGenderChange={mockFn}
            onPageChange={mockFn}
            onSearchChange={mockFn}
            onSearchClear={mockFn}
            onStatusChange={mockFn}
          />
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Middle Page</h3>
        <div className='h-96'>
          <CharacterTableTemplate
            characters={mockCharacters}
            currentPage={5}
            error={null}
            filterValue=''
            genderFilter={[]}
            isSearchPending={false}
            loading={false}
            selectedCharacter=''
            selectedCharacterData={null}
            statusFilter={[]}
            totalPages={10}
            visibleColumns={['name', 'status', 'species', 'gender']}
            onCharacterSelect={mockFn}
            onCloseDrawer={mockFn}
            onColumnsChange={mockFn}
            onGenderChange={mockFn}
            onPageChange={mockFn}
            onSearchChange={mockFn}
            onSearchClear={mockFn}
            onStatusChange={mockFn}
          />
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Last Page</h3>
        <div className='h-96'>
          <CharacterTableTemplate
            characters={mockCharacters}
            currentPage={10}
            error={null}
            filterValue=''
            genderFilter={[]}
            isSearchPending={false}
            loading={false}
            selectedCharacter=''
            selectedCharacterData={null}
            statusFilter={[]}
            totalPages={10}
            visibleColumns={['name', 'status', 'species', 'gender']}
            onCharacterSelect={mockFn}
            onCloseDrawer={mockFn}
            onColumnsChange={mockFn}
            onGenderChange={mockFn}
            onPageChange={mockFn}
            onSearchChange={mockFn}
            onSearchClear={mockFn}
            onStatusChange={mockFn}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Template showing different pagination states (first, middle, last page).',
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
          'Template responsive behavior across different screen sizes. Search filters stack on mobile, table adjusts for smaller screens.',
      },
    },
  },
};

export const InteractiveTemplate: Story = {
  name: 'Interactive Template',
  parameters: {
    docs: {
      description: {
        story:
          'Testing template interactions including search, filtering, pagination, and character selection.',
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
          'Testing template accessibility features including ARIA labels, keyboard navigation, and semantic HTML structure.',
      },
    },
  },
};

export const ColumnVariations: Story = {
  name: 'Column Variations',
  render: () => (
    <div className='space-y-8'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Name Only</h3>
        <div className='h-80'>
          <CharacterTableTemplate
            characters={mockCharacters}
            currentPage={1}
            error={null}
            filterValue=''
            genderFilter={[]}
            isSearchPending={false}
            loading={false}
            selectedCharacter=''
            selectedCharacterData={null}
            statusFilter={[]}
            totalPages={1}
            visibleColumns={['name']}
            onCharacterSelect={mockFn}
            onCloseDrawer={mockFn}
            onColumnsChange={mockFn}
            onGenderChange={mockFn}
            onPageChange={mockFn}
            onSearchChange={mockFn}
            onSearchClear={mockFn}
            onStatusChange={mockFn}
          />
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Name and Status</h3>
        <div className='h-80'>
          <CharacterTableTemplate
            characters={mockCharacters}
            currentPage={1}
            error={null}
            filterValue=''
            genderFilter={[]}
            isSearchPending={false}
            loading={false}
            selectedCharacter=''
            selectedCharacterData={null}
            statusFilter={[]}
            totalPages={1}
            visibleColumns={['name', 'status']}
            onCharacterSelect={mockFn}
            onCloseDrawer={mockFn}
            onColumnsChange={mockFn}
            onGenderChange={mockFn}
            onPageChange={mockFn}
            onSearchChange={mockFn}
            onSearchClear={mockFn}
            onStatusChange={mockFn}
          />
        </div>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>All Columns</h3>
        <div className='h-80'>
          <CharacterTableTemplate
            characters={mockCharacters}
            currentPage={1}
            error={null}
            filterValue=''
            genderFilter={[]}
            isSearchPending={false}
            loading={false}
            selectedCharacter=''
            selectedCharacterData={null}
            statusFilter={[]}
            totalPages={1}
            visibleColumns={['name', 'status', 'species', 'gender']}
            onCharacterSelect={mockFn}
            onCloseDrawer={mockFn}
            onColumnsChange={mockFn}
            onGenderChange={mockFn}
            onPageChange={mockFn}
            onSearchChange={mockFn}
            onSearchClear={mockFn}
            onStatusChange={mockFn}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Template with different column visibility configurations.',
      },
    },
  },
};

export const PerformanceTest: Story = {
  name: 'Performance Test',
  args: {
    characters: Array.from({ length: 20 }, (_, i) => ({
      ...mockCharacters[i % mockCharacters.length],
      id: `${i + 1}`,
      name: `${mockCharacters[i % mockCharacters.length].name} ${i + 1}`,
    })),
    totalPages: 100,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Template performance test with many characters to ensure smooth rendering and interactions.',
      },
    },
  },
};
