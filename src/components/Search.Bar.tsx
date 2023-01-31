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
      <div className="flex flex-row rounded-lg w-full px-4 max-w-5xl bg-zinc-900 border focus-within:border-zinc-400 border-zinc-600 items-center">
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
      </div>

      {/* {isLoading && <h1>loading</h1>} */}

      {isListVisible && searchValue && (
        <div className="flex mt-2 max-h-72 flex-col w-full max-w-5xl border rounded-md border-zinc-600 bg-zinc-800">
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
                className={`p-4 hover:bg-sky-900 ${
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
