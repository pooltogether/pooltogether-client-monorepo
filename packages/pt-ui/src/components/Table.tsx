import classNames from 'classnames'
import { Table as FlowbiteTable, TableProps as FlowbiteTableProps } from 'flowbite-react'
import { ReactNode } from 'react'

export interface TableProps extends FlowbiteTableProps {
  headers: ReactNode[]
  rows: { cells: ReactNode[]; className?: string }[]
  _key: string
  headClassName?: string
  bodyClassName?: string
  rowClassName?: string
}

export const Table = (props: TableProps) => {
  return (
    <FlowbiteTable {...props}>
      <FlowbiteTable.Head
        className={classNames('dark:bg-transparent dark:text-pt-purple-100', props.headClassName)}
      >
        {props.headers.map((header, i) => (
          <FlowbiteTable.HeadCell key={`${props._key}-th-${i}`}>
            {/* @ts-ignore */}
            {header}
          </FlowbiteTable.HeadCell>
        ))}
      </FlowbiteTable.Head>
      <FlowbiteTable.Body className={classNames('divide-y-8', props.bodyClassName)}>
        {props.rows.map((row, i) => (
          <FlowbiteTable.Row
            className={classNames(
              'dark:bg-pt-purple-800 rounded',
              props.rowClassName,
              row.className
            )}
            key={`${props._key}-tr-${i}`}
          >
            {row.cells.map((cell, j) => (
              <FlowbiteTable.Cell
                className='dark:text-pt-purple-50'
                key={`${props._key}-tc-${i}-${j}`}
              >
                {/* @ts-ignore */}
                {cell}
              </FlowbiteTable.Cell>
            ))}
          </FlowbiteTable.Row>
        ))}
      </FlowbiteTable.Body>
    </FlowbiteTable>
  )
}
