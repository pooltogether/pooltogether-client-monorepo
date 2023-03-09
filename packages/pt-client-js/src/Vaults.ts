import { BigNumber, providers } from 'ethers'
import { TokenWithBalance, TokenWithSupply, VaultList } from 'pt-types'
import {
  getTokenBalances,
  getTokenInfo,
  getVaultAddressesFromVaultList,
  getVaultBalances,
  getVaultExchangeRates,
  getVaultId,
  getVaultsByChainId,
  getVaultUnderlyingTokenAddressesFromVaultList,
  validateProviderNetwork
} from 'pt-utilities'
import { Vault } from './Vault'

/**
 * This class provides read-only functions to fetch on-chain data from all vaults in a vault list
 */
export class Vaults {
  readonly vaults: { [vaultId: string]: Vault } = {}
  readonly chainIds: number[]
  readonly vaultAddresses: { [chainId: number]: `0x${string}`[] }
  readonly underlyingTokenAddresses: { [chainId: number]: `0x${string}`[] }

  /**
   * Creates an instance of a Vaults object with providers to query on-chain data with
   * @param vaultList a vault list
   * @param providers Providers for each network to create Vault objects for
   */
  constructor(
    public vaultList: VaultList,
    public providers: { [chainId: number]: providers.Provider }
  ) {
    this.chainIds = Object.keys(providers).map((key) => Number(key))
    this.vaultAddresses = getVaultAddressesFromVaultList(vaultList)
    this.underlyingTokenAddresses = getVaultUnderlyingTokenAddressesFromVaultList(vaultList)

    this.chainIds.forEach((chainId) => {
      const chainVaults = getVaultsByChainId(chainId, vaultList.tokens)
      chainVaults.forEach((vault) => {
        const newVault = new Vault(
          vault.chainId,
          vault.address,
          vault.decimals,
          providers[chainId],
          vault.extensions.underlyingAsset.address
        )
        this.vaults[newVault.id] = newVault
      })
    })
  }

  /* ============================== Read Functions ============================== */

  /**
   * Returns basic data about each vault's underlying asset
   * @param chainIds optional chain IDs to query (by default queries all)
   * @returns
   */
  async getTokenData(chainIds?: number[]): Promise<{ [vaultId: string]: TokenWithSupply }> {
    const tokenData: { [vaultId: string]: TokenWithSupply } = {}
    const networksToQuery = chainIds ?? this.chainIds

    await Promise.all(
      networksToQuery.map((chainId) =>
        (async () => {
          const provider = this.providers[chainId]
          if (!!provider) {
            const source = `Vaults [getTokenData] [${chainId}]`
            await validateProviderNetwork(chainId, provider, source)
            const chainTokenData = await getTokenInfo(
              provider,
              this.underlyingTokenAddresses[chainId]
            )
            const chainVaults = getVaultsByChainId(chainId, this.vaultList.tokens)
            chainVaults.forEach((vault) => {
              const vaultId = getVaultId(vault)
              tokenData[vaultId] = chainTokenData[vault.extensions.underlyingAsset.address]
            })
          }
        })()
      )
    )

    return tokenData
  }

  /**
   * Returns basic data about each vault's share token
   * @param chainIds optional chain IDs to query (by default queries all)
   * @returns
   */
  async getShareData(chainIds?: number[]): Promise<{ [vaultId: string]: TokenWithSupply }> {
    const shareData: { [vaultId: string]: TokenWithSupply } = {}
    const networksToQuery = chainIds ?? this.chainIds

    await Promise.all(
      networksToQuery.map((chainId) =>
        (async () => {
          const provider = this.providers[chainId]
          if (!!provider) {
            const source = `Vaults [getShareData] [${chainId}]`
            await validateProviderNetwork(chainId, provider, source)
            const chainShareData = await getTokenInfo(provider, this.vaultAddresses[chainId])
            const chainVaults = getVaultsByChainId(chainId, this.vaultList.tokens)
            chainVaults.forEach((vault) => {
              const vaultId = getVaultId(vault)
              shareData[vaultId] = chainShareData[vault.address]
            })
          }
        })()
      )
    )

    return shareData
  }

  /**
   * Returns a user's balances for each vaults' underlying assets
   * @param userAddress the user's address to get balances for
   * @param chainIds optional chain IDs to query (by default queries all)
   * @returns
   */
  async getUserTokenBalances(
    userAddress: string,
    chainIds?: number[]
  ): Promise<{ [vaultId: string]: TokenWithBalance }> {
    const tokenBalances: { [vaultId: string]: TokenWithBalance } = {}
    const networksToQuery = chainIds ?? this.chainIds

    await Promise.all(
      networksToQuery.map((chainId) =>
        (async () => {
          const provider = this.providers[chainId]
          if (!!provider) {
            const source = `Vaults [getUserTokenBalances] [${chainId}]`
            await validateProviderNetwork(chainId, provider, source)
            const chainTokenBalances = await getTokenBalances(
              provider,
              userAddress,
              this.underlyingTokenAddresses[chainId]
            )
            const chainVaults = getVaultsByChainId(chainId, this.vaultList.tokens)
            chainVaults.forEach((vault) => {
              const vaultId = getVaultId(vault)
              tokenBalances[vaultId] = chainTokenBalances[vault.extensions.underlyingAsset.address]
            })
          }
        })()
      )
    )

    return tokenBalances
  }

  /**
   * Returns a user's balances for each vaults' share tokens
   * @param userAddress the user's address to get balances for
   * @param chainIds optional chain IDs to query (by default queries all)
   * @returns
   */
  async getUserShareBalances(
    userAddress: string,
    chainIds?: number[]
  ): Promise<{ [vaultId: string]: TokenWithBalance }> {
    const shareBalances: { [vaultId: string]: TokenWithBalance } = {}
    const networksToQuery = chainIds ?? this.chainIds

    await Promise.all(
      networksToQuery.map((chainId) =>
        (async () => {
          const provider = this.providers[chainId]
          if (!!provider) {
            const source = `Vaults [getUserShareBalances] [${chainId}]`
            await validateProviderNetwork(chainId, provider, source)
            const chainShareBalances = await getTokenBalances(
              provider,
              userAddress,
              this.vaultAddresses[chainId]
            )
            const chainVaults = getVaultsByChainId(chainId, this.vaultList.tokens)
            chainVaults.forEach((vault) => {
              const vaultId = getVaultId(vault)
              shareBalances[vaultId] = chainShareBalances[vault.address]
            })
          }
        })()
      )
    )

    return shareBalances
  }

  /**
   * Returns the total amount of underlying assets deposited in each vault
   * @param chainIds optional chain IDs to query (by default queries all)
   * @returns
   */
  async getTotalTokenBalances(chainIds?: number[]): Promise<{ [vaultId: string]: BigNumber }> {
    const tokenBalances: { [vaultId: string]: BigNumber } = {}
    const networksToQuery = chainIds ?? this.chainIds

    await Promise.all(
      networksToQuery.map((chainId) =>
        (async () => {
          const provider = this.providers[chainId]
          if (!!provider) {
            const source = `Vaults [getTotalTokenBalances] [${chainId}]`
            await validateProviderNetwork(chainId, provider, source)
            const chainVaults = getVaultsByChainId(chainId, this.vaultList.tokens)
            const chainTokenBalances = await getVaultBalances(provider, chainVaults)
            Object.assign(tokenBalances, chainTokenBalances)
          }
        })()
      )
    )

    return tokenBalances
  }

  /**
   * Returns the exchange rate from 1 share to each vaults' underlying assets
   * @param chainIds optional chain IDs to query (by default queries all)
   * @returns
   */
  async getExchangeRates(chainIds?: number[]): Promise<{ [vaultId: string]: BigNumber }> {
    const exchangeRates: { [vaultId: string]: BigNumber } = {}
    const networksToQuery = chainIds ?? this.chainIds

    await Promise.all(
      networksToQuery.map((chainId) =>
        (async () => {
          const provider = this.providers[chainId]
          if (!!provider) {
            const source = `Vaults [getExchangeRates] [${chainId}]`
            await validateProviderNetwork(chainId, provider, source)
            const chainVaults = getVaultsByChainId(chainId, this.vaultList.tokens)
            const chainExchangeRates = await getVaultExchangeRates(provider, chainVaults)
            Object.assign(exchangeRates, chainExchangeRates)
          }
        })()
      )
    )

    return exchangeRates
  }
}
