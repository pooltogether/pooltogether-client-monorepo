import { LINKS } from '@shared/ui'
import { SimpleCard, SimpleCardProps } from '@components/SimpleCard'

const communityCardInfo = {
  chat: {
    href: LINKS.discord,
    iconSrc: '/icons/chatIcon.svg',
    title: 'Chat',
    description: `Join us on our Discord server, the heart of our online community.`
  },
  forums: {
    href: LINKS.governance,
    iconSrc: '/icons/governanceIcon.svg',
    title: 'Forums',
    description: `Get up to date with the current governance debates or share an idea to improve the protocol.`
  },
  voting: {
    href: LINKS.tally,
    iconSrc: '/icons/votingIcon.svg',
    title: 'Voting',
    description: `Vote with you POOL tokens using Tally's interface to our governance contract.`
  },
  grants: {
    href: LINKS.grants,
    iconSrc: '/icons/grantsIcon.svg',
    title: 'Grants',
    description: `Learn about the grants process, apply for one or see recently funded grants.`
  },
  calendar: {
    href: LINKS.communityCalendar,
    iconSrc: '/icons/calendarIcon.svg',
    title: 'Calendar',
    description: `Follow the community calendar for invites to various PoolTogether events.`
  }
} satisfies {
  [id: string]: Omit<SimpleCardProps, 'className'>
}

interface CommunityCardProps {
  type: keyof typeof communityCardInfo
  className?: string
}

export const CommunityCard = (props: CommunityCardProps) => {
  const { type, className } = props

  const card = communityCardInfo[type]

  return <SimpleCard {...card} className={className} />
}
