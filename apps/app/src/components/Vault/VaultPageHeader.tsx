import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Vault } from 'pt-client-js'
import { NetworkBadge, TokenIcon } from 'pt-components'

interface VaultPageHeaderProps {
  vault: Vault
  className?: string
}

export const VaultPageHeader = (props: VaultPageHeaderProps) => {
  const { vault, className } = props

  const router = useRouter()

  return (
    <>
      <BackButton />
      <div className={classNames('flex flex-col gap-2 items-center', className)}>
        <div className='inline-flex gap-2 items-center'>
          <TokenIcon
            token={{
              chainId: vault.chainId,
              address: vault.address,
              name: vault.name,
              logoURI: vault.logoURI
            }}
            className='h-8 w-8'
          />
          <span className='text-4xl font-semibold font-averta'>{vault.name}</span>
        </div>
        <NetworkBadge
          chainId={vault.chainId}
          appendText='Prize Pool'
          onClick={() => router.push(`/prizes?network=${vault.chainId}`)}
        />
      </div>
    </>
  )
}

const BackButton = () => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push('/vaults')}
      className='absolute left-16 flex items-center gap-2 text-pt-purple-100 cursor-pointer'
    >
      <ArrowLeftIcon className='h-4 w-4' />
      <span className='text-xs font-medium'>Back</span>
    </div>
  )
}
