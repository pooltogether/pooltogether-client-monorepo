import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useFathom } from 'pt-generic-hooks'
import { Flowbite } from 'pt-ui'

// React Query Client:
const queryClient = new QueryClient()

// TODO: find a way to abstract out this typing and move this component to the `pt-components` package
export const AppContainer = (props: AppProps) => {
  const { Component, pageProps } = props

  const router = useRouter()

  // Initialize Fathom Analytics
  useFathom(
    process.env.NEXT_PUBLIC_FATHOM_SITE_ID,
    ['https://mvp-pt-app.netlify.app/'],
    router.events?.on,
    router.events?.off
  )

  return (
    <Flowbite
      theme={{
        dark: true,
        // TODO: remove this theme once button themes are fixed
        theme: {
          button: {
            base: 'group flex h-min items-center justify-center p-0.5 text-center font-medium focus:ring-4 focus:z-10',
            color: {
              teal: 'text-pt-purple-800 bg-pt-teal hover:bg-pt-teal-dark focus:ring-pt-teal-dark',
              purple:
                'text-pt-purple-700 bg-pt-purple-100 hover:bg-pt-purple-200 focus:ring-pt-purple-50',
              white: 'text-gray-900 bg-white hover:bg-gray-100 focus:ring-gray-100',
              transparent:
                'text-pt-purple-100 bg-pt-transparent border border-pt-transparent hover:bg-pt-purple-50/20 focus:ring-pt-purple-50'
            },
            outline: {
              color: {
                teal: '!text-pt-teal border-pt-teal border bg-opacity-0 hover:!text-pt-purple-800 hover:bg-opacity-100',
                purple:
                  '!text-pt-purple-100 border-pt-purple-100 border bg-opacity-0 hover:!bg-pt-transparent hover:bg-opacity-100',
                white:
                  '!text-white border-white border bg-opacity-0 hover:!text-gray-900 hover:bg-opacity-100',
                transparent:
                  '!text-pt-purple-50 border-pt-transparent border bg-opacity-0 hover:!text-pt-purple-100 hover:bg-opacity-100'
              },
              on: 'flex justify-center'
            },
            disabled: 'cursor-not-allowed opacity-50 pointer-events-none'
          }
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <div id='modal-root' />
        <Component {...pageProps} />
      </QueryClientProvider>
    </Flowbite>
  )
}
