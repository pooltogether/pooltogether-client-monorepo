import { PoolTogetherApiGasEstimate } from 'pt-types'
import { POOLTOGETHER_API_URL } from '../constants'

/**
 * Returns a gas cost estimate for a given chain ID
 * @param chainId chain ID to get a gas estimate for
 * @returns
 */
export const getGasEstimate = async (chainId: number) => {
  const result = await fetch(`${POOLTOGETHER_API_URL}/gas/${chainId}`)
  const gasEstimate: PoolTogetherApiGasEstimate | null = await result.json()
  if (!!gasEstimate) {
    return gasEstimate.result
  } else {
    return undefined
  }
}
