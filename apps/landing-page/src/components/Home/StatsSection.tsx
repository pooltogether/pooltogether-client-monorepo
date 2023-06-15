import classNames from 'classnames'

interface StatsSection {
  className?: string
}

export const StatsSection = (props: StatsSection) => {
  const { className } = props

  // TODO: get actual stats and format them
  const stats: StatProps[] = [
    { title: 'Total Prizes Awarded', value: '$2.2 Million' },
    { title: 'Saved With PoolTogether', value: '$11.8 Million' },
    { title: 'Unique Wallets', value: '56,000+' },
    { title: 'Losses Ever', value: '0' }
  ]

  return (
    <section
      className={classNames(
        'relative w-full grid grid-cols-2 gap-6 items-center justify-between px-4 py-12',
        'md:flex md:mt-20 md:mb-10 md:px-0 md:py-0 xl:max-w-[75%]',
        className
      )}
    >
      {stats.map((stat, i) => (
        <Stat key={`stat-${i}`} {...stat} />
      ))}
    </section>
  )
}

interface StatProps {
  title: string
  value: string
}

export const Stat = (props: StatProps) => {
  const { title, value } = props

  return (
    <div className='flex flex-col grow items-center text-pt-purple-100 md:w-0'>
      <span className='text-clamp-2xl font-averta font-bold md:text-clamp-3xl'>{value}</span>
      <span className='text-clamp-base'>{title}</span>
    </div>
  )
}
