import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import {
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  trustWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/dist/wallets/walletConnectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/dist/providers/jsonRpc'
import { publicProvider } from 'wagmi/dist/providers/public'
import { Flowbite } from 'pt-ui'
import { RPC_URLS, WAGMI_CHAINS } from '@constants'
import { ptRainbowTheme } from '../themes'

// App Name:
const appName = 'PoolTogether'

// Supported Networks:
const supportedNetworks = Object.values(WAGMI_CHAINS)

// Wagmi Config:
const { chains, provider } = configureChains(supportedNetworks, [
  jsonRpcProvider({ priority: 0, rpc: (chain) => ({ http: RPC_URLS[chain.id] }) }),
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
const wagmiClient = createClient({ autoConnect: true, connectors, provider })

// React Query Client:
const queryClient = new QueryClient()

// TODO: ideally this container is sent to the components package, and app-specific info is passed to it
export interface AppContainerProps extends AppProps {}

export const AppContainer = (props: AppContainerProps) => {
  const { Component, pageProps } = props

  return (
    <Flowbite
      theme={{
        dark: true,
        // TODO: remove this theme once button themes are fixed
        theme: {
          button: {
            base: 'group flex h-min items-center justify-center p-0.5 text-center font-medium focus:ring-4 focus:z-10',
            color: {
              teal: 'text-pt-purple-800 bg-pt-teal hover:bg-pt-teal-dark focus:ring-pt-teal-dark',
              purple:
                'text-pt-purple-700 bg-pt-purple-100 hover:bg-pt-purple-200 focus:ring-pt-purple-50',
              white: 'text-gray-900 bg-white hover:bg-gray-100 focus:ring-gray-100'
            },
            outline: {
              color: {
                teal: '!text-pt-teal border-pt-teal border bg-opacity-0 hover:!text-pt-purple-800 hover:bg-opacity-100',
                purple:
                  '!text-pt-purple-100 border-pt-purple-100 border bg-opacity-0 hover:!bg-pt-transparent hover:bg-opacity-100',
                white:
                  '!text-white border-white border bg-opacity-0 hover:!text-gray-900 hover:bg-opacity-100'
              },
              on: 'flex justify-center'
            },
            disabled: 'cursor-not-allowed opacity-50 pointer-events-none'
          }
        }
      }}
    >
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={supportedNetworks}
          theme={ptRainbowTheme()}
          showRecentTransactions={true}
          coolMode={true}
          appInfo={{ appName }}
        >
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </Flowbite>
  )
}
