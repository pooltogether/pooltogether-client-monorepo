import { useFathom } from '@shared/generic-react-hooks'
import { Flowbite } from '@shared/ui'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

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
      <div id='modal-root' />
      <Component {...pageProps} />
    </Flowbite>
  )
}
