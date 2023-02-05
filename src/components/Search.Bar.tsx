import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormEvent, useState } from 'react'
import { Player, SearchBarProps } from '../constants/types'
import { useSearchbar } from '../hooks/useSearchbar'
import { Loader } from './Loader.Spinner'
import { motion } from 'framer-motion'

export function SearchBar({ onPlayerSubmit, disabled }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [isListVisible, setIsListVisible] = useState<boolean>(false)

  const searchbar = useSearchbar(searchValue)
  const { list, isLoading } = searchbar

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (selectedPlayer === null) {
      return
    }
    onPlayerSubmit(selectedPlayer)
    setSearchValue('')
    setSelectedPlayer(null)
  }

  return (
    <>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2
        }}
        onSubmit={handleSubmit}
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
          className="bg-sky-800 hover:border-zinc-400 hover:border-l focus:border-zinc-400 focus:border-l focus:bg-sky-800 px-6 py-4 rounded-r-lg h-full"
        >
          Guess
        </button>
      </motion.form>

      {isListVisible && searchValue && !disabled && (
        <div className="flex max-h-72 overflow-y-scroll flex-col w-full max-w-5xl border rounded-md border-zinc-600 bg-zinc-800">
          {isLoading && <Loader />}

          {!isLoading && list.length === 0 && (
            <span className="p-4 text-zinc-600 text-center">No results</span>
          )}

          {!isLoading &&
            list.map((player, index) => {
              const isFirst = index === 0
              return (
                <button
                  type="button"
                  onClick={() => {
                    setSearchValue(`${player.first_name} ${player.last_name}`)
                    setSelectedPlayer(player)
                    setIsListVisible(false)
                  }}
                  key={index}
                  className={`p-4 hover:bg-zinc-900 text-left ${
                    !isFirst && 'border-t border-zinc-600 pt-4'
                  }`}
                >
                  {player.first_name} {player.last_name} ({player.team})
                </button>
              )
            })}
        </div>
      )}
    </>
  )
}
