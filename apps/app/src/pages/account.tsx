import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { Layout } from '@components/Layout'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'
import { AccountUI } from '@views/Account/AccountUI'
import { tokenPricesAtom } from '../atoms'

export default function AccountPage() {
  const { data: allTokenPrices, isFetched: isFetchedAllTokenPrices } = useAllCoingeckoTokenPrices()
  const [tokenPrices, setTokenPrices] = useAtom(tokenPricesAtom)
  useEffect(() => {
    if (isFetchedAllTokenPrices) {
      setTokenPrices({ ...tokenPrices, ...allTokenPrices })
    }
  }, [isFetchedAllTokenPrices, allTokenPrices])

  return (
    <Layout>
      <AccountUI />
    </Layout>
  )
}
