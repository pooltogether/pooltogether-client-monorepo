import { VaultList } from '@pooltogether/hyperstructure-client-js'

const defaultVaultList: VaultList = {
  name: 'PoolTogether Testnet Vault List',
  keywords: ['pooltogether'],
  version: {
    major: 1,
    minor: 7,
    patch: 0
  },
  timestamp: '2023-06-08T20:17:27.154Z',
  logoURI: '/pooltogether-token-logo.svg',
  tokens: [
    {
      chainId: 11155111,
      address: '0x0C393C363bAE8Eebe6E1Afe4716e317CbD2E9949',
      name: 'DAI Low Yield Vault',
      decimals: 18,
      symbol: 'PTDAILYT',
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734',
      extensions: {
        underlyingAsset: {
          address: '0x4a798649F6AA23D6a3a1cab65fc0a8fa772E0a40',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 11155111,
      address: '0x171df7a2D8547322de5BA27FD9856B04620A3562',
      name: 'DAI High Yield Vault',
      decimals: 18,
      symbol: 'PTDAIHYT',
      logoURI: 'https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734',
      extensions: {
        underlyingAsset: {
          address: '0x4a798649F6AA23D6a3a1cab65fc0a8fa772E0a40',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    },
    {
      chainId: 11155111,
      address: '0xe288828FFb4087F633E17D4715103648266C0cdb',
      name: 'USDC Low Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCLYT',
      logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
      extensions: {
        underlyingAsset: {
          address: '0x7A8f1413B44F7346EAb36c4793Bd54148Ca916A5',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 11155111,
      address: '0x0B87bF0822AFAecDEb367cfAaCcf40c0e895F3AD',
      name: 'USDC High Yield Vault',
      decimals: 6,
      symbol: 'PTUSDCHYT',
      logoURI: 'https://etherscan.io/token/images/centre-usdc_28.png',
      extensions: {
        underlyingAsset: {
          address: '0x7A8f1413B44F7346EAb36c4793Bd54148Ca916A5',
          symbol: 'USDC',
          name: 'USD Coin'
        }
      }
    },
    {
      chainId: 11155111,
      address: '0xebC5c1257A6DB56d2c3C9466A5271C5Be4FB1397',
      name: 'GUSD Yield Vault',
      decimals: 2,
      symbol: 'PTGUSDT',
      logoURI:
        'https://assets.coingecko.com/coins/images/5992/small/gemini-dollar-gusd.png?1536745278',
      extensions: {
        underlyingAsset: {
          address: '0x6EBa7deCd74D8327FA83b7Edc6Cb1dEADDfD8EFA',
          symbol: 'GUSD',
          name: 'Gemini dollar'
        }
      }
    },
    {
      chainId: 11155111,
      address: '0x7Ea2e76587962c526B60492bd8342AAe859f1219',
      name: 'WBTC Yield Vault',
      decimals: 8,
      symbol: 'PTWBTCT',
      logoURI: 'https://etherscan.io/token/images/wbtc_28.png?v=1',
      extensions: {
        underlyingAsset: {
          address: '0xbdaAB70E7d8767e94680AD2D27B503daE01447A4',
          symbol: 'WBTC',
          name: 'Wrapped BTC'
        }
      }
    },
    {
      chainId: 11155111,
      address: '0xD6D82beB1243A254A61ae4B3a1936Da962F947b7',
      name: 'WETH Yield Vault',
      decimals: 18,
      symbol: 'PTWETHT',
      logoURI: 'https://etherscan.io/token/images/weth_28.png',
      extensions: {
        underlyingAsset: {
          address: '0x07056BA1bD5D71AA743F33Aa3A7BB76f08834873',
          symbol: 'WETH',
          name: 'Wrapped Ether'
        }
      }
    }
  ]
}

export default defaultVaultList
