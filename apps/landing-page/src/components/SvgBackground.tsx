import classNames from 'classnames'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export interface SvgBackgroundProps {
  bg: `${string}.svg`
  smallBg: `${string}.svg`
  animatedBg?: `${string}.svg`
  animatedSmallBg?: `${string}.svg`
}

export const SvgBackground = (props: SvgBackgroundProps) => {
  const { bg, smallBg, animatedBg, animatedSmallBg } = props

  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsReducedMotion(true)
    }
  }, [])

  const baseClassName = 'absolute w-full -z-10'
  const bgClassName = 'hidden md:block'
  const smallBgClassName = 'md:hidden'

  const bgSrc = `/backgrounds/static/${bg}`
  const smallBgSrc = `/backgrounds/static/${smallBg}`
  const animatedBgSrc = animatedBg ? `/backgrounds/animated/${animatedBg}` : bgSrc
  const animatedSmallBgSrc = animatedSmallBg
    ? `/backgrounds/animated/${animatedSmallBg}`
    : smallBgSrc

  return (
    <>
      {isReducedMotion && (
        <>
          <object
            type='image/svg+xml'
            data={bgSrc}
            className={classNames(baseClassName, bgClassName)}
          />
          <object
            type='image/svg+xml'
            data={smallBgSrc}
            className={classNames(baseClassName, smallBgClassName)}
          />
        </>
      )}
      {!isReducedMotion && (
        <>
          <object
            type='image/svg+xml'
            data={animatedBgSrc}
            className={classNames(baseClassName, bgClassName)}
          />
          <object
            type='image/svg+xml'
            data={animatedSmallBgSrc}
            className={classNames(baseClassName, smallBgClassName)}
          />
        </>
      )}
    </>
  )
}
