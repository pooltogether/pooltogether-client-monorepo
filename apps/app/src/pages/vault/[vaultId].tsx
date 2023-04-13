import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useSelectedVaults } from 'pt-hyperstructure-hooks'
import { Layout } from '@components/Layout'
import { VaultPageButtons } from '@components/Vault/VaultPageButtons'
import { VaultPageHeader } from '@components/Vault/VaultPageHeader'
import { VaultPageInfo } from '@components/Vault/VaultPageInfo'

export default function VaultPage() {
  const router = useRouter()

  const { vaultId } = router.query

  const { vaults } = useSelectedVaults()

  const vault = useMemo(() => {
    return vaults?.vaults[vaultId as string]
  }, [vaultId, vaults])

  if (router.isReady && !!vault) {
    return (
      <Layout className='gap-12'>
        <VaultPageHeader vault={vault} />
        <VaultPageInfo vault={vault} />
        <VaultPageButtons vault={vault} />
      </Layout>
    )
  }
}
