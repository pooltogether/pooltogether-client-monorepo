import { LINKS } from '@shared/ui'
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
      <img src='/backgrounds/static/buildersSection1.svg' className='w-full' />
      <div className='absolute inset-0'>
        <SimpleTextBanner
          title={
            <>
              <span className='text-pt-purple-400'>Build</span> on PoolTogether
            </>
          }
          description={
            <>Join the diverse community of developers and designers building on the protocol</>
          }
          className='absolute w-full mt-[16%]'
        />
        <DocsCards className='absolute w-full max-w-[60%] h-[11%] mt-[25.3%] ml-[20%]' />
        <CardRows className='absolute w-full h-[66%] mt-[44%]' />
      </div>
    </section>
  )
}

interface DocsCardsProps {
  className?: string
}

const DocsCards = (props: DocsCardsProps) => {
  const { className } = props

  return (
    <div className={classNames('flex gap-8 items-center', className)}>
      <DocCard href={LINKS.devDocs_v4} version={4} />
      <DocCard href={LINKS.devDocs} version={5} />
    </div>
  )
}

interface DocCardProps {
  href: string
  version: number
  className?: string
}

const DocCard = (props: DocCardProps) => {
  const { href, version, className } = props

  return (
    <a
      href={href}
      target='_blank'
      className={classNames(
        'h-full flex grow gap-4 items-center justify-center px-16 py-12 bg-pt-bg-purple-darker rounded-2xl',
        className
      )}
    >
      <img src='/icons/docIcon.svg' alt='Doc Icon' className='h-12 w-auto' />
      <div className='flex flex-col text-clamp-xl text-pt-purple-50'>
        <span>V{version} Developer</span>
        <span>Documentation</span>
      </div>
    </a>
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
        iconSrc='/icons/codeIcon.svg'
        title='Developer Tools'
        cards={['clientJs_v4', 'prizeTierController', 'clientJs', 'reactHooks']}
      />
      <FancyCardRow
        iconSrc='/icons/landscapeIcon.svg'
        title='Designer Tools'
        cards={['brandKit']}
      />
    </div>
  )
}
