import Head from 'next/head'
import { NavBar } from 'pt-ui'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Head>
        <title>PoolTogether Hyperstructure App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <NavBar
        children={
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
      <div className='flex flex-col items-center justify-center py-2'>
        <main className='mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8'>
          <h1 className='mx-auto max-w-5xl text-center text-6xl font-extrabold leading-[1.1] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-8xl'>
            <span className='inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
              PoolTogether Hyperstructure
            </span>
            App <br className='hidden lg:block' />
          </h1>
        </main>
      </div>
    </div>
  )
}
