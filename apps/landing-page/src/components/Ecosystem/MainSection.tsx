import classNames from 'classnames'
import { FancyCardSection } from '@components/FancyCardSection'
import { Section } from '@components/Section'
import { SimpleTextBanner } from '@components/SimpleTextBanner'

interface MainSection {
  className?: string
}

export const MainSection = (props: MainSection) => {
  const { className } = props

  return (
    <Section
      bg='ecosystemSection1.svg'
      smallBg='mobileEcosystemSection1.svg'
      className={classNames('aspect-[376/667] md:aspect-[1440/1755]', className)}
    >
      <SimpleTextBanner
        title={
          <>
            The PoolTogether <span className='text-pt-purple-400'>Ecosystem</span>
          </>
        }
        description={<>Check out tools and extensions for the PoolTogether protocol</>}
        className='absolute w-full mt-[28%] md:h-[18.2%] md:justify-end md:mt-0'
        titleClassName='max-w-[1440px]'
        descriptionClassName='max-w-[1440px] px-[5%] sm:px-0'
      />
      <CardRows className='w-full max-w-[1440px] mt-[58%] mb-8 mx-auto md:h-[77%] md:mt-[28%] md:mb-0' />
    </Section>
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
