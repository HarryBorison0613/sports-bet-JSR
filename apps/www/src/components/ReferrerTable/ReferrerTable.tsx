import React from 'react'
import cx from 'classnames'
import DataTable from 'react-data-table-component'

import styles from './ReferrerTable.module.css'
import useGlobalContext from 'src/hooks/useGlobalContext/useGlobalContext'

import formatDate from 'src/config/formatDate'
import formatUserName from 'src/config/formatUserName'

const ReferrerTable: React.FC = () => {
  const { userState } = useGlobalContext()

  let datas: any = []

  userState?.data?.allUserData?.map((data: any, key: any) => {
    const list = {
      createdAt: formatDate(data.createdAt),
      username: formatUserName(data.username),
      id: key + 1,
    }
    datas.push(list)
  })

  const columns = [
    {
      name: 'Nr',
      selector: (list: any) => list.id,
      grow: 0.2,
      id: 'Nr',
      center: true,
    },
    {
      name: 'Date',
      selector: (list: any) => list.createdAt,
      id: 'date',
      grow: 0.3,
      center: true,
    },
    {
      name: 'Username',
      selector: (list: any) => list.username,
      id: 'username',
      grow: 0.5,
      center: true,
    },
  ]

  return (
    <>
      <div className={cx(styles.base, styles.text, 'container')}>
        <div className="flex justify-between pt-10">
          <p className="text-[14px] text-customize-indigo my-auto">
            Referrer Program
          </p>
          <div className="flex text-[14px] text-customize-indigo my-auto">
            <p>Referrer URL:</p>
            <p className="bg-white ml-2 px-1 rounded-md">
              https://www.bets.com.br/?ref={userState.data.userData.name}
            </p>
          </div>
        </div>
        <div className="pb-6">
          <DataTable
            columns={columns}
            data={datas}
            pagination
            dense
            className="mt-4"
            responsive
            persistTableHead
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 20]}
          />
        </div>
      </div>
    </>
  )
}

export default ReferrerTable
