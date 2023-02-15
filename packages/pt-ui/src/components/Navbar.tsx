import { Navbar as FlowbiteNavbar, Dropdown as FlowbiteDropdown } from 'flowbite-react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import { Logo } from './Logo'

export interface NavbarProps {
  walletConnectionButton?: ReactNode
  className?: string
  dropdownClassName?: string
  linkClassName?: string
}

export const Navbar = (props: NavbarProps) => {
  return (
    <FlowbiteNavbar fluid={true} className={props.className}>
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
        <NavbarLinks className={props.linkClassName} />
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  )
}

export interface NavbarLinksProps {
  className?: string
}

const NavbarLinks = (props: NavbarLinksProps) => {
  return (
    <>
      <FlowbiteNavbar.Link href='/prizes' className={props.className}>
        Prizes
      </FlowbiteNavbar.Link>
      <FlowbiteNavbar.Link href='/deposit' className={props.className}>
        Deposit
      </FlowbiteNavbar.Link>
      <FlowbiteNavbar.Link href='/account' className={props.className}>
        Account
      </FlowbiteNavbar.Link>
      <FlowbiteNavbar.Link href='/extensions' className={props.className}>
        Extensions
      </FlowbiteNavbar.Link>
    </>
  )
}