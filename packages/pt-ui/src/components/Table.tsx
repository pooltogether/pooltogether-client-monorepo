import classNames from 'classnames'
import { Table as FlowbiteTable, TableProps as FlowbiteTableProps } from 'flowbite-react'
import { ReactNode } from 'react'

export interface TableProps extends FlowbiteTableProps {
  headers: ReactNode[]
  rows: { cells: ReactNode[]; className?: string }[]
  headClassName?: string
  bodyClassName?: string
  rowClassName?: string
}

export const Table = (props: TableProps) => {
  return (
    <FlowbiteTable striped={props.striped} hoverable={props.hoverable} className={props.className}>
      <FlowbiteTable.Head className={classNames('bg-transparent', props.headClassName)}>
        {props.headers.map((header) => (
          // @ts-ignore
          <FlowbiteTable.HeadCell>{header}</FlowbiteTable.HeadCell>
        ))}
      </FlowbiteTable.Head>
      <FlowbiteTable.Body className={classNames('divide-y-8', props.bodyClassName)}>
        {props.rows.map((row) => (
          <FlowbiteTable.Row
            className={classNames('bg-pt-purple-800 rounded', props.rowClassName, row.className)}
          >
            {row.cells.map((cell) => (
              // @ts-ignore
              <FlowbiteTable.Cell className='dark:text-pt-purple-50'>{cell}</FlowbiteTable.Cell>
            ))}
          </FlowbiteTable.Row>
        ))}
      </FlowbiteTable.Body>
    </FlowbiteTable>
  )
}
