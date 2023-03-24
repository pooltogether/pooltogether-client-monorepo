import { utils } from 'ethers'
import { Vault } from 'pt-client-js'
import {
  useSingleVaultShareData,
  useSingleVaultTokenData,
  useVaultExchangeRate
} from 'pt-hyperstructure-hooks'
import { ExternalLink, Spinner } from 'pt-ui'
import { formatBigNumberForDisplay, getBlockExplorerUrl, getSharesFromAssets } from 'pt-utilities'

export interface TxFormInfoProps {
  vault: Vault
  linkType: 'share' | 'token'
}

// TODO: add tooltip next to conversion rate
export const TxFormInfo = (props: TxFormInfoProps) => {
  const { vault, linkType } = props

  const { data: vaultShareData } = useSingleVaultShareData(vault)
  const { data: vaultTokenData } = useSingleVaultTokenData(vault)

  const { data: vaultExchangeRate } = useVaultExchangeRate(vault)

  const tokenAddress = linkType === 'share' ? vault.address : vaultTokenData?.address
  const tokenDisplayName = linkType === 'share' ? 'Prize Asset' : 'Token'

  const decimals = vaultShareData?.decimals ?? vaultTokenData?.decimals

  return (
    <div className='flex items-center justify-between gap-4 dark:bg-pt-transparent px-4 py-2 rounded-b-lg'>
      <span className='dark:text-pt-purple-200'>
        1 {!!vaultTokenData ? vaultTokenData?.symbol : <Spinner />} ={' '}
        {!!vaultExchangeRate &&
          decimals !== undefined &&
          formatBigNumberForDisplay(
            getSharesFromAssets(utils.parseUnits('1', decimals), vaultExchangeRate, decimals),
            decimals.toString(),
            { hideZeroes: true }
          )}{' '}
        {!!vaultShareData ? vaultShareData?.symbol : <Spinner />}
      </span>
      {!!tokenAddress ? (
        <ExternalLink
          href={getBlockExplorerUrl(vault.chainId, tokenAddress, 'token')}
          text={`View ${tokenDisplayName}`}
          className='text-pt-teal'
        />
      ) : (
        <Spinner />
      )}
    </div>
  )
}
