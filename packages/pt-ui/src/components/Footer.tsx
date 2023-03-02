import classNames from 'classnames'
import { Footer as FlowbiteFooter, FooterProps as FlowbiteFooterProps } from 'flowbite-react'
import { SocialIcon } from 'pt-components'

export const defaultFooterItems: FooterItem[] = [
  {
    title: 'Get Help',
    content: [
      { type: 'link', text: 'User Docs', linkUrl: 'https://docs.pooltogether.com/' },
      { type: 'link', text: 'FAQ', linkUrl: 'https://docs.pooltogether.com/welcome/faq' },
      { type: 'link', text: 'Developer Docs', linkUrl: 'https://dev.pooltogether.com/' }
    ]
  },
  {
    title: 'Ecosystem',
    content: [
      { type: 'link', text: 'Extensions', linkUrl: '/extensions' },
      { type: 'link', text: 'Governance', linkUrl: 'https://gov.pooltogether.com/' },
      { type: 'link', text: 'Security', linkUrl: 'https://docs.pooltogether.com/security/audits' }
    ]
  },
  {
    title: 'Community',
    content: [
      {
        type: 'link',
        text: 'Twitter',
        linkUrl: 'https://twitter.com/PoolTogether_',
        icon: <SocialIcon platform='twitter' />
      },
      {
        type: 'link',
        text: 'Discord',
        linkUrl: 'https://pooltogether.com/discord',
        icon: <SocialIcon platform='discord' />
      },
      {
        type: 'link',
        text: 'GitHub',
        linkUrl: 'https://github.com/pooltogether',
        icon: <SocialIcon platform='github' />
      },
      {
        type: 'link',
        text: 'Medium',
        linkUrl: 'https://medium.com/pooltogether',
        icon: <SocialIcon platform='medium' />
      }
    ]
  }
]

export interface FooterItem {
  title: string
  content: (FooterLink | FooterText | FooterIcon)[]
}

export interface FooterLink {
  type: 'link'
  text: string
  linkUrl: string
  icon?: JSX.Element
}

export interface FooterText {
  type: 'text'
  text: string
  onClick?: () => void
  icon?: JSX.Element
}

export interface FooterIcon {
  type: 'icon'
  icon: JSX.Element
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
                    const contentKey = `ft-item-${item.title.toLowerCase().replace(' ', '-')}-${i}`
                    if (content.type === 'link') {
                      return <Link key={contentKey} {...content} className={itemClassName} />
                    }
                    if (content.type === 'text') {
                      return <Text key={contentKey} {...content} className={itemClassName} />
                    }
                    if (content.type === 'icon') {
                      return content.icon
                    }
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

const Link = (props: FooterLink & { className?: string }) => {
  const { text, linkUrl, icon, className } = props

  return (
    <FlowbiteFooter.Link
      href={linkUrl}
      className={classNames('dark:text-pt-purple-100', className)}
    >
      {icon}
      {text}
    </FlowbiteFooter.Link>
  )
}

const Text = (props: FooterText & { className?: string }) => {
  const { text, onClick, icon, className } = props

  return (
    <span
      className={classNames(
        'dark:text-pt-purple-100',
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
