import classNames from 'classnames'
import { NetworkIcon } from 'pt-components'
import { getNiceNetworkNameByChainId } from 'pt-utilities'

interface PrizePoolHeaderProps {
  chainId: number
  className?: string
}

export const PrizePoolHeader = (props: PrizePoolHeaderProps) => {
  const networkName = getNiceNetworkNameByChainId(props.chainId)

  return (
    <div className={classNames('flex align-center gap-4 ml-6', props.className)}>
      <NetworkIcon chainId={props.chainId} className='h-8 w-8 my-auto' />
      <span className='text-3xl font-semibold'>{networkName} Prize Pool</span>
      {/* TODO: "see prize details" functionality */}
      <span className='dark:text-pt-purple-400 cursor-pointer my-auto'>See Prize Details</span>
    </div>
  )
}
