import MatchListDatePicker from 'src/components/MatchListDatePicker/MatchListDatePicker'

const withMatchListWrapper = (App: React.FC<any>) => {
  const MatchListWrapper: React.FC<any> = (props) => {
    return (
      <div className="grid grid-cols-12 gap-4 py-8 ">
        <div className="p-4 py-0  col-span-12 flex items-center justify-between lg:block lg:col-span-4">
          <div className="font-semibold">Jogos ao vivo</div>
        </div>

        <div className="block col-span-12 lg:col-span-8">
          <MatchListDatePicker className="flex items-center justify-between px-4 pb-8" />

          <div className="grid gap-y-6">
            <App {...props} />
          </div>
        </div>
      </div>
    )
  }

  return MatchListWrapper
}

export default withMatchListWrapper
