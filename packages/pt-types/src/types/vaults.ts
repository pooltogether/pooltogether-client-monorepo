import { Version } from './contracts'
import { TokenWithImage } from './token'

export interface VaultList {
  name: string
  keywords: string[]
  version: Version
  timestamp: string
  vaults: VaultData[]
}

export interface VaultData extends TokenWithImage {
  yieldSource: string
  underlyingAsset: TokenWithImage
}
