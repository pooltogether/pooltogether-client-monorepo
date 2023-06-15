import { Button, LINKS } from '@shared/ui'
import classNames from 'classnames'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CryptoSection {
  className?: string
}

export const CryptoSection = (props: CryptoSection) => {
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
          <img src='/backgrounds/static/indexSection4.svg' className='w-full hidden md:block' />
          <img src='/backgrounds/static/mobileIndexSection4.svg' className='w-full md:hidden' />
        </>
      )}
      {!isReducedMotion && (
        <>
          <object
            type='image/svg+xml'
            data='/backgrounds/animated/indexSection4.svg'
            className='w-full hidden md:block'
          />
          <object
            type='image/svg+xml'
            data='/backgrounds/static/mobileIndexSection4.svg' // TODO: swap for animated version
            className='w-full md:hidden'
          />
        </>
      )}
      <div className='absolute inset-0'>
        <TextBanner className='w-full mt-[58%] md:mt-[38%]' />
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
    <div className={classNames('flex flex-col items-center text-center px-6 md:px-0', className)}>
      <span className='px-2 font-averta font-bold text-clamp-4xl leading-normal text-pt-bg-purple-darker md:px-0'>
        Why a Crypto Protocol?
      </span>
      <span className='font-averta font-bold text-clamp-4xl leading-normal mb-2 md:mb-6'>
        Because it's 100% Transparent & Free
      </span>
      <span className='text-clamp-xl text-pt-purple-100 mb-6 md:max-w-[55%] md:mb-10 4xl:max-w-[50%]'>
        Protocols automate services according to unchangeable rules. This makes prize savings more
        transparent, fair and accessible.
      </span>
      <Button href={LINKS.docs} target='_blank' color='white' outline={true}>
        <span className='text-base'>Learn how it works</span>
      </Button>
    </div>
  )
}
