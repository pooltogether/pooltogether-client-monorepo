import classNames from 'classnames'
import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export const PageLayout = (props: PageLayoutProps) => {
  const { children, className } = props

  return (
    <main
      className={classNames(
        'relative w-full max-w-[1920px] flex flex-col grow items-center mx-auto shadow-2xl',
        className
      )}
    >
      <>{children}</>
    </main>
  )
}
