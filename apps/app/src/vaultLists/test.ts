import { VaultList } from 'pt-types'

const testVaultList: VaultList = {
  name: 'New Test Vault List',
  keywords: ['test'],
  version: {
    major: 0,
    minor: 2,
    patch: 0
  },
  timestamp: '2023-04-20T21:26:22.780Z',
  tokens: [
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

export default testVaultList
