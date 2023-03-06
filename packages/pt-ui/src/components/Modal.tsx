import classNames from 'classnames'
import { Modal as FlowbiteModal, ModalProps as FlowbiteModalProps } from 'flowbite-react'
import { ReactNode } from 'react'

export interface ModalProps extends FlowbiteModalProps {
  headerContent?: ReactNode
  bodyContent: ReactNode
  footerContent?: ReactNode
  bgColor?: 'light' | 'dark'
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}

// TODO: blur background when open
// TODO: X needs to be styled properly
export const Modal = (props: ModalProps) => {
  const {
    headerContent,
    bodyContent,
    footerContent,
    bgColor,
    headerClassName,
    bodyClassName,
    footerClassName,
    className,
    ...rest
  } = props

  return (
    <FlowbiteModal {...rest} className={classNames('dark:text-pt-purple-50', className)}>
      {(headerContent || rest.dismissible) && (
        <FlowbiteModal.Header
          className={classNames(
            'dark:bg-pt-bg-purple-light px-8 pt-8 pb-4 border-none overflow-x-hidden overflow-y-auto',
            { 'dark:!bg-pt-purple-900': bgColor === 'dark' },
            headerClassName
          )}
        >
          {/* @ts-ignore */}
          {headerContent}
        </FlowbiteModal.Header>
      )}
      <FlowbiteModal.Body
        className={classNames(
          'dark:bg-pt-bg-purple-light px-8 py-0 overflow-x-hidden overflow-y-auto max-h-[75vh]',
          { 'dark:!bg-pt-purple-900': bgColor === 'dark' },
          {
            'rounded-t pt-8': headerContent === undefined && !rest.dismissible,
            'rounded-b pb-8': footerContent === undefined
          },
          bodyClassName
        )}
      >
        {/* @ts-ignore */}
        {bodyContent}
      </FlowbiteModal.Body>
      {footerContent && (
        <FlowbiteModal.Footer
          className={classNames(
            'dark:bg-pt-bg-purple-light px-8 pt-4 pb-8 border-none overflow-x-hidden overflow-y-auto',
            { 'dark:!bg-pt-purple-900': bgColor === 'dark' },
            footerClassName
          )}
        >
          {/* @ts-ignore */}
          {footerContent}
        </FlowbiteModal.Footer>
      )}
    </FlowbiteModal>
  )
}
