import { BigNumber, utils } from 'ethers'
import { useMemo } from 'react'
import { VaultInfo } from 'pt-types'
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

  // TODO: fetch total deposits
  const totalTokenDeposits: BigNumber = BigNumber.from('1234567890')

  if (options?.displayCurrency) {
    const usdPrice = useMemo(() => {
      return isFetchedTokenPrices && !!tokenPrices
        ? tokenPrices[vaultInfo.chainId][
            vaultInfo.extensions.underlyingAsset.address.toLowerCase()
          ]?.['usd'] ?? 0
        : 0
    }, [isFetchedTokenPrices, tokenPrices, vaultInfo])

    const formattedTokenAmount = Number(utils.formatUnits(totalTokenDeposits, vaultInfo.decimals))

    return (
      <span className='text-lg'>
        <CurrencyValue baseValue={formattedTokenAmount * usdPrice} options={{ hideZeroes: true }} />
      </span>
    )
  }

  return (
    <span className='text-lg'>
      {formatBigNumberForDisplay(totalTokenDeposits, vaultInfo.decimals.toString(), {
        hideZeroes: true
      })}{' '}
      {vaultInfo.extensions.underlyingAsset.symbol}
    </span>
  )
}
