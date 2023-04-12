import classNames from 'classnames'
import { ReactNode } from 'react'

interface TableItem {
  content: ReactNode
  position?: 'left' | 'center' | 'right'
}

export interface TableData {
  headers: { [id: string]: TableItem }
  rows: {
    cells: { [headerId: string]: TableItem }
    className?: string
  }[]
}

export interface TableProps {
  data: TableData
  keyPrefix: string
  rounded?: boolean
  className?: string
  headerClassName?: string
  rowClassName?: string
}

export const Table = (props: TableProps) => {
  const { data, keyPrefix, rounded, className, headerClassName, rowClassName } = props

  const columns = Object.keys(data.headers).length

  if (columns > 0 && data.rows.length > 0) {
    return (
      <div
        className={classNames(
          'bg-pt-bg-purple-dark px-4 pb-4',
          { 'rounded-lg': rounded },
          className
        )}
      >
        {/* Table Headers */}
        <div
          className={classNames(
            'text-sm px-3 py-6 text-pt-purple-100',
            `grid grid-cols-${columns} gap-3`,
            headerClassName
          )}
        >
          {Object.values(data.headers).map((header, i) => (
            <span
              key={`${keyPrefix}-header-${i}`}
              className={classNames('flex items-center px-4', {
                'justify-center': header.position === 'center',
                'justify-end': header.position === 'right'
              })}
            >
              {header.content}
            </span>
          ))}
        </div>

        {/* Table Rows */}
        <ul className='flex flex-col gap-4'>
          {data.rows.map((row, i) => (
            <div
              key={`${keyPrefix}-row-${i}`}
              className={classNames(
                'grid p-3 bg-pt-transparent',
                `grid-cols-${columns}`,
                { 'rounded-lg': rounded },
                rowClassName,
                row.className
              )}
            >
              {/* Table Cells */}
              {Object.keys(data.headers).map((header) => {
                const cell = row.cells[header]

                return (
                  <span
                    key={`${keyPrefix}-cell-${header}-${i}`}
                    className={classNames('flex items-center px-4', {
                      'justify-center': cell?.position === 'center',
                      'justify-end': cell?.position === 'right'
                    })}
                  >
                    {cell?.content ?? '-'}
                  </span>
                )
              })}
            </div>
          ))}
        </ul>
      </div>
    )
  }
}
