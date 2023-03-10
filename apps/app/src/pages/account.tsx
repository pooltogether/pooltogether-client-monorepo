import { AccountDepositsHeader } from '@components/Account/AccountDepositsHeader'
import { AccountVaultList } from '@components/Account/AccountVaultList'
import { Layout } from '@components/Layout'

export default function AccountPage() {
  return (
    <Layout className='gap-6'>
      <AccountDepositsHeader />
      <AccountVaultList />
    </Layout>
  )
}
