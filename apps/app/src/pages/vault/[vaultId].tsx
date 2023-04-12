import { useRouter } from 'next/router'
import { Layout } from '@components/Layout'

export default function VaultPage() {
  const router = useRouter()

  const { vaultId } = router.query

  return (
    <Layout className='gap-14'>
      <span>=== PAGE UNDER CONSTRUCTION ===</span>
    </Layout>
  )
}
