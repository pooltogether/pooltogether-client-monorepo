import { ContractCallContext } from 'ethereum-multicall'
import { BigNumber, providers, utils } from 'ethers'
import {
  erc20 as prizePoolAbi
  /* TODO: use actual prize pool ABI */
} from '../abis/erc20'
import { getComplexMulticallResults, getMulticallResults } from './multicall'

/**
 * Returns prize pool contribution amounts for any vaults during the given draw IDs
 * @param readProvider a read-capable provider for the prize pool's chain
 * @param prizePoolAddress the prize pool's address
 * @param vaultAddresses the addresses for any vaults to get contributions for
 * @param startDrawId start draw ID (inclusive)
 * @param endDrawId end draw ID (inclusive)
 * @returns
 */
export const getPrizePoolContributionAmounts = async (
  readProvider: providers.Provider,
  prizePoolAddress: string,
  vaultAddresses: string[],
  startDrawId: number,
  endDrawId: number
): Promise<{ [vaultAddress: string]: BigNumber }> => {
  const contributionAmounts: { [vaultAddress: string]: BigNumber } = {}

  if (vaultAddresses.length > 0) {
    const queries: ContractCallContext[] = vaultAddresses.map((vaultAddress) => {
      const calls: ContractCallContext['calls'] = [
        {
          reference: 'getContributedBetween',
          methodName: 'getContributedBetween',
          methodParameters: [vaultAddress, startDrawId, endDrawId]
        }
      ]
      return {
        reference: vaultAddress,
        contractAddress: prizePoolAddress,
        abi: prizePoolAbi,
        calls
      }
    })
    const multicallResults = await getComplexMulticallResults(readProvider, queries)

    vaultAddresses.forEach((vaultAddress) => {
      const vaultContribution: string | undefined =
        multicallResults[prizePoolAddress]['getContributedBetween']?.[0]
      if (!!vaultContribution) {
        contributionAmounts[vaultAddress] = BigNumber.from(vaultContribution)
      }
    })
  }

  return contributionAmounts
}

/**
 * Returns prize pool contribution percentages for any vaults during the given draw IDs
 *
 * NOTE: Percentage value from 0 to 1 (eg: 0.25 representing 25%)
 * @param readProvider a read-capable provider for the prize pool's chain
 * @param prizePoolAddress the prize pool's address
 * @param vaultAddresses the addresses for any vaults to get contributions for
 * @param startDrawId start draw ID (inclusive)
 * @param endDrawId end draw ID (inclusive)
 * @returns
 */
export const getPrizePoolContributionPercentages = async (
  readProvider: providers.Provider,
  prizePoolAddress: string,
  vaultAddresses: string[],
  startDrawId: number,
  endDrawId: number
): Promise<{ [vaultAddress: string]: number }> => {
  const contributionPercentages: { [vaultAddress: string]: number } = {}

  if (vaultAddresses.length > 0) {
    const queries: ContractCallContext[] = vaultAddresses.map((vaultAddress) => {
      const calls: ContractCallContext['calls'] = [
        {
          reference: 'getVaultPortion',
          methodName: 'getVaultPortion',
          methodParameters: [vaultAddress, startDrawId, endDrawId]
        }
      ]
      return {
        reference: vaultAddress,
        contractAddress: prizePoolAddress,
        abi: prizePoolAbi,
        calls
      }
    })
    const multicallResults = await getComplexMulticallResults(readProvider, queries)

    vaultAddresses.forEach((vaultAddress) => {
      const vaultContribution: string | undefined =
        multicallResults[prizePoolAddress]['getVaultPortion']?.[0]
      if (!!vaultContribution) {
        contributionPercentages[vaultAddress] = parseFloat(utils.formatUnits(vaultContribution, 18))
      }
    })
  }

  return contributionPercentages
}

/**
 * Returns prize pool wins for a given user, vault addresses and prize tiers
 * @param readProvider a read-capable provider for the prize pool's chain
 * @param prizePoolAddress the prize pool's address
 * @param vaultAddresses the addresses for any vaults the user is deposited into
 * @param userAddress the user's address
 * @param tiers the prize tiers to check for wins
 * @returns
 */
export const checkPrizePoolWins = async (
  readProvider: providers.Provider,
  prizePoolAddress: string,
  vaultAddresses: string[],
  userAddress: string,
  tiers: number[]
): Promise<{
  [vaultAddress: string]: number[]
}> => {
  const wins: { [vaultAddress: string]: number[] } = {}

  if (vaultAddresses.length > 0 && tiers.length > 0) {
    const calls: ContractCallContext['calls'] = []

    vaultAddresses.forEach((vaultAddress) => {
      tiers.forEach((tier) => {
        calls.push({
          reference: `${vaultAddress}-${tier}`,
          methodName: 'isWinner',
          methodParameters: [vaultAddress, userAddress, tier]
        })
      })
    })

    const multicallResults = await getMulticallResults(
      readProvider,
      [prizePoolAddress],
      prizePoolAbi,
      calls
    )

    vaultAddresses.forEach((vaultAddress) => {
      tiers.forEach((tier) => {
        const isWinner: boolean = multicallResults[prizePoolAddress][`${vaultAddress}-${tier}`]?.[0]
        if (isWinner) {
          if (wins[vaultAddress] === undefined) {
            wins[vaultAddress] = []
          }
          wins[vaultAddress].push(tier)
        }
      })
    })
  }

  return wins
}
