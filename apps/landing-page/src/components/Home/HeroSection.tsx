import classNames from 'classnames'
import { SvgBackground } from '@components/SvgBackground'
import { useFormattedProtocolStats } from '@hooks/useFormattedProtocolStats'

interface HeroSection {
  className?: string
}

export const HeroSection = (props: HeroSection) => {
  const { className } = props

  return (
    <section
      className={classNames(
        'relative w-full flex flex-col isolate aspect-[375/500] md:aspect-[1440/835]',
        className
      )}
    >
      <SvgBackground
        bg='indexSection1.svg'
        smallBg='mobileIndexSection1.svg'
        animatedBg='indexSection1.svg'
      />
      <TextBanner className='w-full h-[34%] md:max-w-[35%] md:h-auto md:mt-[6.5%] md:ml-[5%]' />
    </section>
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
      <h1 className='font-averta font-bold text-clamp-5xl leading-tight md:flex md:flex-col'>
        <span className='mr-[0.5ch] md:mr-0 md:whitespace-nowrap'>
          The <span className='text-pt-purple-400'>#1 Protocol</span> for
        </span>
        <span>Real Adoption</span>
      </h1>
      <span className='text-clamp-2xl font-medium'>
        The permissionless protocol {uniqueWallets} people are using to win by saving
      </span>
    </div>
  )
}
