import classNames from 'classnames'
import { FancyCardRow } from '@components/FancyCardRow'
import { SimpleTextBanner } from '@components/SimpleTextBanner'

interface MainSection {
  className?: string
}

export const MainSection = (props: MainSection) => {
  const { className } = props

  return (
    <section className={classNames('w-full relative flex', className)}>
      <img src='/backgrounds/static/ecosystemSection1.svg' className='w-full' />
      <div className='absolute inset-0'>
        <SimpleTextBanner
          title={
            <>
              The PoolTogether <span className='text-pt-purple-400'>Ecosystem</span>
            </>
          }
          description={<>Check out tools and extensions for the PoolTogether protocol</>}
          className='absolute w-full mt-[16%]'
        />
        <CardRows className='absolute w-full h-[77%] mt-[28%]' />
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
    <div className={classNames('flex flex-col gap-16 overflow-hidden', className)}>
      <FancyCardRow
        iconSrc='/icons/addIcon.svg'
        title='Deposit & Withdraw'
        cards={['ptApp_v4', 'poolExplorer']}
      />
      <FancyCardRow
        iconSrc='/icons/puzzleIcon.svg'
        title='Extend PoolTogether'
        cards={['depositDelegator']}
      />
      <FancyCardRow
        iconSrc='/icons/presentationIcon.svg'
        title='Tools'
        cards={['treasury', 'tally', 'dune_v4', 'prizeCalc']}
      />
    </div>
  )
}
