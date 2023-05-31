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
            className='h-6 w-6 md:h-8 md:w-8'
          />
          <span className='text-2xl font-semibold font-averta md:text-4xl'>{vault.name}</span>
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
      className='absolute top-9 left-3 flex items-center gap-2 text-pt-purple-100 cursor-pointer md:top-3 md:left-16'
    >
      <ArrowLeftIcon className='h-6 w-6 md:h-4 md:w-4' />
      <span className='hidden text-xs font-medium md:block'>Back</span>
    </div>
  )
}
