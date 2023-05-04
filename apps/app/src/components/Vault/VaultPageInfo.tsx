import classNames from 'classnames'
import { ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { TokenValue } from 'pt-components'
import { useUserVaultTokenBalance } from 'pt-hyperstructure-hooks'
import { ExternalLink, Spinner } from 'pt-ui'
import { getBlockExplorerUrl, shorten } from 'pt-utilities'
import { AccountVaultOdds } from '@components/Account/AccountVaultOdds'
import { VaultPrizePower } from './VaultPrizePower'
import { VaultTotalDeposits } from './VaultTotalDeposits'

interface VaultPageInfoProps {
  vault: Vault
  className?: string
}

export const VaultPageInfo = (props: VaultPageInfoProps) => {
  const { vault, className } = props

  const { address: userAddress } = useAccount()

  return (
    <div className={classNames('flex flex-col w-full max-w-screen-md gap-2', className)}>
      {!!userAddress && (
        <VaultInfoRow
          name='My Balance'
          data={<VaultInfoBalance vault={vault} userAddress={userAddress} />}
        />
      )}
      {/* TODO: add tooltip */}
      {!!userAddress && (
        <VaultInfoRow name='My Win Chance' data={<AccountVaultOdds vault={vault} />} />
      )}
      {/* TODO: add tooltip */}
      <VaultInfoRow name='Prize Power' data={<VaultPrizePower vault={vault} />} />
      <VaultInfoRow name='TVL' data={<VaultTotalDeposits vault={vault} />} />
      <VaultInfoRow
        name='Deposit Asset'
        data={!!vault.tokenData && <VaultInfoToken token={vault.tokenData} />}
      />
      <VaultInfoRow
        name='Prize Asset'
        data={!!vault.shareData && <VaultInfoToken token={vault.shareData} />}
      />
    </div>
  )
}

interface VaultInfoRowProps {
  name: ReactNode
  data: ReactNode
}

const VaultInfoRow = (props: VaultInfoRowProps) => {
  const { name, data } = props

  return (
    <div className='inline-flex w-full items-center justify-between'>
      <span className='text-pt-purple-100'>{name}</span>
      <span>{data}</span>
    </div>
  )
}

interface VaultInfoBalanceProps {
  vault: Vault
  userAddress: string
}

const VaultInfoBalance = (props: VaultInfoBalanceProps) => {
  const { vault, userAddress } = props

  const { data: tokenBalance } = useUserVaultTokenBalance(vault, userAddress)

  if (!tokenBalance) {
    return <Spinner />
  }

  return <TokenValue token={tokenBalance} />
}

interface VaultInfoTokenProps {
  token: { chainId: number; address: string; symbol: string }
}

const VaultInfoToken = (props: VaultInfoTokenProps) => {
  const { token } = props

  return (
    <span>
      {token.symbol} |{' '}
      <ExternalLink
        href={getBlockExplorerUrl(token.chainId, token.address, 'token')}
        text={shorten(token.address, { short: true })}
        size='sm'
        className='text-pt-purple-200'
      />
    </span>
  )
}
