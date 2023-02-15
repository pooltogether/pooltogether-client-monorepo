import { Navbar as FlowbiteNavbar, Dropdown as FlowbiteDropdown } from 'flowbite-react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'
import { Logo } from './Logo'

export interface NavbarProps {
  children: ReactNode
}

export const Navbar = (props: NavbarProps) => {
  return (
    <FlowbiteNavbar fluid={true}>
      {/* Left Side Branding */}
      <FlowbiteNavbar.Brand href='/'>
        <Logo />
      </FlowbiteNavbar.Brand>

      {/* Right Side Content & Dropdown */}
      <div className='flex md:order-2'>
        {props.children}
        <FlowbiteDropdown arrowIcon={false} inline={true} label={<Bars3Icon className='h6' />}>
          <FlowbiteDropdown.Item>Settings</FlowbiteDropdown.Item>
        </FlowbiteDropdown>
        <FlowbiteNavbar.Toggle />
      </div>

      {/* Middle Collapsable Content */}
      <FlowbiteNavbar.Collapse>
        <NavbarLinks />
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  )
}

const NavbarLinks = () => {
  return (
    <>
      <FlowbiteNavbar.Link href='/prizes'>Prizes</FlowbiteNavbar.Link>
      <FlowbiteNavbar.Link href='/deposit'>Deposit</FlowbiteNavbar.Link>
      <FlowbiteNavbar.Link href='/account'>Account</FlowbiteNavbar.Link>
      <FlowbiteNavbar.Link href='/extensions'>Extensions</FlowbiteNavbar.Link>
    </>
  )
}
