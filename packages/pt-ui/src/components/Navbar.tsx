import { Navbar as FlowbiteNavbar, Dropdown as FlowbiteDropdown } from 'flowbite-react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import { Logo } from './Logo'
import classNames from 'classnames'

export interface NavbarProps {
  activePage: string
  walletConnectionButton?: ReactNode
  className?: string
  dropdownClassName?: string
  linkClassName?: string
}

export const Navbar = (props: NavbarProps) => {
  return (
    <FlowbiteNavbar
      fluid={true}
      className={classNames('dark:bg-pt-bg-purple-darker dark:text-pt-purple-50', props.className)}
    >
      {/* Left Side Branding */}
      <FlowbiteNavbar.Brand href='/'>
        <Logo />
      </FlowbiteNavbar.Brand>

      {/* Right Side Content & Dropdown */}
      <div className='flex md:order-2 space-x-2 items-center'>
        {props.walletConnectionButton}
        <FlowbiteDropdown
          arrowIcon={false}
          inline={true}
          label={<Bars3Icon className='h-6 w-6 text-gray-500' />}
          className={props.dropdownClassName}
        >
          <FlowbiteDropdown.Item>Settings</FlowbiteDropdown.Item>
        </FlowbiteDropdown>
        <FlowbiteNavbar.Toggle />
      </div>

      {/* Middle Collapsable Content */}
      <FlowbiteNavbar.Collapse>
        <NavbarLinks activePage={props.activePage} className={props.linkClassName} />
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  )
}

export interface NavbarLinksProps {
  activePage: string
  className?: string
}

const NavbarLinks = (props: NavbarLinksProps) => {
  const links: { href: string; name: string }[] = [
    { href: '/prizes', name: 'Prizes' },
    { href: '/deposit', name: 'Deposit' },
    { href: '/account', name: 'Account' },
    { href: '/extensions', name: 'Extensions' }
  ]
  return (
    <>
      {links.map((link, i) => {
        return (
          <FlowbiteNavbar.Link
            href={link.href}
            className={props.className}
            active={link.href === props.activePage}
            key={`nav-${i}-${link.name.toLowerCase()}`}
          >
            {link.name}
          </FlowbiteNavbar.Link>
        )
      })}
    </>
  )
}
