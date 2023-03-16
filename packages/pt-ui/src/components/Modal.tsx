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
    size,
    ...rest
  } = props

  return (
    <FlowbiteModal
      theme={{
        root: { show: { on: 'flex text-pt-purple-50 bg-gray-600/50 backdrop-blur-sm' } },
        content: {
          inner: classNames('relative rounded-lg shadow p-8', {
            'bg-pt-bg-purple-light': bgColor === 'light' || bgColor === undefined,
            'bg-pt-purple-900': bgColor === 'dark'
          })
        }
      }}
      size={size ?? 'xl'}
      className={classNames(className)}
      {...rest}
    >
      {(headerContent || rest.dismissible) && (
        <FlowbiteModal.Header
          theme={{
            base: 'flex items-start justify-between pb-4 rounded-t overflow-x-hidden overflow-y-auto',
            title: 'text-xl text-pt-purple-100',
            close: {
              base: 'ml-auto inline-flex items-center text-pt-purple-100',
              icon: 'h-6 w-6'
            }
          }}
          className={classNames(headerClassName)}
        >
          {/* @ts-ignore */}
          {headerContent}
        </FlowbiteModal.Header>
      )}
      <FlowbiteModal.Body
        theme={{ base: 'max-h-[75vh] rounded-lg overflow-x-hidden overflow-y-auto' }}
        className={classNames(bodyClassName)}
      >
        {/* @ts-ignore */}
        {bodyContent}
      </FlowbiteModal.Body>
      {footerContent && (
        <FlowbiteModal.Footer
          theme={{ base: 'pt-4 overflow-x-hidden overflow-y-auto', popup: '' }}
          className={classNames(footerClassName)}
        >
          {/* @ts-ignore */}
          {footerContent}
        </FlowbiteModal.Footer>
      )}
    </FlowbiteModal>
  )
}
