import { ConnectButton } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { SettingsModal } from 'pt-components'
import { useIsSettingsModalOpen, useIsTestnets } from 'pt-generic-hooks'
import { defaultFooterItems, Footer, FooterItem, Navbar } from 'pt-ui'
import { settingsModalViewAtom } from '@atoms'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout = (props: LayoutProps) => {
  const { children, className } = props

  const router = useRouter()

  const { setIsSettingsModalOpen } = useIsSettingsModalOpen()
  const [settingsModalView, setSettingsModalView] = useAtom(settingsModalViewAtom)

  const { isTestnets, setIsTestnets } = useIsTestnets()

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  const extraFooterContent: FooterItem[] = [
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
        }
      ]
    }
  ]

  if (isBrowser) {
    extraFooterContent[0].content.push({
      text: `${isTestnets ? 'Disable' : 'Enable'} Testnets`,
      onClick: () => setIsTestnets(!isTestnets)
    })
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>PoolTogether Hyperstructure App</title>
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

      <main
        className={classNames(
          'flex flex-col flex-grow items-center mx-auto w-auto max-w-screen-xl p-8',
          className
        )}
      >
        {children}
      </main>

      <Footer items={[...defaultFooterItems, ...extraFooterContent]} />
    </div>
  )
}
