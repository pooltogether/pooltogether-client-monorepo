import { ContractCallContext } from 'ethereum-multicall'
import { BigNumber, providers, utils } from 'ethers'
import { VaultInfo, VaultInfoWithBalance, VaultList } from 'pt-types'
import { erc4626 as erc4626Abi } from '../abis/erc4626'
import { divideBigNumbers } from './math'
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
 * Returns vaults from a vault list that match with a given chain ID
 * @param chainId the chain to filter vaults from
 * @param vaultList a list of vaults
 * @returns
 */
export const getVaultsByChainId = (chainId: number, vaultList: VaultList) => {
  return vaultList.tokens.filter((vault) => vault.chainId === chainId)
}

/**
 * Returns a user's share balance in all vaults from a vault list
 * @param readProviders read-capable providers from any chains that should be queried
 * @param userAddress a user's address to check balances for
 * @param vaultList a vault list to check balances in
 * @returns
 */
export const getAllUserVaultBalances = async (
  readProviders: providers.Provider[],
  userAddress: string,
  vaultList: VaultList
): Promise<{ [vaultId: string]: VaultInfoWithBalance }> => {
  const userVaultBalances: {
    [vaultId: string]: VaultInfoWithBalance
  } = {}

  await Promise.all(
    readProviders.map((readProvider) =>
      (async () => {
        const chainId = (await readProvider.getNetwork())?.chainId
        const vaults = !!chainId
          ? vaultList.tokens.filter((vault) => vault.chainId === chainId)
          : []

        if (vaults.length > 0) {
          const vaultAddresses = vaults.map((vault) => vault.address)
          const multicallResults = await getMulticallResults(
            readProvider,
            vaultAddresses,
            erc4626Abi,
            [{ reference: 'balanceOf', methodName: 'balanceOf', methodParameters: [userAddress] }]
          )

          vaults.forEach((vault) => {
            const balance: string | undefined = multicallResults[vault.address]['balanceOf']?.[0]
            if (!!balance) {
              const vaultId = getVaultId(vault)
              userVaultBalances[vaultId] = { ...vault, balance }
            }
          })
        }
      })()
    )
  )

  return userVaultBalances
}

/**
 * Returns multipliers to calculate shares to assets in all vaults from a vault list
 * @param readProviders read-capable providers from any chains that should be queried
 * @param vaultList a vault list to query through vaults in
 * @returns
 */
export const getAllVaultShareMultipliers = async (
  readProviders: providers.Provider[],
  vaultList: VaultList
): Promise<{
  [vaultId: string]: BigNumber
}> => {
  const allVaultShareMultipliers: {
    [vaultId: string]: BigNumber
  } = {}

  await Promise.all(
    readProviders.map((readProvider) =>
      (async () => {
        const vaultShareMultipliers = await getVaultShareMultipliers(readProvider, vaultList)
        Object.assign(allVaultShareMultipliers, vaultShareMultipliers)
      })()
    )
  )

  return allVaultShareMultipliers
}

/**
 * Returns multipliers to calculate shares to assets in all vaults from a given chain and vault list
 * @param readProvider a read-capable provider for the chain that should be queried
 * @param vaultList a vault list to query through vaults in
 * @returns
 */
export const getVaultShareMultipliers = async (
  readProvider: providers.Provider,
  vaultList: VaultList
): Promise<{
  [vaultId: string]: BigNumber
}> => {
  const vaultShareMultipliers: {
    [vaultId: string]: BigNumber
  } = {}
  const chainId = (await readProvider.getNetwork())?.chainId
  const vaults = !!chainId ? vaultList.tokens.filter((vault) => vault.chainId === chainId) : []

  if (vaults.length > 0) {
    const queries: ContractCallContext[] = vaults.map((vault) => {
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

    vaults.forEach((vault) => {
      const multiplier: string | undefined = multicallResults[vault.address]['convertToAssets']?.[0]
      if (!!multiplier) {
        const vaultId = getVaultId(vault)
        vaultShareMultipliers[vaultId] = divideBigNumbers(
          BigNumber.from(multiplier),
          utils.parseUnits('1', vault.decimals)
        )
      }
    })
  }

  return vaultShareMultipliers
}

/**
 * Returns the total underlying token amount deposited in all vaults from a vault list
 * @param readProviders read-capable providers from any chains that should be queried
 * @param vaultList a vault list to query through vaults in
 * @returns
 */
export const getAllVaultBalances = async (
  readProviders: providers.Provider[],
  vaultList: VaultList
): Promise<{
  [vaultId: string]: BigNumber
}> => {
  const allVaultBalances: {
    [vaultId: string]: BigNumber
  } = {}

  await Promise.all(
    readProviders.map((readProvider) =>
      (async () => {
        const vaultBalances = await getVaultBalances(readProvider, vaultList)
        Object.assign(allVaultBalances, vaultBalances)
      })()
    )
  )

  return allVaultBalances
}

/**
 * Returns the total underlying token amount deposited in all vaults from a given chain and vault list
 * @param readProvider a read-capable provider for the chain that should be queried
 * @param vaultList a vault list to query through vaults in
 * @returns
 */
export const getVaultBalances = async (
  readProvider: providers.Provider,
  vaultList: VaultList
): Promise<{
  [vaultId: string]: BigNumber
}> => {
  const vaultBalances: {
    [vaultId: string]: BigNumber
  } = {}
  const chainId = (await readProvider.getNetwork())?.chainId
  const vaults = !!chainId ? vaultList.tokens.filter((vault) => vault.chainId === chainId) : []

  if (vaults.length > 0) {
    const vaultAddresses = vaults.map((vault) => vault.address)
    const multicallResults = await getMulticallResults(readProvider, vaultAddresses, erc4626Abi, [
      { reference: 'totalAssets', methodName: 'totalAssets', methodParameters: [] }
    ])

    vaults.forEach((vault) => {
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
 * Returns the underlying tokens from all vaults in a vault list
 * @param vaultList a vault list to go through
 * @returns
 */
export const getVaultUnderlyingTokensFromVaultList = (
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
