import classNames from 'classnames'
import { ReactNode } from 'react'
import { getNiceNetworkNameByChainId, NETWORK } from 'pt-utilities'
import { NetworkIcon } from '../Icons/NetworkIcon'

export interface PrizePoolHeaderProps {
  chainId: NETWORK
  appendItem?: ReactNode
  className?: string
  headerClassName?: string
}

export const PrizePoolHeader = (props: PrizePoolHeaderProps) => {
  const { chainId, appendItem, className, headerClassName } = props

  const networkName = getNiceNetworkNameByChainId(chainId)

  return (
    <div className={classNames('flex align-center gap-2', className)}>
      <NetworkIcon chainId={chainId} className='h-8 w-8 my-auto' />
      <span className={classNames('text-2xl font-semibold', headerClassName)}>
        {networkName} Prize Pool
      </span>
      {appendItem}
    </div>
  )
}
