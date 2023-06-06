import { useFathom } from '@pooltogether/generic-react-hooks'
import { Flowbite } from '@pooltogether/ui'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

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
