import { BigNumber, utils } from 'ethers'
import { useProvider } from 'wagmi'
import { useVaultShareMultiplier } from 'pt-hyperstructure-hooks'
import { VaultInfoWithBalance } from 'pt-types'
import { formatBigNumberForDisplay, getAssetsFromShares } from 'pt-utilities'
import { CurrencyValue } from '@components/CurrencyValue'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'

interface AccountVaultBalanceProps {
  vaultInfo: VaultInfoWithBalance
}

export const AccountVaultBalance = (props: AccountVaultBalanceProps) => {
  const { vaultInfo } = props

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllCoingeckoTokenPrices()
  const usdPrice =
    isFetchedTokenPrices && !!tokenPrices
      ? tokenPrices[vaultInfo.chainId]?.[
          vaultInfo.extensions.underlyingAsset.address.toLowerCase()
        ]?.['usd'] ?? 0
      : 0

  // const provider = useProvider({ chainId: vaultInfo.chainId })
  // const { data: vaultMultiplier } = useVaultShareMultiplier(provider, vaultInfo)

  // TODO: remove this after vaults have proper addresses (and uncomment code above)
  const vaultMultiplier = utils.parseUnits('2', vaultInfo.decimals)

  const shareBalance = BigNumber.from(vaultInfo.balance)
  const tokenBalance = getAssetsFromShares(shareBalance, vaultMultiplier, vaultInfo.decimals)

  const formattedTokenBalance = utils.formatUnits(tokenBalance, vaultInfo.decimals)
  const usdBalance = Number(formattedTokenBalance) * usdPrice

  return (
    <div className='flex flex-col'>
      <span className='text-lg'>
        {formatBigNumberForDisplay(tokenBalance, vaultInfo.decimals.toString())}{' '}
      </span>
      <span className='text-sm'>
        <CurrencyValue baseValue={usdBalance} hideZeroes={true} />
      </span>
    </div>
  )
}
