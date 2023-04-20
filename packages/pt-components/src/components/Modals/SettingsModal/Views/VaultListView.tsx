import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCachedVaultLists, useSelectedVaultLists, useVaultList } from 'pt-hyperstructure-hooks'
import { VaultList } from 'pt-types'
import { ExternalLink, Toggle } from 'pt-ui'
import { DEFAULT_VAULT_LIST_ID, defaultVaultList, getVaultListId } from 'pt-utilities'
import { ImportedBadge } from '../../../Badges/ImportedBadge'

export const VaultListView = () => {
  const { cachedVaultLists } = useCachedVaultLists()
  const { selectedVaultListIds } = useSelectedVaultLists()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ src: string }>({
    mode: 'onSubmit',
    defaultValues: { src: '' }
  })

  const error =
    !!errors.src?.message && typeof errors.src?.message === 'string' ? errors.src?.message : null

  const [newVaultList, setNewVaultList] = useState<{ src: string }>({ src: '' })
  useVaultList(newVaultList.src)

  // TODO: the form should display some form of loading indicator instead of simply resetting on successful query
  const onSubmit = (data: { src: string }) => {
    setNewVaultList(data)
    reset()
  }

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
          className='text-pt-purple-200'
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('src', {
            validate: {
              isValidSrc: (v) =>
                v.startsWith('http://') ||
                v.startsWith('https://') ||
                v.startsWith('ipfs://') ||
                v.startsWith('ipns://') ||
                v.endsWith('.eth') ||
                'Not a valid URL or ENS domain'
            }
          })}
          id='vaultListInput'
          type='text'
          className='w-full text-sm bg-gray-50 text-pt-purple-900 px-4 py-3 rounded-lg focus:outline-none'
          placeholder='https:// or ipfs:// or ENS name'
        />
        {!!error && <span className='text-sm text-pt-warning-light'>{error}</span>}
      </form>

      <VaultListItem
        key={`vl-item-${DEFAULT_VAULT_LIST_ID}`}
        vaultList={defaultVaultList}
        id={DEFAULT_VAULT_LIST_ID}
        checked={selectedVaultListIds.includes(DEFAULT_VAULT_LIST_ID)}
        disabled={cachedVaultLists.length === 0}
      />
      {cachedVaultLists.map((vaultList) => {
        const vaultListId = getVaultListId(vaultList)
        return (
          <VaultListItem
            key={`vl-item-${vaultListId}`}
            vaultList={vaultList}
            id={vaultListId}
            checked={selectedVaultListIds.includes(vaultListId)}
          />
        )
      })}
    </div>
  )
}

interface VaultListItemProps {
  vaultList: VaultList
  id: string
  checked: boolean
  disabled?: boolean
}

const VaultListItem = (props: VaultListItemProps) => {
  const { vaultList, id, checked, disabled } = props

  const { selectVaultList, unselectVaultList } = useSelectedVaultLists()

  const isImported = useMemo(() => id !== DEFAULT_VAULT_LIST_ID, [id])

  const handleChange = (checked: boolean) => {
    if (checked) {
      selectVaultList(vaultList)
    } else {
      unselectVaultList(vaultList)
    }
  }

  const version = `v${vaultList.version.major}.${vaultList.version.minor}.${vaultList.version.patch}`

  return (
    <div className='w-full flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        {!!vaultList.logoURI && <img src={vaultList.logoURI} className='w-8 h-8 rounded-full' />}
        <div className='flex flex-col gap-1 text-pt-purple-50'>
          <span>
            <span className='font-medium'>{vaultList.name}</span>{' '}
            <span className='text-xs'>{version}</span>
          </span>
          <div className='flex items-center gap-2 text-pt-purple-100'>
            <span className='text-xs'>
              {vaultList.tokens.length} Token{vaultList.tokens.length > 1 ? 's' : ''}
            </span>
            {isImported && <ImportedBadge />}
          </div>
        </div>
      </div>
      <Toggle checked={checked} onChange={handleChange} disabled={disabled} />
    </div>
  )
}
