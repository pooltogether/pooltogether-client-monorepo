import { CheckIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { CURRENCY_ID, SUPPORTED_CURRENCIES, useSelectedCurrency } from 'pt-generic-hooks'
import { SettingsModalView } from '.'

interface CurrencySelectorProps {
  setView: (view: SettingsModalView) => void
}

export const CurrencySelector = (props: CurrencySelectorProps) => {
  const { setView } = props

  const currencies = Object.keys(SUPPORTED_CURRENCIES) as CURRENCY_ID[]

  return (
    <div className='flex flex-col items-center gap-4'>
      <span className='text-xl font-semibold dark:text-pt-purple-300 order-first'>
        Customize Currency
      </span>
      {currencies.map((id) => {
        return <CurrencyItem key={`curr-item-${id}`} id={id} setView={setView} />
      })}
    </div>
  )
}

interface CurrencyItemProps {
  id: CURRENCY_ID
  setView: (view: SettingsModalView) => void
}

const CurrencyItem = (props: CurrencyItemProps) => {
  const { id, setView } = props

  const { selectedCurrency, setSelectedCurrency } = useSelectedCurrency()

  return (
    <div
      className={classNames(
        'w-full rounded-lg p-4 dark:bg-pt-purple-600/40 dark:hover:bg-pt-purple-600/60 cursor-pointer select-none',
        { 'outline outline-2 outline-pt-teal-dark -order-1': id === selectedCurrency }
      )}
      onClick={() => {
        setSelectedCurrency(id)
        setView('menu')
      }}
    >
      <span className='flex items-center justify-center gap-2 dark:text-pt-purple-50'>
        {id === selectedCurrency && <CheckIcon className='h-4 w-4 dark:text-inherit' />}
        {`${SUPPORTED_CURRENCIES[id].name} (${SUPPORTED_CURRENCIES[id].symbol})`}
      </span>
    </div>
  )
}
