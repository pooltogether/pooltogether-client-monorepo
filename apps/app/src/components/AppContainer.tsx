import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFathom } from 'generic-react-hooks'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Flowbite } from 'ui'
import { useSentryUser } from '../hooks/useSentryUser'

// React Query Client:
const queryClient = new QueryClient()

export const AppContainer = (props: AppProps) => {
  const { Component, pageProps } = props

  const router = useRouter()

  // Fathom Analytics
  useFathom(
    process.env.NEXT_PUBLIC_FATHOM_SITE_ID,
    ['mvp-pt-app.netlify.app/'],
    router.events?.on,
    router.events?.off
  )

  // Sentry User Setup
  useSentryUser()

  return (
    <Flowbite theme={{ dark: true }}>
      <QueryClientProvider client={queryClient}>
        <div id='modal-root' />
        <Component {...pageProps} />
      </QueryClientProvider>
    </Flowbite>
  )
}
