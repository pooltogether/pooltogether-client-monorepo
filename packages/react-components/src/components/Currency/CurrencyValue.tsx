import {
  CURRENCY_ID,
  SUPPORTED_CURRENCIES,
  useCoingeckoExchangeRates,
  useSelectedCurrency
} from '@pooltogether/generic-react-hooks'
import {
  calculateCurrencyValue,
  formatCurrencyNumberForDisplay
} from '@pooltogether/hyperstructure-client-js'
import { CountUp, Spinner } from '@pooltogether/ui'
import { useMemo } from 'react'

export interface CurrencyValueProps extends Omit<Intl.NumberFormatOptions, 'style' | 'currency'> {
  baseValue: number | string
  baseCurrency?: CURRENCY_ID
  countUp?: boolean
  decimals?: number
  hideCountUpSymbol?: boolean
  hideLoading?: boolean
  locale?: string
  round?: boolean
  hideZeroes?: boolean
}

export const CurrencyValue = (props: CurrencyValueProps) => {
  const { baseValue, baseCurrency, countUp, decimals, hideCountUpSymbol, hideLoading, ...rest } =
    props

  const { data: exchangeRates, isFetched: isFetchedExchangeRates } = useCoingeckoExchangeRates()
  const { selectedCurrency } = useSelectedCurrency()

  const currencyValue = useMemo(() => {
    if (isFetchedExchangeRates && !!exchangeRates) {
      return calculateCurrencyValue(baseValue, selectedCurrency, exchangeRates, { baseCurrency })
    } else {
      return 0
    }
  }, [isFetchedExchangeRates, exchangeRates, baseValue, selectedCurrency, baseCurrency])

  const minValue = 1 / 10 ** (decimals ?? 2)

  if (!isFetchedExchangeRates) {
    if (!hideLoading) {
      return <Spinner />
    } else {
      return null
    }
  } else if (currencyValue > 0 && currencyValue < minValue) {
    return <>{`< ${formatCurrencyNumberForDisplay(minValue, selectedCurrency, { ...rest })}`}</>
  } else if (countUp) {
    return (
      <>
        {!hideCountUpSymbol && SUPPORTED_CURRENCIES[selectedCurrency]?.symbol}
        <CountUp countTo={currencyValue} decimals={decimals} />
      </>
    )
  } else {
    return <>{formatCurrencyNumberForDisplay(currencyValue, selectedCurrency, { ...rest })}</>
  }
}
