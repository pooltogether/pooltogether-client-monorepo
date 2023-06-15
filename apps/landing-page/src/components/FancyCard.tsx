import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

export interface FancyCardProps {
  href: string
  iconSrc: string
  title: string
  author: string
  tags: string[]
  description: string
  className?: string
}

export const FancyCard = (props: FancyCardProps) => {
  const { href, iconSrc, title, author, tags, description, className } = props

  const cleanupRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/i
  const cleanURI = cleanupRegex.exec(href)?.[1]

  return (
    <a
      href={href}
      target='_blank'
      className={classNames(
        'flex flex-col gap-4 p-6 bg-[#8247E5]/30 rounded-2xl',
        'outline outline-2 -outline-offset-2 outline-transparent hover:outline-pt-purple-100/20 hover:shadow-lg',
        'bg-[radial-gradient(farthest-corner_at_0%_5%,_#440BA0B3_0%,_#5820CFB3_100%),_radial-gradient(farthest-corner_at_0%_0%,_#634E90_50%,_#36147D_100%)]',
        className
      )}
    >
      <div className='flex flex-col items-start'>
        <img src={iconSrc} className='h-12 w-auto' />
        <span className='text-clamp-xl text-pt-purple-50'>{title}</span>
        <span className='text-clamp-xs text-pt-purple-300'>By {author}</span>
      </div>
      <div className='flex gap-2 items-center'>
        {tags.map((tag, i) => (
          <span
            key={`${title.toLowerCase().replace(' ', '-')}-card-tag-${i}`}
            className='px-3 py-1 text-clamp-xs font-medium bg-pt-transparent text-pt-purple-100 rounded-lg'
          >
            {tag}
          </span>
        ))}
      </div>
      <span className='text-clamp-base text-pt-purple-100 line-clamp-2'>{description}</span>
      <div className='flex gap-2 items-center mt-auto ml-auto text-pt-purple-300 whitespace-nowrap'>
        <span className='text-clamp-base'>Open {cleanURI}</span>
        <ArrowTopRightOnSquareIcon className='w-4 h-auto' />
      </div>
    </a>
  )
}
