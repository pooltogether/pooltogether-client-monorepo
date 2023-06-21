import classNames from 'classnames'
import { FancyCardSection } from '@components/FancyCardSection'
import { SimpleTextBanner } from '@components/SimpleTextBanner'
import { SvgBackground } from '@components/SvgBackground'

interface MainSection {
  className?: string
}

export const MainSection = (props: MainSection) => {
  const { className } = props

  return (
    <section
      className={classNames(
        'relative w-full flex flex-col isolate aspect-[376/667] md:aspect-[1440/1755]',
        className
      )}
    >
      <SvgBackground bg='ecosystemSection1.svg' smallBg='mobileEcosystemSection1.svg' />
      <SimpleTextBanner
        title={
          <>
            The PoolTogether <span className='text-pt-purple-400'>Ecosystem</span>
          </>
        }
        description={<>Check out tools and extensions for the PoolTogether protocol</>}
        className='absolute w-full mt-[28%] md:mt-[16%]'
        descriptionClassName='px-[20%] sm:px-0'
      />
      <CardRows className='w-full mt-[55%] mb-8 md:h-[77%] md:mt-[28%]' />
    </section>
  )
}

interface CardRowsProps {
  className?: string
}

const CardRows = (props: CardRowsProps) => {
  const { className } = props

  return (
    <div className={classNames('flex flex-col gap-6 md:gap-16', className)}>
      <FancyCardSection
        iconSrc='/icons/addIcon.svg'
        title='Deposit & Withdraw'
        cards={['ptApp_v4', 'poolExplorer']}
      />
      <FancyCardSection
        iconSrc='/icons/puzzleIcon.svg'
        title='Extend PoolTogether'
        cards={['depositDelegator']}
      />
      <FancyCardSection
        iconSrc='/icons/presentationIcon.svg'
        title='Tools'
        cards={['treasury', 'tally', 'dune_v4', 'prizeCalc']}
      />
    </div>
  )
}
