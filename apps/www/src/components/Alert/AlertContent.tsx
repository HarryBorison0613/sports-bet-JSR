export type IAlterContentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>

export const AlertContent: React.FC<IAlterContentProps> = ({ children }) => (
  <p className="text-sm ">{children}</p>
)
