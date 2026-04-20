import Link from 'next/link';
import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

import { ErrorBoundary } from '@/components/organisms/ErrorBoundary';

export default function NotFound() {
  return (
    <ErrorBoundary>
      <div className='flex items-center justify-center min-h-screen p-6 bg-background'>
        <Card className='max-w-2xl w-full'>
          <CardBody className='text-center space-y-8 p-12'>
            {/* Error Icon */}
            <div className='flex flex-col items-center space-y-6'>
              <div className='relative'>
                <ExclamationTriangleIcon className='h-24 w-24 text-danger' />
                <div className='absolute -top-3 -right-3 h-10 w-10 bg-danger rounded-full flex items-center justify-center'>
                  <span className='text-white text-lg font-bold'>404</span>
                </div>
              </div>

              <div className='space-y-3'>
                <h1 className='text-4xl font-bold bg-gradient-to-r from-portal-green via-rick-yellow to-rick-red bg-clip-text text-transparent'>
                  Dimension Not Found
                </h1>
                <p className='text-default-500 text-lg'>
                  This dimension doesn&apos;t exist in the atlas. The portal
                  route may have closed.
                </p>
              </div>
            </div>

            {/* Citadel themed explanation */}
            <Card className='bg-default-50 dark:bg-default-100/50'>
              <CardBody className='p-6'>
                <div className='space-y-4 text-left'>
                  <h3 className='text-lg font-semibold text-center'>
                    What happened?
                  </h3>
                  <div className='space-y-2 text-sm text-default-600'>
                    <p>
                      • The page you&apos;re looking for has been moved to
                      another dimension
                    </p>
                    <p>• The Citadel index may have archived it</p>
                    <p>• Atlas operators could be performing maintenance</p>
                    <p>• The portal route might be temporarily unavailable</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Action buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                as={Link}
                className='font-medium'
                color='primary'
                href='/'
                startContent={<HomeIcon className='h-4 w-4' />}
                variant='flat'
              >
                Return to Atlas
              </Button>
              <Button
                as={Link}
                className='font-medium'
                color='default'
                href='/'
                startContent={<MagnifyingGlassIcon className='h-4 w-4' />}
                variant='light'
              >
                Search Characters
              </Button>
            </div>

            {/* Fun facts */}
            <Card className='bg-gradient-to-r from-portal-green/10 via-rick-yellow/10 to-rick-red/10 border border-default-200'>
              <CardBody className='p-4'>
                <div className='text-center space-y-2'>
                  <h4 className='text-sm font-semibold text-default-700'>
                    Fun Fact
                  </h4>
                  <p className='text-xs text-default-500'>
                    The atlas tracks many dimensions, but this page isn&apos;t
                    indexed in any of them! 🚀
                  </p>
                </div>
              </CardBody>
            </Card>

            {/* Footer note */}
            <div className='text-xs text-default-400 space-y-1'>
              <p>Error Code: 404 - Dimension Not Found</p>
              <p>If you believe this is an error, contact Citadel operators</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ErrorBoundary>
  );
}
