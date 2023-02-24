import AccountLayout from 'src/layouts/AccountLayout/AccountLayout'
import RecoverPassword from 'src/components/RecoverPassword/RecoverPassword'

const AccountPage: React.FC = () => {
  return (
    <>
      <RecoverPassword />
    </>
  )
}

;(AccountPage as any).Layout = AccountLayout

export default AccountPage
