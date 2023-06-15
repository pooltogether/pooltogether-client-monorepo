import { LINKS } from '@shared/ui'
import { FancyCard, FancyCardProps } from '@components/FancyCard'

enum Tag {
  dev = 'Dev Tools',
  design = 'Design Tools',
  v4 = 'V4',
  v5 = 'V5'
}

export const builderCardInfo = {
  clientJs_v4: {
    href: LINKS.clientJs_v4,
    iconSrc: '/icons/devToolIcon.svg',
    title: 'V4 Client Library',
    author: 'PoolTogether Inc.',
    tags: [Tag.dev, Tag.v4],
    description: `Simple JS library to interact with PoolTogether V4 contracts.`
  },
  clientJs: {
    href: LINKS.clientJs,
    iconSrc: '/icons/devToolIcon.svg',
    title: 'V5 Client Library',
    author: 'PoolTogether Inc.',
    tags: [Tag.dev, Tag.v5],
    description: `Simple JS library to interact with PoolTogether Hyperstructure contracts.`
  },
  reactHooks: {
    href: LINKS.reactHooks,
    iconSrc: '/icons/devToolIcon.svg',
    title: 'V5 React Hooks',
    author: 'PoolTogether Inc.',
    tags: [Tag.dev, Tag.v5],
    description: `Shared Hyperstructure-specific React hooks.`
  },
  prizeTierController: {
    href: LINKS.prizeTierController,
    iconSrc: '/icons/devToolIcon.svg',
    title: 'Prize Tier Controller',
    author: 'PoolTogether Inc.',
    tags: [Tag.dev, Tag.v4],
    description: `View and edit upcoming prize tiers.`
  },
  brandKit: {
    href: LINKS.brandKit,
    iconSrc: '/icons/devToolIcon.svg',
    title: 'Brand Kit',
    author: 'PoolTogether Inc.',
    tags: [Tag.design],
    description: `A collection of assets, logos and styles for building the PoolTogether brand.`
  }
} satisfies {
  [id: string]: Omit<FancyCardProps, 'className'>
}

interface BuilderCardProps {
  type: keyof typeof builderCardInfo
  className?: string
}

export const BuilderCard = (props: BuilderCardProps) => {
  const { type, className } = props

  const card = builderCardInfo[type]

  return <FancyCard {...card} className={className} />
}
