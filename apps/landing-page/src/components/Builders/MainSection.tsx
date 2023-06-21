import { LINKS } from '@shared/ui'
import classNames from 'classnames'
import Image from 'next/image'
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
        'relative w-full flex flex-col isolate aspect-[375/667] md:aspect-[1440/1860]',
        className
      )}
    >
      <SvgBackground bg='buildersSection1.svg' smallBg='mobileBuildersSection1.svg' />
      <SimpleTextBanner
        title={
          <>
            <span className='text-pt-purple-400'>Build</span> on PoolTogether
          </>
        }
        description={
          <>Join the diverse community of developers and designers building on the protocol</>
        }
        className='absolute w-full mt-[29%] md:mt-[16%]'
        descriptionClassName='px-[10%] sm:px-0'
      />
      <DocsCards className='absolute w-full mt-[54%] md:max-w-[60%] md:h-[11%] md:mt-[25.3%] md:ml-[20%]' />
      <CardRows className='w-full mt-[95%] mb-8 md:h-[66%] md:mt-[44%]' />
    </section>
  )
}

interface DocsCardsProps {
  className?: string
}

const DocsCards = (props: DocsCardsProps) => {
  const { className } = props

  return (
    <div
      className={classNames(
        'flex flex-col gap-3 items-center px-4 md:flex-row md:gap-8 md:px-0',
        className
      )}
    >
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
        'w-full max-w-sm flex gap-2 items-center p-4 bg-pt-bg-purple-darker rounded-2xl',
        'outline outline-2 -outline-offset-2 outline-transparent hover:outline-pt-purple-100/20 hover:shadow-lg',
        'md:w-auto md:max-w-none md:h-full md:grow md:gap-4 md:justify-center md:px-16 md:py-12',
        className
      )}
    >
      <Image
        src='/icons/docIcon.svg'
        width={48}
        height={48}
        alt='Doc Icon'
        className='h-5 w-auto md:h-12'
      />
      <div className='flex text-clamp-xl text-pt-purple-50 md:flex-col'>
        <span className='mr-[.5ch] md:mr-0'>V{version} Developer</span>
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
    <div className={classNames('flex flex-col gap-16', className)}>
      <FancyCardSection
        iconSrc='/icons/smallCodeIcon.svg'
        title='Developer Tools'
        cards={['clientJs_v4', 'prizeTierController', 'clientJs', 'reactHooks']}
      />
      <FancyCardSection
        iconSrc='/icons/landscapeIcon.svg'
        title='Designer Tools'
        cards={['brandKit']}
      />
    </div>
  )
}
