import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAtom } from 'jotai'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { SettingsModal } from 'pt-components'
import { defaultFooterItems, Footer, Navbar } from 'pt-ui'
import {
  isSettingsModalOpenAtom,
  selectedCurrencyAtom,
  selectedLanguageAtom,
  settingsModalViewAtom
} from '@atoms'
import { CURRENCY_ID, SUPPORTED_CURRENCIES } from '@constants/currencies'
import { LANGUAGE_ID, SUPPORTED_LANGUAGES } from '@constants/languages'

interface LayoutProps {
  children: ReactNode
}

export const Layout = (props: LayoutProps) => {
  const router = useRouter()

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useAtom(isSettingsModalOpenAtom)
  const [settingsModalView, setSettingsModalView] = useAtom(settingsModalViewAtom)

  const [currencyId, setCurrencyId] = useAtom(selectedCurrencyAtom)
  const [languageId, setLanguageId] = useAtom(selectedLanguageAtom)

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
        isOpen={isSettingsModalOpen}
        setIsOpen={setIsSettingsModalOpen}
        view={settingsModalView}
        setView={setSettingsModalView}
        currencyId={currencyId}
        setCurrencyId={(id) => setCurrencyId(id as CURRENCY_ID)}
        languageId={languageId}
        setLanguageId={(id) => setLanguageId(id as LANGUAGE_ID)}
        currencies={SUPPORTED_CURRENCIES}
        languages={SUPPORTED_LANGUAGES}
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
