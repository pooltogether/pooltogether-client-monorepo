import classNames from 'classnames'
import { SimpleTextBanner } from '@components/SimpleTextBanner'
import { SvgBackground } from '@components/SvgBackground'
import { SavingCard } from './SavingCard'

interface SavingSection {
  className?: string
}

export const SavingSection = (props: SavingSection) => {
  const { className } = props

  return (
    <section className={classNames('w-full relative flex', className)}>
      <SvgBackground
        bg='indexSection2.svg'
        smallBg='mobileIndexSection2.svg'
        animatedBg='indexSection2.svg'
      />
      <div className='absolute inset-0'>
        <SimpleTextBanner
          title={
            <>
              PoolTogether is for <span className='text-pt-purple-400'>Saving</span> &{' '}
              <span className='text-pt-purple-400'>Winning</span>
            </>
          }
          className='absolute w-full h-[24.9%] px-10 md:h-auto md:mt-[9%] md:px-0'
          titleClassName='!my-auto'
        />
        <SavingCards className='absolute w-full mt-[93.5%] h-[69.5%] md:max-w-[77%] md:h-auto md:mt-[25%] md:ml-[11%]' />
      </div>
    </section>
  )
}

interface SavingCardsProps {
  className?: string
}

const SavingCards = (props: SavingCardsProps) => {
  const { className } = props

  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-evenly md:flex-row md:justify-between',
        className
      )}
    >
      <SavingCard type='deposit' className='max-w-[60%] md:grow md:max-w-[30%]' />
      <SavingCard type='winPrizes' className='max-w-[60%] md:grow md:max-w-[30%]' />
      <SavingCard type='noLoss' className='max-w-[60%] md:grow md:max-w-[30%]' />
    </div>
  )
}
