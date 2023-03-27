import { VaultList } from 'pt-types'

export const defaultVaultList: VaultList = {
  name: 'PoolTogether Testnet Vault List',
  keywords: ['pooltogether'],
  version: {
    major: 1,
    minor: 1,
    patch: 0
  },
  timestamp: '2023-03-24T21:45:46.981Z',
  tokens: [
    {
      chainId: 5,
      address: '0x208773BcDe09B1835B2Af2A14FA59E1f9DcD9758',
      name: 'DAI Low Yield Vault',
      decimals: 18,
      symbol: 'PTDAILYT',
      extensions: {
        underlyingAsset: {
          address: '0x546F4D36168F90439aaC3b65A366a4563C340314',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 5,
      address: '0x3f304D47BbeFfEe5Ed5aA7A1fb529e165cCca081',
      name: 'DAI High Yield Vault',
      decimals: 18,
      symbol: 'PTDAIHYT',
      extensions: {
        underlyingAsset: {
          address: '0x546F4D36168F90439aaC3b65A366a4563C340314',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 5,
      address: '0xD271423E918Ff3Fa328a5B3300d5c9eD07615f34',
      name: 'USDC Low Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCLYT',
      extensions: {
        underlyingAsset: {
          address: '0x6deF68cD3954a4A13fF74c578c2Fd74a761A87fD',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 5,
      address: '0x12edb464540ee3100DB6c694747f33232976a7DF',
      name: 'USDC High Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCHYT',
      extensions: {
        underlyingAsset: {
          address: '0x6deF68cD3954a4A13fF74c578c2Fd74a761A87fD',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 5,
      address: '0xd5D322390aD95C644c99d6A5Badd7c2EB5AfC712',
      name: 'GUSD Yield Vault',
      decimals: 2,
      symbol: 'PTGUSDT',
      extensions: {
        underlyingAsset: {
          address: '0x2CfBbd4d2B3eFE316b51a0B54E9ac1eA14E3A6c1',
          symbol: 'GUSD',
          name: 'Gemini dollar'
        }
      }
    },
    {
      chainId: 5,
      address: '0xC9C958E5af0feC3c5c17E53bA533497fAE3E8946',
      name: 'WBTC Yield Vault',
      decimals: 8,
      symbol: 'PTWBTCT',
      extensions: {
        underlyingAsset: {
          address: '0xEE876AA37580F1c08cB42d38716D3f49040D88F8',
          symbol: 'WBTC',
          name: 'Wrapped BTC'
        }
      }
    },
    {
      chainId: 5,
      address: '0x7d8F096A502E47d9910E654b9183B55235b6E5A6',
      name: 'WETH Yield Vault',
      decimals: 18,
      symbol: 'PTWETHT',
      extensions: {
        underlyingAsset: {
          address: '0x9ed5697DFCeEA545C26f11E59cF76Db4cD56ffb5',
          symbol: 'WETH',
          name: 'Wrapped Ether'
        }
      }
    }
  ]
}
