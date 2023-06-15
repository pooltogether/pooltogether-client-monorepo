import { formatNumberForDisplay } from '@shared/utilities'
import classNames from 'classnames'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface HeroSection {
  className?: string
}

export const HeroSection = (props: HeroSection) => {
  const { className } = props

  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsReducedMotion(true)
    }
  }, [])

  return (
    <section className={classNames('w-full relative flex ', className)}>
      {isReducedMotion && (
        <>
          <img src='/backgrounds/static/indexSection1.svg' className='w-full hidden md:block' />
          <img src='/backgrounds/static/mobileIndexSection1.svg' className='w-full md:hidden' />
        </>
      )}
      {!isReducedMotion && (
        <>
          <object
            type='image/svg+xml'
            data='/backgrounds/animated/indexSection1.svg'
            className='w-full hidden md:block'
          />
          <object
            type='image/svg+xml'
            data='/backgrounds/static/mobileIndexSection1.svg' // TODO: swap for animated version
            className='w-full md:hidden'
          />
        </>
      )}
      <div className='absolute inset-0'>
        <TextBanner className='w-full md:max-w-[35%] md:mt-[6.5%] md:ml-[5%]' />
      </div>
    </section>
  )
}

interface TextBannerProps {
  className?: string
}

const TextBanner = (props: TextBannerProps) => {
  const { className } = props

  // TODO: get actual number of unique wallets
  const numWallets = 56_000
  const formattedNumWallets = formatNumberForDisplay(Math.floor(numWallets / 1_000) * 1_000)

  return (
    <div
      className={classNames(
        'flex flex-col gap-2 px-4 text-center md:gap-6 md:px-0 md:text-start',
        className
      )}
    >
      <h1 className='font-averta font-bold text-clamp-5xl leading-tight md:flex md:flex-col'>
        <span className='md:whitespace-nowrap'>
          The <span className='text-pt-purple-400'>#1 Protocol</span> for
        </span>
        <span>
          <span className='md:hidden'> </span>Real Adoption
        </span>
      </h1>
      <span className='text-clamp-2xl font-medium'>
        The permissionless protocol {formattedNumWallets} people are using to win by saving
      </span>
    </div>
  )
}
