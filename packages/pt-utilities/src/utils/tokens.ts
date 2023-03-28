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
  const formattedResult: { [tokenAddress: string]: TokenWithSupply } = {}

  if (tokenAddresses?.length > 0) {
    const multicallResults = await getMulticallResults(readProvider, tokenAddresses, erc20Abi, [
      { reference: 'symbol', methodName: 'symbol', methodParameters: [] },
      { reference: 'name', methodName: 'name', methodParameters: [] },
      { reference: 'decimals', methodName: 'decimals', methodParameters: [] },
      { reference: 'totalSupply', methodName: 'totalSupply', methodParameters: [] }
    ])

    const chainId = (await readProvider.getNetwork())?.chainId

    tokenAddresses.forEach((address) => {
      const symbol = multicallResults[address]['symbol']?.[0]
      const name = multicallResults[address]['name']?.[0]
      const decimals = parseInt(multicallResults[address]['decimals']?.[0])
      const totalSupply = BigNumber.from(
        multicallResults[address]['totalSupply']?.[0] ?? 0
      ).toString()

      if (!symbol || Number.isNaN(decimals)) {
        console.warn(`Invalid ERC20 token: ${address} on chain ID ${chainId}.`)
      }

      formattedResult[address] = { chainId, address, symbol, name, decimals, totalSupply }
    })
  }

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
  const formattedResult: { [tokenAddress: string]: BigNumber } = {}

  if (tokenAddresses?.length > 0) {
    const multicallResults = await getMulticallResults(readProvider, tokenAddresses, erc20Abi, [
      {
        reference: 'allowance',
        methodName: 'allowance',
        methodParameters: [address, spenderAddress]
      }
    ])

    tokenAddresses.forEach((tokenAddress) => {
      formattedResult[tokenAddress] = BigNumber.from(
        multicallResults[tokenAddress]['allowance']?.[0] ?? 0
      )
    })
  }

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
  const formattedResult: { [tokenAddress: string]: TokenWithBalance } = {}

  if (tokenAddresses?.length > 0) {
    const multicallResults = await getMulticallResults(readProvider, tokenAddresses, erc20Abi, [
      { reference: 'symbol', methodName: 'symbol', methodParameters: [] },
      { reference: 'name', methodName: 'name', methodParameters: [] },
      { reference: 'decimals', methodName: 'decimals', methodParameters: [] },
      { reference: 'balanceOf', methodName: 'balanceOf', methodParameters: [address] }
    ])

    const chainId = (await readProvider.getNetwork())?.chainId

    tokenAddresses.forEach((tokenAddress) => {
      const symbol = multicallResults[tokenAddress]['symbol']?.[0]
      const name = multicallResults[tokenAddress]['name']?.[0]
      const decimals = parseInt(multicallResults[tokenAddress]['decimals']?.[0])
      const balance = BigNumber.from(
        multicallResults[tokenAddress]['balanceOf']?.[0] ?? 0
      ).toString()

      if (!symbol || Number.isNaN(decimals)) {
        console.warn(`Invalid ERC20 token: ${address} on chain ID ${chainId}.`)
      }

      formattedResult[tokenAddress] = {
        chainId,
        address: tokenAddress,
        symbol,
        name,
        decimals,
        balance
      }
    })
  }

  return formattedResult
}
