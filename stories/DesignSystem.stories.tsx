/**
 * Citadel Character Atlas Design System
 * Visual documentation of the theme colors, components, and design tokens
 */

import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Button } from '@heroui/button';

const meta: Meta = {
  title: 'Design System/Citadel Theme',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete design system showcasing the Citadel color palette, components, and portal-forward atlas theming.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ColorPalette = () => (
  <div className='p-8 space-y-8'>
    <div>
      <h2 className='text-2xl font-bold mb-4'>Citadel Color Palette</h2>
      <p className='text-default-600 mb-6'>
        Based on the color palette from{' '}
        <a
          className='text-primary underline'
          href='https://www.color-hex.com/color-palette/9134'
          rel='noopener noreferrer'
          target='_blank'
        >
          color-hex.com/color-palette/9134
        </a>
      </p>
    </div>

    {/* Primary Colors - Portal Green */}
    <div>
      <h3 className='text-xl font-semibold mb-3'>
        Primary - Portal Green (Official)
      </h3>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-primary-500 rounded-lg mx-auto mb-2 border-2 border-default-200' />
          <p className='text-sm font-mono'>#08C952</p>
          <p className='text-xs text-default-500'>primary-500</p>
        </div>
        <div className='text-center'>
          <div className='w-16 h-16 bg-primary-300 rounded-lg mx-auto mb-2 border-2 border-default-200' />
          <p className='text-sm font-mono'>#16a34a</p>
          <p className='text-xs text-default-500'>primary-300</p>
        </div>
        <div className='text-center'>
          <div className='w-16 h-16 bg-primary-700 rounded-lg mx-auto mb-2 border-2 border-default-200' />
          <p className='text-sm font-mono'>#15803d</p>
          <p className='text-xs text-default-500'>primary-700</p>
        </div>
      </div>
    </div>

    {/* Secondary Colors - Citadel Yellow */}
    <div>
      <h3 className='text-xl font-semibold mb-3'>Secondary - Citadel Yellow</h3>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-secondary-500 rounded-lg mx-auto mb-2 border-2 border-default-200' />
          <p className='text-sm font-mono'>#FCE46D</p>
          <p className='text-xs text-default-500'>secondary-500</p>
        </div>
        <div className='text-center'>
          <div className='w-16 h-16 bg-secondary-300 rounded-lg mx-auto mb-2 border-2 border-default-200' />
          <p className='text-sm font-mono'>#fde047</p>
          <p className='text-xs text-default-500'>secondary-300</p>
        </div>
        <div className='text-center'>
          <div className='w-16 h-16 bg-secondary-700 rounded-lg mx-auto mb-2 border-2 border-default-200' />
          <p className='text-sm font-mono'>#a16207</p>
          <p className='text-xs text-default-500'>secondary-700</p>
        </div>
      </div>
    </div>

    {/* Danger Colors - Signal Red */}
    <div>
      <h3 className='text-xl font-semibold mb-3'>Danger - Signal Red</h3>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-danger-500 rounded-lg mx-auto mb-2 border-2 border-default-200' />
          <p className='text-sm font-mono'>#A1140A</p>
          <p className='text-xs text-default-500'>danger-500</p>
        </div>
        <div className='text-center'>
          <div className='w-16 h-16 bg-danger-300 rounded-lg mx-auto mb-2 border-2 border-default-200' />
          <p className='text-sm font-mono'>#f9a8d4</p>
          <p className='text-xs text-default-500'>danger-300</p>
        </div>
        <div className='text-center'>
          <div className='w-16 h-16 bg-danger-700 rounded-lg mx-auto mb-2 border-2 border-default-200' />
          <p className='text-sm font-mono'>#be185d</p>
          <p className='text-xs text-default-500'>danger-700</p>
        </div>
      </div>
    </div>

    {/* Default Colors - Earth Tones */}
    <div>
      <h3 className='text-xl font-semibold mb-3'>Default - Earth Tones</h3>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-default-500 rounded-lg mx-auto mb-2 border-2 border-default-200' />
          <p className='text-sm font-mono'>#e4a788</p>
          <p className='text-xs text-default-500'>default-500</p>
        </div>
        <div className='text-center'>
          <div className='w-16 h-16 bg-default-900 rounded-lg mx-auto mb-2 border-2 border-default-200' />
          <p className='text-sm font-mono'>#44281d</p>
          <p className='text-xs text-default-500'>default-900</p>
        </div>
      </div>
    </div>
  </div>
);

const ComponentShowcase = () => (
  <div className='p-8 space-y-8'>
    <h2 className='text-2xl font-bold mb-6'>Component Showcase</h2>

    {/* Buttons */}
    <div>
      <h3 className='text-xl font-semibold mb-4'>Buttons</h3>
      <div className='flex flex-wrap gap-4'>
        <Button color='primary'>Portal Green</Button>
        <Button color='secondary'>Morty Yellow</Button>
        <Button color='success'>Success</Button>
        <Button color='warning'>Warning</Button>
        <Button color='danger'>Portal Pink</Button>
        <Button color='default'>Earth Tone</Button>
      </div>
    </div>

    {/* Status Chips */}
    <div>
      <h3 className='text-xl font-semibold mb-4'>Status Chips</h3>
      <div className='flex flex-wrap gap-4'>
        <Chip color='success' variant='flat'>
          Alive
        </Chip>
        <Chip color='danger' variant='flat'>
          Dead
        </Chip>
        <Chip color='warning' variant='flat'>
          Unknown
        </Chip>
        <Chip color='primary' variant='flat'>
          Portal Active
        </Chip>
        <Chip color='secondary' variant='flat'>
          Dimension C-137
        </Chip>
      </div>
    </div>

    {/* Cards */}
    <div>
      <h3 className='text-xl font-semibold mb-4'>Character Cards</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card className='border-2 border-primary/20 hover:border-primary/60 transition-all'>
          <CardHeader>
            <h4 className='text-lg font-bold text-primary'>Rick Sanchez</h4>
          </CardHeader>
          <CardBody>
            <p className='text-default-600'>
              Genius scientist from Dimension C-137
            </p>
            <div className='mt-2'>
              <Chip color='success' size='sm' variant='flat'>
                Alive
              </Chip>
            </div>
          </CardBody>
        </Card>

        <Card className='border-2 border-secondary/20 hover:border-secondary/60 transition-all'>
          <CardHeader>
            <h4 className='text-lg font-bold text-secondary'>Morty Smith</h4>
          </CardHeader>
          <CardBody>
            <p className='text-default-600'>
              Rick&apos;s anxious grandson and sidekick
            </p>
            <div className='mt-2'>
              <Chip color='success' size='sm' variant='flat'>
                Alive
              </Chip>
            </div>
          </CardBody>
        </Card>

        <Card className='border-2 border-danger/20 hover:border-danger/60 transition-all'>
          <CardHeader>
            <h4 className='text-lg font-bold text-danger'>Portal Gun</h4>
          </CardHeader>
          <CardBody>
            <p className='text-default-600'>Interdimensional travel device</p>
            <div className='mt-2'>
              <Chip color='primary' size='sm' variant='flat'>
                Active
              </Chip>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  </div>
);

export const ColorPaletteStory: Story = {
  name: 'Color Palette',
  render: () => <ColorPalette />,
};

export const ComponentsStory: Story = {
  name: 'Components',
  render: () => <ComponentShowcase />,
};

export const FullDesignSystem: Story = {
  name: 'Complete Design System',
  render: () => (
    <div>
      <div className='bg-gradient-to-r from-primary/10 via-secondary/10 to-danger/10 p-8 text-center'>
        <h1 className='text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-danger bg-clip-text text-transparent'>
          🚀 Citadel Character Atlas Design System
        </h1>
        <p className='text-xl text-default-600'>
          A complete design system for tracking characters across the
          multiverse.
        </p>
      </div>
      <ColorPalette />
      <ComponentShowcase />
    </div>
  ),
};
