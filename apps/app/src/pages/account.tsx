import { AccountDepositsHeader } from '@components/Account/AccountDepositsHeader'
import { AccountVaultsTable } from '@components/Account/AccountVaultsTable'
import { Layout } from '@components/Layout'

export default function AccountPage() {
  return (
    <Layout className='gap-6'>
      <AccountDepositsHeader />
      <AccountVaultsTable />
    </Layout>
  )
}
