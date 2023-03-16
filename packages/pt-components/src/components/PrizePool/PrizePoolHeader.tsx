import classNames from 'classnames'
import { ReactNode } from 'react'
import { getNiceNetworkNameByChainId, NETWORK } from 'pt-utilities'
import { NetworkIcon } from '../Icons/NetworkIcon'

export interface PrizePoolHeaderProps {
  chainId: NETWORK
  size?: 'small' | 'large'
  appendItem?: ReactNode
  className?: string
}

export const PrizePoolHeader = (props: PrizePoolHeaderProps) => {
  const { chainId, size, appendItem, className } = props

  const networkName = getNiceNetworkNameByChainId(chainId)

  return (
    <div
      className={classNames(
        'flex align-center',
        { 'gap-2': size === 'small' || size === undefined, 'gap-4': size === 'large' },
        className
      )}
    >
      <NetworkIcon chainId={chainId} className='h-8 w-8 my-auto' />
      <span
        className={classNames('font-semibold', {
          'text-2xl': size === 'small' || size === undefined,
          'text-3xl font-averta': size === 'large'
        })}
      >
        {networkName} Prize Pool
      </span>
      {appendItem}
    </div>
  )
}
