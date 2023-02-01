import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useSearchbar } from '../hooks/useSearchbar'

export function SearchBar() {
  const [searchValue, setSearchValue] = useState('')
  const searchbar = useSearchbar(searchValue)
  const { list, isLoading } = searchbar

  const [isListVisible, setIsListVisible] = useState<boolean>(false)

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-row rounded-lg w-full my-4 pl-4 max-w-5xl bg-zinc-900 border focus-within:border-zinc-400 border-zinc-600 items-center"
      >
        <FontAwesomeIcon
          className="text-zinc-600 text-lg"
          icon={faMagnifyingGlass}
        />
        <input
          onFocus={() => setIsListVisible(true)}
          onBlur={() => {
            if (searchValue) {
              return
            }
            setIsListVisible(false)
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search a player"
          className="outline-none bg-zinc-900 rounded-md py-4 px-4 w-full"
          type="text"
        />
        <button
          type="submit"
          className="bg-sky-800 focus:border-zinc-400 focus:border-l focus:bg-sky-800 px-6 py-4 rounded-r-lg h-full"
        >
          Guess
        </button>
      </form>

      {isLoading && <h1>loading</h1>}

      {isListVisible && searchValue && (
        <div className="flex max-h-72 flex-col w-full max-w-5xl border rounded-md border-zinc-600 bg-zinc-800">
          {list.length === 0 && (
            <span className="p-4 text-zinc-600 text-center">No results</span>
          )}
          {list.map((item, index) => {
            const isFirst = index === 0
            return (
              <button
                type="button"
                onClick={() => {
                  setSearchValue(`${item.first_name} ${item.last_name}`)
                  setIsListVisible(false)
                }}
                key={index}
                className={`p-4 hover:bg-zinc-900 text-left ${
                  !isFirst && 'border-t border-zinc-600 pt-4'
                }`}
              >
                {item.first_name} {item.last_name}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}
