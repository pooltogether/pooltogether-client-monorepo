import { BigNumber, utils } from 'ethers'
import { useTokenBalances } from 'pt-hooks'
import { VaultInfo } from 'pt-types'
import {
  formatUnformattedBigNumberForDisplay,
  getNiceNetworkNameByChainId,
  getVaultsByChainId,
  NETWORK
} from 'pt-utilities'
import { useAccount } from 'wagmi'
import defaultVaultList from '../../data/defaultVaultList'

export interface DepositedVaultListProps {}

// TODO: make a hook to simplify querying balances from all vaults (using Vault class)
// TODO: coingecko pricing of each token
// TODO: sort by balance by default
// TODO: add sorting when clicking headers
export const DepositedVaultList = (props: DepositedVaultListProps) => {
  const { address: userAddress } = useAccount()

  const vaultBalances: (VaultInfo & { balance: string })[] = []

  // Ethereum Vaults
  const ethVaults = getVaultsByChainId(NETWORK.mainnet, defaultVaultList)
  const ethVaultAddresses = ethVaults.map((vault) => vault.address)
  // const { data: ethVaultBalances } = useTokenBalances(
  //   NETWORK.mainnet,
  //   userAddress,
  //   ethVaultAddresses
  // )
  ethVaults.forEach((vault) => {
    // const balance = ethVaultBalances[vault.address].balance
    const balance = utils.parseUnits('10', vault.decimals).toString()
    vaultBalances.push({ ...vault, balance })
  })

  // Polygon Vaults
  const polyVaults = getVaultsByChainId(NETWORK.polygon, defaultVaultList)
  const polyVaultAddresses = polyVaults.map((vault) => vault.address)
  // const { data: polyVaultBalances } = useTokenBalances(
  //   NETWORK.polygon,
  //   userAddress,
  //   polyVaultAddresses
  // )
  polyVaults.forEach((vault) => {
    // const balance = polyVaultBalances[vault.address].balance
    const balance = utils.parseUnits('10', vault.decimals).toString()
    vaultBalances.push({ ...vault, balance })
  })

  // Optimism Vaults
  const opVaults = getVaultsByChainId(NETWORK.optimism, defaultVaultList)
  const opVaultAddresses = opVaults.map((vault) => vault.address)
  // const { data: opVaultBalances } = useTokenBalances(
  //   NETWORK.optimism,
  //   userAddress,
  //   opVaultAddresses
  // )
  opVaults.forEach((vault) => {
    // const balance = opVaultBalances[vault.address].balance
    const balance = utils.parseUnits('10', vault.decimals).toString()
    vaultBalances.push({ ...vault, balance })
  })

  // Arbitrum Vaults
  const arbVaults = getVaultsByChainId(NETWORK.arbitrum, defaultVaultList)
  const arbVaultAddresses = arbVaults.map((vault) => vault.address)
  // const { data: arbVaultBalances } = useTokenBalances(
  //   NETWORK.arbitrum,
  //   userAddress,
  //   arbVaultAddresses
  // )
  arbVaults.forEach((vault) => {
    // const balance = arbVaultBalances[vault.address].balance
    const balance = utils.parseUnits('10', vault.decimals).toString()
    vaultBalances.push({ ...vault, balance })
  })

  return (
    <>
      <DepositedVaultListHeaders />
      <div className='flex flex-col gap-4'>
        {vaultBalances.map((vault, i) => {
          return <DepositedVaultListItem vaultInfo={vault} key={`vault-${i}-${vault.name}`} />
        })}
      </div>
    </>
  )
}

const DepositedVaultListHeaders = () => {
  return <></>
}

interface DepositedVaultListItemProps {
  vaultInfo: VaultInfo & { balance: string }
}

const DepositedVaultListItem = (props: DepositedVaultListItemProps) => {
  const {
    vaultInfo: {
      chainId,
      name,
      symbol,
      decimals,
      logoURI,
      balance,
      extensions: { underlyingAsset }
    }
  } = props

  const formattedBalance = formatUnformattedBigNumberForDisplay(
    BigNumber.from(balance),
    decimals.toString()
  )

  return (
    <div className='flex gap-4'>
      <img src={logoURI} alt={`${name} Logo`} className='h-6 w-6' />
      <span>{name}</span>
      <span>{symbol}</span>
      <span>{getNiceNetworkNameByChainId(chainId)}</span>
      <span>
        Balance: {formattedBalance} {underlyingAsset.symbol}
      </span>
    </div>
  )
}
