import { formatNumberForDisplay } from '@shared/utilities'
import classNames from 'classnames'

interface HeroSection {
  className?: string
}

export const HeroSection = (props: HeroSection) => {
  const { className } = props

  return (
    <section className={classNames('w-full relative flex', className)}>
      <object type='image/svg+xml' data='/animations/animatedSection1.svg' className='w-full' />
      <div className='absolute inset-0'>
        <TextBanner className='w-full max-w-[35%] mt-[6.5%] ml-[5%]' />
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
    <div className={classNames('flex flex-col gap-6', className)}>
      <h1 className='flex flex-col font-averta font-bold text-clamp-5xl leading-tight'>
        <span className='whitespace-nowrap'>
          The <span className='text-pt-purple-400'>#1 Protocol</span> for
        </span>
        <span>Real Adoption</span>
      </h1>
      <span className='text-clamp-2xl font-medium'>
        The permissionless protocol {formattedNumWallets} people are using to win by saving
      </span>
    </div>
  )
}
