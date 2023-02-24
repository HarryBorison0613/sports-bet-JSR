import React from 'react'
import BaseLayout from 'src/layouts/BaseLayout/BaseLayout'
import dynamic from 'next/dynamic'

const SportTabBar = dynamic(
  () => import('src/components/SportTabBar/SportTabBar'),
  { ssr: true }
)

const AccountLayout: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  return (
    <>
      <BaseLayout>
        <SportTabBar />
        {children}
      </BaseLayout>
    </>
  )
}

export default AccountLayout
