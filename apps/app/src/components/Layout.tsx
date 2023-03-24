import {
  ConnectButton,
  useAddRecentTransaction,
  useChainModal,
  useConnectModal
} from '@rainbow-me/rainbowkit'
import classNames from 'classnames'
import { useAtom, useAtomValue } from 'jotai'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { DepositModal, SettingsModal, WithdrawModal } from 'pt-components'
import { useIsSettingsModalOpen, useIsTestnets } from 'pt-generic-hooks'
import { useSelectedVaults } from 'pt-hyperstructure-hooks'
import { defaultFooterItems, Footer, FooterItem, Navbar } from 'pt-ui'
import { selectedVaultIdAtom, settingsModalViewAtom } from '@atoms'

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

  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()
  const addRecentTransaction = useAddRecentTransaction()

  const vaults = useSelectedVaults()
  const selectedVaultId = useAtomValue(selectedVaultIdAtom)
  const selectedVault = vaults.vaults[selectedVaultId]

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
        links={[
          { href: '/prizes', name: 'Prizes' },
          { href: '/deposit', name: 'Deposit' },
          { href: '/account', name: 'Account' },
          { href: '/extensions', name: 'Extensions' }
        ]}
        activePage={router.pathname}
        linksAs={Link}
        walletConnectionButton={
          <ConnectButton
            showBalance={false}
            chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }}
            accountStatus='full'
          />
        }
        onClickSettings={() => setIsSettingsModalOpen(true)}
      />

      <SettingsModal
        view={settingsModalView}
        setView={setSettingsModalView}
        disable={['language']}
      />

      <DepositModal
        vault={selectedVault}
        openConnectModal={openConnectModal}
        openChainModal={openChainModal}
        addRecentTransaction={addRecentTransaction}
      />

      <WithdrawModal
        vault={selectedVault}
        openConnectModal={openConnectModal}
        openChainModal={openChainModal}
        addRecentTransaction={addRecentTransaction}
      />

      <main
        className={classNames(
          'w-full flex flex-col flex-grow items-center mx-auto max-w-screen-xl p-8 mb-40',
          className
        )}
      >
        {isBrowser && router.isReady && <>{children}</>}
      </main>

      <Footer items={[...defaultFooterItems, ...extraFooterContent]} />
    </div>
  )
}
