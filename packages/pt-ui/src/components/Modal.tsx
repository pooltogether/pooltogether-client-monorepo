import { XMarkIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { ReactNode, useLayoutEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export interface ModalProps {
  headerContent?: ReactNode
  bodyContent: ReactNode
  footerContent?: ReactNode
  className?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
  onClose: () => void
  hideHeader?: boolean
}

export const Modal = (props: ModalProps) => {
  const {
    headerContent,
    bodyContent,
    footerContent,
    className,
    headerClassName,
    bodyClassName,
    footerClassName,
    onClose,
    hideHeader
  } = props

  const [el] = useState<HTMLDivElement>(document.createElement('div'))

  useLayoutEffect(() => {
    const modalRoot = document.getElementById('modal-root')
    if (!!modalRoot) {
      modalRoot.appendChild(el)
      return () => {
        modalRoot.removeChild(el)
      }
    }
  }, [])

  return ReactDOM.createPortal(
    <div
      className='z-40 fixed flex inset-0 items-center justify-center bg-black/70'
      onClick={onClose}
    >
      <div
        className={classNames(
          'flex flex-col relative p-8 rounded-lg shadow-xl overflow-y-auto',
          'bg-pt-purple-700 text-pt-purple-50',
          'h-screen sm:h-auto sm:max-h-[90vh]',
          'w-screen sm:w-full sm:max-w-lg',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideHeader && (
          <ModalHeader className={headerClassName} onClose={onClose}>
            {headerContent}
          </ModalHeader>
        )}
        <ModalBody className={bodyClassName}>{bodyContent}</ModalBody>
        {!!footerContent && <ModalFooter className={footerClassName}>{footerContent}</ModalFooter>}
      </div>
    </div>,
    el
  )
}

interface ModalHeaderProps {
  children?: ReactNode
  className?: string
  onClose?: () => void
}

const ModalHeader = (props: ModalHeaderProps) => {
  const { children, className, onClose } = props

  return (
    <div className={classNames('flex pb-4 text-pt-purple-50', className)}>
      {children}
      <XMarkIcon className='h-6 w-6 ml-auto cursor-pointer' onClick={onClose} />
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
