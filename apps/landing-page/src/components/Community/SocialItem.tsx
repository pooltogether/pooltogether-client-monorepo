import { LINKS } from '@shared/ui'
import classNames from 'classnames'

const socialItemInfo = {
  lens: { href: LINKS.lens, name: 'Lens Protocol', iconSrc: '/icons/lensIcon.svg' },
  mirror: { href: LINKS.mirror, name: 'Mirror', iconSrc: '/icons/mirrorIcon.svg' },
  twitter: { href: LINKS.twitter, name: 'Twitter', iconSrc: '/icons/twitterIcon.svg' },
  medium: { href: LINKS.medium, name: 'Medium', iconSrc: '/icons/mediumIcon.svg' },
  notion: { href: LINKS.notion, name: 'Notion', iconSrc: '/icons/notionIcon.svg' }
} satisfies { [id: string]: { href: string; name: string; iconSrc: `${string}.svg` } }

interface SocialItemProps {
  type: keyof typeof socialItemInfo
  className?: string
}

export const SocialItem = (props: SocialItemProps) => {
  const { type, className } = props

  const social = socialItemInfo[type]

  return (
    <a
      href={social.href}
      target='_blank'
      className={classNames('flex flex-col gap-6 items-center', className)}
    >
      <span className='text-clamp-lg text-pt-purple-100'>{social.name}</span>
      <img src={social.iconSrc} alt={`${social.name} Icon`} className='h-12 w-auto' />
    </a>
  )
}
