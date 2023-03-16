import classNames from 'classnames'
import { Footer as FlowbiteFooter, FooterProps as FlowbiteFooterProps } from 'flowbite-react'
import { LINKS } from '../constants'
import { SocialIcon } from './SocialIcon'

export const defaultFooterItems: FooterItem[] = [
  {
    title: 'Get Help',
    content: [
      { text: 'User Docs', href: LINKS.docs },
      { text: 'FAQ', href: LINKS.faq },
      { text: 'Developer Docs', href: LINKS.devDocs }
    ]
  },
  {
    title: 'Ecosystem',
    content: [
      { text: 'Extensions', href: '/extensions' },
      { text: 'Governance', href: LINKS.governance },
      { text: 'Security', href: LINKS.audits }
    ]
  },
  {
    title: 'Community',
    content: [
      {
        text: 'Twitter',
        href: LINKS.twitter,
        icon: <SocialIcon platform='twitter' className='w-6 h-auto' />
      },
      {
        text: 'Discord',
        href: LINKS.discord,
        icon: <SocialIcon platform='discord' className='w-6 h-auto' />
      },
      {
        text: 'GitHub',
        href: LINKS.github,
        icon: <SocialIcon platform='github' className='w-6 h-auto' />
      },
      {
        text: 'Medium',
        href: LINKS.medium,
        icon: <SocialIcon platform='medium' className='w-6 h-auto' />
      }
    ]
  }
]

export interface FooterItem {
  title: string
  content: FooterItemContentProps[]
}

export interface FooterProps extends FlowbiteFooterProps {
  items?: FooterItem[]
  containerClassName?: string
  titleClassName?: string
  itemClassName?: string
}

export const Footer = (props: FooterProps) => {
  const { items, containerClassName, titleClassName, itemClassName, className, ...rest } = props

  return (
    <FlowbiteFooter
      theme={{
        root: { base: 'w-full flex justify-center bg-pt-purple-600 px-6 pt-12 pb-24 shadow' }
      }}
      className={classNames(className)}
      {...rest}
    >
      <div
        className={classNames('w-full max-w-6xl md:flex md:justify-between', containerClassName)}
      >
        {(items ?? defaultFooterItems).map((item) => {
          return (
            <div key={`ft-${item.title.toLowerCase().replace(' ', '-')}`} className='w-1/12'>
              <FlowbiteFooter.Title
                theme={{ base: 'text-pt-teal-dark mb-6' }}
                title={item.title}
                className={classNames(titleClassName)}
              />
              <FlowbiteFooter.LinkGroup theme={{ base: 'flex flex-col gap-6 text-pt-purple-100' }}>
                {item.content.map((content, i) => {
                  return (
                    <FooterItemContent
                      key={`ft-item-${item.title.toLowerCase().replace(' ', '-')}-${i}`}
                      {...content}
                      className={itemClassName}
                    />
                  )
                })}
              </FlowbiteFooter.LinkGroup>
            </div>
          )
        })}
      </div>
    </FlowbiteFooter>
  )
}

interface FooterItemContentProps {
  text: string
  href?: string
  icon?: JSX.Element
  onClick?: () => void
  disabled?: boolean
}

const FooterItemContent = (props: FooterItemContentProps & { className?: string }) => {
  const { text, href, icon, onClick, disabled, className } = props

  const baseClassName = 'flex items-center gap-2 whitespace-nowrap'

  if (disabled) {
    return (
      <span className={classNames(baseClassName, 'text-pt-purple-300', className)}>
        {icon}
        {text}
      </span>
    )
  }

  if (!!href) {
    return (
      <FlowbiteFooter.Link href={href} className={classNames(className)}>
        <span className={classNames(baseClassName)}>
          {icon}
          {text}
        </span>
      </FlowbiteFooter.Link>
    )
  }

  return (
    <span
      className={classNames(baseClassName, { 'cursor-pointer': onClick !== undefined }, className)}
      onClick={onClick}
    >
      {icon}
      {text}
    </span>
  )
}
