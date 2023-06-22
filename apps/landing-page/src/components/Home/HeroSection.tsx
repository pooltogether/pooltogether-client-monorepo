import classNames from 'classnames'
import { Section } from '@components/Section'
import { useFormattedProtocolStats } from '@hooks/useFormattedProtocolStats'

interface HeroSection {
  className?: string
}

export const HeroSection = (props: HeroSection) => {
  const { className } = props

  return (
    <Section
      bg='indexSection1.svg'
      smallBg='mobileIndexSection1.svg'
      animatedBg='indexSection1.svg'
      className={classNames('aspect-[375/500] md:aspect-[1440/835]', className)}
    >
      <div className='relative w-full h-full max-w-[1440px] flex flex-col mx-auto'>
        <TextBanner className='w-full h-[34%] md:max-w-[35%] md:h-[38%] md:mt-[5.7%] md:ml-[5%]' />
      </div>
    </Section>
  )
}

interface TextBannerProps {
  className?: string
}

const TextBanner = (props: TextBannerProps) => {
  const { className } = props

  const { uniqueWallets } = useFormattedProtocolStats()

  return (
    <div
      className={classNames(
        'flex flex-col gap-2 px-4 text-center justify-center md:gap-6 md:px-0 md:text-start',
        className
      )}
    >
      <h1 className='font-averta font-bold text-[2.5rem] leading-tight md:flex md:flex-col md:text-[3.5rem]'>
        <span className='mr-[0.5ch] md:mr-0 md:whitespace-nowrap'>
          The <span className='text-pt-purple-400'>#1 Protocol</span> for
        </span>
        <span>Real Adoption</span>
      </h1>
      <span className='text-base font-medium md:text-2xl'>
        The permissionless protocol {uniqueWallets} people are using to win by saving
      </span>
    </div>
  )
}
