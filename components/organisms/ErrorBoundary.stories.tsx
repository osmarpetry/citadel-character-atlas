import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { ErrorBoundary, CharacterTableErrorFallback } from './ErrorBoundary';

// Simple mock function for story actions
const mockFn = () => {};

// Component that throws an error for testing
const ErrorThrowingComponent = ({
  shouldThrow = false,
  errorMessage = 'Test error',
}) => {
  if (shouldThrow) {
    throw new Error(errorMessage);
  }

  return (
    <div className='p-4 bg-green-100 rounded'>
      ✅ Component rendered successfully!
    </div>
  );
};

// Component that throws async error
const AsyncErrorComponent = ({ shouldThrow = false }) => {
  React.useEffect(() => {
    if (shouldThrow) {
      setTimeout(() => {
        throw new Error(
          'Async error - this will not be caught by error boundary'
        );
      }, 100);
    }
  }, [shouldThrow]);

  return (
    <div className='p-4 bg-blue-100 rounded'>🔄 Async component loaded</div>
  );
};

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Organisms/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Error boundary component that catches JavaScript errors in child components and displays a fallback UI with Citadel theming. Includes error reporting, recovery mechanisms, and development-friendly error details.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Child components to wrap with error boundary',
    },
    fallback: {
      control: false,
      description: 'Custom fallback component to render on error',
    },
    onError: {
      action: 'error caught',
      description: 'Callback when error is caught',
    },
  },
  args: {
    onError: mockFn,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NoError: Story = {
  name: 'No Error (Normal State)',
  args: {
    children: <ErrorThrowingComponent shouldThrow={false} />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Error boundary in normal state with no errors, showing wrapped component.',
      },
    },
  },
};

export const DefaultErrorFallback: Story = {
  name: 'Default Error Fallback',
  args: {
    children: (
      <ErrorThrowingComponent
        errorMessage='Portal malfunction detected!'
        shouldThrow={true}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Error boundary with default fallback UI showing a Citadel themed error message.',
      },
    },
  },
};

export const CharacterTableError: Story = {
  name: 'Character Table Error Fallback',
  args: {
    children: (
      <ErrorThrowingComponent
        errorMessage='Character database connection failed'
        shouldThrow={true}
      />
    ),
    fallback: CharacterTableErrorFallback,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Error boundary with specialized character table error fallback component.',
      },
    },
  },
};

export const DevelopmentMode: Story = {
  name: 'Development Mode (with Error Details)',
  args: {
    children: (
      <ErrorThrowingComponent
        errorMessage='Detailed error for development'
        shouldThrow={true}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Error boundary in development mode showing detailed error information and stack trace.',
      },
    },
  },
  // Force development mode for this story
  decorators: [
    Story => {
      return (
        <div>
          <Story />
          {/* Restore original env after render */}
          {(() => {
            return null;
          })()}
        </div>
      );
    },
  ],
};

export const CustomErrorMessage: Story = {
  name: 'Custom Error Message',
  args: {
    children: (
      <ErrorThrowingComponent
        errorMessage='Citadel operators detected an anomaly in dimension C-137. Portal index recalibration required immediately!'
        shouldThrow={true}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Error boundary with a custom Citadel themed error message.',
      },
    },
  },
};

export const InteractiveErrorRecovery: Story = {
  name: 'Interactive Error Recovery',
  args: {
    children: (
      <ErrorThrowingComponent
        errorMessage='Recoverable portal error'
        shouldThrow={true}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Testing error boundary recovery mechanisms including retry and reload buttons.',
      },
    },
  },
};

export const MultipleErrorBoundaries: Story = {
  name: 'Multiple Error Boundaries',
  render: () => (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>Boundary 1 - No Error</h3>
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={false} />
        </ErrorBoundary>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Boundary 2 - With Error</h3>
        <ErrorBoundary>
          <ErrorThrowingComponent
            errorMessage='Isolated error in boundary 2'
            shouldThrow={true}
          />
        </ErrorBoundary>
      </div>

      <div className='md:col-span-2'>
        <h3 className='text-lg font-semibold mb-4'>
          Boundary 3 - Character Table Error
        </h3>
        <ErrorBoundary fallback={CharacterTableErrorFallback}>
          <ErrorThrowingComponent
            errorMessage='Character table specific error'
            shouldThrow={true}
          />
        </ErrorBoundary>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple error boundaries showing isolation - one error does not affect other boundaries.',
      },
    },
  },
};

export const NestedErrorBoundaries: Story = {
  name: 'Nested Error Boundaries',
  render: () => (
    <ErrorBoundary>
      <div className='p-4 border-2 border-blue-200 rounded'>
        <h3 className='text-lg font-semibold mb-4'>Outer Error Boundary</h3>
        <ErrorThrowingComponent shouldThrow={false} />

        <ErrorBoundary fallback={CharacterTableErrorFallback}>
          <div className='mt-4 p-4 border-2 border-red-200 rounded'>
            <h4 className='font-semibold mb-2'>Inner Error Boundary</h4>
            <ErrorThrowingComponent
              errorMessage='Inner boundary error'
              shouldThrow={true}
            />
          </div>
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Nested error boundaries showing how inner boundaries catch errors before outer ones.',
      },
    },
  },
};

export const AsyncErrorDemo: Story = {
  name: 'Async Error Demo',
  render: () => (
    <div className='space-y-6 p-6'>
      <div>
        <h3 className='text-lg font-semibold mb-4'>
          Sync Error (Caught by Boundary)
        </h3>
        <ErrorBoundary>
          <ErrorThrowingComponent
            errorMessage='Synchronous error'
            shouldThrow={true}
          />
        </ErrorBoundary>
      </div>

      <div>
        <h3 className='text-lg font-semibold mb-4'>Async Error (Not Caught)</h3>
        <ErrorBoundary>
          <AsyncErrorComponent shouldThrow={true} />
        </ErrorBoundary>
        <p className='text-sm text-gray-600 mt-2'>
          ⚠️ Async errors are not caught by error boundaries. Check browser
          console.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of the difference between synchronous errors (caught) and asynchronous errors (not caught by error boundaries).',
      },
    },
  },
};

export const AccessibilityTest: Story = {
  name: 'Accessibility Test',
  args: {
    children: (
      <ErrorThrowingComponent
        errorMessage='Accessibility test error'
        shouldThrow={true}
      />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Testing error boundary accessibility features including focus management and screen reader support.',
      },
    },
  },
};

export const ResponsiveErrorDisplay: Story = {
  name: 'Responsive Error Display',
  args: {
    children: (
      <ErrorThrowingComponent
        errorMessage='Responsive layout test error'
        shouldThrow={true}
      />
    ),
  },
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
          'Error boundary responsive behavior across different screen sizes.',
      },
    },
  },
};
