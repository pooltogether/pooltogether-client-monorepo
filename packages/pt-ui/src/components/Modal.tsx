import classNames from 'classnames'
import { Modal as FlowbiteModal, ModalProps as FlowbiteModalProps } from 'flowbite-react'
import { ReactNode } from 'react'

export interface ModalProps extends FlowbiteModalProps {
  headerContent?: ReactNode
  bodyContent: ReactNode
  footerContent?: ReactNode
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}

// TODO: blur background when open
export const Modal = (props: ModalProps) => {
  const {
    headerContent,
    bodyContent,
    footerContent,
    headerClassName,
    bodyClassName,
    footerClassName,
    className,
    ...rest
  } = props
  return (
    <FlowbiteModal {...rest} className={classNames('dark:text-pt-purple-50', className)}>
      {headerContent && (
        <FlowbiteModal.Header
          className={classNames('dark:bg-pt-bg-purple-light border-none', headerClassName)}
        >
          {/* @ts-ignore */}
          {headerContent}
        </FlowbiteModal.Header>
      )}
      <FlowbiteModal.Body
        className={classNames(
          'dark:bg-pt-bg-purple-light',
          { 'rounded-t': headerContent === undefined, 'rounded-b': footerContent === undefined },
          bodyClassName
        )}
      >
        {/* @ts-ignore */}
        {bodyContent}
      </FlowbiteModal.Body>
      {footerContent && (
        <FlowbiteModal.Footer
          className={classNames('dark:bg-pt-bg-purple-light border-none', footerClassName)}
        >
          {/* @ts-ignore */}
          {footerContent}
        </FlowbiteModal.Footer>
      )}
    </FlowbiteModal>
  )
}
