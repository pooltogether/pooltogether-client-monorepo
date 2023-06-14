import { Button } from '@shared/ui'
import classNames from 'classnames'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { DeveloperCard } from './DeveloperCard'

interface MissionSection {
  className?: string
}

export const MissionSection = (props: MissionSection) => {
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
      {isReducedMotion && <img src='/backgrounds/static/indexSection3.svg' className='w-full' />}
      {!isReducedMotion && (
        <object
          type='image/svg+xml'
          data='/backgrounds/animated/indexSection3.svg'
          className='w-full'
        />
      )}
      <div className='absolute inset-0'>
        <TextBanner className='absolute w-full mt-[12%]' />
        <DeveloperBanner className='absolute w-full max-w-[21%] mt-[63%] ml-[4%]' />
        <DeveloperCards className='absolute w-full h-[18.5%] max-w-[47.5%] mt-[65%] ml-[46%]' />
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
    <div className={classNames('flex flex-col items-center gap-20 text-center', className)}>
      <span className='text-clamp-sm text-pt-purple-100'>Why Prize Savings?</span>
      <div className='flex flex-col items-center gap-2 text-pt-purple-100'>
        <span className='font-averta font-bold text-clamp-4xl leading-normal'>
          <span className='text-pt-purple-400'>The Mission:</span> Financial freedom for all
        </span>
        <span className='text-clamp-xl w-3/4'>
          Prize savings are a proven tool to help people save money and avoid wealth destroying
          lotteries.
        </span>
      </div>
      <Button href='https://medium.com/pooltogether/the-power-of-no-loss-prize-savings-1f006503f64'>
        <span className='text-clamp-base px-[.4em] py-[.2em]'>Read More</span>
      </Button>
    </div>
  )
}

interface DeveloperBannerProps {
  className?: string
}

const DeveloperBanner = (props: DeveloperBannerProps) => {
  const { className } = props

  return (
    <div className={classNames('flex flex-col gap-4 text-pt-purple-100', className)}>
      <span className='text-clamp-sm'>For Developers</span>
      <span className='font-averta font-bold text-clamp-4xl leading-tight text-pt-purple-50'>
        Build on PoolTogether
      </span>
      <span className='text-clamp-xl'>
        PoolTogether unlocks organic usage for wallets & blockchains
      </span>
    </div>
  )
}

interface DeveloperCardsProps {
  className?: string
}

const DeveloperCards = (props: DeveloperCardsProps) => {
  const { className } = props

  return (
    <div className={classNames('flex justify-between gap-4', className)}>
      <DeveloperCard type='v4Docs' className='grow' />
      <DeveloperCard type='docs' className='grow' />
      <DeveloperCard type='addToken' className='grow' />
    </div>
  )
}
