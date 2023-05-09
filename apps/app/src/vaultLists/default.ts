import { VaultList } from 'pt-types'

const defaultVaultList: VaultList = {
  name: 'PoolTogether Testnet Vault List',
  keywords: ['pooltogether'],
  version: {
    major: 1,
    minor: 4,
    patch: 0
  },
  timestamp: '2023-05-08T21:06:18.571Z',
  tokens: [
    {
      chainId: 80001,
      address: '0x51F62701bD6C96242B1fe71f95C134079Ea27486',
      name: 'DAI Low Yield Vault',
      decimals: 18,
      symbol: 'PTDAILYT',
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734',
      extensions: {
        underlyingAsset: {
          address: '0x2990cf846Ec4738A672273Df204Cd93196D98D5f',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 80001,
      address: '0x627a1De1EFAA2BA36EC51cDd962910Fd12b14fFb',
      name: 'DAI High Yield Vault',
      decimals: 18,
      symbol: 'PTDAIHYT',
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734',
      extensions: {
        underlyingAsset: {
          address: '0x2990cf846Ec4738A672273Df204Cd93196D98D5f',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 80001,
      address: '0x662748F2c5D269Ac30D8d35cA1C0C2C658371187',
      name: 'USDC Low Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCLYT',
      logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
      extensions: {
        underlyingAsset: {
          address: '0xA7E7dc95b2cF9311C8BE9a96e8E111CCf0408ADD',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 80001,
      address: '0x5Fa2cd94d3F68bbE1C7c2be5d555A3931339c500',
      name: 'USDC High Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCHYT',
      logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
      extensions: {
        underlyingAsset: {
          address: '0xA7E7dc95b2cF9311C8BE9a96e8E111CCf0408ADD',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 80001,
      address: '0x12032CA7c271C1ca5F272040B15D1A19145c6323',
      name: 'GUSD Yield Vault',
      decimals: 2,
      symbol: 'PTGUSDT',
      logoURI:
        'https://assets.coingecko.com/coins/images/5992/small/gemini-dollar-gusd.png?1536745278',
      extensions: {
        underlyingAsset: {
          address: '0x0e3CA10c2E675Ee8A93A1331d54981d99107E6e8',
          symbol: 'GUSD',
          name: 'Gemini dollar'
        }
      }
    },
    {
      chainId: 80001,
      address: '0xDdAA05da72f50b83af888988977E718805163579',
      name: 'WBTC Yield Vault',
      decimals: 8,
      symbol: 'PTWBTCT',
      logoURI: 'https://etherscan.io/token/images/wbtc_28.png?v=1',
      extensions: {
        underlyingAsset: {
          address: '0x14e8733e7f178c77ed99faa08BBf042100Da4268',
          symbol: 'WBTC',
          name: 'Wrapped BTC'
        }
      }
    },
    {
      chainId: 80001,
      address: '0x224060242784caB6c0E2Ec72C29F3Eac945Be7b9',
      name: 'WETH Yield Vault',
      decimals: 18,
      symbol: 'PTWETHT',
      logoURI: 'https://etherscan.io/token/images/weth_28.png',
      extensions: {
        underlyingAsset: {
          address: '0x5617889c4030DB7C3FAd0e4a015460e0430b454C',
          symbol: 'WETH',
          name: 'Wrapped Ether'
        }
      }
    }
  ]
}

export default defaultVaultList
