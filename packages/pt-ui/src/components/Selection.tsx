import classNames from 'classnames'
import { ReactNode, useState } from 'react'
import { Button, ButtonProps } from './Button'

export interface SelectionItem {
  id: string
  content: ReactNode
  disabled?: boolean
  hidden?: boolean
  className?: string
}

export interface SelectionProps {
  items: SelectionItem[]
  onSelect: (id: string) => void
  defaultSelected?: string
  className?: string
  buttonColor?: ButtonProps['color']
}

export const Selection = (props: SelectionProps) => {
  const { items, onSelect, defaultSelected, className, buttonColor } = props

  const [itemSelected, setItemSelected] = useState(defaultSelected ?? items[0]?.id)

  const handleClick = (id: string) => {
    if (id !== itemSelected) {
      setItemSelected(id)
      onSelect(id)
    }
  }

  return (
    <div className={classNames('flex gap-4', className)}>
      {items.map((item) => {
        return (
          <Button
            key={`sl-${item.id}`}
            color={buttonColor}
            outline={item.id !== itemSelected}
            className={item.className}
            disabled={item.disabled}
            hidden={item.hidden}
            onClick={() => handleClick(item.id)}
          >
            {item.content}
          </Button>
        )
      })}
    </div>
  )
}
