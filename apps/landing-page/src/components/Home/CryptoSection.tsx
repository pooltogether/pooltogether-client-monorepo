import { Button, LINKS } from '@shared/ui'
import classNames from 'classnames'
import { Section } from '@components/Section'

interface CryptoSection {
  className?: string
}

export const CryptoSection = (props: CryptoSection) => {
  const { className } = props

  return (
    <Section
      bg='indexSection4.svg'
      smallBg='mobileIndexSection4.svg'
      animatedBg='indexSection4.svg'
      className={classNames('aspect-[375/652] md:aspect-[1440/925]', className)}
    >
      <TextBanner className='w-full mt-[58%] md:h-full md:mt-[26.8%]' />
    </Section>
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
        'flex flex-col items-center justify-center text-center px-6 md:px-0',
        className
      )}
    >
      <span className='px-2 font-averta font-bold text-[2rem] leading-normal text-pt-bg-purple-darker md:px-0 md:text-[2.5rem]'>
        Why a Crypto Protocol?
      </span>
      <span className='mb-2 font-averta font-bold text-[2rem] leading-normal md:mb-6 md:text-[2.5rem]'>
        Because it's 100% Transparent & Free
      </span>
      <span className='text-base text-pt-purple-100 mb-6 md:max-w-[55%] md:mb-10 md:text-xl 4xl:max-w-[50%]'>
        Protocols automate services according to unchangeable rules. This makes prize savings more
        transparent, fair and accessible.
      </span>
      <Button href={LINKS.docs} target='_blank' color='white' outline={true}>
        <span className='text-base'>Learn how it works</span>
      </Button>
    </div>
  )
}
