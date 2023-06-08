import { VaultList } from '@pooltogether/hyperstructure-client-js'

const defaultVaultList: VaultList = {
  name: 'PoolTogether Testnet Vault List',
  keywords: ['pooltogether'],
  version: {
    major: 1,
    minor: 6,
    patch: 0
  },
  timestamp: '2023-06-08T20:17:27.154Z',
  logoURI: '/pooltogether-token-logo.svg',
  tokens: [
    {
      chainId: 11155111,
      address: '0x3428e7fA4c91aFACb40B258A1ba8dBCF2FB0b4EA',
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
      address: '0x8b7fBF3B9CD7AfD0fFC73Fb6EBaCfb627Ea2eBad',
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
      address: '0xAc3b788d614a43Dc2fD5e8DCDd896b2c44AD4E25',
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
      address: '0x366147C73E070F7C70fE6021c27081646c0a2e7d',
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
      address: '0x61682FBA8394970CE014bcDE8ae0eC149c29757c',
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
      address: '0xD1f46c4A4fe6f2983220271dbF13E4bBc384e551',
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
      address: '0x06a36F610682e20BEF9F02C5A2530B1c2A36E862',
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
