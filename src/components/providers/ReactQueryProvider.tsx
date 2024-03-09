'use client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

export default function ReactQueryProvider({ children }:{children:ReactNode}) {
  const [queryClient] = React.useState(() => new QueryClient({}))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}