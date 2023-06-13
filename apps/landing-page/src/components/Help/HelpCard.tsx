import { LINKS } from '@shared/ui'
import classNames from 'classnames'

type HelpCardType = 'about' | 'gettingStarted' | 'faq' | 'guides' | 'discord'

const helpCardInfo: Record<
  HelpCardType,
  { href: string; iconSrc: `${string}.svg`; title: string; description: string }
> = {
  about: {
    href: LINKS.docs,
    iconSrc: '/icons/infoIcon.svg',
    title: 'About PoolTogether',
    description: 'Learn the basics of what PoolTogether is and how it works.'
  },
  gettingStarted: {
    href: LINKS.gettingStarted,
    iconSrc: '/icons/clickIcon.svg',
    title: 'Getting Started',
    description:
      'Learn how to deposit to and withdraw from PoolTogether on multiple different blockchains.'
  },
  faq: {
    href: LINKS.faq,
    iconSrc: '/icons/questionIcon.svg',
    title: 'FAQ',
    description: 'Get quick answers to the most common questions about the PoolTogether protocol.'
  },
  guides: {
    href: LINKS.guides,
    iconSrc: '/icons/bookIcon.svg',
    title: 'Advanced Guides',
    description:
      'Get detailed instructions on using open source PoolTogether extensions and tooling.'
  },
  discord: {
    href: LINKS.discord,
    iconSrc: '/icons/chatIcon.svg',
    title: 'Discord',
    description: 'Chat with us on our Discord server to get help or answers to your questions.'
  }
}

interface HelpCardProps {
  type: HelpCardType
  className?: string
}

export const HelpCard = (props: HelpCardProps) => {
  const { type, className } = props

  const card = helpCardInfo[type]

  return (
    <a
      href={card.href}
      target='_blank'
      className={classNames(
        'flex flex-col gap-6 p-12 bg-pt-bg-purple-darker text-pt-purple-100 rounded-2xl',
        'box-border border-2 border-transparent hover:border-pt-purple-100/20 hover:shadow-lg',
        className
      )}
    >
      <div className='flex gap-3 items-center'>
        <img src={card.iconSrc} className='w-9 h-auto text-pt-teal-dark' />
        <span className='text-clamp-xl'>{card.title}</span>
      </div>
      <span className='text-clamp-base'>{card.description}</span>
    </a>
  )
}
