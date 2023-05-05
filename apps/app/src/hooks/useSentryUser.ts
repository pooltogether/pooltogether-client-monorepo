import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

export const useSentryUser = () => {
  const { address } = useAccount()
  useEffect(() => {
    if (!!address) {
      Sentry.setUser({ wallet: address })
    }
  }, [address])
}
