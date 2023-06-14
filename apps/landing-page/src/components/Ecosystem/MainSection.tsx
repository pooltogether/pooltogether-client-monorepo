import classNames from 'classnames'
import { EcosystemCard, ecosystemCardInfo } from './EcosystemCard'

interface MainSection {
  className?: string
}

// TODO: this page isn't perfect - awkward card sizing and background is longer than necessary on large screens
export const MainSection = (props: MainSection) => {
  const { className } = props

  return (
    <section className={classNames('w-full relative flex', className)}>
      <img src='/backgrounds/static/ecosystemSection1.svg' className='w-full' />
      <div className='absolute inset-0'>
        <TextBanner className='absolute w-full mt-[16%]' />
        <div className='absolute w-full h-[77%] flex flex-col gap-16 mt-[28%] overflow-hidden'>
          <CardRow
            iconSrc='/icons/addIcon.svg'
            title='Deposit & Withdraw'
            cards={['ptApp_v4', 'poolExplorer']}
          />
          <CardRow
            iconSrc='/icons/puzzleIcon.svg'
            title='Extend PoolTogether'
            cards={['depositDelegator']}
          />
          <CardRow
            iconSrc='/icons/presentationIcon.svg'
            title='Tools'
            cards={['treasury', 'tally', 'dune_v4', 'prizeCalc']}
          />
        </div>
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
    <div
      className={classNames(
        'flex flex-col items-center text-center text-clamp-base text-pt-purple-50',
        className
      )}
    >
      <span className='mb-1 font-averta font-bold text-clamp-4xl leading-normal'>
        The PoolTogether <span className='text-pt-purple-400'>Ecosystem</span>
      </span>
      <span>Check out tools and extensions for the PoolTogether protocol</span>
    </div>
  )
}

interface CardRowProps {
  iconSrc: `${string}.svg`
  title: string
  cards: (keyof typeof ecosystemCardInfo)[]
}

const CardRow = (props: CardRowProps) => {
  const { iconSrc, title, cards } = props

  return (
    <div className='flex flex-col gap-4 items-center'>
      <div className='flex gap-3 items-center text-pt-purple-50'>
        <img src={iconSrc} className='h-9 w-auto text-pt-purple-300' />
        <span className='text-clamp-xl'>{title}</span>
      </div>
      <div className='w-full flex flex-wrap gap-4 justify-center'>
        {cards.map((cardType) => (
          <EcosystemCard key={`${cardType}-card`} type={cardType} className='w-[30%] max-w-xl' />
        ))}
      </div>
    </div>
  )
}
