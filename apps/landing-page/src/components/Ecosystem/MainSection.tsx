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
    // TODO: ideally we don't have magic numbers for bottom margin here
    <section
      className={classNames(
        'w-full relative flex mb-[105rem] sm:mb-[30rem] md:mb-[36rem] lg:mb-[26rem] 2xl:mb-0',
        className
      )}
    >
      <SvgBackground bg='ecosystemSection1.svg' smallBg='mobileEcosystemSection1.svg' />
      <div className='absolute inset-0'>
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
        <CardRows className='absolute w-full mt-[55%] md:h-[77%] md:mt-[28%]' />
      </div>
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
