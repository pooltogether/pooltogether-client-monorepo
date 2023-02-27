import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { useCoingeckoExchangeRates } from 'pt-hooks'
import { LoadingSpinner } from 'pt-ui'
import { calculateCurrencyValue, formatCurrencyNumberForDisplay } from 'pt-utilities'
import { CURRENCY_ID } from '@constants/currencies'
import { selectedCurrencyAtom } from '../atoms'

interface CurrencyValueProps extends Omit<Intl.NumberFormatOptions, 'style' | 'currency'> {
  baseValue: number | string
  baseCurrency?: CURRENCY_ID
  countUp?: boolean
  hideCountUpSymbol?: boolean
  decimals?: number
  locale?: string
  round?: boolean
  hideZeroes?: boolean
}

// TODO: implement CountUp in pt-ui package and uncomment the relevant code here
export const CurrencyValue = (props: CurrencyValueProps) => {
  const { baseValue, baseCurrency, countUp, hideCountUpSymbol, decimals, ...rest } = props

  const { data: exchangeRates, isFetched: isFetchedExchangeRates } = useCoingeckoExchangeRates()
  const currency = useAtomValue(selectedCurrencyAtom)

  const currencyValue = useMemo(() => {
    if (isFetchedExchangeRates && !!exchangeRates) {
      return calculateCurrencyValue(baseValue, currency, exchangeRates, { baseCurrency })
    } else {
      return 0
    }
  }, [isFetchedExchangeRates, exchangeRates, baseValue, currency, baseCurrency])

  if (!isFetchedExchangeRates) {
    return <LoadingSpinner />
    // } else if (options?.countUp) {
    //   return (
    //     <>
    //       {!options?.hideCountUpSymbol && SUPPORTED_CURRENCIES[currency]?.symbol}
    //       <CountUp countTo={currencyValue} decimals={options?.decimals ?? 0} />
    //     </>
    //   )
  } else {
    return <>{formatCurrencyNumberForDisplay(currencyValue, currency, { ...rest })}</>
  }
}
