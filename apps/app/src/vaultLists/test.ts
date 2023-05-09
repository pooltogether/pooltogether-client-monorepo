import { VaultList } from 'pt-types'

// TODO: remove this once no longer needed
const testVaultList: VaultList = {
  name: 'New Test Vault List',
  keywords: ['test'],
  version: {
    major: 0,
    minor: 3,
    patch: 0
  },
  timestamp: '2023-05-08T21:06:18.571Z',
  tokens: [
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

export default testVaultList
