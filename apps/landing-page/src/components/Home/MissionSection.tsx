import { Button } from '@shared/ui'
import classNames from 'classnames'
import { Section } from '@components/Section'
import { DeveloperCard } from './DeveloperCard'

interface MissionSection {
  className?: string
}

export const MissionSection = (props: MissionSection) => {
  const { className } = props

  return (
    <div className={classNames('relative w-full flex flex-col', className)}>
      <TextBanner className='w-full mt-[20%] mb-[10%] md:absolute md:h-[45.2%] md:mt-0 md:mb-0 md:z-10' />
      <Section
        bg='indexSection3.svg'
        smallBg='mobileIndexSection3.svg'
        animatedBg='indexSection3.svg'
        className='aspect-[375/1494] md:aspect-[1440/1287]'
      >
        <DeveloperBanner className='absolute w-full max-w-[86.8%] h-[25%] mt-[44%] md:max-w-[21%] md:h-[24.8%] md:mt-[55.7%] md:ml-[4%]' />
        <DeveloperCards className='w-full max-w-[60%] h-[50.9%] mt-[174.8%] ml-[20%] md:max-w-[49%] md:h-[18.5%] md:mt-[65%] md:ml-[45.5%]' />
      </Section>
    </div>
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
        'flex flex-col gap-2 items-center justify-center text-center px-4 md:gap-20 md:px-0',
        className
      )}
    >
      <span className='text-xs text-pt-purple-100 md:text-sm'>Why Prize Savings?</span>
      <div className='flex flex-col items-center gap-2 mb-8 text-pt-purple-100 md:mb-0'>
        <span className='font-averta font-bold text-[2rem] leading-tight md:text-[2.5rem] md:leading-normal'>
          <span className='text-pt-purple-400'>The Mission:</span> Financial freedom for all
        </span>
        <span className='text-base md:w-3/4 md:text-xl'>
          Prize savings are a proven tool to help people save money and avoid wealth destroying
          lotteries.
        </span>
      </div>
      <Button href='https://medium.com/pooltogether/the-power-of-no-loss-prize-savings-1f006503f64'>
        <span className='text-base px-[.4em] py-[.2em]'>Read More</span>
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
    <div
      className={classNames(
        'flex flex-col gap-2 justify-center p-4 text-pt-purple-100 md:gap-4 md:p-0',
        className
      )}
    >
      <span className='text-xs md:text-sm'>For Developers</span>
      <span className='font-averta font-bold text-[2rem] leading-tight text-pt-purple-50 md:text-[2.5rem]'>
        Build on PoolTogether
      </span>
      <span className='text-base md:text-xl'>
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
    <div
      className={classNames('flex flex-col gap-12 justify-between md:flex-row md:gap-4', className)}
    >
      <DeveloperCard type='v4Docs' className='grow' />
      <DeveloperCard type='docs' className='grow' />
      <DeveloperCard type='addToken' className='grow' />
    </div>
  )
}
