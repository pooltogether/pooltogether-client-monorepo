import classNames from 'classnames'
import { Vault } from 'pt-client-js'
import { usePrizePools } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { useSortedVaults } from '@hooks/useSortedVaults'
import { formatPrizePools } from '../../utils'
import { VaultCard } from './VaultCard'

interface VaultsCardsProps {
  chainId: number
  vaults: Vault[]
  className?: string
}

export const VaultCards = (props: VaultsCardsProps) => {
  const { chainId, vaults, className } = props

  const formattedPrizePoolInfo = formatPrizePools()
  const prizePools = usePrizePools(formattedPrizePoolInfo)
  const prizePool = Object.values(prizePools).find((prizePool) => prizePool.chainId === chainId)

  const { sortedVaults, isFetched } = useSortedVaults(vaults, { prizePool })

  if (!isFetched) {
    return <Spinner className={className} />
  }

  return (
    <div className={classNames('w-full max-w-[36rem] flex flex-col gap-4', className)}>
      {sortedVaults.map((vault) => (
        <VaultCard vault={vault} />
      ))}
    </div>
  )
}
