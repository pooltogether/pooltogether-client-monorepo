import { BigNumber, providers } from 'ethers'
import { TokenWithBalance, TokenWithSupply, VaultInfo, VaultInfoWithBalance } from 'pt-types'
import {
  getTokenBalances,
  getTokenInfo,
  getVaultAddresses,
  getVaultBalances,
  getVaultExchangeRates,
  getVaultId,
  getVaultsByChainId,
  getVaultUnderlyingTokenAddresses,
  validateAddress,
  validateProviderNetwork
} from 'pt-utilities'
import { Vault } from './Vault'

/**
 * This class provides read-only functions to fetch on-chain data from any vaults in vault list(s)
 */
export class Vaults {
  readonly vaults: { [vaultId: string]: Vault } = {}
  readonly chainIds: number[]
  readonly vaultAddresses: { [chainId: number]: `0x${string}`[] }
  underlyingTokenData: { [vaultId: string]: TokenWithSupply } | undefined
  underlyingTokenAddresses:
    | {
        byChain: { [chainId: number]: `0x${string}`[] }
        byVault: { [vaultId: string]: `0x${string}` }
      }
    | undefined

  /**
   * Creates an instance of a Vaults object with providers to query on-chain data with
   * @param vaults a list of vaults
   * @param providers Providers for each network to create Vault objects for
   */
  constructor(
    public allVaultInfo: VaultInfo[],
    public providers: { [chainId: number]: providers.Provider }
  ) {
    this.chainIds = Object.keys(providers).map((key) => parseInt(key))
    this.vaultAddresses = getVaultAddresses(allVaultInfo)

    this.chainIds.forEach((chainId) => {
      const chainVaults = getVaultsByChainId(chainId, allVaultInfo)
      chainVaults.forEach((vault) => {
        const newVault = new Vault(vault.chainId, vault.address, providers[chainId], {
          decimals: vault.decimals,
          tokenAddress: vault.extensions?.underlyingAsset?.address
        })
        this.vaults[newVault.id] = newVault
      })
    })
  }

  /* ============================== Read Functions ============================== */

  /**
   * Returns basic data about each vault's underlying asset
   * @returns
   */
  async getTokenData(): Promise<{ [vaultId: string]: TokenWithSupply }> {
    if (this.underlyingTokenData !== undefined) return this.underlyingTokenData

    const tokenData: { [vaultId: string]: TokenWithSupply } = {}

    const underlyingTokenAddresses = await this.getUnderlyingTokenAddresses()

    await Promise.all(
      this.chainIds.map((chainId) =>
        (async () => {
          const provider = this.providers[chainId]
          if (!!provider) {
            const source = `Vaults [getTokenData] [${chainId}]`
            await validateProviderNetwork(chainId, provider, source)
            const chainTokenData = await getTokenInfo(
              provider,
              underlyingTokenAddresses.byChain[chainId]
            )
            const chainVaults = getVaultsByChainId(chainId, this.allVaultInfo)
            chainVaults.forEach((vault) => {
              const vaultId = getVaultId(vault)
              const tokenAddress = underlyingTokenAddresses.byVault[vaultId]
              tokenData[vaultId] = chainTokenData[tokenAddress]
            })
          }
        })()
      )
    )
    this.underlyingTokenData = tokenData

    return this.underlyingTokenData
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
            const chainVaults = getVaultsByChainId(chainId, this.allVaultInfo)
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
    const source = `Vaults [getUserTokenBalances]`
    const tokenBalances: { [vaultId: string]: TokenWithBalance } = {}
    const networksToQuery = chainIds ?? this.chainIds
    validateAddress(userAddress, source)

    const underlyingTokenAddresses = await this.getUnderlyingTokenAddresses()

    await Promise.all(
      networksToQuery.map((chainId) =>
        (async () => {
          const provider = this.providers[chainId]
          if (!!provider) {
            await validateProviderNetwork(chainId, provider, source + ` [${chainId}]`)
            const chainTokenBalances = await getTokenBalances(
              provider,
              userAddress,
              underlyingTokenAddresses.byChain[chainId]
            )
            const chainVaults = getVaultsByChainId(chainId, this.allVaultInfo)
            chainVaults.forEach((vault) => {
              const vaultId = getVaultId(vault)
              const tokenAddress = underlyingTokenAddresses.byVault[vaultId]
              tokenBalances[vaultId] = chainTokenBalances[tokenAddress]
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
  ): Promise<{ [vaultId: string]: VaultInfoWithBalance }> {
    const source = `Vaults [getUserShareBalances]`
    const shareBalances: { [vaultId: string]: VaultInfoWithBalance } = {}
    const networksToQuery = chainIds ?? this.chainIds
    validateAddress(userAddress, source)

    await Promise.all(
      networksToQuery.map((chainId) =>
        (async () => {
          const vaultAddresses = this.vaultAddresses[chainId]
          if (!!vaultAddresses) {
            const provider = this.providers[chainId]
            if (!!provider) {
              await validateProviderNetwork(chainId, provider, source + ` [${chainId}]`)
              const chainShareBalances = await getTokenBalances(
                provider,
                userAddress,
                vaultAddresses
              )
              const chainVaults = getVaultsByChainId(chainId, this.allVaultInfo)
              chainVaults.forEach((vault) => {
                const vaultId = getVaultId(vault)
                shareBalances[vaultId] = {
                  ...vault,
                  balance: chainShareBalances[vault.address]?.balance
                }
              })
            }
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
            const chainVaults = getVaultsByChainId(chainId, this.allVaultInfo)
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
            const chainVaults = getVaultsByChainId(chainId, this.allVaultInfo)
            const chainExchangeRates = await getVaultExchangeRates(provider, chainVaults)
            Object.assign(exchangeRates, chainExchangeRates)
          }
        })()
      )
    )

    return exchangeRates
  }

  /**
   * Returns the unique underlying token addresses for all vaults
   * @returns
   */
  async getUnderlyingTokenAddresses(): Promise<{
    byChain: { [chainId: number]: `0x${string}`[] }
    byVault: { [vaultId: string]: `0x${string}` }
  }> {
    if (this.underlyingTokenAddresses !== undefined) return this.underlyingTokenAddresses

    const tokenAddresses: {
      byChain: { [chainId: number]: `0x${string}`[] }
      byVault: { [vaultId: string]: `0x${string}` }
    } = { byChain: {}, byVault: {} }

    await Promise.all(
      this.chainIds.map((chainId) =>
        (async () => {
          const provider = this.providers[chainId]
          if (!!provider) {
            const source = `Vaults [getUnderlyingTokenAddresses] [${chainId}]`
            await validateProviderNetwork(chainId, provider, source)
            const chainVaults = getVaultsByChainId(chainId, this.allVaultInfo)
            const chainTokenAddresses = await getVaultUnderlyingTokenAddresses(
              provider,
              chainVaults
            )
            Object.assign(tokenAddresses.byVault, chainTokenAddresses)
            tokenAddresses.byChain[chainId] = Object.values(chainTokenAddresses)
          }
        })()
      )
    )

    this.underlyingTokenAddresses = tokenAddresses

    return this.underlyingTokenAddresses
  }
}
