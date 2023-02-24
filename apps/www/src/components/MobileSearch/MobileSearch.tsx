import { SearchIcon } from 'src/icons/search'

const MobileSearch: React.FC = () => {
  return (
    <div className="lg:hidden">
      <div className="grid place-content-center w-[36px] aspect-square">
        <SearchIcon className="text-xl" />
      </div>
    </div>
  )
}

export default MobileSearch
