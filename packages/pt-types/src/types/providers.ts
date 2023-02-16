import type { providers, Signer } from 'ethers'

export interface Providers {
  [chainId: number]: providers.Provider
}

export interface SignersOrProviders {
  [chainId: number]: Signer | providers.Provider
}
