import { useFathom } from 'generic-react-hooks'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Flowbite } from 'ui'

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

  return (
    <Flowbite theme={{ dark: true }}>
      <div id='modal-root' />
      <Component {...pageProps} />
    </Flowbite>
  )
}
