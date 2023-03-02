import { CheckIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { selectedCurrencyAtom } from '@atoms'
import { CURRENCY_ID, SUPPORTED_CURRENCIES } from '@constants/currencies'

export const CurrencySelector = () => {
  const currencyIds = Object.keys(SUPPORTED_CURRENCIES) as CURRENCY_ID[]

  return (
    <div className='flex flex-col items-center gap-4'>
      <span className='text-xl font-semibold dark:text-pt-purple-300'>Customize Currency</span>
      {currencyIds.map((currencyId) => {
        return <CurrencyItem key={`curr-item-${currencyId}`} id={currencyId} />
      })}
    </div>
  )
}

interface CurrencyItemProps {
  id: CURRENCY_ID
}

const CurrencyItem = (props: CurrencyItemProps) => {
  const { id } = props

  const [currencyId, setCurrencyId] = useAtom(selectedCurrencyAtom)

  return (
    <div
      className={classNames(
        'w-full rounded-lg p-4 dark:bg-pt-purple-600/40 dark:hover:bg-pt-purple-600/60 cursor-pointer select-none',
        { 'outline outline-2 outline-pt-teal-dark': id === currencyId }
      )}
      onClick={() => {
        setCurrencyId(id)
      }}
    >
      <span className='flex items-center justify-center gap-2 dark:text-pt-purple-50'>
        {id === currencyId && <CheckIcon className='h-4 w-4 dark:text-inherit' />}
        {`${SUPPORTED_CURRENCIES[id].name} (${SUPPORTED_CURRENCIES[id].symbol})`}
      </span>
    </div>
  )
}
