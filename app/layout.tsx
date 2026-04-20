import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import clsx from 'clsx';

import { Providers } from './providers';

import { ErrorBoundary } from '@/components/organisms/ErrorBoundary';
import { SkipToMainContent } from '@/components/organisms/AccessibilityEnhancements';
import { ThemeSwitcher } from '@/components/atoms/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Rick and Morty',
    'Rick and Morty API',
    'Citadel Character Atlas',
    'Next.js',
    'GraphQL',
    'Apollo Client',
    'Hero UI',
    'Tailwind CSS',
  ],
  applicationName: siteConfig.name,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          'min-h-screen text-foreground bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
            <ErrorBoundary>
              <SkipToMainContent />
              <div className='relative flex flex-col h-screen bg-background overflow-hidden'>
                <header className='sticky top-0 z-30 backdrop-blur-sm bg-background/80 border-b border-default-200'>
                  <div className='mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <h1 className='text-large font-semibold tracking-tight'>
                        Citadel Character Atlas
                      </h1>
                    </div>
                    <div className='flex items-center gap-3'>
                      <ThemeSwitcher />
                    </div>
                  </div>
                </header>
                <main
                  className='flex-1 overflow-auto'
                  id='main-content'
                  tabIndex={-1}
                >
                  <div className='mx-auto max-w-6xl px-4 sm:px-6 py-8 h-full'>
                    {children}
                  </div>
                </main>
              </div>
              <footer className='border-t border-default-200 flex-shrink-0'>
                <div className='mx-auto max-w-6xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
                  <p className='text-tiny text-foreground-500 text-center sm:text-left'>
                    Browse the Citadel character atlas across dimensions • Built
                    with Next.js & GraphQL
                  </p>
                  <div className='flex items-center'>
                    <LanguageSwitcher />
                  </div>
                </div>
              </footer>
            </ErrorBoundary>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
