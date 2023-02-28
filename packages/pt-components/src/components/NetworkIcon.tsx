import classNames from 'classnames'
import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NETWORK_ICONS } from '../constants'
import { FallbackIcon } from './FallbackIcon'

export interface NetworkIconProps {
  chainId: number
  className?: string
}

export const NetworkIcon = (props: NetworkIconProps) => {
  const { chainId, className } = props

  const networkName = getNiceNetworkNameByChainId(chainId)

  if (chainId in NETWORK_ICONS) {
    return (
      <img
        src={NETWORK_ICONS[chainId as keyof typeof NETWORK_ICONS].iconUrl}
        alt={`${networkName} Logo`}
        className={classNames('h-6 w-6', className)}
      />
    )
  }

  return <FallbackIcon symbol={''} />
}
