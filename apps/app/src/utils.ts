import { connectorsForWallets, Wallet } from '@rainbow-me/rainbowkit'
import { Chain, Config, configureChains, Connector, createConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { NETWORK, parseQueryParam } from 'pt-utilities'
import { PRIZE_POOLS, RPC_URLS, WAGMI_CHAINS, WALLETS } from '@constants/config'

/**
 * Returns prize pools in a format compatible with the `usePrizePools()` hook
 * @returns
 */
export const formatPrizePools = () => {
  return Object.keys(PRIZE_POOLS).map((strChainId) => {
    const chainId = parseInt(strChainId)
    const info = PRIZE_POOLS[chainId]
    return {
      chainId,
      address: info.address,
      options: {
        prizeTokenAddress: info.prizeTokenAddress,
        drawPeriodInSeconds: info.drawPeriodInSeconds,
        tierShares: info.tierShares
      }
    }
  })
}

/**
 * Returns a Wagmi config with the given networks and RPCs
 * @param networks the networks to support throughout the app
 * @returns
 */
export const createCustomWagmiConfig = (networks: NETWORK[]): Config => {
  const supportedNetworks = Object.values(WAGMI_CHAINS).filter(
    (chain) => networks.includes(chain.id) && !!RPC_URLS[chain.id]
  )

  const { chains, publicClient } = configureChains(supportedNetworks, [
    jsonRpcProvider({ rpc: (chain) => ({ http: RPC_URLS[chain.id] }) }),
    publicProvider()
  ])

  const connectors = getWalletConnectors(chains)

  return createConfig({ autoConnect: true, connectors, publicClient })
}

/**
 * Returns a function to get wallet connectors for Wagmi & RainbowKit
 * @param chains array of `Chain` objects
 * @returns
 */
const getWalletConnectors = (chains: Chain[]): (() => Connector[]) => {
  const appName = 'PoolTogether'
  const projectId = '358b98f0af3cd936fe09dc21064de51d'

  const walletGroups: { groupName: string; wallets: Wallet[] }[] = []

  const defaultWallets = ['metamask', 'walletconnect', 'rainbow', 'injected', 'coinbase']
  const otherWallets = ['argent', 'ledger', 'taho', 'trust', 'zerion', 'brave', 'safe']

  const highlightedWallet = parseQueryParam('wallet', { validValues: Object.keys(WALLETS) })

  // NOTE: Don't highlight solely the injected wallet since it might be something sketchy.
  if (!!highlightedWallet && highlightedWallet !== 'injected') {
    walletGroups.push({
      groupName: 'Recommended',
      wallets: [WALLETS[highlightedWallet]({ appName, chains, projectId })]
    })
    walletGroups.push({
      groupName: 'Default',
      wallets: defaultWallets
        .filter((wallet) => wallet !== highlightedWallet)
        .map((wallet) => WALLETS[wallet]({ appName, chains, projectId }))
    })
    walletGroups.push({
      groupName: 'Other',
      wallets: otherWallets
        .filter((wallet) => wallet !== highlightedWallet)
        .map((wallet) => WALLETS[wallet]({ appName, chains, projectId }))
    })
  } else {
    walletGroups.push({
      groupName: 'Recommended',
      wallets: defaultWallets.map((wallet) => WALLETS[wallet]({ appName, chains, projectId }))
    })
    walletGroups.push({
      groupName: 'Other',
      wallets: otherWallets.map((wallet) => WALLETS[wallet]({ appName, chains, projectId }))
    })
  }

  return connectorsForWallets(walletGroups)
}
