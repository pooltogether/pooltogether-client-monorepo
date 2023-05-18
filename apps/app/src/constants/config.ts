import { Wallet } from '@rainbow-me/rainbowkit'
import {
  argentWallet,
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  tahoWallet,
  trustWallet,
  walletConnectWallet,
  zerionWallet
} from '@rainbow-me/rainbowkit/wallets'
import { arbitrum, Chain, mainnet, optimism, polygon, polygonMumbai } from 'wagmi/chains'
import { NETWORK } from 'pt-utilities'
import defaultVaultList from '../vaultLists/default'

/**
 * Supported networks
 */
export const SUPPORTED_NETWORKS = Object.freeze({
  mainnets: [NETWORK.mainnet, NETWORK.polygon, NETWORK.optimism, NETWORK.arbitrum],
  testnets: [NETWORK.mumbai]
})

/**
 * Wagmi networks
 */
export const WAGMI_CHAINS = Object.freeze({
  [NETWORK.mainnet]: mainnet,
  [NETWORK.polygon]: polygon,
  [NETWORK.optimism]: optimism,
  [NETWORK.arbitrum]: arbitrum,
  [NETWORK.mumbai]: polygonMumbai
})

/**
 * RPCs
 */
export const RPC_URLS = {
  [NETWORK.mainnet]: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
  [NETWORK.polygon]: process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
  [NETWORK.optimism]: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL,
  [NETWORK.arbitrum]: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
  [NETWORK.goerli]: process.env.NEXT_PUBLIC_GOERLI_RPC_URL,
  [NETWORK.mumbai]: process.env.NEXT_PUBLIC_MUMBAI_RPC_URL
}

/**
 * Prize Pools
 */
export const PRIZE_POOLS = Object.freeze({
  [NETWORK.mumbai]: {
    address: '0xA32C8f94191c9295634f0034eb2b0e2749e77974',
    prizeTokenAddress: '0xC138A7C89C357d8FA5A9b7CE775e612b766153e7',
    drawPeriodInSeconds: 43_200,
    tierShares: 100
  }
})

/**
 * Default Vault Lists
 */
export const DEFAULT_VAULT_LISTS = Object.freeze({
  default: defaultVaultList
})

/**
 * Wallets
 */
export const WALLETS: {
  [wallet: string]: (data: { appName: string; chains: Chain[]; projectId: string }) => Wallet
} = Object.freeze({
  metamask: metaMaskWallet,
  walletconnect: walletConnectWallet,
  rainbow: rainbowWallet,
  injected: injectedWallet,
  argent: argentWallet,
  coinbase: coinbaseWallet,
  ledger: ledgerWallet,
  taho: tahoWallet,
  trust: trustWallet,
  zerion: zerionWallet,
  brave: braveWallet,
  safe: safeWallet
})
