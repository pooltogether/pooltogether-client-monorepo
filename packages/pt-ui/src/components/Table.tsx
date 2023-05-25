import classNames from 'classnames'
import { ReactNode } from 'react'

interface TableItem {
  content: ReactNode
  position?: 'left' | 'center' | 'right'
}

export interface TableData {
  headers: { [id: string]: TableItem }
  rows: {
    id: string
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

  const getGridCols = (columns: number) => {
    switch (columns) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-2'
      case 3:
        return 'grid-cols-3'
      case 4:
        return 'grid-cols-4'
      case 5:
        return 'grid-cols-5'
      case 6:
        return 'grid-cols-6'
    }
  }

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
            'text-sm px-3 py-6 text-pt-purple-100 grid gap-3',
            getGridCols(columns),
            headerClassName
          )}
        >
          {Object.keys(data.headers).map((headerId) => (
            <span
              key={`${keyPrefix}-header-${headerId}`}
              className={classNames('flex items-center px-4', {
                'justify-center': data.headers[headerId].position === 'center',
                'justify-end': data.headers[headerId].position === 'right'
              })}
            >
              {data.headers[headerId].content}
            </span>
          ))}
        </div>

        {/* Table Rows */}
        <ul className='flex flex-col gap-4'>
          {data.rows.map((row) => (
            <div
              key={`${keyPrefix}-row-${row.id}`}
              className={classNames(
                'grid p-3 bg-pt-transparent',
                getGridCols(columns),
                { 'rounded-lg': rounded },
                rowClassName,
                row.className
              )}
            >
              {/* Table Cells */}
              {Object.keys(data.headers).map((headerId, i) => {
                const cell = row.cells[headerId]

                return (
                  <span
                    key={`${keyPrefix}-cell-${headerId}-${row.id}-${i}`}
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
