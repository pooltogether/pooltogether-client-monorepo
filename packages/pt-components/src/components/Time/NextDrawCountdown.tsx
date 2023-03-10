import { useCountdown } from 'pt-generic-hooks'
import { TimeUnit } from 'pt-types'
import { TimeDigits } from './TimeDigits'

export const NextDrawCountdown = () => {
  // TODO: get next draw time
  const { days, hours, minutes } = useCountdown(1_678_824_488)

  return (
    <div className='flex flex-col items-center gap-4'>
      <span className='text-gray-200 font-semibold uppercase'>Next Draw In</span>
      <div className='flex gap-4'>
        <TimeDigits value={days} type={TimeUnit.day} />
        <TimeDigits value={hours} type={TimeUnit.hour} />
        <TimeDigits value={minutes} type={TimeUnit.minute} />
      </div>
    </div>
  )
}
