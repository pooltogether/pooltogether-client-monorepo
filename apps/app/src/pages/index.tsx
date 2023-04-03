import Link from 'next/link'
import { NextDrawCountdown } from 'pt-components'
import { Button } from 'pt-ui'
import { Layout } from '@components/Layout'
import { LargestPrizeHeader } from '@components/Prizes/LargestPrizeHeader'
import { PrizePoolCards } from '@components/Prizes/PrizePoolCards'

export default function HomePage() {
  return (
    <Layout className='gap-8'>
      <LargestPrizeHeader />
      <NextDrawCountdown />
      <Link href='/deposit' passHref={true}>
        <Button>Deposit to Win</Button>
      </Link>
      <PrizePoolCards />
    </Layout>
  )
}
