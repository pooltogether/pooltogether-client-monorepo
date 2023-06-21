import classNames from 'classnames'
import { SimpleTextBanner } from '@components/SimpleTextBanner'
import { SvgBackground } from '@components/SvgBackground'
import { HelpCard } from './HelpCard'

interface MainSection {
  className?: string
}

export const MainSection = (props: MainSection) => {
  const { className } = props

  return (
    <section
      className={classNames(
        'relative w-full flex flex-col isolate aspect-[375/667] md:aspect-[1440/1036]',
        className
      )}
    >
      <SvgBackground bg='helpSection1.svg' smallBg='mobileHelpSection1.svg' />
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
        className='absolute w-full mt-[30%] md:mt-[15.5%]'
        titleClassName='md:mb-4'
        descriptionClassName='flex flex-col'
      />
      <HelpCards className='w-full mt-[75%] mb-8 md:max-w-[82%] md:h-[54%] md:mt-[27.3%] md:ml-[9%]' />
    </section>
  )
}

interface HelpCardsProps {
  className?: string
}

// TODO: this should be a flex element on small screens so that it can wrap nicer on tablet sizes
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
