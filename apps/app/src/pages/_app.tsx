import '../styles/globals.css'
import 'pt-ui/styles.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Flowbite } from 'pt-ui'
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import type { AppProps } from 'next/app'

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
)
const { connectors } = getDefaultWallets({
  appName: 'PoolTogether App',
  chains
})
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Flowbite theme={{ dark: true }}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </Flowbite>
  )
}
