import { NextApiRequest, NextApiResponse } from 'next'
import { VaultList } from 'pt-types'

const defaultVaultList: VaultList = {
  name: 'PoolTogether Testnet Vault List',
  keywords: ['pooltogether'],
  version: {
    major: 1,
    minor: 2,
    patch: 0
  },
  timestamp: '2023-03-28T16:23:17.963Z',
  tokens: [
    {
      chainId: 5,
      address: '0x84F2aCCe713207B6F3B6bdAd67A122D225279A9a',
      name: 'DAI Low Yield Vault',
      decimals: 18,
      symbol: 'PTDAILYT',
      extensions: {
        underlyingAsset: {
          address: '0xB49F1BBD905A7a869DD50c1DF7D42E7907bcE7b4',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 5,
      address: '0x61e0A5e77db8e659C8753630046025876414715d',
      name: 'DAI High Yield Vault',
      decimals: 18,
      symbol: 'PTDAIHYT',
      extensions: {
        underlyingAsset: {
          address: '0xB49F1BBD905A7a869DD50c1DF7D42E7907bcE7b4',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 5,
      address: '0xC6db350c20FB957C30C9D9661E33686be38ad3fb',
      name: 'USDC Low Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCLYT',
      extensions: {
        underlyingAsset: {
          address: '0xA07af90b215b4EDccABC99Dd45cCa6D1127790eC',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 5,
      address: '0x8B6d7FccE0455872631E5fE1B793a1ce154556A0',
      name: 'USDC High Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCHYT',
      extensions: {
        underlyingAsset: {
          address: '0xA07af90b215b4EDccABC99Dd45cCa6D1127790eC',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 5,
      address: '0xAd1D0f9964dBf3596bd93d3f8b630ae813B7A8f6',
      name: 'GUSD Yield Vault',
      decimals: 2,
      symbol: 'PTGUSDT',
      extensions: {
        underlyingAsset: {
          address: '0x0ea26B1023aCe3dcBbc2a11343b7a188bC4b5B9c',
          symbol: 'GUSD',
          name: 'Gemini dollar'
        }
      }
    },
    {
      chainId: 5,
      address: '0x46D2DF182FE9d47D4705aB5CE117FE4f871df0e6',
      name: 'WBTC Yield Vault',
      decimals: 8,
      symbol: 'PTWBTCT',
      extensions: {
        underlyingAsset: {
          address: '0x50f7638aaE955EC17d1173D8AAcA69923923AfC6',
          symbol: 'WBTC',
          name: 'Wrapped BTC'
        }
      }
    },
    {
      chainId: 5,
      address: '0x1d2C74dec8E8D2C9673dcDa26b2890f434E46780',
      name: 'WETH Yield Vault',
      decimals: 18,
      symbol: 'PTWETHT',
      extensions: {
        underlyingAsset: {
          address: '0xE322f82175964b8dFAEbac6C448442A176EEf492',
          symbol: 'WETH',
          name: 'Wrapped Ether'
        }
      }
    }
  ]
}

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(defaultVaultList)
}
