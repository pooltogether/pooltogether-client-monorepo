import { Dropdown, DropdownItem, DropdownProps } from 'pt-ui'
import { NETWORK } from 'pt-utilities'
import { NetworkBadge } from '../Badges/NetworkBadge'
import { PrizePoolHeader } from './PrizePoolHeader'

export interface PrizePoolDropdownProps {
  networks: NETWORK[]
  selectedNetwork: NETWORK
  onSelect: (chainId: number) => void
  placement?: DropdownProps['placement']
}

export const PrizePoolDropdown = (props: PrizePoolDropdownProps) => {
  const { networks, selectedNetwork, onSelect, placement } = props

  const dropdownItems: DropdownItem[] = networks.map((network) => {
    return {
      id: network.toString(),
      content: (
        <NetworkBadge
          chainId={network}
          className='w-full !justify-start p-2 !bg-none hover:!bg-pt-purple-100/40'
          textClassName='text-pt-purple-600'
        />
      ),
      onClick: (id) => onSelect(parseInt(id))
    }
  })

  return (
    <Dropdown
      label={<PrizePoolHeader chainId={selectedNetwork} size='large' />}
      items={dropdownItems}
      header={
        <span className='text-sm font-semibold text-pt-purple-400 px-3 mb-2'>
          Switch prize pool
        </span>
      }
      inline={true}
      placement={placement ?? 'bottom-end'}
    />
  )
}
