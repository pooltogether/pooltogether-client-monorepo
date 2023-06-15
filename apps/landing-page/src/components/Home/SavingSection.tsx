import classNames from 'classnames'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SimpleTextBanner } from '@components/SimpleTextBanner'
import { SavingCard } from './SavingCard'

interface SavingSection {
  className?: string
}

export const SavingSection = (props: SavingSection) => {
  const { className } = props

  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsReducedMotion(true)
    }
  }, [])

  return (
    <section className={classNames('w-full relative flex', className)}>
      {isReducedMotion && (
        <>
          <img src='/backgrounds/static/indexSection2.svg' className='w-full hidden md:block' />
          <img src='/backgrounds/static/mobileIndexSection2.svg' className='w-full md:hidden' />
        </>
      )}
      {!isReducedMotion && (
        <>
          <object
            type='image/svg+xml'
            data='/backgrounds/animated/indexSection2.svg'
            className='w-full hidden md:block'
          />
          <object
            type='image/svg+xml'
            data='/backgrounds/static/mobileIndexSection2.svg' // TODO: swap for animated version
            className='w-full md:hidden'
          />
        </>
      )}
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
