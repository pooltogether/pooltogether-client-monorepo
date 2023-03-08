import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAtom } from 'jotai'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { SettingsModal } from 'pt-components'
import { useIsSettingsModalOpen } from 'pt-generic-hooks'
import { defaultFooterItems, Footer, Navbar } from 'pt-ui'
import { settingsModalViewAtom } from '@atoms'

interface LayoutProps {
  children: ReactNode
}

export const Layout = (props: LayoutProps) => {
  const router = useRouter()

  const { setIsSettingsModalOpen } = useIsSettingsModalOpen()
  const [settingsModalView, setSettingsModalView] = useAtom(settingsModalViewAtom)

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

      <SettingsModal
        view={settingsModalView}
        setView={setSettingsModalView}
        disableLanguages={true}
      />

      {props.children}

      <Footer
        items={[
          ...defaultFooterItems,
          {
            title: 'Settings',
            content: [
              {
                text: 'Change Currency',
                onClick: () => {
                  setSettingsModalView('currency')
                  setIsSettingsModalOpen(true)
                }
              },
              {
                text: 'Change Language',
                onClick: () => {
                  setSettingsModalView('language')
                  setIsSettingsModalOpen(true)
                },
                disabled: true
              },
              { text: 'Enable Testnets', disabled: true }
            ]
          }
        ]}
      />
    </div>
  )
}
