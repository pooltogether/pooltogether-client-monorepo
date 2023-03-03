import { CheckIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

interface CurrencySelectorProps {
  currencyId: string
  setCurrencyId: (id: string) => void
  currencies: { [id: string]: { name: string; symbol: string } }
}

export const CurrencySelector = (props: CurrencySelectorProps) => {
  const { currencyId, setCurrencyId, currencies } = props

  return (
    <div className='flex flex-col items-center gap-4'>
      <span className='text-xl font-semibold dark:text-pt-purple-300'>Customize Currency</span>
      {Object.keys(currencies).map((id) => {
        return (
          <CurrencyItem
            key={`curr-item-${id}`}
            id={id}
            selectedCurrencyId={currencyId}
            setSelectedCurrencyId={setCurrencyId}
            currencies={currencies}
          />
        )
      })}
    </div>
  )
}

interface CurrencyItemProps {
  id: string
  selectedCurrencyId: string
  setSelectedCurrencyId: (id: string) => void
  currencies: { [id: string]: { name: string; symbol: string } }
}

const CurrencyItem = (props: CurrencyItemProps) => {
  const { id, selectedCurrencyId, setSelectedCurrencyId, currencies } = props

  return (
    <div
      className={classNames(
        'w-full rounded-lg p-4 dark:bg-pt-purple-600/40 dark:hover:bg-pt-purple-600/60 cursor-pointer select-none',
        { 'outline outline-2 outline-pt-teal-dark': id === selectedCurrencyId }
      )}
      onClick={() => {
        setSelectedCurrencyId(id)
      }}
    >
      <span className='flex items-center justify-center gap-2 dark:text-pt-purple-50'>
        {id === selectedCurrencyId && <CheckIcon className='h-4 w-4 dark:text-inherit' />}
        {`${currencies[id].name} (${currencies[id].symbol})`}
      </span>
    </div>
  )
}
