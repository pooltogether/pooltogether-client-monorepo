import { ContractCallContext } from 'ethereum-multicall'
import { BigNumber, providers, utils } from 'ethers'
import { VaultInfo, VaultList, Version } from 'pt-types'
import { erc4626 as erc4626Abi } from '../abis/erc4626'
import { formatStringWithPrecision } from './formatting'
import { getComplexMulticallResults, getMulticallResults } from './multicall'

/**
 * Returns a unique vault ID
 * @param vaultInfo basic vault info: chain ID and address
 * @returns
 */
export const getVaultId = (vaultInfo: VaultInfo | { chainId: number; address: string }) => {
  return `${vaultInfo.address}-${vaultInfo.chainId}`
}

/**
 * Returns a unique vault list ID
 * @param vaultList basic vault list info: name and version
 * @returns
 */
export const getVaultListId = (vaultList: VaultList | { name: string; version: Version }) => {
  const vaultName = vaultList.name.toLowerCase().replaceAll(' ', '-')
  const version = `v${vaultList.version.major}.${vaultList.version.minor}.${vaultList.version.patch}`
  const id = `${vaultName}-${version}`
  return id
}

/**
 * Returns vaults that match with a given chain ID
 * @param chainId the chain to filter vaults from
 * @param vaults vaults to filter
 * @returns
 */
export const getVaultsByChainId = (chainId: number, vaults: VaultInfo[]) => {
  return vaults.filter((vault) => vault.chainId === chainId)
}

/**
 * Returns exchange rates to calculate shares to assets in each vault from a given chain
 * @param readProvider a read-capable provider for the chain that should be queried
 * @param vaults vaults to query through
 * @returns
 */
export const getVaultExchangeRates = async (
  readProvider: providers.Provider,
  vaults: VaultInfo[]
): Promise<{
  [vaultId: string]: BigNumber
}> => {
  const vaultExchangeRates: { [vaultId: string]: BigNumber } = {}
  const chainId = (await readProvider.getNetwork())?.chainId
  const filteredVaults = !!chainId ? vaults.filter((vault) => vault.chainId === chainId) : []

  if (filteredVaults.length > 0) {
    const queries: ContractCallContext[] = filteredVaults.map((vault) => {
      const oneShare = utils.parseUnits('1', vault.decimals)
      const calls: ContractCallContext['calls'] = [
        {
          reference: 'convertToAssets',
          methodName: 'convertToAssets',
          methodParameters: [oneShare]
        }
      ]
      return {
        reference: vault.address,
        contractAddress: vault.address,
        abi: erc4626Abi,
        calls
      }
    })
    const multicallResults = await getComplexMulticallResults(readProvider, queries)

    filteredVaults.forEach((vault) => {
      const exchangeRate: string | undefined =
        multicallResults[vault.address]['convertToAssets']?.[0]
      if (!!exchangeRate) {
        const vaultId = getVaultId(vault)
        vaultExchangeRates[vaultId] = BigNumber.from(exchangeRate)
      }
    })
  }

  return vaultExchangeRates
}

/**
 * Returns an asset amount based on shares and a vault exchange rate
 * @param shares the share amount to convert to assets
 * @param exchangeRate the vault's exchange rate (unformatted BigNumber)
 * @param decimals the vault's number of decimals
 * @returns
 */
export const getAssetsFromShares = (
  shares: BigNumber,
  exchangeRate: BigNumber,
  decimals: number
) => {
  const result = formatStringWithPrecision(utils.formatUnits(shares.mul(exchangeRate), decimals), 0)
  return BigNumber.from(result)
}

/**
 * Returns a share amount based on assets and a vault exchange rate
 * @param assets the asset amount to convert to shares
 * @param exchangeRate the vault's exchange rate (unformatted BigNumber)
 * @param decimals the vault's number of decimals
 * @returns
 */
export const getSharesFromAssets = (
  assets: BigNumber,
  exchangeRate: BigNumber,
  decimals: number
) => {
  const result = assets.mul(utils.parseUnits('1', decimals)).div(exchangeRate).toString()
  return BigNumber.from(result)
}

/**
 * Returns the total underlying token amount deposited in each vault from a given chain
 * @param readProvider a read-capable provider for the chain that should be queried
 * @param vaults vaults to query through
 * @returns
 */
export const getVaultBalances = async (
  readProvider: providers.Provider,
  vaults: VaultInfo[]
): Promise<{
  [vaultId: string]: BigNumber
}> => {
  const vaultBalances: { [vaultId: string]: BigNumber } = {}
  const chainId = (await readProvider.getNetwork())?.chainId
  const filteredVaults = !!chainId ? vaults.filter((vault) => vault.chainId === chainId) : []

  if (filteredVaults.length > 0) {
    const vaultAddresses = filteredVaults.map((vault) => vault.address)
    const multicallResults = await getMulticallResults(readProvider, vaultAddresses, erc4626Abi, [
      { reference: 'totalAssets', methodName: 'totalAssets', methodParameters: [] }
    ])

    filteredVaults.forEach((vault) => {
      const balance: string | undefined = multicallResults[vault.address]['totalAssets']?.[0]
      if (!!balance) {
        const vaultId = getVaultId(vault)
        vaultBalances[vaultId] = BigNumber.from(balance)
      }
    })
  }

  return vaultBalances
}

/**
 * Returns the vault addresses from all vaults in a vault list
 * @param vaultList a vault list to go through
 * @returns
 */
export const getVaultAddressesFromVaultList = (
  vaultList: VaultList
): { [chainId: number]: `0x${string}`[] } => {
  const vaultAddresses: { [chainId: number]: `0x${string}`[] } = {}

  vaultList.tokens.forEach((vault) => {
    if (vaultAddresses[vault.chainId] === undefined) {
      vaultAddresses[vault.chainId] = []
    }
    vaultAddresses[vault.chainId].push(vault.address)
  })

  return vaultAddresses
}

/**
 * Returns the underlying tokens from all vaults in a vault list
 * @param vaultList a vault list to go through
 * @returns
 */
export const getVaultUnderlyingTokenAddressesFromVaultList = (
  vaultList: VaultList
): { [chainId: number]: `0x${string}`[] } => {
  const tokenAddresses: { [chainId: number]: `0x${string}`[] } = {}

  vaultList.tokens.forEach((vault) => {
    if (tokenAddresses[vault.chainId] === undefined) {
      tokenAddresses[vault.chainId] = []
    }
    tokenAddresses[vault.chainId].push(vault.extensions.underlyingAsset.address)
  })

  return tokenAddresses
}
