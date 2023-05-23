import { useAtomValue } from 'jotai'
import { Vault } from 'pt-client-js'
import { Token, TokenWithLogo } from 'pt-types'
import { NetworkBadge } from '../../../Badges/NetworkBadge'
import {
  withdrawFormShareAmountAtom,
  withdrawFormTokenAmountAtom
} from '../../../Form/WithdrawForm'
import { TokenIcon } from '../../../Icons/TokenIcon'
import { NetworkFees } from '../../NetworkFees'

interface ReviewViewProps {
  vault: Vault
}

export const ReviewView = (props: ReviewViewProps) => {
  const { vault } = props

  const formShareAmount = useAtomValue(withdrawFormShareAmountAtom)
  const formTokenAmount = useAtomValue(withdrawFormTokenAmountAtom)

  return (
    <div className='flex flex-col gap-6'>
      <span className='text-xl font-semibold text-center'>Confirm Withdrawal</span>
      <NetworkBadge
        chainId={vault.chainId}
        appendText='Prize Pool'
        hideBorder={true}
        className='!py-1 mx-auto'
      />
      {!!vault.shareData && !!vault.tokenData && (
        <div className='flex flex-col w-full gap-1'>
          <BasicWithdrawFormInput
            token={{ ...vault.shareData, amount: formShareAmount, logoURI: vault.logoURI }}
          />
          <BasicWithdrawFormInput
            token={{ ...vault.tokenData, amount: formTokenAmount, logoURI: vault.tokenLogoURI }}
          />
        </div>
      )}
      <NetworkFees vault={vault} show={['withdraw']} />
    </div>
  )
}

interface BasicWithdrawFormInputProps {
  token: Token & Partial<TokenWithLogo> & { amount: string }
}

const BasicWithdrawFormInput = (props: BasicWithdrawFormInputProps) => {
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
