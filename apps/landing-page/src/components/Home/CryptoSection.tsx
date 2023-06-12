import { Button, LINKS } from '@shared/ui'
import classNames from 'classnames'

interface CryptoSection {
  className?: string
}

export const CryptoSection = (props: CryptoSection) => {
  const { className } = props

  return (
    <section className={classNames('w-full relative flex', className)}>
      <object type='image/svg+xml' data='/animations/animatedSection4.svg' className='w-full' />
      <div className='absolute inset-0'>
        <TextBanner className='mt-[38%]' />
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
    <div className={classNames('flex flex-col items-center text-center', className)}>
      <span className='font-averta font-bold text-clamp-4xl leading-normal text-pt-bg-purple-darker'>
        Why a Crypto Protocol?
      </span>
      <span className='font-averta font-bold text-clamp-4xl leading-normal mb-6'>
        Because it's 100% Transparent & Free
      </span>
      <span className='max-w-[55%] text-clamp-xl text-pt-purple-100 mb-10 4xl:max-w-[50%]'>
        Protocols automate services according to unchangeable rules. This makes prize savings more
        transparent, fair and accessible.
      </span>
      <Button href={LINKS.docs} target='_blank' color='white' outline={true}>
        <span className='text-base'>Learn how it works</span>
      </Button>
    </div>
  )
}
