import { useMemo } from 'react'
import { useSelectedVault } from 'pt-hyperstructure-hooks'
import { useNetworks } from '@hooks/useNetworks'

export const PrizePoolWinners = () => {
  const networks = useNetworks()

  const { vault } = useSelectedVault()

  const selectedNetwork = useMemo(() => vault?.chainId ?? networks[0], [vault])

  // TODO: logic to expand currently displayed list
  const onClickShowMore = () => {}

  return (
    <div className='flex flex-col w-[36rem] gap-4 items-center px-11 py-8 bg-pt-transparent rounded-lg'>
      <span className='text-xl font-semibold'>Recent Prize Pool Winners</span>
      {/* TODO: list of winners per draw */}
      <ul>=== UNDER CONSTRUCTION ===</ul>
      <span className='font-semibold text-pt-purple-200 cursor-pointer' onClick={onClickShowMore}>
        Show More
      </span>
    </div>
  )
}
