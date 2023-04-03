import { Layout } from '@components/Layout'
import { VaultFilters } from '@components/Vault/VaultFilters'
import { VaultsDisplay } from '@components/Vault/VaultsDisplay'

export default function DepositPage() {
  return (
    <Layout className='gap-14'>
      <VaultFilters />
      <VaultsDisplay />
    </Layout>
  )
}
