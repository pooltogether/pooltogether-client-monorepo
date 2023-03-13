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
          className='w-full px-3 py-1 text-gray-900 !bg-gray-100 hover:!bg-gray-300'
        />
      ),
      onClick: (id) => onSelect(parseInt(id))
    }
  })

  return (
    <Dropdown
      label={<PrizePoolHeader chainId={selectedNetwork} size='large' />}
      items={dropdownItems}
      inline={true}
      placement={placement ?? 'bottom-end'}
    />
  )
}
