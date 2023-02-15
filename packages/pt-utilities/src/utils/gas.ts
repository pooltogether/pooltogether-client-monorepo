import { PoolTogetherApiGasPrices } from 'pt-types'
import { POOLTOGETHER_API_URL } from '../constants'

/**
 * Returns gas prices for a given chain ID
 * @param chainId chain ID to get gas prices for
 * @returns
 */
export const getGasPrices = async (chainId: number) => {
  const result = await fetch(`${POOLTOGETHER_API_URL}/gas/${chainId}`)
  const gasPrices: { result: PoolTogetherApiGasPrices } | null = (await result.json())?.result
  if (!!gasPrices) {
    return gasPrices.result
  } else {
    return undefined
  }
}
