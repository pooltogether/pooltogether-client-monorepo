import classNames from 'classnames'
import Image from 'next/image'

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
        'flex flex-col gap-3 p-8 bg-pt-bg-purple-darker text-pt-purple-100 rounded-2xl md:gap-6 md:p-12',
        'outline outline-2 -outline-offset-2 outline-transparent hover:outline-pt-purple-100/20 hover:shadow-lg',
        className
      )}
    >
      <div className='flex gap-2 items-center md:gap-3'>
        <Image
          src={iconSrc}
          width={32}
          height={32}
          alt={title}
          className='w-6 h-auto text-pt-teal-dark md:w-8'
        />
        <span className='text-clamp-2xl md:text-clamp-xl'>{title}</span>
      </div>
      <span className='text-clamp-base'>{description}</span>
    </a>
  )
}
