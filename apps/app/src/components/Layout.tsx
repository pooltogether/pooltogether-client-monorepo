import {
  ConnectButton,
  useAddRecentTransaction,
  useChainModal,
  useConnectModal
} from '@rainbow-me/rainbowkit'
import classNames from 'classnames'
import { useAtomValue } from 'jotai'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import {
  DepositModal,
  DrawModal,
  SettingsModal,
  SettingsModalView,
  WithdrawModal
} from 'pt-components'
import { MODAL_KEYS, useIsModalOpen, useIsTestnets } from 'pt-generic-hooks'
import {
  useAllUserVaultBalances,
  useCachedVaultLists,
  usePrizeDrawWinners,
  useSelectedVaultListIds,
  useSelectedVaults
} from 'pt-hyperstructure-hooks'
import { defaultFooterItems, Footer, FooterItem, Navbar, Toaster } from 'pt-ui'
import { isNewerVersion } from 'pt-utilities'
import { DEFAULT_VAULT_LISTS } from '@constants/config'
import { useSelectedPrizePool } from '@hooks/useSelectedPrizePool'
import { useSupportedPrizePools } from '@hooks/useSupportedPrizePools'
import { drawIdAtom } from './Prizes/PrizePoolWinners'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout = (props: LayoutProps) => {
  const { children, className } = props

  const router = useRouter()

  const { setIsModalOpen: setIsSettingsModalOpen } = useIsModalOpen(MODAL_KEYS.settings)
  const [settingsModalView, setSettingsModalView] = useState<SettingsModalView>('menu')

  const { isTestnets, setIsTestnets } = useIsTestnets()

  const { openConnectModal } = useConnectModal()
  const { openChainModal } = useChainModal()
  const addRecentTransaction = useAddRecentTransaction()

  const { cachedVaultLists, cache } = useCachedVaultLists()
  const { select } = useSelectedVaultListIds()

  const { vaults } = useSelectedVaults()
  const { address: userAddress } = useAccount()
  const { refetch: refetchUserBalances } = useAllUserVaultBalances(vaults, userAddress)

  const { selectedPrizePool } = useSelectedPrizePool()
  const { data: draws } = usePrizeDrawWinners(selectedPrizePool)

  const selectedDrawId = useAtomValue(drawIdAtom)
  const selectedDraw = draws?.find((draw) => draw.id === selectedDrawId)

  useEffect(() => {
    Object.keys(DEFAULT_VAULT_LISTS).forEach((key) => {
      if (
        !cachedVaultLists[key] ||
        isNewerVersion(DEFAULT_VAULT_LISTS[key].version, cachedVaultLists[key].version)
      ) {
        cache(key, DEFAULT_VAULT_LISTS[key])
        select(key, 'local')
      }
    })
  }, [])

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  const prizePools = useSupportedPrizePools()
  const prizePoolsArray = Object.values(prizePools)

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
          { href: '/vaults', name: 'Vaults' },
          { href: '/account', name: 'Account' }
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
        localVaultLists={DEFAULT_VAULT_LISTS}
        disable={['language']}
      />

      <DepositModal
        prizePools={prizePoolsArray}
        openConnectModal={openConnectModal}
        openChainModal={openChainModal}
        addRecentTransaction={addRecentTransaction}
        onGoToAccount={() => router.push('/account')}
        refetchUserBalances={refetchUserBalances}
      />

      <WithdrawModal
        openConnectModal={openConnectModal}
        openChainModal={openChainModal}
        addRecentTransaction={addRecentTransaction}
        onGoToAccount={() => router.push('/account')}
        refetchUserBalances={refetchUserBalances}
      />

      <DrawModal draw={selectedDraw} prizePool={selectedPrizePool} />

      {/* NOTE: passing the `expand` flag while Sonner has a re-sizing toast bug - can be reverted once fixed */}
      <Toaster expand={true} />

      <main
        className={classNames(
          'w-full max-w-screen-xl relative flex flex-col flex-grow items-center mx-auto px-4 py-8 mb-40 md:px-8',
          className
        )}
      >
        {isBrowser && router.isReady && <>{children}</>}
      </main>

      <Footer items={[...defaultFooterItems, ...extraFooterContent]} />
    </div>
  )
}
