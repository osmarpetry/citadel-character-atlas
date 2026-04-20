import type { Meta, StoryObj } from '@storybook/react';

import { ThemeProvider } from 'next-themes';

import { ThemeSwitcher } from './ThemeSwitcher';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Atoms/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Theme switcher component that toggles between light and dark modes with Citadel portal-inspired styling and smooth transitions.',
      },
    },
    backgrounds: {
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
        { name: 'portal-green', value: '#08C952' },
        { name: 'citadel-yellow', value: '#FCE46D' },
      ],
    },
  },
  decorators: [
    Story => (
      <ThemeProvider
        attribute='class'
        defaultTheme='light'
        enableSystem={false}
      >
        <div className='p-8'>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    // No props to configure for this component
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightMode: Story = {
  name: 'Light Mode',
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story:
          'Theme switcher in light mode showing sun and moon icons with portal colors.',
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider
        attribute='class'
        defaultTheme='light'
        enableSystem={false}
      >
        <div className='p-8 bg-white rounded-lg'>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Theme switcher in dark mode with Citadel themed colors and icons.',
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
        <div className='p-8 bg-gray-900 rounded-lg dark'>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export const Interactive: Story = {
  name: 'Interactive Demo',
  parameters: {
    docs: {
      description: {
        story:
          'Interactive theme switcher. Click to toggle between light and dark modes and see the smooth transition with Citadel portal colors.',
      },
    },
  },
};

export const WithTooltip: Story = {
  name: 'With Tooltip',
  parameters: {
    docs: {
      description: {
        story:
          'Theme switcher with tooltip showing current mode and next action.',
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
          styles: { width: '1024px', height: '768px' },
        },
      },
    },
    docs: {
      description: {
        story:
          'Theme switcher responsive behavior across different screen sizes.',
      },
    },
  },
  render: () => (
    <div className='flex flex-col gap-4 items-center'>
      <h3 className='text-lg font-semibold'>Theme Switcher</h3>
      <ThemeSwitcher />
      <p className='text-sm text-gray-600 text-center max-w-xs'>
        The theme switcher maintains consistent sizing and interaction across
        all device sizes.
      </p>
    </div>
  ),
};

export const MultipleInstances: Story = {
  name: 'Multiple Instances',
  parameters: {
    docs: {
      description: {
        story: 'Multiple theme switcher instances should stay synchronized.',
      },
    },
  },
  render: () => (
    <div className='flex gap-6 items-center'>
      <div className='text-center'>
        <p className='text-sm mb-2'>Header</p>
        <ThemeSwitcher />
      </div>
      <div className='text-center'>
        <p className='text-sm mb-2'>Sidebar</p>
        <ThemeSwitcher />
      </div>
      <div className='text-center'>
        <p className='text-sm mb-2'>Footer</p>
        <ThemeSwitcher />
      </div>
    </div>
  ),
};

export const AccessibilityTest: Story = {
  name: 'Accessibility Test',
  parameters: {
    docs: {
      description: {
        story:
          'Theme switcher with full accessibility support including keyboard navigation and screen reader labels.',
      },
    },
  },
};
