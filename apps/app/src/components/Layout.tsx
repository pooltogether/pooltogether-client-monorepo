import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useSetAtom } from 'jotai'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { defaultFooterItems, Footer, Navbar } from 'pt-ui'
import { isSettingsModalOpenAtom, settingsModalViewAtom } from '@atoms'
import { SettingsModal } from './Settings/SettingsModal'

interface LayoutProps {
  children: ReactNode
}

export const Layout = (props: LayoutProps) => {
  const router = useRouter()

  const setIsSettingsModalOpen = useSetAtom(isSettingsModalOpenAtom)
  const setSettingsModalView = useSetAtom(settingsModalViewAtom)

  return (
    <div className='flex flex-col min-h-screen'>
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
        onClickSettings={() => setIsSettingsModalOpen(true)}
      />

      <SettingsModal />

      {props.children}

      <Footer
        items={[
          ...defaultFooterItems,
          {
            title: 'Settings',
            content: [
              {
                type: 'text',
                text: 'Change Currency',
                onClick: () => {
                  setSettingsModalView('currency')
                  setIsSettingsModalOpen(true)
                }
              },
              {
                type: 'text',
                text: 'Change Language',
                onClick: () => {
                  setSettingsModalView('language')
                  setIsSettingsModalOpen(true)
                }
              },
              { type: 'text', text: 'Enable Testnets' }
            ]
          }
        ]}
      />
    </div>
  )
}
