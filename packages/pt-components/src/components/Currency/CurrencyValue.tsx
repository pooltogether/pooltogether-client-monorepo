import { useMemo } from 'react'
import {
  CURRENCY_ID,
  SUPPORTED_CURRENCIES,
  useCoingeckoExchangeRates,
  useSelectedCurrency
} from 'pt-generic-hooks'
import { CountUp, Spinner } from 'pt-ui'
import { calculateCurrencyValue, formatCurrencyNumberForDisplay } from 'pt-utilities'

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

  if (!isFetchedExchangeRates) {
    if (!hideLoading) {
      return <Spinner />
    } else {
      return null
    }
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
