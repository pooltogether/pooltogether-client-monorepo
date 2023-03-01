import { NETWORK } from 'pt-utilities'
import arbIcon from './icons/arbitrum.svg'
import ethIcon from './icons/ethereum.svg'
import opIcon from './icons/optimism.svg'
import polyIcon from './icons/polygon.svg'

/**
 * Network icons
 */
export const NETWORK_ICONS = Object.freeze({
  [NETWORK.mainnet]: { iconUrl: ethIcon, iconBackground: '#484c50' },
  [NETWORK.goerli]: { iconUrl: ethIcon, iconBackground: '#484c50' },
  [NETWORK.polygon]: { iconUrl: polyIcon, iconBackground: '#9f71ec' },
  [NETWORK.mumbai]: { iconUrl: polyIcon, iconBackground: '#9f71ec' },
  [NETWORK.optimism]: { iconUrl: opIcon, iconBackground: '#ff5a57' },
  [NETWORK['optimism-goerli']]: { iconUrl: opIcon, iconBackground: '#ff5a57' },
  [NETWORK.arbitrum]: { iconUrl: arbIcon, iconBackground: '#96bedc' },
  [NETWORK['arbitrum-goerli']]: { iconUrl: arbIcon, iconBackground: '#96bedc' }
})
