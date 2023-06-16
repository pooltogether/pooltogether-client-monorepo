import classNames from 'classnames'
import { SimpleTextBanner } from '@components/SimpleTextBanner'
import { SvgBackground } from '@components/SvgBackground'
import { CommunityCard } from './CommunityCard'
import { SocialItem } from './SocialItem'

interface MainSection {
  className?: string
}

export const MainSection = (props: MainSection) => {
  const { className } = props

  return (
    // TODO: ideally we don't have magic numbers for bottom margin here
    <section
      className={classNames('w-full relative flex mb-[64rem] sm:mb-[34rem] md:mb-0', className)}
    >
      <SvgBackground bg='communitySection1.svg' smallBg='mobileCommunitySection1.svg' />
      <div className='absolute inset-0'>
        <SimpleTextBanner
          title={
            <>
              Take a <span className='text-pt-purple-400'>dip</span> in the pool
            </>
          }
          description={<>Learn about the active community around PoolTogether</>}
          className='absolute w-full mt-[28%] md:mt-[16%]'
          descriptionClassName='px-[20%] sm:px-0'
        />
        <CommunityCards className='w-full mt-[84%] md:max-w-[82%] md:h-[40%] md:mt-[34%] md:ml-[9%]' />
        <Socials className='w-full my-32 md:max-w-[60%] md:h-[24%] md:mb-0 md:mt-[2%] md:ml-[20%]' />
      </div>
    </section>
  )
}

interface CommunityCardsProps {
  className?: string
}

// TODO: this should be a flex element on small screens so that it can wrap nicer on tablet sizes
const CommunityCards = (props: CommunityCardsProps) => {
  const { className } = props

  return (
    <div
      className={classNames(
        'grid grid-cols-1 auto-rows-fr gap-3 px-4 md:grid-cols-3 md:gap-8 md:px-0',
        className
      )}
    >
      <CommunityCard type='chat' className='mx-auto' />
      <CommunityCard type='forums' className='mx-auto' />
      <CommunityCard type='voting' className='mx-auto' />
      <CommunityCard type='grants' className='mx-auto' />
      <CommunityCard type='calendar' className='mx-auto' />
    </div>
  )
}

interface SocialsProps {
  className?: string
}

const Socials = (props: SocialsProps) => {
  const { className } = props

  return (
    <div
      className={classNames(
        'flex flex-col gap-6 items-center justify-center py-12 bg-pt-bg-purple-darker md:gap-12 md:py-0 md:bg-transparent',
        className
      )}
    >
      <span className='text-clamp-lg text-pt-purple-400'>
        You can also find us on these platforms:
      </span>
      <div className='w-full flex flex-wrap gap-6 justify-center px-16 md:justify-between md:pb-4 md:px-0'>
        <SocialItem type='lens' />
        <SocialItem type='mirror' />
        <SocialItem type='twitter' />
        <SocialItem type='medium' />
        <SocialItem type='notion' />
      </div>
    </div>
  )
}
