import { VaultList } from 'pt-types'

const defaultVaultList: VaultList = {
  name: 'PoolTogether Vault List',
  keywords: ['pooltogether', 'aave'],
  version: {
    major: 0,
    minor: 1,
    patch: 0
  },
  timestamp: '2023-02-16T18:36:18.517Z',
  tokens: [
    {
      chainId: 1,
      address: '',
      name: 'Aave USDC Vault',
      decimals: 18,
      symbol: 'ptaUSDC',
      logoURI: '',
      extensions: {
        yieldSource: 'Aave',
        underlyingAsset: {
          chainId: 1,
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          symbol: 'USDC',
          name: 'USD Coin',
          decimals: '6',
          logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png'
        }
      }
    },
    {
      chainId: 10,
      address: '',
      name: 'Aave WETH Vault',
      decimals: 18,
      symbol: 'ptaWETH',
      logoURI: '',
      extensions: {
        yieldSource: 'Aave',
        underlyingAsset: {
          chainId: 10,
          address: '0x4200000000000000000000000000000000000006',
          symbol: 'WETH',
          name: 'Wrapped Ether',
          decimals: '18',
          logoURI: 'https://optimistic.etherscan.io/token/images/weth_28.png'
        }
      }
    }
  ]
}

export default defaultVaultList
