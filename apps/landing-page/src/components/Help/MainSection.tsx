import classNames from 'classnames'
import { SimpleTextBanner } from '@components/SimpleTextBanner'
import { HelpCard } from './HelpCard'

interface MainSection {
  className?: string
}

export const MainSection = (props: MainSection) => {
  const { className } = props

  return (
    <section className={classNames('w-full relative flex', className)}>
      <img src='/backgrounds/static/helpSection1.svg' className='w-full' />
      <div className='absolute inset-0'>
        <SimpleTextBanner
          title={
            <>
              <span className='text-pt-purple-400'>Get Help</span> With PoolTogether
            </>
          }
          description={
            <>
              <span>
                PoolTogether is an open source protocol for{' '}
                <span className='text-pt-teal'>Prize Linked Savings</span>.
              </span>
              <span>
                This page can help you learn about the protocol, how it works and how to use it.
              </span>
            </>
          }
          className='absolute w-full mt-[15.5%]'
          titleClassName='mb-4'
          descriptionClassName='flex flex-col'
        />
        <HelpCards className='absolute w-full max-w-[82%] h-[54%] mt-[27.3%] ml-[9%]' />
      </div>
    </section>
  )
}

interface HelpCardsProps {
  className?: string
}

const HelpCards = (props: HelpCardsProps) => {
  const { className } = props

  return (
    <div className={classNames('grid grid-cols-3 auto-rows-fr gap-8', className)}>
      <HelpCard type='about' />
      <HelpCard type='gettingStarted' />
      <HelpCard type='faq' />
      <HelpCard type='guides' />
      <HelpCard type='discord' />
    </div>
  )
}
