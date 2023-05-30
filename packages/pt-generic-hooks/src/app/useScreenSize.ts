import { useEffect, useState } from 'react'

/**
 * Returns the current screen size in pixels
 * @returns
 */
export const useScreenSize = () => {
  // NOTE: Initializing state with undefined width/height so server and client renders match (https://joshwcomeau.com/react/the-perils-of-rehydration/)
  const [screenSize, setScreenSize] = useState<{
    width: number | undefined
    height: number | undefined
  }>({
    width: undefined,
    height: undefined
  })

  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { width: screenSize.width, height: screenSize.height, isFetched: !!screenSize.width }
}
