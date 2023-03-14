import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Navbar as FlowbiteNavbar } from 'flowbite-react'
import { ReactNode } from 'react'
import { Logo } from './Logo'

export const defaultNavbarLinks: NavbarLink[] = [
  { href: '/prizes', name: 'Prizes' },
  { href: '/deposit', name: 'Deposit' },
  { href: '/account', name: 'Account' },
  { href: '/extensions', name: 'Extensions' }
]

export interface NavbarLink {
  href: string
  name: string
}

export interface NavbarProps {
  activePage: string
  links?: NavbarLink[]
  walletConnectionButton?: ReactNode
  onClickSettings?: () => void
  className?: string
  linkClassName?: string
}

// TODO: maybe center links absolutely, so they don't shift to the left when a wallet connects
export const Navbar = (props: NavbarProps) => {
  const { activePage, links, walletConnectionButton, onClickSettings, className, linkClassName } =
    props

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
          links={links ?? defaultNavbarLinks}
          activePage={activePage}
          className={classNames(linkClassName)}
        />
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  )
}

interface NavbarLinksProps {
  links: NavbarLink[]
  activePage: string
  className?: string
}

const NavbarLinks = (props: NavbarLinksProps) => {
  const { links, activePage, className } = props

  return (
    <>
      {links.map((link, i) => {
        const isActiveLink = link.href === activePage
        return (
          <FlowbiteNavbar.Link
            theme={{
              base: 'block text-base text-pt-purple-50 font-semibold p-4 md:p-0',
              active: {
                on: 'text-pt-teal',
                off: 'hover:text-pt-purple-200'
              }
            }}
            href={link.href}
            className={classNames(className)}
            active={isActiveLink}
            key={`nav-${i}-${link.name.toLowerCase()}`}
          >
            {link.name}
          </FlowbiteNavbar.Link>
        )
      })}
    </>
  )
}
