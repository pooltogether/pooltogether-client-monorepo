import { BigNumber } from 'ethers'
import { Vault } from 'pt-client-js'
import { useGasCostEstimates } from 'pt-hyperstructure-hooks'
import { Spinner } from 'pt-ui'
import { TX_GAS_ESTIMATES } from '../../constants'
import { CurrencyValue } from '../Currency/CurrencyValue'

interface NetworkFeesProps {
  vault: Vault
}

export const NetworkFees = (props: NetworkFeesProps) => {
  const { vault } = props

  return (
    <div className='flex flex-col items-center gap-2 font-semibold'>
      <span className='text-sm text-pt-purple-100'>Estimated Network Fees</span>
      <div className='flex flex-col w-[75%] text-xs'>
        <TXFeeEstimate
          name='Approval'
          chainId={vault?.chainId}
          gasAmount={BigNumber.from(TX_GAS_ESTIMATES.approve)}
        />
        <TXFeeEstimate
          name='Deposit'
          chainId={vault?.chainId}
          gasAmount={BigNumber.from(TX_GAS_ESTIMATES.deposit)}
        />
        <TXFeeEstimate
          name='Withdrawal'
          chainId={vault?.chainId}
          gasAmount={BigNumber.from(TX_GAS_ESTIMATES.withdraw)}
        />
      </div>
    </div>
  )
}

interface TXFeeEstimateProps {
  name: string
  chainId: number
  gasAmount: BigNumber
}

const TXFeeEstimate = (props: TXFeeEstimateProps) => {
  const { name, chainId, gasAmount } = props

  const { data: gasEstimates, isFetched: isFetchedGasEstimates } = useGasCostEstimates(
    chainId,
    gasAmount
  )

  const txCost = gasEstimates?.totalGasCurrencies?.['eth'] ?? '0'

  return (
    <span className='flex justify-between items-center'>
      <span className='font-normal text-pt-purple-100'>{name}</span>
      <span className='text-pt-purple-50'>
        {isFetchedGasEstimates ? (
          txCost === '0' ? (
            <>-</>
          ) : (
            <CurrencyValue baseValue={txCost} />
          )
        ) : (
          <Spinner />
        )}
      </span>
    </span>
  )
}