/* eslint-disable react/jsx-key */
import { Column, useTable } from 'react-table'
import styles from './Table.module.css'
import cx from 'classnames'

export type ITableProps<T extends object> = {
  className?: string
  columns: Column<T>[]
  data: T[]
  onClickRow?: (row: any) => void
}

function Table<T extends object>(props: ITableProps<T>) {
  const { columns, data, onClickRow, className } = props

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    useTable<T>({ columns, data })

  return (
    <div className={cx(styles.base, className)}>
      <table className={cx(styles?.table)} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers?.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)

            return (
              <tr
                onClick={onClickRow ? () => onClickRow(row) : undefined}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
