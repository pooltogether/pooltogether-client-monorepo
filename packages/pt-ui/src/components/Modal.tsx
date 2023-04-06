import { XMarkIcon } from '@heroicons/react/24/solid'
import { Dialog } from '@reach/dialog'
import classNames from 'classnames'
import { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  headerContent?: ReactNode
  bodyContent: ReactNode
  footerContent?: ReactNode
  theme?: 'light' | 'dark'
  className?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
  onClose?: () => void
  hideHeader?: boolean
}

export const Modal = (props: ModalProps) => {
  const {
    isOpen,
    headerContent,
    bodyContent,
    footerContent,
    theme,
    className,
    headerClassName,
    bodyClassName,
    footerClassName,
    onClose,
    hideHeader
  } = props

  return (
    <Dialog isOpen={isOpen} onDismiss={onClose}>
      <div
        className={classNames(
          'flex flex-col mx-auto relative p-8 text-pt-purple-50 rounded-lg shadow overflow-y-auto',
          'h-screen sm:h-auto sm:max-h-[90vh]',
          'w-screen sm:w-full sm:max-w-lg',
          {
            'bg-pt-bg-purple-light': theme === 'light' || theme === undefined,
            'bg-pt-purple-900': theme === 'dark'
          },
          className
        )}
      >
        {!hideHeader && (
          <ModalHeader theme={theme} className={headerClassName} onClose={onClose}>
            {headerContent}
          </ModalHeader>
        )}
        <ModalBody className={bodyClassName}>{bodyContent}</ModalBody>
        {!!footerContent && <ModalFooter className={footerClassName}>{footerContent}</ModalFooter>}
      </div>
    </Dialog>
  )
}

interface ModalHeaderProps {
  children?: ReactNode
  theme?: 'light' | 'dark'
  className?: string
  onClose?: () => void
}

const ModalHeader = (props: ModalHeaderProps) => {
  const { children, theme, className, onClose } = props

  return (
    <div
      className={classNames(
        'flex items-end justify-between pb-4',
        {
          'text-pt-purple-50': theme === 'light' || theme === undefined,
          'text-pt-purple-100': theme === 'dark'
        },
        className
      )}
    >
      {children}
      <XMarkIcon className='h-6 w-6 cursor-pointer' onClick={onClose} />
    </div>
  )
}

interface ModalBodyProps {
  children?: ReactNode
  className?: string
}

const ModalBody = (props: ModalBodyProps) => {
  const { children, className } = props

  return <div className={classNames(className)}>{children}</div>
}

interface ModalFooterProps {
  children?: ReactNode
  className?: string
}

const ModalFooter = (props: ModalFooterProps) => {
  const { children, className } = props

  return <div className={classNames('pt-4', className)}>{children}</div>
}
