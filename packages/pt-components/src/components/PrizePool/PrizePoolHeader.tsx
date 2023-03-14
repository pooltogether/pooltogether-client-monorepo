import classNames from 'classnames'
import { getNiceNetworkNameByChainId, NETWORK } from 'pt-utilities'
import { NetworkIcon } from '../Icons/NetworkIcon'

export interface PrizePoolHeaderProps {
  chainId: NETWORK
  size?: 'small' | 'large'
  showDetails?: boolean
  className?: string
}

export const PrizePoolHeader = (props: PrizePoolHeaderProps) => {
  const { chainId, size, showDetails, className } = props

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
      {showDetails && (
        <a href={`/prizes?network=${chainId}`} className='text-pt-purple-400 my-auto'>
          See Prize Details
        </a>
      )}
    </div>
  )
}
