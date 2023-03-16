import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Navbar as FlowbiteNavbar } from 'flowbite-react'
import { ReactNode } from 'react'
import { Logo } from './Logo'

export interface LinkComponentProps {
  href: string
  children: string
  className?: string
}

export interface NavbarLink {
  href: string
  name: string
}

export interface NavbarProps {
  links: NavbarLink[]
  activePage: string
  linksAs?: (props: LinkComponentProps) => JSX.Element
  walletConnectionButton?: ReactNode
  onClickSettings?: () => void
  className?: string
  linkClassName?: string
}

// TODO: maybe center links absolutely, so they don't shift to the left when a wallet connects
export const Navbar = (props: NavbarProps) => {
  const {
    links,
    activePage,
    linksAs,
    walletConnectionButton,
    onClickSettings,
    className,
    linkClassName
  } = props

  return (
    <FlowbiteNavbar
      fluid={true}
      theme={{ base: 'font-averta bg-pt-bg-purple-darker text-pt-purple-50 px-8 py-4' }}
      className={classNames(className)}
    >
      {/* Left Side Branding */}
      <FlowbiteNavbar.Brand href='/'>
        <Logo />
      </FlowbiteNavbar.Brand>

      {/* Right Side Content */}
      <div className='flex gap-2 items-center md:order-2'>
        {walletConnectionButton}
        {onClickSettings !== undefined && (
          <Cog8ToothIcon
            className='h-6 w-6 text-pt-purple-50 hover:text-pt-purple-200 cursor-pointer'
            onClick={onClickSettings}
          />
        )}
        {/* TODO: style and configure toggle on smaller screens */}
        <FlowbiteNavbar.Toggle />
      </div>

      {/* Middle Collapsable Content */}
      <FlowbiteNavbar.Collapse>
        <NavbarLinks
          links={links}
          activePage={activePage}
          Component={linksAs}
          className={linkClassName}
        />
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  )
}

interface NavbarLinksProps {
  links: NavbarLink[]
  activePage: string
  Component?: (props: LinkComponentProps) => JSX.Element
  className?: string
}

const NavbarLinks = (props: NavbarLinksProps) => {
  const { links, activePage, Component, className } = props

  return (
    <>
      {links.map((link, i) => {
        const key = `nav-${i}-${link.name.toLowerCase()}`
        const isActiveLink = link.href === activePage
        const baseClassName = 'block text-base font-semibold p-4 md:p-0'
        const conditionalClassName = {
          'text-pt-teal': isActiveLink,
          'text-pt-purple-50 hover:text-pt-purple-200': !isActiveLink
        }

        if (!!Component) {
          return (
            <Component
              key={key}
              href={link.href}
              className={classNames(baseClassName, conditionalClassName, className)}
            >
              {link.name}
            </Component>
          )
        } else {
          return (
            <a
              key={key}
              href={link.href}
              className={classNames(baseClassName, conditionalClassName, className)}
            >
              {link.name}
            </a>
          )
        }
      })}
    </>
  )
}
