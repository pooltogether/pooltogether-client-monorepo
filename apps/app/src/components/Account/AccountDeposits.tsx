import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useAllUserVaultBalances, useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Button } from 'pt-ui'
import { PrizePoolCards } from '@components/Prizes/PrizePoolCards'
import { AccountDepositsHeader } from './AccountDepositsHeader'
import { AccountDepositsOdds } from './AccountDepositsOdds'
import { AccountDepositsTable } from './AccountDepositsTable'

interface AccountDepositsProps {
  className?: string
}

export const AccountDeposits = (props: AccountDepositsProps) => {
  const { className } = props

  const { address: userAddress } = useAccount()

  const { vaults } = useSelectedVaults()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useAllUserVaultBalances(
    vaults,
    userAddress
  )

  const isEmpty =
    isFetchedVaultBalances && !!vaultBalances
      ? Object.keys(vaultBalances).every((vaultId) => vaultBalances[vaultId].amount === '0')
      : false

  if (typeof window !== 'undefined' && userAddress === undefined) {
    return (
      <div className='flex flex-col h-[80vh] w-full items-center justify-evenly'>
        <NoWalletCard />
        <PrizePoolCards />
      </div>
    )
  }

  if (isFetchedVaultBalances && !!vaultBalances) {
    return (
      <div className={className}>
        <AccountDepositsHeader />
        {isEmpty && <NoDepositsCard className='mt-4' />}
        {!isEmpty && <AccountDepositsTable rounded={true} className='mt-8' />}
        {!isEmpty && <AccountDepositsOdds className='mt-4' />}
      </div>
    )
  }
}

interface NoWalletCardProps {
  className?: string
}

const NoWalletCard = (props: NoWalletCardProps) => {
  const { className } = props

  const { openConnectModal } = useConnectModal()

  return (
    <div className={classNames('flex flex-col max-w-md gap-6 items-center', className)}>
      <span className='text-center text-4xl font-semibold'>
        Connect your wallet to view account status
      </span>
      <Button onClick={openConnectModal}>
        <div className='inline-flex gap-3 font-medium'>
          <span>Connect Wallet</span>
          <ArrowRightIcon className='h-5 w-5' />
        </div>
      </Button>
    </div>
  )
}

interface NoDepositsCardProps {
  className?: string
}

const NoDepositsCard = (props: NoDepositsCardProps) => {
  const { className } = props

  return (
    <div className={classNames('w-full p-4 bg-pt-bg-purple rounded-lg', className)}>
      <div className='inline-flex w-full gap-3 items-center justify-center p-3 text-lg font-medium bg-pt-transparent rounded-lg'>
        <span className='text-pt-purple-100'>You don't have any prize assets.</span>
        <Link href='/vaults' className='text-pt-teal'>
          Deposit now.
        </Link>
      </div>
    </div>
  )
}
