import { useFathom } from '@shared/generic-react-hooks'
import { CaptchaModal } from '@shared/react-components'
import { Flowbite } from '@shared/ui'
import { getDiscordInvite } from '@shared/utilities'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextIntlProvider, useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { Footer } from '@components/Layout/Footer'
import { Head } from '@components/Layout/Head'
import { Navbar } from '@components/Layout/Navbar'

// React Query Client:
const queryClient = new QueryClient()

interface RootLayoutProps {
  children: ReactNode
}

// TODO: client-side providers will not work here
export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  const router = useRouter()

  const t = useTranslations('Common')

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
          <html className='bg-pt-bg-purple-darker text-gray-100 overflow-x-hidden dark'>
            <Head />
            <body>
              <div className='flex flex-col min-h-screen'>
                <Navbar />
                <CaptchaModal
                  hCaptchaSiteKey='11cdabde-af7e-42cb-ba97-76e35b7f7c39'
                  header={t('joinDiscord')}
                  onVerify={getDiscordInvite}
                />
                {children}
                <Footer />
              </div>
            </body>
          </html>
        </NextIntlProvider>
      </QueryClientProvider>
    </Flowbite>
  )
}
