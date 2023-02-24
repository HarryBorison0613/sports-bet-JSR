export interface IFooterSectionProps {
  title: string
}

export const FooterSection: React.FC<
  React.PropsWithChildren<IFooterSectionProps>
> = ({ title, children }) => {
  return (
    <div className="space-y-4 col-span-3 lg:col-span-1">
      <div className="uppercase text-lg font-bold flex items-center gap-2">
        <h3>{title}</h3>
        <div className="border-t-2 flex-1"></div>
      </div>

      {children}
    </div>
  )
}
