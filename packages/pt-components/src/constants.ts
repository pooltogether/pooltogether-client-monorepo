import { NETWORK } from 'pt-utilities'

/**
 * Network icons
 */
export const NETWORK_ICONS = Object.freeze({
  [NETWORK.mainnet]: {
    iconBackground: '#484c50',
    iconUrl: '/icons/ethereum.svg'
  },
  [NETWORK.goerli]: {
    iconBackground: '#484c50',
    iconUrl: '/icons/ethereum.svg'
  },
  [NETWORK.polygon]: {
    iconBackground: '#9f71ec',
    iconUrl: '/icons/polygon.svg'
  },
  [NETWORK.mumbai]: {
    iconBackground: '#9f71ec',
    iconUrl: '/icons/polygon.svg'
  },
  [NETWORK.optimism]: {
    iconBackground: '#ff5a57',
    iconUrl: '/icons/optimism.svg'
  },
  [NETWORK['optimism-goerli']]: {
    iconBackground: '#ff5a57',
    iconUrl: '/icons/optimism.svg'
  },
  [NETWORK.arbitrum]: {
    iconBackground: '#96bedc',
    iconUrl: '/icons/arbitrum.svg'
  },
  [NETWORK['arbitrum-goerli']]: {
    iconBackground: '#96bedc',
    iconUrl: '/icons/arbitrum.svg'
  }
})
