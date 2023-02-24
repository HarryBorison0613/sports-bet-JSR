import Image from '@app/image'
import React from 'react'

export interface ICardGridItemProps {
  icon?: string
  label?: string
  loading?: boolean
}

const CardGridItem: React.ForwardRefRenderFunction<any, ICardGridItemProps> = (
  { icon, label, loading, ...restProps },
  ref
) => {
  return (
    <a
      className="grid place-items-center border-b border-r py-3 gap-4 border-slate-100 cursor-pointer hover:bg-slate-50 hover:text-primary-500 select-none"
      ref={ref}
      {...restProps}
    >
      {loading ? (
        <>
          <span className="block h-[42px] !aspect-square bg-slate-200 rounded-full" />
        </>
      ) : (
        <>
          {icon ? (
            <Image src={icon!} alt={label} width={36} height={36} />
          ) : (
            <div className="w-[36px] aspect-square"></div>
          )}

          {label && (
            <label className="font-bold text-[0.7rem] block text-center">
              {label}
            </label>
          )}
        </>
      )}
    </a>
  )
}

export default React.forwardRef(CardGridItem)
