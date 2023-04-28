import { BigNumber } from 'ethers'
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains'
import { NETWORK } from 'pt-utilities'
import defaultVaultList from '../vaultLists/default'

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
    address: '0x3de3ddb0B06701a586a704E9e808a77a89f9bA14',
    prizeTokenAddress: '0x77C4F17Acf61C3B5983a3Fb8BaCBDE899998CC0B',
    drawPeriodInSeconds: 7_200,
    tierShares: BigNumber.from('100000000000000000000')
  }
})

/**
 * Default Vault Lists
 */
export const DEFAULT_VAULT_LISTS = Object.freeze({
  default: defaultVaultList
})
