import ReactCountUp from 'react-countup'

export interface CountUpProps {
  countTo: number
  countFrom?: number
  decimals?: number
  duration?: number
  delay?: number
  preserveValue?: boolean
  separator?: string
  useEasing?: boolean
  onEnd?: () => void
  className?: string
}

export const CountUp = (props: CountUpProps) => {
  const { countTo, countFrom, decimals, duration, preserveValue, separator, ...rest } = props

  return (
    <ReactCountUp
      start={countFrom}
      end={countTo}
      decimals={decimals ?? countTo > 10_000 ? 0 : 2}
      duration={duration ?? 1.4}
      preserveValue={preserveValue ?? true}
      separator={separator ?? ','}
      {...rest}
    />
  )
}
