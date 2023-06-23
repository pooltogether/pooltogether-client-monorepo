import { useFathom } from '@shared/generic-react-hooks'
import { Flowbite } from '@shared/ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlProvider } from 'next-intl'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

// React Query Client:
const queryClient = new QueryClient()

export const AppContainer = (props: AppProps) => {
  const { Component, pageProps } = props

  const router = useRouter()

  // Fathom Analytics
  useFathom(
    process.env.NEXT_PUBLIC_FATHOM_SITE_ID as string,
    ['mvp-pt-landing-page.netlify.app/'],
    // @ts-ignore
    router.events?.on,
    router.events?.off
  )

  return (
    <Flowbite theme={{ dark: true }}>
      <QueryClientProvider client={queryClient}>
        <NextIntlProvider messages={pageProps.messages}>
          <div id='modal-root' />
          <Component {...pageProps} />
        </NextIntlProvider>
      </QueryClientProvider>
    </Flowbite>
  )
}
