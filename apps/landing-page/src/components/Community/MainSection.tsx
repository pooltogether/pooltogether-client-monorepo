import classNames from 'classnames'

interface MainSection {
  className?: string
}

export const MainSection = (props: MainSection) => {
  const { className } = props

  return (
    <section className={classNames('w-full relative flex', className)}>
      <img src='/backgrounds/static/communitySection1.svg' className='w-full' />
      <div className='absolute inset-0'></div>
    </section>
  )
}
