import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { LINKS } from '@shared/ui'
import classNames from 'classnames'

enum Tag {
  ui = 'User Interfaces',
  extensions = 'Extensions',
  analytics = 'Analytics',
  governance = 'Governance'
}

export const ecosystemCardInfo = {
  ptApp_v4: {
    href: LINKS.app_v4,
    iconSrc: '/pooltogether-token-logo.svg',
    title: 'PoolTogether App',
    author: 'PoolTogether Inc.',
    tags: [Tag.ui],
    description: `An interface for the V4 PoolTogether protocol.`
  },
  poolExplorer: {
    href: LINKS.poolExplorer,
    iconSrc: '/icons/poolExplorer.svg',
    title: 'PoolExplorer',
    author: 'Underthesea',
    tags: [Tag.ui, Tag.extensions],
    description: `An alternative community-run interface for the V4 PoolTogether protocol.`
  },
  depositDelegator: {
    href: LINKS.depositDelegator,
    title: 'Deposit Delegator',
    author: 'PoolTogether Inc.',
    tags: [Tag.extensions],
    description: `Delegate your chances to win without losing custody of your deposit.`
  },
  tally: {
    href: LINKS.tally,
    iconSrc: '/icons/tally.svg',
    title: 'Tally Governance',
    author: 'Tally',
    tags: [Tag.extensions, Tag.governance],
    description: `Create and vote on proposals that control PoolTogether's treasury.`
  },
  treasury: {
    href: LINKS.treasury,
    iconSrc: '/pooltogether-token-logo.svg',
    title: 'Treasury Summary',
    author: 'PoolTogether Inc.',
    tags: [Tag.governance],
    description: `A summary of the assets currently in PoolTogether's community-run treasury.`
  },
  dune_v4: {
    href: LINKS.dune_v4,
    iconSrc: '/icons/dune.svg',
    title: 'V4 Dune Dashboard',
    author: 'Sarfang',
    tags: [Tag.analytics],
    description: `A Dune analytics dashboard to visualize onchain data about the V4 PoolTogether protocol.`
  },
  prizeCalc: {
    href: LINKS.prizeCalc,
    iconSrc: '/icons/poolySunglasses.png',
    title: 'Deposit Delegator Calculator',
    author: 'Ncookie',
    tags: [Tag.analytics],
    description: `A calculator for viewing potential outcomes from delegations.`
  }
} satisfies {
  [id: string]: {
    href: string
    iconSrc?: string
    title: string
    author: string
    tags: Tag[]
    description: string
  }
}

interface EcosystemCardProps {
  type: keyof typeof ecosystemCardInfo
  className?: string
}

export const EcosystemCard = (props: EcosystemCardProps) => {
  const { type, className } = props

  const card = ecosystemCardInfo[type]

  const prefixRegex = /http(s)?(:)?(\/\/)?|(\/\/)?(www.)?/g
  const cleanURI = card.href.replace(prefixRegex, '')

  return (
    <a
      href={card.href}
      target='_blank'
      className={classNames(
        'flex flex-col gap-4 p-6 bg-[#8247E5]/30 rounded-2xl',
        'outline outline-2 -outline-offset-2 outline-transparent hover:outline-pt-purple-100/20 hover:shadow-lg',
        'bg-[radial-gradient(farthest-corner_at_0%_5%,_#440BA0B3_0%,_#5820CFB3_100%),_radial-gradient(farthest-corner_at_0%_0%,_#634E90_50%,_#36147D_100%)]',
        className
      )}
    >
      <div className='flex flex-col items-start'>
        <img
          src={'iconSrc' in card ? card.iconSrc : '/icons/extension.svg'}
          className='h-12 w-auto'
        />
        <span className='text-clamp-xl text-pt-purple-50'>{card.title}</span>
        <span className='text-clamp-xs text-pt-purple-300'>By {card.author}</span>
      </div>
      <div className='flex gap-2 items-center'>
        {card.tags.map((tag, i) => (
          <span
            key={`${type}-card-tag-${i}`}
            className='px-3 py-1 text-clamp-xs font-medium bg-pt-transparent text-pt-purple-100 rounded-lg'
          >
            {tag}
          </span>
        ))}
      </div>
      <span className='text-clamp-base text-pt-purple-100 line-clamp-2'>{card.description}</span>
      <div className='flex gap-2 items-center mt-auto ml-auto text-pt-purple-300 whitespace-nowrap'>
        <span className='text-clamp-base'>Open {cleanURI}</span>
        <ArrowTopRightOnSquareIcon className='w-4 h-auto' />
      </div>
    </a>
  )
}
