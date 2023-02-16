import { NETWORK } from 'pt-utilities'

/**
 * Supported networks
 */
export const SUPPORTED_NETWORKS = Object.freeze({
  mainnets: [NETWORK.mainnet, NETWORK.polygon, NETWORK.optimism, NETWORK.arbitrum],
  testnets: [NETWORK.goerli, NETWORK.mumbai, NETWORK['optimism-goerli'], NETWORK['arbitrum-goerli']]
})

/**
 * Network icons
 */
export const NETWORK_ICONS = Object.freeze({
  [NETWORK.mainnet]: {
    iconBackground: '#484c50',
    iconUrl: '/chainIcons/ethereum.svg'
  },
  [NETWORK.polygon]: {
    iconBackground: '#9f71ec',
    iconUrl: '/chainIcons/polygon.svg'
  },
  [NETWORK.optimism]: {
    iconBackground: '#ff5a57',
    iconUrl: '/chainIcons/optimism.svg'
  },
  [NETWORK.arbitrum]: {
    iconBackground: '#96bedc',
    iconUrl: '/chainIcons/arbitrum.svg'
  }
})
