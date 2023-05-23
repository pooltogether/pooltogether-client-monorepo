import { useAtomValue } from 'jotai'
import { PrizePool, Vault } from 'pt-client-js'
import { Token, TokenWithLogo } from 'pt-types'
import { NetworkBadge } from '../../../Badges/NetworkBadge'
import { depositFormShareAmountAtom, depositFormTokenAmountAtom } from '../../../Form/DepositForm'
import { TokenIcon } from '../../../Icons/TokenIcon'
import { NetworkFees } from '../../NetworkFees'
import { Odds } from '../../Odds'

interface ReviewViewProps {
  vault: Vault
  prizePool: PrizePool
}

// TODO: add warning if deposit doesn't make sense gas-wise
export const ReviewView = (props: ReviewViewProps) => {
  const { vault, prizePool } = props

  const formTokenAmount = useAtomValue(depositFormTokenAmountAtom)
  const formShareAmount = useAtomValue(depositFormShareAmountAtom)

  return (
    <div className='flex flex-col gap-6'>
      <span className='text-xl font-semibold text-center'>Confirm Deposit</span>
      <NetworkBadge
        chainId={vault.chainId}
        appendText='Prize Pool'
        hideBorder={true}
        className='!py-1 mx-auto'
      />
      {!!vault.shareData && !!vault.tokenData && (
        <div className='flex flex-col w-full gap-1'>
          <BasicDepositFormInput
            token={{ ...vault.tokenData, amount: formTokenAmount, logoURI: vault.tokenLogoURI }}
          />
          <BasicDepositFormInput
            token={{ ...vault.shareData, amount: formShareAmount, logoURI: vault.logoURI }}
          />
        </div>
      )}
      <div className='flex gap-9 mx-auto'>
        <Odds vault={vault} prizePool={prizePool} />
        <NetworkFees vault={vault} />
      </div>
    </div>
  )
}

interface BasicDepositFormInputProps {
  token: Token & Partial<TokenWithLogo> & { amount: string }
}

const BasicDepositFormInput = (props: BasicDepositFormInputProps) => {
  const { token } = props

  return (
    <div className='bg-pt-transparent p-4 rounded-lg border border-transparent'>
      <div className='flex justify-between gap-6'>
        <span className='text-2xl font-semibold bg-transparent text-pt-purple-50'>
          {token.amount}
        </span>
        <div className='flex shrink-0 items-center gap-1'>
          <TokenIcon token={token} />
          <span className='text-2xl font-semibold'>{token.symbol}</span>
        </div>
      </div>
    </div>
  )
}
