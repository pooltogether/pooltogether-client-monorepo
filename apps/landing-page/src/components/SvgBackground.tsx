import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SvgBackgroundProps {
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

  const bgClassName = 'w-full hidden md:block'
  const smallBgClassName = 'w-full md:hidden'

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
          <img src={bgSrc} className={bgClassName} />
          <img src={smallBgSrc} className={smallBgClassName} />
        </>
      )}
      {!isReducedMotion && (
        <>
          <object type='image/svg+xml' data={animatedBgSrc} className={bgClassName} />
          <object type='image/svg+xml' data={animatedSmallBgSrc} className={smallBgClassName} />
        </>
      )}
    </>
  )
}
