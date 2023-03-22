import { BigNumber, providers } from 'ethers'
import { TokenWithBalance, TokenWithSupply } from 'pt-types'
import { erc20 as erc20Abi } from '../abis/erc20'
import { getMulticallResults } from './multicall'

/**
 * Returns basic ERC20 token info such as symbol, name, decimals and totalSupply
 * @param readProvider a read-capable provider to query through
 * @param tokenAddresses token addresses to query info for
 * @returns
 */
export const getTokenInfo = async (
  readProvider: providers.Provider,
  tokenAddresses: string[]
): Promise<{ [tokenAddress: string]: TokenWithSupply }> => {
  const multicallResults = await getMulticallResults(readProvider, tokenAddresses, erc20Abi, [
    { reference: 'symbol', methodName: 'symbol', methodParameters: [] },
    { reference: 'name', methodName: 'name', methodParameters: [] },
    { reference: 'decimals', methodName: 'decimals', methodParameters: [] },
    { reference: 'totalSupply', methodName: 'totalSupply', methodParameters: [] }
  ])

  const chainId = (await readProvider.getNetwork())?.chainId

  const formattedResult: { [tokenAddress: string]: TokenWithSupply } = {}
  tokenAddresses.forEach((address) => {
    formattedResult[address] = {
      chainId,
      address,
      symbol: multicallResults[address]['symbol']?.[0],
      name: multicallResults[address]['name']?.[0],
      decimals: multicallResults[address]['decimals']?.[0],
      totalSupply: BigNumber.from(multicallResults[address]['totalSupply']?.[0] ?? 0).toString()
    }
  })

  return formattedResult
}

/**
 * Returns an address's token allowance to a specific contract for the provided token addresses
 * @param readProvider a read-capable provider to query through
 * @param address address to check allowances for
 * @param spenderAddress the contract address that can potentially spend the allowed tokens
 * @param tokenAddresses token addresses to query allowances for
 * @returns
 */
export const getTokenAllowances = async (
  readProvider: providers.Provider,
  address: string,
  spenderAddress: string,
  tokenAddresses: string[]
): Promise<{ [tokenAddress: string]: BigNumber }> => {
  const multicallResults = await getMulticallResults(readProvider, tokenAddresses, erc20Abi, [
    { reference: 'allowance', methodName: 'allowance', methodParameters: [address, spenderAddress] }
  ])

  const formattedResult: { [tokenAddress: string]: BigNumber } = {}
  tokenAddresses.forEach((tokenAddress) => {
    formattedResult[tokenAddress] = BigNumber.from(
      multicallResults[tokenAddress]['allowance']?.[0] ?? 0
    )
  })

  return formattedResult
}

/**
 * Returns an address's token balances for the provided token addresses
 * @param readProvider a read-capable provider to query through
 * @param address address to check for balances in
 * @param tokenAddresses token addresses to query balances for
 * @returns
 */
export const getTokenBalances = async (
  readProvider: providers.Provider,
  address: string,
  tokenAddresses: string[]
): Promise<{ [tokenAddress: string]: TokenWithBalance }> => {
  const multicallResults = await getMulticallResults(readProvider, tokenAddresses, erc20Abi, [
    { reference: 'symbol', methodName: 'symbol', methodParameters: [] },
    { reference: 'name', methodName: 'name', methodParameters: [] },
    { reference: 'decimals', methodName: 'decimals', methodParameters: [] },
    { reference: 'balanceOf', methodName: 'balanceOf', methodParameters: [address] }
  ])

  const chainId = (await readProvider.getNetwork())?.chainId

  const formattedResult: { [tokenAddress: string]: TokenWithBalance } = {}
  tokenAddresses.forEach((tokenAddress) => {
    formattedResult[tokenAddress] = {
      chainId,
      address: tokenAddress,
      symbol: multicallResults[tokenAddress]['symbol']?.[0],
      name: multicallResults[tokenAddress]['name']?.[0],
      decimals: multicallResults[tokenAddress]['decimals']?.[0],
      balance: BigNumber.from(multicallResults[tokenAddress]['balanceOf']?.[0] ?? 0).toString()
    }
  })

  return formattedResult
}
