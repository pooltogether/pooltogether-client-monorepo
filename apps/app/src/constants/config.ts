import { BigNumber } from 'ethers'
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains'
import { NETWORK } from 'pt-utilities'

/**
 * Supported networks
 */
export const SUPPORTED_NETWORKS = Object.freeze({
  mainnets: [NETWORK.mainnet, NETWORK.polygon, NETWORK.optimism, NETWORK.arbitrum],
  testnets: [NETWORK.goerli]
})

/**
 * Wagmi networks
 */
export const WAGMI_CHAINS = Object.freeze({
  [NETWORK.mainnet]: mainnet,
  [NETWORK.polygon]: polygon,
  [NETWORK.optimism]: optimism,
  [NETWORK.arbitrum]: arbitrum,
  [NETWORK.goerli]: goerli
})

/**
 * RPCs
 */
export const RPC_URLS = {
  [NETWORK.mainnet]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
  [NETWORK.polygon]: process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
  [NETWORK.optimism]: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL,
  [NETWORK.arbitrum]: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
  [NETWORK.goerli]: process.env.NEXT_PUBLIC_GOERLI_RPC_URL
}

/**
 * Prize Pools
 */
export const PRIZE_POOLS = Object.freeze({
  [NETWORK.goerli]: {
    address: '0x13231cAe073c27F9274c15c883c51E257F5B10a2',
    prizeTokenAddress: '0xc26EF73D0cdF27D5F184DF3e05ac6e2f490ccEDf',
    drawPeriodInSeconds: 7_200,
    tierShares: BigNumber.from('100000000000000000000')
  }
})
