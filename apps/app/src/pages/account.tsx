import { AccountDepositsHeader } from '@components/Account/AccountDepositsHeader'
import { AccountVaultList } from '@components/Account/AccountVaultList'
import { Layout } from '@components/Layout'

export default function AccountPage() {
  return (
    <Layout>
      <div className='flex flex-col flex-grow items-center py-2'>
        <main className='flex flex-col items-center mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8 gap-6'>
          <AccountDepositsHeader />
          <AccountVaultList />
        </main>
      </div>
    </Layout>
  )
}
