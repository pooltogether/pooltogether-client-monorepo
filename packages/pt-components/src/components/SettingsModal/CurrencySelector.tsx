import { CheckIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { CURRENCY_ID, SUPPORTED_CURRENCIES, useSelectedCurrency } from 'pt-generic-hooks'
import { SettingsModalTheme, SettingsModalView } from '.'

interface CurrencySelectorProps {
  setView: (view: SettingsModalView) => void
  theme?: SettingsModalTheme
}

export const CurrencySelector = (props: CurrencySelectorProps) => {
  const { setView, theme } = props

  const currencies = Object.keys(SUPPORTED_CURRENCIES) as CURRENCY_ID[]

  return (
    <div className='flex flex-col items-center gap-4 px-4'>
      <span
        className={classNames('text-xl font-semibold order-first', {
          'text-pt-purple-50': theme === 'light' || theme === undefined,
          'text-pt-purple-300': theme === 'dark'
        })}
      >
        Customize Currency
      </span>
      {currencies.map((id) => {
        return <CurrencyItem key={`curr-item-${id}`} id={id} setView={setView} theme={theme} />
      })}
    </div>
  )
}

interface CurrencyItemProps {
  id: CURRENCY_ID
  setView: (view: SettingsModalView) => void
  theme?: SettingsModalTheme
}

const CurrencyItem = (props: CurrencyItemProps) => {
  const { id, setView, theme } = props

  const { selectedCurrency, setSelectedCurrency } = useSelectedCurrency()

  return (
    <div
      className={classNames(
        'w-full rounded-lg p-4 cursor-pointer select-none',
        {
          'bg-pt-transparent hover:bg-pt-transparent/5': theme === 'light' || theme === undefined,
          'bg-pt-purple-600/40 hover:bg-pt-purple-600/60': theme === 'dark'
        },
        { 'outline outline-2 outline-pt-teal-dark -order-1': id === selectedCurrency }
      )}
      onClick={() => {
        setSelectedCurrency(id)
        setView('menu')
      }}
    >
      <span className='flex items-center justify-center gap-2 text-pt-purple-50'>
        {id === selectedCurrency && <CheckIcon className='h-4 w-4 text-inherit' />}
        {`${SUPPORTED_CURRENCIES[id].name} (${SUPPORTED_CURRENCIES[id].symbol})`}
      </span>
    </div>
  )
}
