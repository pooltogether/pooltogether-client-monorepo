import { PrizePoolHeader } from '../../components/PrizePool/PrizePoolHeader'
import { VaultList } from '../../components/Vault/VaultList'
import { SUPPORTED_NETWORKS } from '../../constants/networks'

export const DepositUI = () => {
  return (
    <div className='flex flex-col items-center py-2'>
      <main className='flex flex-col items-center mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8 gap-6'>
        {SUPPORTED_NETWORKS.mainnets.map((network) => {
          return (
            <div key={`pp-${network}`}>
              <PrizePoolHeader chainId={network} />
              <VaultList chainId={network} />
            </div>
          )
        })}
      </main>
    </div>
  )
}
