import { VaultList } from 'pt-types'

const defaultVaultList: VaultList = {
  name: 'PoolTogether Testnet Vault List',
  keywords: ['pooltogether'],
  version: {
    major: 1,
    minor: 3,
    patch: 0
  },
  timestamp: '2023-04-27T18:32:59.450Z',
  tokens: [
    {
      chainId: 5,
      address: '0x88AF6D939dBf71f3BEEf90027eA3Cde5aC6c1451',
      name: 'DAI Low Yield Vault',
      decimals: 18,
      symbol: 'PTDAILYT',
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734',
      extensions: {
        underlyingAsset: {
          address: '0xEF8743fb2f5bEa4a6e6e821895D479042A9Bb5ca',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 5,
      address: '0xb9FA091346E7eeb3da7e207194e7EE70a89858e9',
      name: 'DAI High Yield Vault',
      decimals: 18,
      symbol: 'PTDAIHYT',
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734',
      extensions: {
        underlyingAsset: {
          address: '0xEF8743fb2f5bEa4a6e6e821895D479042A9Bb5ca',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 5,
      address: '0x0f91A5e5d59D2c8691FdA9c39285b42da5e7178C',
      name: 'USDC Low Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCLYT',
      logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
      extensions: {
        underlyingAsset: {
          address: '0x62a918876ad2135bdcD35149c9787311D4417912',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 5,
      address: '0x19577C83C51a583C9cE13AB5512E9ac336816c22',
      name: 'USDC High Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCHYT',
      logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
      extensions: {
        underlyingAsset: {
          address: '0x62a918876ad2135bdcD35149c9787311D4417912',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 5,
      address: '0xD3B8ED4Bf211437cf39D2f519a4363C248115750',
      name: 'GUSD Yield Vault',
      decimals: 2,
      symbol: 'PTGUSDT',
      logoURI:
        'https://assets.coingecko.com/coins/images/5992/small/gemini-dollar-gusd.png?1536745278',
      extensions: {
        underlyingAsset: {
          address: '0x1D0cdE537D5Ee72fB43a16027874626dd82741F3',
          symbol: 'GUSD',
          name: 'Gemini dollar'
        }
      }
    },
    {
      chainId: 5,
      address: '0x5c6B34bC145323b2931e8cafeD0b048E636544a6',
      name: 'WBTC Yield Vault',
      decimals: 8,
      symbol: 'PTWBTCT',
      logoURI: 'https://etherscan.io/token/images/wbtc_28.png?v=1',
      extensions: {
        underlyingAsset: {
          address: '0x6bC6556e16654F72C097F6863418926510Aa3006',
          symbol: 'WBTC',
          name: 'Wrapped BTC'
        }
      }
    },
    {
      chainId: 5,
      address: '0x427Bb82e04DD13c60167fb9fd7C32BcD4332748B',
      name: 'WETH Yield Vault',
      decimals: 18,
      symbol: 'PTWETHT',
      logoURI: 'https://etherscan.io/token/images/weth_28.png',
      extensions: {
        underlyingAsset: {
          address: '0xe86425cfb3A55e9EB1D5F2A79F6b583e94921071',
          symbol: 'WETH',
          name: 'Wrapped Ether'
        }
      }
    }
  ]
}

export default defaultVaultList
