import { DepositedVaultList } from '../../components/Vault/DepositedVaultList'

export const AccountUI = () => {
  return (
    <div className='flex flex-col items-center py-2'>
      <main className='flex flex-col items-center mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8 gap-6'>
        <span>Your Deposits: $0</span>
        <DepositedVaultList />
      </main>
    </div>
  )
}
