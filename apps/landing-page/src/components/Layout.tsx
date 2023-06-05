import classNames from 'classnames'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { Footer, Navbar } from 'ui'

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
      />

      <main
        className={classNames(
          'w-full max-w-screen-xl relative flex flex-col flex-grow items-center mx-auto px-4 py-8 mb-40 md:px-8',
          className
        )}
      >
        {isBrowser && router.isReady && <>{children}</>}
      </main>

      <Footer />
    </div>
  )
}
