import { Vault } from '@pooltogether/hyperstructure-client-js'
import { useVaultPrizePower } from '@pooltogether/hyperstructure-react-hooks'
import { Spinner } from 'ui'
import { formatNumberForDisplay } from 'utilities'
import { useSupportedPrizePools } from '@hooks/useSupportedPrizePools'

interface VaultPrizePowerProps {
  vault: Vault
}

export const VaultPrizePower = (props: VaultPrizePowerProps) => {
  const { vault } = props

  const prizePools = useSupportedPrizePools()

  const prizePool =
    !!vault && Object.values(prizePools).find((prizePool) => prizePool.chainId === vault.chainId)

  const { data: prizePower, isFetched: isFetchedPrizePower } = useVaultPrizePower(vault, prizePool)

  if (!isFetchedPrizePower) {
    return <Spinner />
  }

  return (
    <>
      {formatNumberForDisplay(prizePower * 100, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
    </>
  )
}
