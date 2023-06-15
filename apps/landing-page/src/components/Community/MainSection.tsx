import classNames from 'classnames'
import { SimpleTextBanner } from '@components/SimpleTextBanner'
import { CommunityCard } from './CommunityCard'
import { SocialItem } from './SocialItem'

interface MainSection {
  className?: string
}

export const MainSection = (props: MainSection) => {
  const { className } = props

  return (
    <section className={classNames('w-full relative flex', className)}>
      <img src='/backgrounds/static/communitySection1.svg' className='w-full' />
      <div className='absolute inset-0'>
        <SimpleTextBanner
          title={
            <>
              Take a <span className='text-pt-purple-400'>dip</span> in the pool
            </>
          }
          description={<>Learn about the active community around PoolTogether</>}
          className='absolute w-full mt-[16%]'
        />
        <CommunityCards className='absolute w-full max-w-[82%] h-[40%] mt-[34%] ml-[9%]' />
        <Socials className='absolute w-full max-w-[60%] h-[24%] mt-[77%] ml-[20%]' />
      </div>
    </section>
  )
}

interface CommunityCardsProps {
  className?: string
}

const CommunityCards = (props: CommunityCardsProps) => {
  const { className } = props

  return (
    <div className={classNames('grid grid-cols-3 auto-rows-fr gap-8', className)}>
      <CommunityCard type='chat' />
      <CommunityCard type='forums' />
      <CommunityCard type='voting' />
      <CommunityCard type='grants' />
      <CommunityCard type='calendar' />
    </div>
  )
}

interface SocialsProps {
  className?: string
}

const Socials = (props: SocialsProps) => {
  const { className } = props

  return (
    <div className={classNames('flex flex-col gap-12 items-center justify-center', className)}>
      <span className='text-clamp-lg text-pt-purple-400'>
        You can also find us on these platforms:
      </span>
      <div className='w-full flex gap-6 justify-between pb-4'>
        <SocialItem type='lens' />
        <SocialItem type='mirror' />
        <SocialItem type='twitter' />
        <SocialItem type='medium' />
        <SocialItem type='notion' />
      </div>
    </div>
  )
}
