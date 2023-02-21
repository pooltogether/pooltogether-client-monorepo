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

export const Modal = (props: ModalProps) => {
  return (
    <FlowbiteModal
      {...props}
      className={classNames(
        'dark:bg-pt-bg-purple-light dark:text-pt-purple-50 rounded',
        props.className
      )}
    >
      {props.headerContent && (
        <FlowbiteModal.Header className={classNames(props.headerClassName)}>
          {/* @ts-ignore */}
          {props.headerContent}
        </FlowbiteModal.Header>
      )}
      <FlowbiteModal.Body className={classNames(props.bodyClassName)}>
        {/* @ts-ignore */}
        {props.bodyContent}
      </FlowbiteModal.Body>
      {props.footerContent && (
        <FlowbiteModal.Footer className={classNames(props.footerClassName)}>
          {/* @ts-ignore */}
          {props.footerContent}
        </FlowbiteModal.Footer>
      )}
    </FlowbiteModal>
  )
}
