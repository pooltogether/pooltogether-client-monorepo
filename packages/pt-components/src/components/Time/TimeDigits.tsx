import { TimeUnit } from 'pt-types'

export interface TimeDigitsProps {
  value: number | null
  type: TimeUnit.day | TimeUnit.hour | TimeUnit.minute | TimeUnit.second
}

export const TimeDigits = (props: TimeDigitsProps) => {
  const { value, type } = props

  return (
    <div className='flex flex-col items-center gap-2 text-sm text-gray-300 uppercase'>
      <div className='flex items-center justify-center min-w-[46px] text-2xl font-semibold bg-pt-purple-100 text-pt-pink-dark px-2 py-1 rounded-lg'>
        {value?.toLocaleString(undefined, { minimumIntegerDigits: 2 })}
      </div>
      {type === TimeUnit.day && <span>Days</span>}
      {type === TimeUnit.hour && <span>Hrs</span>}
      {type === TimeUnit.minute && <span>Mins</span>}
      {type === TimeUnit.second && <span>Secs</span>}
    </div>
  )
}
