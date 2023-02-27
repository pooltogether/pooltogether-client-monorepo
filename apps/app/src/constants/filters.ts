import { BigNumber } from 'ethers'
import { VaultInfo } from 'pt-types'

/**
 * Stablecoin symbols
 */
export const STABLECOIN_SYMBOLS = Object.freeze(['USDC', 'DAI'])

/**
 * Vault filtering options
 */
export const VAULT_FILTERS = Object.freeze({
  all: { name: 'Show All', validation: () => true },
  popular: { name: 'Popular', validation: (totalUsdBalance: number) => totalUsdBalance > 100_000 },
  userWallet: {
    name: 'In My Wallet',
    validation: (userWalletBalance: BigNumber) => !userWalletBalance.isZero()
  },
  stablecoin: {
    name: 'Stablecoins',
    validation: (vaultInfo: VaultInfo) =>
      STABLECOIN_SYMBOLS.includes(vaultInfo.extensions.underlyingAsset.symbol)
  }
})
export type VAULT_FILTER_ID = keyof typeof VAULT_FILTERS
