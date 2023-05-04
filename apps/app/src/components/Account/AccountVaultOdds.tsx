import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { usePrizeOdds, usePrizePool, useUserVaultShareBalance } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatNumberForDisplay } from 'pt-utilities'
import { formatPrizePools } from '../../utils'

interface AccountVaultOddsProps {
  vault: Vault
}

export const AccountVaultOdds = (props: AccountVaultOddsProps) => {
  const { vault } = props

  const { address: userAddress } = useAccount()

  const { data: shareBalance, isFetched: isFetchedShareBalance } = useUserVaultShareBalance(
    vault,
    userAddress
  )

  const formattedPrizePoolInfo = formatPrizePools()
  const foundPrizePoolInfo = formattedPrizePoolInfo.find(
    (prizePool) => prizePool.chainId === vault.chainId
  )
  const prizePool = usePrizePool(
    foundPrizePoolInfo.chainId,
    foundPrizePoolInfo.address,
    foundPrizePoolInfo.options
  )

  const { data: prizeOdds, isFetched: isFetchedPrizeOdds } = usePrizeOdds(
    prizePool,
    vault,
    shareBalance?.amount ?? '0'
  )

  if (!userAddress || shareBalance?.amount === '0') {
    return <>-</>
  }

  if (!isFetchedShareBalance || !isFetchedPrizeOdds) {
    return <Spinner />
  }

  return <>1 in {formatNumberForDisplay(prizeOdds.oneInX, { maximumSignificantDigits: 3 })}</>
}
