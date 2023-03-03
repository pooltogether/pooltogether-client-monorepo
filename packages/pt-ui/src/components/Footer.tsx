import classNames from 'classnames'
import { Footer as FlowbiteFooter, FooterProps as FlowbiteFooterProps } from 'flowbite-react'
import { LINKS } from '@constants'
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
  titleClassName?: string
  itemClassName?: string
}

// TODO: add proper sizing on different screen sizes
export const Footer = (props: FooterProps) => {
  const { items, titleClassName, itemClassName, className, ...rest } = props

  return (
    <FlowbiteFooter
      {...rest}
      className={classNames('dark:bg-pt-purple-600 rounded-none', className)}
    >
      <div className='w-full'>
        <div className={`flex justify-between px-6 py-8`}>
          {(items ?? defaultFooterItems).map((item) => {
            return (
              <div key={`ft-${item.title.toLowerCase().replace(' ', '-')}`}>
                <FlowbiteFooter.Title
                  title={item.title}
                  className={classNames('dark:!text-pt-teal-dark normal-case', titleClassName)}
                />
                <FlowbiteFooter.LinkGroup col={true}>
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

  if (disabled) {
    return (
      <span className={classNames('flex items-center gap-2 dark:text-pt-purple-300', className)}>
        {icon}
        {text}
      </span>
    )
  }

  if (!!href) {
    return (
      <FlowbiteFooter.Link href={href} className={classNames('dark:text-pt-purple-100', className)}>
        <span className='flex items-center gap-2'>
          {icon}
          {text}
        </span>
      </FlowbiteFooter.Link>
    )
  }

  return (
    <span
      className={classNames(
        'flex items-center gap-2 dark:text-pt-purple-100',
        { 'cursor-pointer': onClick !== undefined },
        className
      )}
      onClick={onClick}
    >
      {icon}
      {text}
    </span>
  )
}
