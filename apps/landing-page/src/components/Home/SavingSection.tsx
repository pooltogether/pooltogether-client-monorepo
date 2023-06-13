import classNames from 'classnames'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
      {isReducedMotion && <img src='/backgrounds/static/indexSection2.svg' className='w-full' />}
      {!isReducedMotion && (
        <object
          type='image/svg+xml'
          data='/backgrounds/animated/indexSection2.svg'
          className='w-full'
        />
      )}
      <div className='absolute inset-0'>
        <TextBanner className='absolute w-full mt-[9%]' />
        <SavingCards className='absolute w-full max-w-[77%] mt-[25%] ml-[11%]' />
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
    <div className={classNames('font-averta font-bold text-center text-clamp-4xl', className)}>
      PoolTogether is for <span className='text-pt-purple-400'>Saving</span> &{' '}
      <span className='text-pt-purple-400'>Winning</span>
    </div>
  )
}

interface SavingCardsProps {
  className?: string
}

const SavingCards = (props: SavingCardsProps) => {
  const { className } = props

  return (
    <div className={classNames('flex justify-between', className)}>
      <SavingCard type='deposit' className='grow max-w-[30%]' />
      <SavingCard type='winPrizes' className='grow max-w-[30%]' />
      <SavingCard type='noLoss' className='grow max-w-[30%]' />
    </div>
  )
}
