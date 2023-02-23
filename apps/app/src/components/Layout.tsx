import { ConnectButton } from '@rainbow-me/rainbowkit'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { Navbar } from 'pt-ui'

interface LayoutProps {
  children: ReactNode
}

export const Layout = (props: LayoutProps) => {
  const router = useRouter()

  return (
    <div className='min-h-screen'>
      <Head>
        <title>PoolTogether Hyperstructure App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar
        activePage={router.pathname}
        walletConnectionButton={
          <ConnectButton
            showBalance={false}
            chainStatus='icon'
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full'
            }}
          />
        }
      />

      {props.children}
    </div>
  )
}
