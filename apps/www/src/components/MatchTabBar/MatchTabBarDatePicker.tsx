import MatchListDatePicker from 'src/components/MatchListDatePicker/MatchListDatePicker'

const MatchTabBarDatePicker: React.FC<any> = ({ children }) => {
  return (
    <div className="flex border-b-2">
      <div className="border-r-[2px] flex items-center justify-center px-6 bg-white w-full max-w-[220px]">
        <MatchListDatePicker />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default MatchTabBarDatePicker
