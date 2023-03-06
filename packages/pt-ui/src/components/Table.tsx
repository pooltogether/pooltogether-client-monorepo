import classNames from 'classnames'
import { Table as FlowbiteTable, TableProps as FlowbiteTableProps } from 'flowbite-react'
import { ReactNode } from 'react'

export interface TableProps extends FlowbiteTableProps {
  headers: ReactNode[]
  rows: { cells: ReactNode[]; className?: string }[]
  keyPrefix: string
  roundedRows?: boolean
  headerClassName?: string
  bodyClassName?: string
  rowClassName?: string
  cellClassName?: string
}

export const Table = (props: TableProps) => {
  const {
    headers,
    rows,
    keyPrefix,
    roundedRows,
    className,
    headerClassName,
    bodyClassName,
    rowClassName,
    cellClassName,
    ...rest
  } = props

  return (
    <FlowbiteTable className={classNames('border-separate border-spacing-0', className)} {...rest}>
      <FlowbiteTable.Head
        className={classNames(
          'dark:bg-transparent dark:text-pt-purple-100 py-2 normal-case',
          headerClassName
        )}
      >
        {headers.map((header, i) => (
          <FlowbiteTable.HeadCell key={`${keyPrefix}-th-${i}`} className='text-base'>
            {/* @ts-ignore */}
            {header}
          </FlowbiteTable.HeadCell>
        ))}
      </FlowbiteTable.Head>
      <FlowbiteTable.Body className={classNames(bodyClassName)}>
        {rows.map((row, i) => (
          <FlowbiteTable.Row
            className={classNames('dark:bg-pt-transparent', rowClassName, row.className)}
            key={`${keyPrefix}-tr-${i}`}
          >
            {row.cells.map((cell, j) => (
              <FlowbiteTable.Cell
                className={classNames(
                  'dark:text-pt-purple-50',
                  {
                    'rounded-l-lg': roundedRows && j === 0,
                    'rounded-r-lg': roundedRows && j === row.cells.length - 1
                  },
                  cellClassName
                )}
                key={`${keyPrefix}-tc-${i}-${j}`}
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
