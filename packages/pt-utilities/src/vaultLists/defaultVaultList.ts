import { VaultList } from 'pt-types'

export const defaultVaultList: VaultList = {
  name: 'PoolTogether Vault List',
  keywords: ['pooltogether', 'aave'],
  version: {
    major: 1,
    minor: 0,
    patch: 1
  },
  timestamp: '2023-03-21T17:34:48.567Z',
  tokens: [
    {
      chainId: 5,
      address: '0x4DFCDaFCc71228bAb8F1e4E95D7FaD360a6FaDB4',
      name: 'DAI Low Yield Vault',
      decimals: 18,
      symbol: 'PTDAILYT',
      extensions: {
        underlyingAsset: {
          address: '0x56159f593155E3079A2d0Ae253e97C703dBe54A8',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 5,
      address: '0xcfda8A87481eC851c7dC5Cf23582EDe0C9a7A35b',
      name: 'DAI High Yield Vault',
      decimals: 18,
      symbol: 'PTDAIHYT',
      extensions: {
        underlyingAsset: {
          address: '0x56159f593155E3079A2d0Ae253e97C703dBe54A8',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 5,
      address: '0x86AAF4df222DD89067D228D325B643c4Da000860',
      name: 'USDC Low Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCLYT',
      extensions: {
        underlyingAsset: {
          address: '0x346ca12Ac254b843879733b17c6ed3d9c53333f0',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 5,
      address: '0xF07E44AFcACAF8D1307EF5A2405659a3e07B05A0',
      name: 'USDC High Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCHYT',
      extensions: {
        underlyingAsset: {
          address: '0x346ca12Ac254b843879733b17c6ed3d9c53333f0',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 5,
      address: '0x76196827f50E179fdC23898d3637F7a8b88E8116',
      name: 'GUSD Vault',
      decimals: 2,
      symbol: 'PTGUSDT',
      extensions: {
        underlyingAsset: {
          address: '0xD13905EF313F0F8cd0855E25c566354A2b7b9780',
          symbol: 'GUSD',
          name: 'Gemini dollar'
        }
      }
    },
    {
      chainId: 5,
      address: '0xE1B3ec5885148F6F2379Ede684916c8F68aB129D',
      name: 'WBTC Vault',
      decimals: 8,
      symbol: 'PTWBTCT',
      extensions: {
        underlyingAsset: {
          address: '0xF33e8157569e09a9090E058b0a6D685d394258ed',
          symbol: 'WBTC',
          name: 'Wrapped BTC'
        }
      }
    },
    {
      chainId: 5,
      address: '0xbA3cFE4d6AbfED02044d14F876d07722E967Ec74',
      name: 'WETH Vault',
      decimals: 18,
      symbol: 'PTWETHT',
      extensions: {
        underlyingAsset: {
          address: '0x0a30769C05876521B79d61669513129aBeeF5B84',
          symbol: 'WETH',
          name: 'Wrapped Ether'
        }
      }
    }
  ]
}
