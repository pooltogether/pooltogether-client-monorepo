import classNames from 'classnames'
import { Vault } from 'pt-client-js'
import { useSingleVaultShareData } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { TokenIcon } from '../Icons/TokenIcon'

export interface VaultBadgeProps {
  vault: Vault
  className?: string
  iconClassName?: string
  nameClassName?: string
  symbolClassName?: string
}

export const VaultBadge = (props: VaultBadgeProps) => {
  const { vault, className, iconClassName, nameClassName, symbolClassName } = props

  const { data: shareData } = useSingleVaultShareData(vault)

  return (
    <div className={classNames('flex gap-2', className)}>
      <TokenIcon
        token={{
          chainId: vault.chainId,
          address: vault.address,
          name: shareData?.name,
          logoURI: vault.logoURI
        }}
        className={classNames('my-auto', iconClassName)}
      />
      <div className='flex flex-col text-left'>
        {!!shareData ? (
          <>
            <span className={classNames(nameClassName)}>{shareData.name}</span>
            <span className={classNames('text-sm text-pt-purple-100', symbolClassName)}>
              {shareData.symbol}
            </span>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}
