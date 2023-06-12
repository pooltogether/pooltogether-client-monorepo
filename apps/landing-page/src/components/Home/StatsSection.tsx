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
        'relative w-full max-w-6xl flex items-center justify-between gap-6 mt-20 mb-10',
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
    <div className='w-0 flex flex-col grow items-center text-pt-purple-100'>
      <span className='text-3xl font-averta font-bold'>{value}</span>
      <span className=''>{title}</span>
    </div>
  )
}
