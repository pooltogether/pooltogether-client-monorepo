import { BigNumber } from 'ethers'
import { utils } from 'ethers'
import { useCoingeckoSimpleTokenPrices } from 'pt-generic-hooks'
import { CoingeckoTokenPrices, GasCostEstimates } from 'pt-types'
import { COINGECKO_NATIVE_TOKEN_IDS, NETWORK } from 'pt-utilities'
import { useGasPrices } from '..'

/**
 * Returns gas cost estimates in wei and any provided currencies
 * @param chainId chain ID to get gas prices from
 * @param gasAmount amount of gas to be spent
 * @param currencies optional currency override (default is ['eth'])
 * @returns
 */
export const useGasCostEstimates = (
  chainId: NETWORK,
  gasAmount: BigNumber,
  currencies?: string[]
): (GasCostEstimates & { isFetched: true }) | { isFetched: false } => {
  const { data: coingeckoPrices, isFetched: isFetchedCoingeckoPrices } =
    useCoingeckoSimpleTokenPrices(currencies)

  const { data: gasPrices, isFetched: isFetchedGasPrices } = useGasPrices(chainId)

  const isFetched = isFetchedCoingeckoPrices && isFetchedGasPrices

  if (!!coingeckoPrices && !!gasPrices && isFetched) {
    const gasPriceWei = BigNumber.from(Math.round(gasPrices.ProposeGasPrice * 1000))
      .mul(utils.parseUnits('1', 9))
      .div(1000)
    const totalGasWei = gasPriceWei.mul(gasAmount)

    const gasCostEstimates: GasCostEstimates = { totalGasWei, totalGasCurrencies: {} }

    if (!!currencies && currencies.length > 0) {
      currencies.forEach((currency) => {
        const totalGasCost = calculateGasCostInCurrency(
          coingeckoPrices,
          chainId,
          currency,
          totalGasWei
        )
        if (!!totalGasCost) {
          gasCostEstimates.totalGasCurrencies[currency] = totalGasCost
        }
      })
    } else {
      const totalGasCost = calculateGasCostInCurrency(coingeckoPrices, chainId, 'eth', totalGasWei)
      if (!!totalGasCost) {
        gasCostEstimates.totalGasCurrencies['eth'] = totalGasCost
      }
    }

    return { ...gasCostEstimates, isFetched }
  } else {
    return { isFetched: false }
  }
}

/**
 * Helper function to calculate gas costs in any currency
 * @param coingeckoPrices native token prices from CoinGecko
 * @param chainId chain ID to calculate gas costs for
 * @param currency currency to convert price to
 * @param totalGasWei amount of gas to be spent in wei
 * @returns
 */
const calculateGasCostInCurrency = (
  coingeckoPrices: CoingeckoTokenPrices,
  chainId: NETWORK,
  currency: string,
  totalGasWei: BigNumber
) => {
  const tokenPrice = coingeckoPrices[COINGECKO_NATIVE_TOKEN_IDS[chainId]]?.[currency]
  if (!!tokenPrice) {
    const totalGasCost = utils.formatUnits(
      totalGasWei.mul(Math.round(tokenPrice * 100).toString()).div(100),
      18
    )
    return totalGasCost
  } else {
    return undefined
  }
}
