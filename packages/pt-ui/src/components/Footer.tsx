import classNames from 'classnames'
import { Footer as FlowbiteFooter, FooterProps as FlowbiteFooterProps } from 'flowbite-react'
import { SocialIcon } from './SocialIcon'

export const defaultFooterItems: FooterItem[] = [
  {
    title: 'Get Help',
    content: [
      { text: 'User Docs', href: 'https://docs.pooltogether.com/' },
      { text: 'FAQ', href: 'https://docs.pooltogether.com/welcome/faq' },
      { text: 'Developer Docs', href: 'https://dev.pooltogether.com/' }
    ]
  },
  {
    title: 'Ecosystem',
    content: [
      { text: 'Extensions', href: '/extensions' },
      { text: 'Governance', href: 'https://gov.pooltogether.com/' },
      { text: 'Security', href: 'https://docs.pooltogether.com/security/audits' }
    ]
  },
  {
    title: 'Community',
    content: [
      {
        text: 'Twitter',
        href: 'https://twitter.com/PoolTogether_',
        icon: <SocialIcon platform='twitter' />
      },
      {
        text: 'Discord',
        href: 'https://pooltogether.com/discord',
        icon: <SocialIcon platform='discord' />
      },
      {
        text: 'GitHub',
        href: 'https://github.com/pooltogether',
        icon: <SocialIcon platform='github' />
      },
      {
        text: 'Medium',
        href: 'https://medium.com/pooltogether',
        icon: <SocialIcon platform='medium' />
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
