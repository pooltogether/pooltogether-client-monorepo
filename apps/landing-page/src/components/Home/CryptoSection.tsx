import classNames from 'classnames'

interface CryptoSection {
  className?: string
}

export const CryptoSection = (props: CryptoSection) => {
  const { className } = props

  return (
    <section className={classNames('w-full relative flex', className)}>
      <object type='image/svg+xml' data='/animations/animatedSection4.svg' className='w-full' />
    </section>
  )
}
