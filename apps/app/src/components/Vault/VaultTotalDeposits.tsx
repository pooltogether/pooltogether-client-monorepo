import { utils } from 'ethers'
import { useMemo } from 'react'
import { useProvider } from 'wagmi'
import { useVaultBalance } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import { LoadingSpinner } from 'pt-ui'
import { formatBigNumberForDisplay } from 'pt-utilities'
import { CurrencyValue } from '@components/CurrencyValue'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'

interface VaultTotalDepositsProps {
  vaultInfo: VaultInfo
  options?: { displayCurrency?: boolean }
}

export const VaultTotalDeposits = (props: VaultTotalDepositsProps) => {
  const { vaultInfo, options } = props

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllCoingeckoTokenPrices(['usd'])

  const provider = useProvider({ chainId: vaultInfo.chainId })
  const { data: totalDeposits, isFetched: isFetchedTotalDeposits } = useVaultBalance(
    provider,
    vaultInfo
  )

  if (!isFetchedTotalDeposits) {
    return <LoadingSpinner />
  }

  if (options?.displayCurrency) {
    const usdPrice = useMemo(() => {
      return isFetchedTokenPrices && !!tokenPrices
        ? tokenPrices[vaultInfo.chainId][
            vaultInfo.extensions.underlyingAsset.address.toLowerCase()
          ]?.['usd'] ?? 0
        : 0
    }, [isFetchedTokenPrices, tokenPrices, vaultInfo])

    const formattedTokenAmount = Number(utils.formatUnits(totalDeposits, vaultInfo.decimals))

    return (
      <span className='text-lg'>
        <CurrencyValue baseValue={formattedTokenAmount * usdPrice} options={{ hideZeroes: true }} />
      </span>
    )
  }

  return (
    <span className='text-lg'>
      {formatBigNumberForDisplay(totalDeposits, vaultInfo.decimals.toString(), {
        hideZeroes: true
      })}{' '}
      {vaultInfo.extensions.underlyingAsset.symbol}
    </span>
  )
}
