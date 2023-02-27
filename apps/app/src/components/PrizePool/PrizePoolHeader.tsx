import classNames from 'classnames'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NETWORK_ICONS } from '@constants/networks'

interface PrizePoolHeaderProps {
  chainId: number
  className?: string
}

export const PrizePoolHeader = (props: PrizePoolHeaderProps) => {
  const networkName = getNiceNetworkNameByChainId(props.chainId)

  return (
    <div className={classNames('flex align-center gap-4 ml-6', props.className)}>
      <img
        src={NETWORK_ICONS[props.chainId].iconUrl}
        alt={`${networkName} Logo`}
        className='h-8 w-8 my-auto'
      />
      <span className='text-3xl font-semibold'>{networkName} Prize Pool</span>
      {/* TODO: "see prize details" functionality */}
      <span className='dark:text-pt-purple-400 cursor-pointer my-auto'>See Prize Details</span>
    </div>
  )
}
