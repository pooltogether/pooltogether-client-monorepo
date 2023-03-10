import { PrizePoolHeader } from 'pt-components'
import { NETWORK } from 'pt-utilities'

export interface PrizePoolDropdownProps {}

// TODO: move this to components package once done
export const PrizePoolDropdown = (props: PrizePoolDropdownProps) => {
  const {} = props

  return <PrizePoolHeader chainId={NETWORK.optimism} />
}
