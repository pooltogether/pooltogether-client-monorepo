import { VaultList } from 'pt-types'

const testVaultList: VaultList = {
  name: 'New Test Vault List',
  keywords: ['test'],
  version: {
    major: 0,
    minor: 1,
    patch: 0
  },
  timestamp: '2023-04-20T21:26:22.780Z',
  tokens: [
    {
      chainId: 5,
      address: '0x84F2aCCe713207B6F3B6bdAd67A122D225279A9a',
      name: 'DAI Test Vault',
      decimals: 18,
      symbol: 'PTDAILYT',
      extensions: {
        underlyingAsset: {
          address: '0xB49F1BBD905A7a869DD50c1DF7D42E7907bcE7b4',
          symbol: 'DAI',
          name: 'Dai Stablecoin'
        }
      }
    }
  ]
}

export default testVaultList
