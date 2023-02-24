import { NotificationIcon } from 'src/icons/notification'
import { PlusIcon } from 'src/icons/plus'
import Button, { IButtonProps } from 'src/components/Button/Button'

const FollowButton: React.FC<IButtonProps> = (props) => {
  return (
    <div className="text-center">
      <Button
        className="mx-auto"
        PrefixIcon={PlusIcon}
        SuffixIcon={NotificationIcon}
        {...props}
      >
        SEGUIR
      </Button>
      <small className="font-semibold">0 seguidores</small>
    </div>
  )
}

export default FollowButton
