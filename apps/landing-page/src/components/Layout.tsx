import { MODAL_KEYS, useIsModalOpen, useScreenSize } from '@shared/generic-react-hooks'
import { CaptchaModal } from '@shared/react-components'
import { Button, Footer, FooterItem, LINKS, Navbar, SocialIcon } from '@shared/ui'
import classNames from 'classnames'
import { useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export const Layout = (props: LayoutProps) => {
  const { children, className } = props

  const router = useRouter()

  const { setIsModalOpen: setIsCaptchaModalOpen } = useIsModalOpen(MODAL_KEYS.captcha)

  const { isDesktop } = useScreenSize()

  const shouldReduceMotion = useReducedMotion()

  const [scrollY, setScrollY] = useState<number>(0)

  const handleScroll = () => {
    setScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const footerItems: FooterItem[] = [
    {
      title: 'Independent Security Audits',
      content: [
        {
          content: (
            <SecurityAuditItem
              svgSrc='/graphics/c4Logo.svg'
              altText='CodeArena V4 Audit'
              href={'https://code4rena.com/reports/2021-10-pooltogether'}
              date='November 5th, 2021'
            />
          )
        },
        {
          content: (
            <SecurityAuditItem
              svgSrc='/graphics/ozLogo.svg'
              altText='OpenZeppelin V3 Audit'
              href={'https://blog.openzeppelin.com/pooltogether-v3-audit'}
              date='October 21, 2020'
            />
          )
        }
      ],
      className: 'min-w-min xl:pr-20',
      titleClassName: 'whitespace-nowrap lg:text-right',
      itemClassName: 'lg:ml-auto'
    },
    {
      title: 'Ecosystem',
      content: [
        // TODO: add hrefs
        { content: 'Tools', href: '#' },
        { content: 'Developer Docs', href: LINKS.devDocs },
        { content: 'Security', href: LINKS.audits },
        { content: 'FAQ', href: LINKS.faq },
        { content: 'Assets', href: '#' },
        { content: 'Governance', href: LINKS.governance },
        { content: 'User Docs', href: LINKS.docs }
      ]
    },
    {
      title: 'Community',
      content: [
        {
          content: 'Twitter',
          href: LINKS.twitter,
          icon: <SocialIcon platform='twitter' className='w-6 h-auto shrink-0' />
        },
        {
          content: 'Discord',
          onClick: () => setIsCaptchaModalOpen(true),
          icon: <SocialIcon platform='discord' className='w-6 h-auto shrink-0' />
        },
        {
          content: 'GitHub',
          href: LINKS.github,
          icon: <SocialIcon platform='github' className='w-6 h-auto shrink-0' />
        },
        {
          content: 'Medium',
          href: LINKS.medium,
          icon: <SocialIcon platform='medium' className='w-6 h-auto shrink-0' />
        }
      ]
    },
    {
      title: 'Languages',
      content: [
        // TODO: actually add languages and language switching functionality
        { content: 'English', onClick: () => {} }
      ]
    }
  ]

  const getDiscordInvite = async (token: string) => {
    if (!!token) {
      const response = await fetch(
        'https://discord-invite.pooltogether-api.workers.dev/generateInvite',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json;charset=UTF-8' },
          body: JSON.stringify({ 'h-captcha-response': token })
        }
      )
      console.log('🍪 ~ response:', response)

      if (response.status === 200) {
        const inviteToken = await response.json()
        console.log('🍪 ~ inviteToken:', inviteToken)
        // window.location.href = `https://discord.com/invite/${inviteToken}`
      }
    }
  }

  const isDarkerFooterBg = router.pathname === '/' || router.pathname === '/ecosystem'

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar
        links={[
          { href: '/help', name: 'Help' },
          { href: '/ecosystem', name: 'Ecosystem' },
          { href: '/community', name: 'Community' },
          { href: '/builders', name: 'Builders' }
        ]}
        activePage={router.pathname}
        // @ts-ignore
        linksAs={Link}
        append={
          <Button href={LINKS.app_v4}>
            <span className='text-sm md:px-6 md:text-base'>Use PoolTogether</span>
          </Button>
        }
        sticky={isDesktop}
        className={classNames(
          '!px-4 !py-3 bg-transparent !border-opacity-0 sm:!px-8 md:shadow-2xl',
          {
            'transition-all': !shouldReduceMotion,
            '!shadow-transparent md:!py-8': scrollY === 0,
            'md:!py-4 md:bg-pt-bg-purple-darker md:!border-opacity-100': scrollY > 0
          }
        )}
        linkClassName='text-xs sm:text-sm md:text-base text-pt-purple-100 hover:text-pt-purple-300'
        mobileBottomClassName='!gap-4 sm:!gap-6'
      />

      <CaptchaModal
        hCaptchaSiteKey='11cdabde-af7e-42cb-ba97-76e35b7f7c39'
        header='Join our Discord Community'
        onVerify={getDiscordInvite}
      />

      <main
        className={classNames(
          'relative w-full max-w-[1920px] flex flex-col items-center mx-auto shadow-2xl',
          className
        )}
      >
        <>{children}</>
      </main>

      <Footer
        items={footerItems}
        className={classNames({
          'bg-pt-bg-purple-darker': isDarkerFooterBg,
          'bg-pt-purple-800': !isDarkerFooterBg
        })}
        containerClassName='max-w-[1440px]'
        titleClassName='text-pt-purple-400'
      />
    </div>
  )
}

interface SecurityAuditItemProps {
  svgSrc: `${string}.svg`
  altText: string
  href: string
  date: string
}

const SecurityAuditItem = (props: SecurityAuditItemProps) => {
  const { svgSrc, altText, href, date } = props

  return (
    <a href={href} target='_blank' className='relative flex flex-col'>
      <Image src={svgSrc} alt={altText} fill={true} className='!relative' />
      <span className='-mt-[2%] ml-[20%] text-gray-200'>{date}</span>
    </a>
  )
}
