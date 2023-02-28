import { Bars3Icon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { Dropdown as FlowbiteDropdown, Navbar as FlowbiteNavbar } from 'flowbite-react'
import { ReactNode } from 'react'
import { Logo } from './Logo'

export interface NavbarProps {
  activePage: string
  walletConnectionButton?: ReactNode
  className?: string
  dropdownClassName?: string
  linkClassName?: string
}

// TODO: proper image & text size (16px)
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
        {/* TODO: convert this to settings icon */}
        <FlowbiteDropdown
          arrowIcon={false}
          inline={true}
          label={<Bars3Icon className='h-6 w-6 dark:text-gray-600' />}
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

interface NavbarLinksProps {
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
        const isActiveLink = link.href === props.activePage
        return (
          <FlowbiteNavbar.Link
            href={link.href}
            className={classNames('dark:text-pt-purple-50', props.className)}
            active={isActiveLink}
            key={`nav-${i}-${link.name.toLowerCase()}`}
            theme={{
              active: {
                on: 'dark:text-pt-teal',
                off: 'dark:hover:text-pt-teal'
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
