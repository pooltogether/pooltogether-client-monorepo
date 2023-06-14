import classNames from 'classnames'

export interface SimpleCardProps {
  href: string
  iconSrc: `${string}.svg`
  title: string
  description: string
  className?: string
}

export const SimpleCard = (props: SimpleCardProps) => {
  const { href, iconSrc, title, description, className } = props

  return (
    <a
      href={href}
      target='_blank'
      className={classNames(
        'flex flex-col gap-6 p-12 bg-pt-bg-purple-darker text-pt-purple-100 rounded-2xl',
        'outline outline-2 -outline-offset-2 outline-transparent hover:outline-pt-purple-100/20 hover:shadow-lg',
        className
      )}
    >
      <div className='flex gap-3 items-center'>
        <img src={iconSrc} className='w-9 h-auto text-pt-teal-dark' />
        <span className='text-clamp-xl'>{title}</span>
      </div>
      <span className='text-clamp-base'>{description}</span>
    </a>
  )
}
