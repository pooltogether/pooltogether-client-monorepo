import { getNiceNetworkNameByChainId } from 'pt-utilities'
import { NETWORK_ICONS } from '../../constants/networks'

export interface PrizePoolHeaderProps {
  chainId: number
}

export const PrizePoolHeader = (props: PrizePoolHeaderProps) => {
  const networkName = getNiceNetworkNameByChainId(props.chainId)

  return (
    <div className='flex align-center gap-4'>
      <img
        src={NETWORK_ICONS[props.chainId].iconUrl}
        alt={`${networkName} Logo`}
        className='h-8 w-8 my-auto'
      />
      <h2 className='text-3xl font-semibold'>{networkName} Prize Pool</h2>
    </div>
  )
}
