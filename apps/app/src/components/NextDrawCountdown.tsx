import { TimeUnit } from 'pt-types'
import { SECONDS_PER_DAY, SECONDS_PER_HOUR, SECONDS_PER_MINUTE } from 'pt-utilities'
import { useCountdown } from '@hooks/useCountdown'

export const NextDrawCountdown = () => {
  // TODO: get next draw time
  const nextDrawTime =
    Date.now() / 1_000 + SECONDS_PER_DAY * 4 + SECONDS_PER_HOUR + SECONDS_PER_MINUTE * 22

  const { days, hours, minutes } = useCountdown(nextDrawTime)

  return (
    <div className='flex flex-col items-center gap-4'>
      <span className='text-gray-200 font-semibold uppercase'>Next Draw In</span>
      <div className='flex gap-4'>
        <Digits value={days} type={TimeUnit.day} />
        <Digits value={hours} type={TimeUnit.hour} />
        <Digits value={minutes} type={TimeUnit.minute} />
      </div>
    </div>
  )
}

interface DigitsProps {
  value: number
  type: TimeUnit.day | TimeUnit.hour | TimeUnit.minute | TimeUnit.second
}

const Digits = (props: DigitsProps) => {
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
