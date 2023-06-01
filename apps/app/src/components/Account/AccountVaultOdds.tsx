import { Vault } from 'hyperstructure-client-js'
import { usePrizeOdds, useUserVaultShareBalance } from 'hyperstructure-react-hooks'
import { Spinner } from 'ui'
import { formatNumberForDisplay } from 'utilities'
import { useAccount } from 'wagmi'
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
