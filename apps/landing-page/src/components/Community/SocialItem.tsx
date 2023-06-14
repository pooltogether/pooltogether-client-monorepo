import classNames from 'classnames'

const socialItemInfo = {
  lens: { name: 'Lens Protocol', iconSrc: '/icons/lensIcon.svg' },
  mirror: { name: 'Mirror', iconSrc: '/icons/mirrorIcon.svg' },
  twitter: { name: 'Twitter', iconSrc: '/icons/twitterIcon.svg' },
  medium: { name: 'Medium', iconSrc: '/icons/mediumIcon.svg' },
  notion: { name: 'Notion', iconSrc: '/icons/notionIcon.svg' }
} satisfies { [id: string]: { name: string; iconSrc: `${string}.svg` } }

interface SocialItemProps {
  type: keyof typeof socialItemInfo
  className?: string
}

export const SocialItem = (props: SocialItemProps) => {
  const { type, className } = props

  const social = socialItemInfo[type]

  return (
    <div className={classNames('flex flex-col gap-6 items-center', className)}>
      <span className='text-clamp-lg text-pt-purple-100'>{social.name}</span>
      <img src={social.iconSrc} alt={`${social.name} Icon`} className='h-12 w-auto' />
    </div>
  )
}
