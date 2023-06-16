import { LINKS } from '@shared/ui'
import classNames from 'classnames'
import { SimpleCard, SimpleCardProps } from '@components/SimpleCard'

const helpCardInfo = {
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
} satisfies {
  [id: string]: Omit<SimpleCardProps, 'className'>
}

interface HelpCardProps {
  type: keyof typeof helpCardInfo
  className?: string
}

export const HelpCard = (props: HelpCardProps) => {
  const { type, className } = props

  const card = helpCardInfo[type]

  return <SimpleCard {...card} className={classNames('max-w-sm md:max-w-none', className)} />
}
