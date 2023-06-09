import classNames from 'classnames'

interface SavingSection {
  className?: string
}

export const SavingSection = (props: SavingSection) => {
  const { className } = props

  return (
    <section className={classNames('w-full relative flex', className)}>
      <object type='image/svg+xml' data='/animations/animatedSection2.svg' className='w-full' />
      <div className='absolute inset-0'>
        <TextBanner className='mt-[9%]' />
      </div>
      <div className='absolute inset-0'>
        <GraphicCards className='w-full max-w-[77%] mt-[25%] ml-[11%]' />
      </div>
    </section>
  )
}

interface TextBannerProps {
  className?: string
}

const TextBanner = (props: TextBannerProps) => {
  const { className } = props

  return (
    <div className={classNames('font-averta font-bold text-center text-[2.5rem]', className)}>
      PoolTogether is for <span className='text-pt-purple-400'>Saving</span> &{' '}
      <span className='text-pt-purple-400'>Winning</span>
    </div>
  )
}

interface GraphicCardsProps {
  className?: string
}

const GraphicCards = (props: GraphicCardsProps) => {
  const { className } = props

  return (
    <div className={classNames('flex justify-between', className)}>
      <GraphicCard type='deposit' className='grow max-w-[30%]' />
      <GraphicCard type='winPrizes' className='grow max-w-[30%]' />
      <GraphicCard type='noLoss' className='grow max-w-[30%]' />
    </div>
  )
}

type GraphicCardType = 'deposit' | 'winPrizes' | 'noLoss'

const graphicCardInfo: Record<
  GraphicCardType,
  { src: `/${string}.svg`; title: string; description: string }
> = {
  deposit: {
    src: '/graphics/DepositGraphic.svg',
    title: 'Deposit',
    description: 'Deposit for a chance to win'
  },
  winPrizes: {
    src: '/graphics/WinPrizesGraphic.svg',
    title: 'Win Prizes',
    description: 'Yield from deposits fund prizes'
  },
  noLoss: {
    src: '/graphics/NoLossGraphic.svg',
    title: 'No Loss',
    description: 'No fees, withdraw any time'
  }
}

interface GraphicCardProps {
  type: GraphicCardType
  className?: string
}

const GraphicCard = (props: GraphicCardProps) => {
  const { type, className } = props

  return (
    <div className={classNames('flex flex-col gap-6', className)}>
      <div className='w-full bg-pt-bg-purple-darker rounded-3xl'>
        <object type='image/svg+xml' data={graphicCardInfo[type].src} className='w-full' />
      </div>
      <div className='flex flex-col gap-2 text-center'>
        <span className='font-averta font-bold text-[2rem] text-pt-purple-100'>
          {graphicCardInfo[type].title}
        </span>
        <span className='text-gray-100'>{graphicCardInfo[type].description}</span>
      </div>
    </div>
  )
}
