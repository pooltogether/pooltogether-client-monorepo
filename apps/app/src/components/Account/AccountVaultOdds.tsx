import { useAccount } from 'wagmi'
import { Vault } from 'pt-client-js'
import { usePrizeOdds, useUserVaultShareBalance } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatNumberForDisplay } from 'pt-utilities'
import { useSupportedPrizePools } from '@hooks/useSupportedPrizePools'

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

  const prizePools = useSupportedPrizePools()
  const prizePool = Object.values(prizePools).find(
    (prizePool) => prizePool.chainId === vault.chainId
  )

  const { data: prizeOdds, isFetched: isFetchedPrizeOdds } = usePrizeOdds(
    prizePool,
    vault,
    shareBalance?.amount ?? 0n
  )

  if (!userAddress || shareBalance?.amount === 0n) {
    return <>-</>
  }

  if (!isFetchedShareBalance || !isFetchedPrizeOdds) {
    return <Spinner />
  }

  return <>1 in {formatNumberForDisplay(prizeOdds.oneInX, { maximumSignificantDigits: 3 })}</>
}
