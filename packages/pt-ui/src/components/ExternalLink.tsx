import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

export interface ExternalLinkProps {
  href: string
  text: string
  size?: 'small' | 'medium'
  className?: string
}

export const ExternalLink = (props: ExternalLinkProps) => {
  const { href, text, size, className } = props

  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className={classNames(
        'inline-flex items-center gap-1',
        { 'text-sm': size === 'small' || size === undefined },
        className
      )}
    >
      {text}
      <ArrowTopRightOnSquareIcon
        className={classNames('text-inherit', {
          'h-4 w-4': size === 'small' || size === undefined,
          'h-5 w-5': size === 'medium'
        })}
      />
    </a>
  )
}
