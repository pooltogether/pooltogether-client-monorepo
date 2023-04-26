import { ContractCallContext } from 'ethereum-multicall'
import { BigNumber, Contract, providers, utils } from 'ethers'
import { PrizeInfo } from 'pt-types'
import { prizePool as prizePoolAbi } from '../abis/prizePool'
import { SECONDS_PER_DAY } from '../constants'
import { formatStringWithPrecision } from './formatting'
import { calculatePercentageOfBigNumber, divideBigNumbers } from './math'
import { getComplexMulticallResults, getMulticallResults } from './multicall'
import { getChainIdFromSignerOrProvider } from './providers'
import { getVaultId } from './vaults'

/**
 * Returns a unique prize pool ID
 * @param chainId the prize pool's chain ID
 * @param address the prize pool's address
 * @returns
 */
export const getPrizePoolId = (chainId: number, address: string) => {
  return `${address}-${chainId}`
}

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
): Promise<{ [vaultId: string]: BigNumber }> => {
  const contributionAmounts: { [vaultId: string]: BigNumber } = {}

  const chainId = await getChainIdFromSignerOrProvider(readProvider)

  if (vaultAddresses.length > 0) {
    const queries: ContractCallContext[] = vaultAddresses.map((vaultAddress) => {
      const calls: ContractCallContext['calls'] = [
        {
          reference: vaultAddress,
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
        multicallResults[prizePoolAddress][vaultAddress]?.[0]
      if (!!vaultContribution) {
        const vaultId = getVaultId({ chainId, address: vaultAddress })
        contributionAmounts[vaultId] = BigNumber.from(vaultContribution)
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
): Promise<{ [vaultId: string]: number }> => {
  const contributionPercentages: { [vaultId: string]: number } = {}

  const chainId = await getChainIdFromSignerOrProvider(readProvider)

  if (vaultAddresses.length > 0) {
    const queries: ContractCallContext[] = vaultAddresses.map((vaultAddress) => {
      const calls: ContractCallContext['calls'] = [
        {
          reference: vaultAddress,
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
      const vaultContribution = BigNumber.from(
        multicallResults[prizePoolAddress][vaultAddress]?.[0] ?? 0
      ).toString()
      const vaultId = getVaultId({ chainId, address: vaultAddress })
      contributionPercentages[vaultId] = parseFloat(utils.formatUnits(vaultContribution, 18))
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
  [vaultId: string]: number[]
}> => {
  const wins: { [vaultId: string]: number[] } = {}

  const chainId = await getChainIdFromSignerOrProvider(readProvider)

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
          const vaultId = getVaultId({ chainId, address: vaultAddress })
          if (wins[vaultId] === undefined) {
            wins[vaultId] = []
          }
          wins[vaultId].push(tier)
        }
      })
    })
  }

  return wins
}

/**
 * Returns estimated prize amounts and frequency for any tiers of a prize pool
 * @param readProvider a read-capable provider for the prize pool's chain
 * @param prizePoolAddress the prize pool's address
 * @param tiers the prize tiers to get info for
 * @param considerPastDraws the number of past draws to consider for amount estimates (min. 1 - default is 7)
 * @returns
 */
export const getPrizePoolAllPrizeInfo = async (
  readProvider: providers.Provider,
  prizePoolAddress: string,
  tiers: number[],
  considerPastDraws: number = 7
): Promise<PrizeInfo[]> => {
  const prizes: PrizeInfo[] = []

  if (considerPastDraws < 1) {
    throw new Error(`Invalid number of past draws to consider: ${considerPastDraws}`)
  }

  const calls: ContractCallContext['calls'] = [
    { reference: 'drawPeriod', methodName: 'drawPeriodSeconds', methodParameters: [] },
    { reference: 'tierShares', methodName: 'tierShares', methodParameters: [] },
    { reference: 'totalShares', methodName: 'getTotalShares', methodParameters: [] },
    { reference: 'lastDrawId', methodName: 'getLastCompletedDrawId', methodParameters: [] },
    ...tiers.map((tier) => {
      return {
        reference: `accrualDraws-${tier}`,
        methodName: 'getTierAccrualDurationInDraws',
        methodParameters: [tier]
      }
    })
  ]

  const multicallResults = await getMulticallResults(
    readProvider,
    [prizePoolAddress],
    prizePoolAbi,
    calls
  )

  const lastDrawId = BigNumber.from(
    multicallResults[prizePoolAddress]['lastDrawId']?.[0] ?? 0
  ).toNumber()
  const startDrawId = considerPastDraws > lastDrawId ? 1 : lastDrawId - considerPastDraws + 1

  const prizePoolContract = new Contract(prizePoolAddress, prizePoolAbi, readProvider)
  const totalContributions = BigNumber.from(
    lastDrawId > 0 ? await prizePoolContract.getTotalContributedBetween(startDrawId, lastDrawId) : 0
  )

  const drawPeriod = parseInt(multicallResults[prizePoolAddress]['drawPeriod']?.[0])

  const tierShares = BigNumber.from(multicallResults[prizePoolAddress]['tierShares']?.[0] ?? 0)
  const totalShares = BigNumber.from(multicallResults[prizePoolAddress]['totalShares']?.[0] ?? 0)
  const tierSharePercentage = divideBigNumbers(tierShares, totalShares)
  const formattedTierSharePercentage = parseFloat(
    formatStringWithPrecision(tierSharePercentage.toString(), 4)
  )

  const tierContributionPerDraw = calculatePercentageOfBigNumber(
    totalContributions,
    formattedTierSharePercentage
  ).div(BigNumber.from(considerPastDraws))

  tiers.forEach((tier) => {
    const tierPrizeCount = 4 ** tier

    const accrualDraws = parseInt(multicallResults[prizePoolAddress][`accrualDraws-${tier}`]?.[0])
    const accrualSeconds = accrualDraws * drawPeriod
    const accrualDays = accrualSeconds / SECONDS_PER_DAY

    const amount = tierContributionPerDraw.mul(accrualDraws).div(BigNumber.from(tierPrizeCount))

    const dailyFrequency = tierPrizeCount / accrualDays

    prizes.push({ amount, dailyFrequency })
  })

  return prizes
}
