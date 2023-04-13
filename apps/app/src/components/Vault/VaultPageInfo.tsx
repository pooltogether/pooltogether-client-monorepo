import classNames from 'classnames'
import { ReactNode } from 'react'
import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { TokenValue } from 'pt-components'
import { useUserVaultBalance } from 'pt-hyperstructure-hooks'
import { ExternalLink, Spinner } from 'pt-ui'
import { getBlockExplorerUrl, shorten } from 'pt-utilities'
import { VaultPrizePower } from './VaultPrizePower'
import { VaultTotalDeposits } from './VaultTotalDeposits'

interface VaultPageInfoProps {
  vault: Vault
  className?: string
}

export const VaultPageInfo = (props: VaultPageInfoProps) => {
  const { vault, className } = props

  const { address: userAddress } = useAccount()

  const { data: vaultBalance } = useUserVaultBalance(vault, userAddress)
  const shareBalance = !!vaultBalance ? parseFloat(vaultBalance.amount) : 0

  const odds = 'X' // TODO: calculate odds

  return (
    <div className={classNames('flex flex-col w-full max-w-screen-md gap-2', className)}>
      {!!userAddress && (
        <VaultInfoRow
          name='My Balance'
          data={
            !!vault.tokenData && !!vaultBalance ? (
              <TokenValue token={{ ...vault.tokenData, amount: shareBalance.toString() }} />
            ) : (
              <Spinner />
            )
          }
        />
      )}
      {/* TODO: add tooltip */}
      {!!userAddress && <VaultInfoRow name='My Win Chance' data={`1 in ${odds}`} />}
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
      <span className='font-semibold'>{data}</span>
    </div>
  )
}

interface VaultInfoTokenProps {
  token: { chainId: number; address: string; symbol: string }
}

const VaultInfoToken = (props: VaultInfoTokenProps) => {
  const { token } = props

  return (
    <div>
      {token.symbol} |{' '}
      <ExternalLink
        href={getBlockExplorerUrl(token.chainId, token.address, 'token')}
        text={shorten(token.address, { short: true })}
        size='sm'
        className='font-normal text-pt-purple-200'
      />
    </div>
  )
}
