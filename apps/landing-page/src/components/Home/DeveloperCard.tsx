import { Button, ButtonProps, LINKS } from '@shared/ui'
import classNames from 'classnames'

// TODO: add all hrefs
const developerCardInfo = {
  v4Docs: {
    src: '/graphics/IntegrateGraphic.svg',
    buttonProps: { href: LINKS.devDocs_v4, target: '_blank', children: 'V4 Documentation' }
  },
  docs: {
    src: '/graphics/YieldGraphic.svg',
    buttonProps: { href: LINKS.devDocs, target: '_blank', children: 'V5 Documentation' },
    tag: 'Alpha'
  },
  addToken: {
    src: '/graphics/AddTokenGraphic.svg',
    buttonProps: {
      href: '#',
      target: '_blank',
      color: 'transparent',
      children: 'Add Your Token',
      disabled: true
    },
    tag: 'Coming Soon!'
  }
} satisfies { [id: string]: { src: `/${string}.svg`; buttonProps: ButtonProps; tag?: string } }

interface DeveloperCardProps {
  type: keyof typeof developerCardInfo
  className?: string
}

export const DeveloperCard = (props: DeveloperCardProps) => {
  const { type, className } = props

  const card = developerCardInfo[type]

  return (
    <div
      className={classNames(
        'relative w-full h-full flex flex-col items-center gap-6 p-6 bg-pt-bg-purple-darker rounded-3xl',
        className
      )}
    >
      {'tag' in card && (
        <span className='absolute top-0 -translate-y-1/2 px-3 py-0.5 text-clamp-xs text-pt-purple-400 bg-[#361D60] rounded-full'>
          {card.tag}
        </span>
      )}
      <img
        src='/icons/codeIcon.svg'
        alt='Code'
        className='absolute top-4 left-4 w-5 h-auto text-pt-purple-400 4xl:w-6'
      />
      <img src={card.src} className='w-3/4 grow mt-2' />
      <Button fullSized={true} {...card.buttonProps} pill={true} />
    </div>
  )
}
