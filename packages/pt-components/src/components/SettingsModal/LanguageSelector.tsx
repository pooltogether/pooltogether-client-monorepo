import { CheckIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

interface LanguageSelectorProps {
  languageId: string
  setLanguageId: (id: string) => void
  languages: { [id: string]: { name: string; nativeName: string } }
}

export const LanguageSelector = (props: LanguageSelectorProps) => {
  const { languageId, setLanguageId, languages } = props

  return (
    <div className='flex flex-col items-center gap-4'>
      <span className='text-xl font-semibold dark:text-pt-purple-300'>Customize Language</span>
      {Object.keys(languages).map((id) => {
        return (
          <LanguageItem
            key={`lang-item-${id}`}
            id={id}
            selectedLanguageId={languageId}
            setSelectedLanguageId={setLanguageId}
            languages={languages}
          />
        )
      })}
    </div>
  )
}

interface LanguageItemProps {
  id: string
  selectedLanguageId: string
  setSelectedLanguageId: (id: string) => void
  languages: { [id: string]: { name: string; nativeName: string } }
}

const LanguageItem = (props: LanguageItemProps) => {
  const { id, selectedLanguageId, setSelectedLanguageId, languages } = props

  return (
    <div
      className={classNames(
        'w-full rounded-lg p-4 dark:bg-pt-purple-600/40 dark:hover:bg-pt-purple-600/60 cursor-pointer select-none',
        { 'outline outline-2 outline-pt-teal-dark': id === selectedLanguageId }
      )}
      onClick={() => {
        setSelectedLanguageId(id)
      }}
    >
      <span className='flex items-center justify-center gap-2 dark:text-pt-purple-50'>
        {id === selectedLanguageId && <CheckIcon className='h-4 w-4 dark:text-inherit' />}
        {`${id.toUpperCase()} - ${languages[id].nativeName} (${languages[id].name})`}
      </span>
    </div>
  )
}
