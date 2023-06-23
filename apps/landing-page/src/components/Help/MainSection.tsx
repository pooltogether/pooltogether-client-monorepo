import classNames from 'classnames'
import { Section } from '@components/Section'
import { SimpleTextBanner } from '@components/SimpleTextBanner'
import { HelpCard } from './HelpCard'

interface MainSection {
  className?: string
}

export const MainSection = (props: MainSection) => {
  const { className } = props

  return (
    <Section
      bg='helpSection1.svg'
      smallBg='mobileHelpSection1.svg'
      className={classNames('aspect-[375/667] md:aspect-[1440/1036]', className)}
    >
      <SimpleTextBanner
        title={
          <>
            <span className='text-pt-purple-400'>Get Help</span> With PoolTogether
          </>
        }
        description={
          <>
            <span className='hidden md:block'>
              PoolTogether is an open source protocol for{' '}
              <span className='text-pt-teal'>Prize Linked Savings</span>.
            </span>
            <span>
              This page can help you learn about the protocol, how it works and how to use it.
            </span>
          </>
        }
        className='absolute w-full mt-[28%] md:h-1/3 md:justify-end md:mt-0'
        titleClassName='max-w-[1440px] md:mb-4'
        descriptionClassName='max-w-[1440px] flex flex-col'
      />
      <HelpCards className='w-full mt-[75%] mb-8 mx-auto md:max-w-[min(82%,_1440px)] md:h-[54%] md:mt-[27.3%] md:mb-0' />
    </Section>
  )
}

interface HelpCardsProps {
  className?: string
}

const HelpCards = (props: HelpCardsProps) => {
  const { className } = props

  return (
    <div
      className={classNames(
        'grid grid-cols-1 auto-rows-fr gap-3 px-4 md:grid-cols-3 md:gap-8 md:px-0',
        className
      )}
    >
      <HelpCard type='about' className='mx-auto' />
      <HelpCard type='gettingStarted' className='mx-auto' />
      <HelpCard type='faq' className='mx-auto' />
      <HelpCard type='guides' className='mx-auto' />
      <HelpCard type='discord' className='mx-auto' />
    </div>
  )
}
