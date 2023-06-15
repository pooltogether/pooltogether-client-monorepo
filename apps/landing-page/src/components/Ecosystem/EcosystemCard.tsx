import { LINKS } from '@shared/ui'
import { FancyCard, FancyCardProps } from '@components/FancyCard'

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
    iconSrc: '/icons/extension.svg',
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
  [id: string]: Omit<FancyCardProps, 'className'>
}

interface EcosystemCardProps {
  type: keyof typeof ecosystemCardInfo
  className?: string
}

export const EcosystemCard = (props: EcosystemCardProps) => {
  const { type, className } = props

  const card = ecosystemCardInfo[type]

  return <FancyCard {...card} className={className} />
}
