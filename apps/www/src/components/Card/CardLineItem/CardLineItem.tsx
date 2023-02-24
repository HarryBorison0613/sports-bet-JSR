export interface ICardLineItemProps {
  label: string
}

export type ICardLineItemComponent = React.FC<
  React.PropsWithChildren<ICardLineItemProps>
>

export const CardLineItem: ICardLineItemComponent = ({ children, label }) => {
  return (
    <div className="grid grid-cols-12 items-center gap-4 py-[0.3rem] border-b last-of-type:border-b-0 text-sm">
      <div className="col-span-7 opacity-80 py-1 first-letter:uppercase">
        <span>{label}</span>
      </div>
      <div className="col-span-5 font-semibold text-right">
        <span>{children}</span>
      </div>
    </div>
  )
}
