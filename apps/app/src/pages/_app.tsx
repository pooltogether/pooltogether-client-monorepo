import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'
import { AppContainer } from '@components/AppContainer'
import { RPC_URLS, SUPPORTED_NETWORKS } from '@constants/config'
import { ptRainbowTheme } from '@constants/theme'
import '../styles/globals.css'
import { createCustomWagmiClient } from '../utils'

// App Name:
const appName = 'PoolTogether'

// TODO: only send mainnet networks while on normal mode, only testnets on testnet mode, etc.
const networks = [...SUPPORTED_NETWORKS.mainnets, ...SUPPORTED_NETWORKS.testnets]

const wagmiClient = createCustomWagmiClient(appName, networks, RPC_URLS)

export default function MyApp(props: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={networks.map((id) => ({ id }))}
        theme={ptRainbowTheme()}
        showRecentTransactions={true}
        coolMode={true}
        appInfo={{ appName }}
      >
        <AppContainer {...props} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
