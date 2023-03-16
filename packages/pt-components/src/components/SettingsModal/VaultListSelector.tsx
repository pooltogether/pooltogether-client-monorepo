import { Cog8ToothIcon } from '@heroicons/react/20/solid'
import { VaultList } from 'pt-types'
import { ExternalLink, Toggle } from 'pt-ui'
import { ImportedBadge } from '../Badges/ImportedBadge'

interface VaultListSelectorProps {}

export const VaultListSelector = (props: VaultListSelectorProps) => {
  const {} = props

  // TODO: get vault lists from atom/hook that fetches from local storage
  const vaultLists: VaultList[] = []

  return (
    <div className='flex flex-col gap-8 px-4'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <span className='text-xl font-semibold'>Manage Prize Asset Lists</span>
        <span className='text-pt-purple-50'>
          Prize asset lists determine what assets are displayed throughout the app. Use caution when
          interacting with imported lists.
        </span>
        {/* TODO: add link */}
        <ExternalLink
          href='#'
          text='Learn more about prize asset lists'
          size='medium'
          className='text-pt-purple-200'
        />
      </div>

      {/* TODO: vault list input functionality */}
      <input
        id='vaultListInput'
        type='text'
        className='w-full text-sm bg-gray-50 text-pt-purple-900 px-4 py-3 rounded-lg focus:outline-none'
        placeholder='https:// or ipfs:// or ENS name'
      />

      {vaultLists.map((vaultList) => {
        const vaultName = vaultList.name.toLowerCase().replace(' ', '-')
        const version = `v${vaultList.version.major}.${vaultList.version.minor}.${vaultList.version.patch}`
        const id = `${vaultName}-v${version}`
        return (
          <VaultListItem key={`vl-item-${id}`} vaultList={vaultList} id={id} version={version} />
        )
      })}
    </div>
  )
}

interface VaultListItemProps {
  vaultList: VaultList
  id: string
  version: string
}

const VaultListItem = (props: VaultListItemProps) => {
  const { id, vaultList, version } = props

  // TODO: get checked state
  const isChecked = true

  // TODO: check if it is the default one
  const isImported = false

  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        {!!vaultList.logoURI && <img src={vaultList.logoURI} className='w-8 h-8 rounded-full' />}
        <div className='flex flex-col gap-1 text-pt-purple-50'>
          <div className='flex items-center gap-1'>
            <span className='font-medium'>{vaultList.name}</span>
            <span className='text-xs'>{version}</span>
          </div>
          <div className='flex items-center gap-1 text-pt-purple-100'>
            <span className='text-xs'>
              {vaultList.tokens.length} Token{vaultList.tokens.length > 1 ? 's' : ''}
            </span>
            <Cog8ToothIcon className='h-5 w-5 text-inherit' />
            {isImported && <ImportedBadge />}
          </div>
        </div>
      </div>
      {/* TODO: add proper onChange effect */}
      <Toggle label={`toggle-${id}`} checked={isChecked} onChange={() => {}} />
    </div>
  )
}
