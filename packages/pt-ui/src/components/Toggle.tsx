import classNames from 'classnames'

export interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  className?: string
  labelClassName?: string
}

// TODO: BUG - tabbing through these toggles `checked` property
export const Toggle = (props: ToggleProps) => {
  const { checked, onChange, label, disabled, className, labelClassName } = props

  const toggle = () => {
    !disabled && onChange(!checked)
  }

  return (
    <label
      className={classNames(
        'relative inline-flex items-center',
        { 'cursor-pointer': !disabled },
        className
      )}
    >
      <input
        type='checkbox'
        value=''
        className='sr-only'
        onClick={toggle}
        onKeyDown={toggle}
        defaultChecked={checked}
        disabled={disabled}
      />
      <div
        className={classNames(
          'w-11 h-6 rounded-full',
          `after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:border after:rounded-full after:h-5 after:w-5 after:transition-all`,
          'bg-gray-200 after:bg-white after:border-gray-300',
          { 'bg-green-300 after:translate-x-full': checked },
          { 'brightness-50': disabled }
        )}
      />
      <span className={classNames('ml-3 text-sm font-medium', labelClassName)}>{label}</span>
    </label>
  )
}
