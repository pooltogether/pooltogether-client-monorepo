import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import {
  arbitrum,
  arbitrumGoerli,
  goerli,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia
} from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { Flowbite } from 'pt-ui'
import '../styles/globals.css'

// Wagmi Config:
const { chains, provider } = configureChains(
  // TODO: need to only include proper chains depending on testnet mode or not
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    goerli,
    sepolia,
    polygonMumbai,
    optimismGoerli,
    arbitrumGoerli
  ],
  [
    infuraProvider({ apiKey: process.env.INFURA_ID }),
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
)
const { connectors } = getDefaultWallets({ appName: 'PoolTogether App', chains })
// const connectors = [
//   new InjectedConnector({ chains }),
//   new WalletConnectConnector({
//     chains,
//     options: {
//       version: '2',
//       qrcode: true,
//       projectId: '358b98f0af3cd936fe09dc21064de51d'
//     }
//   })
// ]
const wagmiClient = createClient({ autoConnect: true, connectors, provider })

// React Query Client:
const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
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
        <RainbowKitProvider chains={chains} theme={darkTheme()} showRecentTransactions={true}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </Flowbite>
  )
}
