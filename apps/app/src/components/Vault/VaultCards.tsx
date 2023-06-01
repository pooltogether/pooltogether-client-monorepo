import classNames from 'classnames'
import { Vault } from 'pt-client-js'
import { useSortedVaults } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { useSupportedPrizePools } from '@hooks/useSupportedPrizePools'
import { VaultCard } from './VaultCard'

interface VaultsCardsProps {
  chainId: number
  vaults: Vault[]
  className?: string
}

export const VaultCards = (props: VaultsCardsProps) => {
  const { chainId, vaults, className } = props

  const prizePools = useSupportedPrizePools()
  const prizePool = Object.values(prizePools).find((prizePool) => prizePool.chainId === chainId)

  const { sortedVaults, isFetched } = useSortedVaults(vaults, { prizePool })

  if (!isFetched) {
    return <Spinner className={className} />
  }

  return (
    <div className={classNames('w-full max-w-[36rem] flex flex-col gap-4', className)}>
      {sortedVaults.map((vault) => (
        <VaultCard key={vault.id} vault={vault} />
      ))}
    </div>
  )
}
