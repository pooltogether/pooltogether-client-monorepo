import classNames from 'classnames'
import { Footer as FlowbiteFooter, FooterProps as FlowbiteFooterProps } from 'flowbite-react'

// TODO: add missing links/icons/actions
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
      { type: 'link', text: 'Twitter', linkUrl: 'https://twitter.com/PoolTogether_' },
      { type: 'link', text: 'Discord', linkUrl: 'https://pooltogether.com/discord' },
      { type: 'link', text: 'GitHub', linkUrl: 'https://github.com/pooltogether' },
      { type: 'link', text: 'Medium', linkUrl: 'https://medium.com/pooltogether' }
    ]
  },
  {
    title: 'Settings',
    content: [
      { type: 'text', text: 'Change Language' },
      { type: 'text', text: 'Change Currency' },
      { type: 'text', text: 'Enable Testnets' }
    ]
  }
]

export interface FooterItem {
  title: string
  content: (FooterLink | FooterIcon | FooterText)[]
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
      className={classNames('fixed bottom-0 dark:bg-pt-purple-600 rounded-none', className)}
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
                    if (content.type === 'icon') {
                      return <Icon key={contentKey} {...content} className={itemClassName} />
                    }
                    if (content.type === 'text') {
                      return <Text key={contentKey} {...content} className={itemClassName} />
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

export interface FooterLink {
  type: 'link'
  text: string
  linkUrl: string
  iconUrl?: string
}

const Link = (props: FooterLink & { key: string; className?: string }) => {
  return (
    <FlowbiteFooter.Link
      key={props.key}
      href={props.linkUrl}
      className={classNames('dark:text-pt-purple-100', props.className)}
    >
      {props.iconUrl && <img src={props.iconUrl} className='fill-pt-purple-100' />}
      {props.text}
    </FlowbiteFooter.Link>
  )
}

export interface FooterIcon {
  type: 'icon'
  iconUrl: string
}

const Icon = (props: FooterIcon & { key: string; className?: string }) => {
  return (
    <img
      src={props.iconUrl}
      key={props.key}
      className={classNames('fill-pt-purple-100', props.className)}
    />
  )
}

export interface FooterText {
  type: 'text'
  text: string
  onClick?: () => void
  iconUrl?: string
}

const Text = (props: FooterText & { key: string; className?: string }) => {
  return (
    <span
      key={props.key}
      className={classNames(
        'dark:text-pt-purple-100',
        { 'cursor-pointer': props.onClick !== undefined },
        props.className
      )}
      onClick={props.onClick}
    >
      {props.iconUrl && <img src={props.iconUrl} className='fill-pt-purple-100' />}
      {props.text}
    </span>
  )
}
