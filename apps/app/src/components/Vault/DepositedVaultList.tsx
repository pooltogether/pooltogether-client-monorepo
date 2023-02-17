import classNames from 'classnames'
import { BigNumber } from 'ethers'
import { useAllUserVaultBalances } from 'pt-hooks'
import { VaultInfoWithBalance } from 'pt-types'
import { formatUnformattedBigNumberForDisplay, getNiceNetworkNameByChainId } from 'pt-utilities'
import { useAccount } from 'wagmi'
import defaultVaultList from '../../data/defaultVaultList'

export interface DepositedVaultListProps {
  className?: string
}

// TODO: coingecko pricing of each token
// TODO: sort by balance by default
// TODO: add sorting when clicking headers
export const DepositedVaultList = (props: DepositedVaultListProps) => {
  const { address: userAddress } = useAccount()

  const { data: vaultBalances, isFetched: isFetchedVaultBalances } = useAllUserVaultBalances(
    userAddress,
    defaultVaultList
  )

  return (
    <div className={classNames(props.className)}>
      <DepositedVaultListHeaders />
      {isFetchedVaultBalances && (
        <div className='flex flex-col gap-4'>
          {Object.keys(vaultBalances).map((vaultId, i) => {
            const vaultInfo = vaultBalances[vaultId]
            return (
              <DepositedVaultListItem vaultInfo={vaultInfo} key={`vault-${i}-${vaultInfo.name}`} />
            )
          })}
        </div>
      )}
      {!isFetchedVaultBalances && <div>Loading...</div>}
    </div>
  )
}

const DepositedVaultListHeaders = () => {
  return <></>
}

interface DepositedVaultListItemProps {
  vaultInfo: VaultInfoWithBalance
}

const DepositedVaultListItem = (props: DepositedVaultListItemProps) => {
  const { vaultInfo } = props

  const formattedBalance = formatUnformattedBigNumberForDisplay(
    BigNumber.from(vaultInfo.balance),
    vaultInfo.decimals.toString()
  )

  return (
    <div className='flex gap-4'>
      <img src={vaultInfo.logoURI} alt={`${vaultInfo.name} Logo`} className='h-6 w-6' />
      <span>{vaultInfo.name}</span>
      <span>{vaultInfo.symbol}</span>
      <span>{getNiceNetworkNameByChainId(vaultInfo.chainId)}</span>
      <span>
        Balance: {formattedBalance} {vaultInfo.extensions.underlyingAsset.symbol}
      </span>
    </div>
  )
}
