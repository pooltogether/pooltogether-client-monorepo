import classNames from 'classnames'
import { Table as FlowbiteTable, TableProps as FlowbiteTableProps } from 'flowbite-react'
import { ReactNode } from 'react'

export interface TableProps extends FlowbiteTableProps {
  headers: ReactNode[]
  rows: { cells: ReactNode[]; className?: string }[]
  keyPrefix: string
  roundedRows?: boolean
  headerClassName?: string
  headerCellClassName?: string
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
    headerCellClassName,
    bodyClassName,
    rowClassName,
    cellClassName,
    ...rest
  } = props

  return (
    <FlowbiteTable
      theme={{
        root: {
          base: 'w-full table-fixed text-left text-sm text-pt-purple-50 border-separate border-spacing-0 border-spacing-y-4',
          wrapper: 'relative overflow-x-hidden'
        }
      }}
      className={classNames(className)}
      {...rest}
    >
      <FlowbiteTable.Head
        // TODO: once theme is fixed, can use it instead of manual className
        // theme={{ base: 'text-sm font-normal text-pt-purple-100 py-2 text-center' }}
        className={classNames(
          'dark:text-pt-purple-100 dark:bg-transparent py-2 text-center !text-sm normal-case',
          headerClassName
        )}
      >
        {headers.map((header, i) => (
          <FlowbiteTable.HeadCell
            key={`${keyPrefix}-th-${i}`}
            className={classNames(headerCellClassName)}
          >
            {/* @ts-ignore */}
            {header}
          </FlowbiteTable.HeadCell>
        ))}
      </FlowbiteTable.Head>
      <FlowbiteTable.Body className={classNames(bodyClassName)}>
        {rows
          .filter((row) => !!row)
          .map((row, i) => (
            <FlowbiteTable.Row
              key={`${keyPrefix}-tr-${i}`}
              className={classNames('bg-pt-transparent', rowClassName, row.className)}
            >
              {row.cells.map((cell, j) => (
                <FlowbiteTable.Cell
                  key={`${keyPrefix}-tc-${i}-${j}`}
                  theme={{ base: 'text-pt-purple-50 text-center px-6 py-4' }}
                  className={classNames(
                    {
                      'rounded-l-lg': roundedRows && j === 0,
                      'rounded-r-lg': roundedRows && j === row.cells.length - 1
                    },
                    cellClassName
                  )}
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
