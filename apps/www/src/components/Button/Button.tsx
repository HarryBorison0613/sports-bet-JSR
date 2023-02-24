import cx from 'classnames'

export interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  PrefixIcon?: React.ElementType
  SuffixIcon?: React.ElementType
  variant?: 'success'
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined
}

const Button: React.FC<IButtonProps> = ({
  children,
  PrefixIcon,
  SuffixIcon,
  className,
  variant,
  onClick,
}) => {
  return (
    <button
      className={cx(
        'bg-blue-500 p-2 rounded-md hover:bg-blue-400 text-white',
        'flex items-center justify-between gap-2 font-semibold',
        {
          '!bg-green-600 hover:!bg-green-500': variant === 'success',
        },
        className
      )}
      onClick={onClick}
    >
      {PrefixIcon && <PrefixIcon />}
      <span className="text-xs">{children}</span>
      {SuffixIcon && <SuffixIcon />}
    </button>
  )
}

export default Button
