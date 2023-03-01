import classNames from 'classnames'
import { NETWORK } from 'pt-utilities'
import { ArbitrumIcon } from '../icons/arbitrum'
import { EthereumIcon } from '../icons/ethereum'
import { OptimismIcon } from '../icons/optimism'
import { PolygonIcon } from '../icons/polygon'
import { FallbackIcon } from './FallbackIcon'

export interface NetworkIconProps {
  chainId: number
  className?: string
}

export const NetworkIcon = (props: NetworkIconProps) => {
  const { chainId, className } = props

  if (chainId in icons) {
    const SvgIcon = icons[chainId as keyof typeof icons].svgIcon
    return <SvgIcon className={classNames('h-6 w-6 rounded-full', className)} />
  }

  return <FallbackIcon symbol={''} />
}

const icons = Object.freeze({
  [NETWORK.mainnet]: { svgIcon: EthereumIcon, iconBgColor: '#484c50' },
  [NETWORK.goerli]: { svgIcon: EthereumIcon, iconBgColor: '#484c50' },
  [NETWORK.polygon]: { svgIcon: PolygonIcon, iconBgColor: '#9f71ec' },
  [NETWORK.mumbai]: { svgIcon: PolygonIcon, iconBgColor: '#9f71ec' },
  [NETWORK.optimism]: { svgIcon: OptimismIcon, iconBgColor: '#ff5a57' },
  [NETWORK['optimism-goerli']]: { svgIcon: OptimismIcon, iconBgColor: '#ff5a57' },
  [NETWORK.arbitrum]: { svgIcon: ArbitrumIcon, iconBgColor: '#96bedc' },
  [NETWORK['arbitrum-goerli']]: { svgIcon: ArbitrumIcon, iconBgColor: '#96bedc' }
})
