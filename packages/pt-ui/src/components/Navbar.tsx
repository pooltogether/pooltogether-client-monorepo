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

// TODO: proper image & text size (16px)
// TODO: maybe center links absolutely, so they don't shift to the left when a wallet connects
export const Navbar = (props: NavbarProps) => {
  const { activePage, links, walletConnectionButton, onClickSettings, className, linkClassName } =
    props

  return (
    <FlowbiteNavbar
      fluid={true}
      className={classNames('dark:bg-pt-bg-purple-darker dark:text-pt-purple-50', className)}
    >
      {/* Left Side Branding */}
      <FlowbiteNavbar.Brand href='/'>
        <Logo />
      </FlowbiteNavbar.Brand>

      {/* Right Side Content */}
      <div className='flex md:order-2 space-x-2 items-center'>
        {walletConnectionButton}
        {onClickSettings !== undefined && (
          <Cog8ToothIcon
            className='h-6 w-6 dark:text-pt-purple-50 dark:hover:text-pt-purple-200 cursor-pointer'
            onClick={onClickSettings}
          />
        )}
        <FlowbiteNavbar.Toggle />
      </div>

      {/* Middle Collapsable Content */}
      <FlowbiteNavbar.Collapse>
        <NavbarLinks
          links={links ?? defaultNavbarLinks}
          activePage={activePage}
          className={linkClassName}
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
            href={link.href}
            className={classNames('dark:text-pt-purple-50', className)}
            active={isActiveLink}
            key={`nav-${i}-${link.name.toLowerCase()}`}
            theme={{
              active: {
                on: 'dark:text-pt-teal',
                off: 'dark:hover:text-pt-purple-200'
              }
            }}
          >
            {link.name}
          </FlowbiteNavbar.Link>
        )
      })}
    </>
  )
}
