'use client';

import React, { Component, ReactNode } from 'react';
import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import {
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;

      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({
  error,
  resetError,
}: {
  error?: Error;
  resetError: () => void;
}) {
  return (
    <div className='flex items-center justify-center min-h-[400px] p-6'>
      <Card className='max-w-md w-full'>
        <CardBody className='text-center space-y-6 p-8'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='relative'>
              <ExclamationTriangleIcon className='h-16 w-16 text-danger' />
              <div className='absolute -top-2 -right-2 h-6 w-6 bg-danger rounded-full flex items-center justify-center'>
                <span className='text-white text-xs font-bold'>!</span>
              </div>
            </div>

            <div className='space-y-2'>
              <h2 className='text-2xl font-bold bg-gradient-to-r from-portal-green via-rick-yellow to-rick-red bg-clip-text text-transparent'>
                Portal Malfunction!
              </h2>
              <p className='text-default-500 text-sm'>
                The atlas connection is unstable. The portal index needs
                recalibration.
              </p>
            </div>
          </div>

          {process.env.NODE_ENV === 'development' && error && (
            <Card className='w-full'>
              <CardBody className='p-4'>
                <details className='text-left'>
                  <summary className='cursor-pointer text-xs text-default-400 font-medium mb-2'>
                    Error Details (Development Only)
                  </summary>
                  <div className='bg-danger-50 dark:bg-danger-900/20 p-3 rounded-lg'>
                    <pre className='text-xs text-danger overflow-auto whitespace-pre-wrap'>
                      {error.message}
                    </pre>
                    {error.stack && (
                      <details className='mt-2'>
                        <summary className='cursor-pointer text-xs text-danger-600'>
                          Stack Trace
                        </summary>
                        <pre className='text-xs text-danger-600 overflow-auto whitespace-pre-wrap mt-1'>
                          {error.stack}
                        </pre>
                      </details>
                    )}
                  </div>
                </details>
              </CardBody>
            </Card>
          )}

          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Button
              className='font-medium'
              color='primary'
              startContent={<ArrowPathIcon className='h-4 w-4' />}
              variant='flat'
              onPress={resetError}
            >
              Recalibrate Index
            </Button>
            <Button
              className='font-medium'
              color='default'
              variant='light'
              onPress={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </div>

          <div className='text-xs text-default-400'>
            If the problem persists, Citadel operators may need to investigate.
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export function CharacterTableErrorFallback({
  error,
  resetError,
}: {
  error?: Error;
  resetError: () => void;
}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[400px] p-6'>
      <Card className='max-w-lg w-full'>
        <CardBody className='text-center space-y-6 p-8'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='relative'>
              <ExclamationTriangleIcon className='h-20 w-20 text-danger' />
              <div className='absolute -top-2 -right-2 h-8 w-8 bg-danger rounded-full flex items-center justify-center'>
                <span className='text-white text-sm font-bold'>!</span>
              </div>
            </div>

            <div className='space-y-2'>
              <h2 className='text-3xl font-bold bg-gradient-to-r from-portal-green via-rick-yellow to-rick-red bg-clip-text text-transparent'>
                Character Database Error
              </h2>
              <p className='text-default-500'>
                The Citadel character atlas is experiencing interdimensional
                interference.
              </p>
            </div>
          </div>

          {process.env.NODE_ENV === 'development' && error && (
            <Card className='w-full'>
              <CardBody className='p-4'>
                <details className='text-left'>
                  <summary className='cursor-pointer text-xs text-default-400 font-medium mb-2'>
                    Technical Details
                  </summary>
                  <div className='bg-danger-50 dark:bg-danger-900/20 p-3 rounded-lg'>
                    <pre className='text-xs text-danger overflow-auto whitespace-pre-wrap'>
                      {error.message}
                    </pre>
                  </div>
                </details>
              </CardBody>
            </Card>
          )}

          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Button
              className='font-medium'
              color='primary'
              startContent={<ArrowPathIcon className='h-4 w-4' />}
              variant='flat'
              onPress={resetError}
            >
              Retry Connection
            </Button>
            <Button
              className='font-medium'
              color='default'
              variant='light'
              onPress={() => window.location.reload()}
            >
              Reload Atlas
            </Button>
          </div>

          <div className='text-xs text-default-400 space-y-1'>
            <p>This might be caused by:</p>
            <ul className='text-left space-y-1'>
              <li>• Interdimensional portal interference</li>
              <li>• Citadel index maintenance</li>
              <li>• Atlas synchronization drift</li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default ErrorBoundary;
