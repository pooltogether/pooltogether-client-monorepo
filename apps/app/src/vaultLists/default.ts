import { VaultList } from 'types'

const defaultVaultList: VaultList = {
  name: 'PoolTogether Testnet Vault List',
  keywords: ['pooltogether'],
  version: {
    major: 1,
    minor: 5,
    patch: 0
  },
  timestamp: '2023-05-24T22:36:40.482Z',
  logoURI: '/pooltogether-token-logo.svg',
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
    },
    {
      chainId: 11155111,
      address: '0x92a6e57583262bDEFBA0bf36f651F0f4a1856737',
      name: 'DAI Low Yield Vault',
      decimals: 18,
      symbol: 'PTDAILYT',
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734',
      extensions: {
        underlyingAsset: {
          address: '0x501B79e61843B3432E5B48d59CB7E6A93185e50C',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 11155111,
      address: '0x95990dd6C8A75b8Cd0D8f424aa216FCE8963Ad13',
      name: 'DAI High Yield Vault',
      decimals: 18,
      symbol: 'PTDAIHYT',
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734',
      extensions: {
        underlyingAsset: {
          address: '0x501B79e61843B3432E5B48d59CB7E6A93185e50C',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 11155111,
      address: '0xb7024b6b3c886519AFE27A6B19FAd4b7b916BA97',
      name: 'USDC Low Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCLYT',
      logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
      extensions: {
        underlyingAsset: {
          address: '0x1977822061d8a394726803e2c2F6524a4E3e7Aff',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 11155111,
      address: '0x871506aFB4adBC21Bb497c531954e6a10313Fd8A',
      name: 'USDC High Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCHYT',
      logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
      extensions: {
        underlyingAsset: {
          address: '0x1977822061d8a394726803e2c2F6524a4E3e7Aff',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 11155111,
      address: '0x64AB9296B1C7686407085c44A971e8C090eA768b',
      name: 'GUSD Yield Vault',
      decimals: 2,
      symbol: 'PTGUSDT',
      logoURI:
        'https://assets.coingecko.com/coins/images/5992/small/gemini-dollar-gusd.png?1536745278',
      extensions: {
        underlyingAsset: {
          address: '0xa577C58435e0334B5039f5e71cCb4a45641c3495',
          symbol: 'GUSD',
          name: 'Gemini dollar'
        }
      }
    },
    {
      chainId: 11155111,
      address: '0x65e08197357a23bB47De4337CfBb79497E01680e',
      name: 'WBTC Yield Vault',
      decimals: 8,
      symbol: 'PTWBTCT',
      logoURI: 'https://etherscan.io/token/images/wbtc_28.png?v=1',
      extensions: {
        underlyingAsset: {
          address: '0x3Bd2312250C67Ca96C442fe8490A27d24D70e41C',
          symbol: 'WBTC',
          name: 'Wrapped BTC'
        }
      }
    },
    {
      chainId: 11155111,
      address: '0xB18E7808201b34C3BD2930b26fc9Aae5C0d365EE',
      name: 'WETH Yield Vault',
      decimals: 18,
      symbol: 'PTWETHT',
      logoURI: 'https://etherscan.io/token/images/weth_28.png',
      extensions: {
        underlyingAsset: {
          address: '0xa4DE6Eb323dd2f8A8B4D07B6b295dC57Bb1dE30A',
          symbol: 'WETH',
          name: 'Wrapped Ether'
        }
      }
    }
  ]
}

export default defaultVaultList
