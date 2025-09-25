import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { MobileOnlyLayout } from '@/components/layout/mobile-only-layout'
import { Spinner } from '@/components/ui/spinner'
import { queryConfig } from '@/lib/react-query'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  )

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={() => <div>Root Error Fallback</div>}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {/* {import.meta.env.DEV && <ReactQueryDevtools />} */}
            <Toaster
              position="bottom-center"
              expand
              toastOptions={{
                style: {
                  borderRadius: '12px',
                  background: 'rgba(58, 64, 71, 0.85)',
                  backdropFilter: 'blur(2px)',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 500,
                },
              }}
            />
            <MobileOnlyLayout>{children}</MobileOnlyLayout>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}
