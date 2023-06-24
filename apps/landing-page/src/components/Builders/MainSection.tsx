import { LINKS } from '@shared/ui'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { RICH_TEXT_FORMATTING } from 'src/constants'
import { Section } from '@components/Section'
import { SimpleTextBanner } from '@components/SimpleTextBanner'
import { BuilderCards } from './BuilderCards'

interface MainSection {
  className?: string
}

export const MainSection = (props: MainSection) => {
  const { className } = props

  const t = useTranslations('Builders')

  return (
    <Section
      bg='buildersSection1.svg'
      smallBg='mobileBuildersSection1.svg'
      className={classNames('aspect-[375/667] md:aspect-[1440/1860]', className)}
    >
      <SimpleTextBanner
        title={t.rich('buildOnPt', RICH_TEXT_FORMATTING)}
        description={t('joinUs')}
        className='absolute w-full mt-[28%] md:h-[17.1%] md:justify-end md:mt-0'
        titleClassName='max-w-[1440px]'
        descriptionClassName='max-w-[1440px] px-[5%] sm:px-0'
      />
      <DocsCards className='absolute w-full mt-[54%] md:max-w-[min(60%,_1440px)] md:h-[11%] md:mt-[25.3%] md:ml-[20%]' />
      <CardRows className='w-full max-w-[1440px] mt-[95%] mb-8 mx-auto md:h-[66%] md:mt-[44%]' />
    </Section>
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

  const t = useTranslations('Builders')

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
        className='h-[18px] w-auto md:h-[75px]'
      />
      <div className='flex text-base text-pt-purple-50 md:flex-col md:text-xl'>
        {t.rich('devDocs', {
          version,
          first: (chunks) => <span className='mr-[.5ch] md:mr-0'>{chunks}</span>,
          second: (chunks) => <span>{chunks}</span>
        })}
      </div>
    </a>
  )
}

interface CardRowsProps {
  className?: string
}

const CardRows = (props: CardRowsProps) => {
  const { className } = props

  const t = useTranslations('Builders')

  return (
    <div className={classNames('flex flex-col gap-16', className)}>
      <BuilderCards
        iconSrc='/icons/smallCodeIcon.svg'
        title={t('devToolsSectionTitle')}
        cards={['clientJs_v4', 'prizeTierController', 'clientJs', 'reactHooks']}
      />
      <BuilderCards
        iconSrc='/icons/landscapeIcon.svg'
        title={t('designerToolsSectionTitle')}
        cards={['brandKit']}
      />
    </div>
  )
}
