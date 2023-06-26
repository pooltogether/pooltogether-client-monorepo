import { useScreenSize } from '@shared/generic-react-hooks'
import { Navbar as BaseNavbar, Button, LINKS, NavbarLink } from '@shared/ui'
import classNames from 'classnames'
import { useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const t_nav = useTranslations('Navigation')

  const { isMobile } = useScreenSize()

  const shouldReduceMotion = useReducedMotion()

  const [scrollY, setScrollY] = useState<number>(0)

  const handleScroll = () => {
    setScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navbarLinks: NavbarLink[] = [
    { href: '/help', name: t_nav('help') },
    { href: '/ecosystem', name: t_nav('ecosystem') },
    { href: '/community', name: t_nav('community') },
    { href: '/builders', name: t_nav('builders') }
  ]

  return (
    <BaseNavbar
      links={navbarLinks}
      activePage={pathname}
      // @ts-ignore
      linksAs={Link}
      append={
        <Button href={LINKS.app_v4}>
          <span className='text-sm md:px-5 md:text-base'>{t_nav('usePt')}</span>
        </Button>
      }
      onClickBrand={() => router.push('/')}
      sticky={!isMobile}
      className={classNames('!px-4 !py-3 bg-transparent !border-opacity-0 sm:!px-8 md:shadow-2xl', {
        'transition-all': !shouldReduceMotion,
        '!shadow-transparent md:!py-8': scrollY === 0,
        'md:!py-4 md:bg-pt-bg-purple-darker md:!border-opacity-100': scrollY > 0
      })}
      linkClassName='text-xs sm:text-sm md:text-base text-pt-purple-100 hover:text-pt-purple-300'
      mobileBottomClassName='!gap-4 sm:!gap-6'
    />
  )
}
