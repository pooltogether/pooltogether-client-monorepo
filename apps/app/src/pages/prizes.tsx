import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { PrizePoolDropdown } from 'pt-components'
import { Button, ExternalLink } from 'pt-ui'
import { NETWORK } from 'pt-utilities'
import { Layout } from '@components/Layout'
import { PrizesTable } from '@components/Prizes/PrizesTable'
import { useNetworks } from '@hooks/useNetworks'

export default function PrizesPage() {
  const router = useRouter()

  const networks = useNetworks()

  const [selectedNetwork, setSelectedNetwork] = useState<NETWORK>(NETWORK.optimism)

  useEffect(() => {
    const rawUrlNetwork = router.query['network']
    const urlNetwork =
      !!rawUrlNetwork && typeof rawUrlNetwork === 'string' ? parseInt(rawUrlNetwork) : undefined

    if (!!urlNetwork && urlNetwork in NETWORK) {
      setSelectedNetwork(urlNetwork)
    }
  }, [router])

  return (
    <Layout className='gap-8 mb-20'>
      <span className='text-6xl py-2'>🏆</span>
      <PrizePoolDropdown
        networks={networks}
        selectedNetwork={selectedNetwork}
        onSelect={setSelectedNetwork}
      />
      <Button href={`/deposit?network=${selectedNetwork}`}>Deposit to Win</Button>
      <PrizesTable chainId={selectedNetwork} />
      {/* TODO: add link */}
      <ExternalLink
        href='#'
        text='Learn more about how prizes work'
        size='medium'
        className='text-pt-purple-300'
      />
    </Layout>
  )
}
