import classNames from 'classnames'
import { ReactNode } from 'react'
import { useFormattedV4Stats } from '@hooks/useV4Stats'

interface StatsSection {
  className?: string
}

export const StatsSection = (props: StatsSection) => {
  const { className } = props

  const { totalPrizesAwarded, totalDeposited, uniqueWallets } = useFormattedV4Stats()

  return (
    <section
      className={classNames(
        'relative w-full grid grid-cols-2 gap-6 items-center justify-between px-4 py-12',
        'md:flex md:mt-20 md:mb-10 md:px-0 md:py-0 xl:max-w-[75%]',
        className
      )}
    >
      <Stat title='Total Prizes Awarded' value={totalPrizesAwarded} />
      <Stat title='Saved With PoolTogether' value={totalDeposited} />
      <Stat title='Unique Wallets' value={`${uniqueWallets}+`} />
      <Stat title='Losses Ever' value='0' />
    </section>
  )
}

interface StatProps {
  title: string
  value: ReactNode
}

export const Stat = (props: StatProps) => {
  const { title, value } = props

  return (
    <div className='flex flex-col grow items-center text-pt-purple-100 md:w-0'>
      <span className='text-clamp-2xl font-averta font-bold md:text-clamp-3xl'>
        <>{value}</>
      </span>
      <span className='text-clamp-base'>{title}</span>
    </div>
  )
}
