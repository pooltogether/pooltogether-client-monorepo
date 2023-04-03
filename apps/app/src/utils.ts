import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  trustWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets'
import { BigNumber } from 'ethers'
import { Client, configureChains, createClient } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { NETWORK } from 'pt-utilities'
import { PRIZE_POOLS, WAGMI_CHAINS } from '@constants/config'

/**
 * Returns prize pools in a format compatible with the `usePrizePools()` hook
 * @returns
 */
export const formatPrizePools = () => {
  return Object.keys(PRIZE_POOLS).map((network) => {
    const info = PRIZE_POOLS[network] as {
      address: string
      prizeTokenAddress?: string
      drawPeriodInSeconds?: number
      tierShares?: BigNumber
    }
    return {
      chainId: parseInt(network),
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
 * Returns a Wagmi client with the given networks and RPCs
 * @param appName the app's name
 * @param networks the networks to support throughout the app
 * @param rpcs RPC URLs for each of the networks provided
 * @returns
 */
export const createCustomWagmiClient = (
  appName: string,
  networks: NETWORK[],
  rpcs: { [chainId: number]: string }
): Client => {
  const supportedNetworks = Object.values(WAGMI_CHAINS).filter(
    (chain) => networks.includes(chain.id) && !!rpcs[chain.id]
  )

  const { chains, provider } = configureChains(supportedNetworks, [
    jsonRpcProvider({ priority: 0, rpc: (chain) => ({ http: rpcs[chain.id] }) }),
    publicProvider({ priority: 1 })
  ])

  // TODO: update to new wallet connect connector (projectId: 358b98f0af3cd936fe09dc21064de51d)
  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        injectedWallet({ chains }),
        metaMaskWallet({ chains }),
        walletConnectWallet({ chains }),
        rainbowWallet({ chains }),
        coinbaseWallet({ appName, chains }),
        braveWallet({ chains }),
        safeWallet({ chains }),
        trustWallet({ chains })
      ]
    }
  ])

  return createClient({ autoConnect: true, connectors, provider })
}
