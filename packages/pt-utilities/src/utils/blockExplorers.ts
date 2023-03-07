import { BLOCK_EXPLORERS } from '../constants'

/**
 * Returns a block explorer URL for the given token/address
 * @param chainId the chain ID of the token/address
 * @param address the address to link to
 * @param type choose between linking to the address or token page (default is 'address')
 * @returns
 */
export const getBlockExplorerUrl = (
  chainId: number,
  address: string,
  type: 'address' | 'token' = 'address'
): string => {
  if (chainId in BLOCK_EXPLORERS) {
    const baseUrl = BLOCK_EXPLORERS[chainId as keyof typeof BLOCK_EXPLORERS]
    return `${baseUrl}${type}/${address}`
  } else {
    return '#'
  }
}
