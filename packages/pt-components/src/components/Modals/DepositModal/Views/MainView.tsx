import { utils } from 'ethers'
import { useAtomValue } from 'jotai'
import { PrizePool, Vault } from 'pt-client-js'
import { usePrizeOdds, useVaultShareData } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { formatNumberForDisplay, getNiceNetworkNameByChainId } from 'pt-utilities'
import { NetworkBadge } from '../../../Badges/NetworkBadge'
import { DepositForm, depositFormShareAmountAtom } from '../../../Form/DepositForm'

interface MainViewProps {
  vault: Vault
  prizePool: PrizePool
}

export const MainView = (props: MainViewProps) => {
  const { vault, prizePool } = props

  const networkName = getNiceNetworkNameByChainId(vault.chainId)

  return (
    <div className='flex flex-col gap-6'>
      <span className='text-xl font-semibold text-center'>
        Deposit to {vault.name ?? <Spinner />} on {networkName}
      </span>
      <NetworkBadge
        chainId={vault.chainId}
        appendText='Prize Pool'
        hideBorder={true}
        className='!py-1 mx-auto'
      />
      {!!vault.shareData && !!vault.tokenData && vault.decimals !== undefined && (
        <DepositForm vault={vault} />
      )}
      <Odds vault={vault} prizePool={prizePool} />
      {/* TODO: add estimated network gas fees */}
    </div>
  )
}

interface OddsProps {
  vault: Vault
  prizePool: PrizePool
}

// TODO: BUG - not fully resetting when switching between vaults (showing non infinite value at 0 shares)
const Odds = (props: OddsProps) => {
  const { vault, prizePool } = props

  const formShareAmount = useAtomValue(depositFormShareAmountAtom)

  const { data: shareData } = useVaultShareData(vault)

  const { data: prizeOdds, isFetched: isFetchedPrizeOdds } = usePrizeOdds(
    prizePool,
    vault,
    !!shareData && !!formShareAmount
      ? utils.parseUnits(formShareAmount, shareData.decimals).toString()
      : '0',
    { isCumulative: true }
  )

  return (
    <div className='flex flex-col items-center gap-2'>
      <span className='text-xs font-semibold text-pt-purple-100'>Daily Chance of Winning</span>
      <span className='text-sm text-pt-purple-50'>
        {isFetchedPrizeOdds && !!prizeOdds ? (
          formShareAmount !== '0' ? (
            `1 in ${formatNumberForDisplay(prizeOdds.oneInX, { maximumSignificantDigits: 3 })}`
          ) : (
            '-'
          )
        ) : (
          <Spinner />
        )}
      </span>
    </div>
  )
}
