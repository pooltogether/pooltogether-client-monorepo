import { Button, ButtonProps, LINKS } from '@shared/ui'
import classNames from 'classnames'

type DeveloperCardType = 'v4Docs' | 'docs' | 'addToken'

// TODO: add all hrefs
const developerCardInfo: Record<
  DeveloperCardType,
  { src: `/${string}.svg`; buttonProps: ButtonProps; tag?: string }
> = {
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
}

interface DeveloperCardProps {
  type: DeveloperCardType
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
      {!!card.tag && (
        <span className='absolute top-0 -translate-y-1/2 px-3 py-0.5 text-clamp-xs text-pt-purple-400 bg-[#361D60] rounded-full'>
          {card.tag}
        </span>
      )}
      <CodeBracketIcon className='absolute top-4 left-4 w-5 h-auto text-pt-purple-400 4xl:w-6' />
      <object type='image/svg+xml' data={card.src} className='w-3/4 grow mt-2' />
      <Button fullSized={true} {...card.buttonProps} pill={true} />
    </div>
  )
}

const CodeBracketIcon = (props: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 22 14'
    fill='none'
    className={props.className}
  >
    <path
      d='M5.05133 4.25118L2.30573 6.99998L5.05453 9.74878C5.30412 9.99837 5.30412 10.4048 5.05453 10.6544C4.92651 10.7761 4.76339 10.84 4.60016 10.84C4.43693 10.84 4.27381 10.7761 4.14891 10.6513L0.948907 7.45128C0.699323 7.2017 0.699323 6.79523 0.948907 6.54566L4.14891 3.34566C4.39849 3.09607 4.80496 3.09607 5.05453 3.34566C5.30412 3.59524 5.30412 4.0016 5.05141 4.25128L5.05133 4.25118ZM21.0513 6.54868L17.8513 3.34868C17.6018 3.09909 17.1953 3.09909 16.9457 3.34868C16.6961 3.59826 16.6961 4.00473 16.9457 4.2543L19.6945 6.9999L16.9457 9.7487C16.6961 9.99829 16.6961 10.4048 16.9457 10.6543C17.0737 10.776 17.2369 10.84 17.4001 10.84C17.5633 10.84 17.7264 10.776 17.8513 10.6512L21.0513 7.4512C21.304 7.20151 21.304 6.79838 21.0513 6.54868ZM14.5105 0.679876C14.2001 0.507062 13.8097 0.619044 13.6401 0.92946L7.24011 12.4495C7.06729 12.7599 7.17928 13.1471 7.48969 13.3199C7.58886 13.3743 7.69448 13.3999 7.80012 13.3999C8.02408 13.3999 8.24169 13.2814 8.36012 13.0703L14.7601 1.55031C14.9329 1.24311 14.821 0.852702 14.5105 0.679876Z'
      fill='#9B6AFF'
    />
  </svg>
)
