import { SearchIcon } from 'src/icons/search'

const SearchForm: React.FC = () => {
  return (
    <div className="hidden lg:block">
      <div className="flex">
        <input
          type="text"
          className="bg-primary-600 rounded-l-md border-primary-400 px-4"
          placeholder="Buscar"
        />
        <button className="h-[42px] rounded-r-md aspect-square grid place-items-center bg-primary-400">
          <SearchIcon />
        </button>
      </div>
    </div>
  )
}

export default SearchForm
