import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Layout } from '@components/Layout'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'
import { DepositUI } from '@views/Deposit/DepositUI'
import { tokenPricesAtom } from '../atoms'

export default function DepositPage() {
  const { data: allTokenPrices, isFetched: isFetchedAllTokenPrices } = useAllCoingeckoTokenPrices()
  const [tokenPrices, setTokenPrices] = useAtom(tokenPricesAtom)
  useEffect(() => {
    if (isFetchedAllTokenPrices) {
      setTokenPrices({ ...tokenPrices, ...allTokenPrices })
    }
  }, [isFetchedAllTokenPrices, allTokenPrices])

  return (
    <Layout>
      <DepositUI />
    </Layout>
  )
}
