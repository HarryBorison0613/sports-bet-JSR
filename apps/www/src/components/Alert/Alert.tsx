import { FiInfo } from 'react-icons/fi'
import { AlertContent, IAlterContentProps } from './AlertContent'

export type IAlterType = 'info'

export interface IAlertProps {
  type: IAlterType
}

export const getAlertIcon = (type: IAlterType) => {
  switch (type) {
    case 'info':
    default:
      return FiInfo
  }
}

export type IAlterComponent = React.FC<React.PropsWithChildren<IAlertProps>> & {
  Content: React.FC<IAlterContentProps>
}

const Alert: IAlterComponent = ({ type, children }) => {
  const Icon = getAlertIcon(type)

  return (
    <div className="text-gray-400 flex gap-2 leading-[1.8]">
      <div className="w-[32px] text-lg mt-1">
        <Icon />
      </div>
      <div>{children}</div>
    </div>
  )
}

Alert.Content = AlertContent

export default Alert
