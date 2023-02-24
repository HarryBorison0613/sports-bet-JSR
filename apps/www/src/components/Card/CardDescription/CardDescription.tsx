const CardDescription: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  return <p className=" text-slate-500 leading-[1.8]">{children}</p>
}

export default CardDescription
