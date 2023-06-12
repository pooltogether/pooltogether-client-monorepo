import { Button, Footer, FooterItem, LINKS, Navbar, SocialIcon } from '@shared/ui'
import classNames from 'classnames'
import Head from 'next/head'
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

  // NOTE: This is necessary due to hydration errors otherwise.
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => setIsBrowser(true), [])

  const footerItems: FooterItem[] = [
    {
      title: 'Independent Security Audits',
      content: [
        // TODO: add images and links to audits
        {
          content: 'TODO: codearena audit',
          onClick: () => {
            window.open('#')
          }
        },
        {
          content: 'TODO: openzeppelin audit',
          onClick: () => {
            window.open('#')
          }
        }
      ],
      className: 'grow-[2] pr-20',
      titleClassName: 'text-right',
      itemClassName: 'ml-auto'
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
          href: LINKS.discord,
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

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>PoolTogether</title>
      </Head>

      <Navbar
        links={[
          { href: '/help', name: 'Help' },
          { href: '/ecosystem', name: 'Ecosystem' },
          { href: '/community', name: 'Community' },
          { href: '/builders', name: 'Builders' }
        ]}
        activePage={router.pathname}
        linksAs={Link}
        append={
          <Button href={LINKS.app_v4}>
            <span className='px-10 text-base'>Use PoolTogether</span>
          </Button>
        }
        className='py-8'
        linkClassName='text-pt-purple-100 hover:text-pt-purple-300'
      />

      <main
        className={classNames(
          'w-full relative flex flex-col flex-grow items-center mb-10',
          className
        )}
      >
        {isBrowser && router.isReady && <>{children}</>}
      </main>

      <Footer
        items={footerItems}
        containerClassName='max-w-7xl'
        titleClassName='text-pt-purple-400'
      />
    </div>
  )
}
