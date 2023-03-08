import { utils } from 'ethers'
import { useProvider } from 'wagmi'
import { useVaultBalance } from 'pt-hyperstructure-hooks'
import { VaultInfo } from 'pt-types'
import { Spinner } from 'pt-ui'
import { formatBigNumberForDisplay, getTokenPriceFromObject } from 'pt-utilities'
import { CurrencyValue } from '@components/CurrencyValue'
import { useAllCoingeckoTokenPrices } from '@hooks/useAllCoingeckoTokenPrices'

interface VaultTotalDepositsProps {
  vaultInfo: VaultInfo
  displayCurrency?: boolean
}

export const VaultTotalDeposits = (props: VaultTotalDepositsProps) => {
  const { vaultInfo, displayCurrency } = props

  const { data: tokenPrices, isFetched: isFetchedTokenPrices } = useAllCoingeckoTokenPrices()
  const usdPrice = getTokenPriceFromObject(
    vaultInfo.chainId,
    vaultInfo.extensions.underlyingAsset.address,
    tokenPrices
  )

  // const provider = useProvider({ chainId: vaultInfo.chainId })
  // const { data: totalDeposits, isFetched: isFetchedTotalDeposits } = useVaultBalance(
  //   provider,
  //   vaultInfo
  // )

  // TODO: remove this once vaults are setup (and uncomment code above):
  const totalDeposits = utils.parseUnits('50000', vaultInfo.decimals)
  const isFetchedTotalDeposits = true

  if (!isFetchedTotalDeposits || (displayCurrency && !isFetchedTokenPrices)) {
    return <Spinner />
  }

  if (displayCurrency) {
    const formattedTokenAmount = !!totalDeposits
      ? Number(utils.formatUnits(totalDeposits, vaultInfo.decimals))
      : 0

    return (
      <span className='text-lg'>
        <CurrencyValue baseValue={formattedTokenAmount * usdPrice} hideZeroes={true} />
      </span>
    )
  }

  return (
    <span className='text-lg'>
      {!!totalDeposits
        ? formatBigNumberForDisplay(totalDeposits, vaultInfo.decimals.toString(), {
            hideZeroes: true
          })
        : 0}{' '}
      {vaultInfo.extensions.underlyingAsset.symbol}
    </span>
  )
}
