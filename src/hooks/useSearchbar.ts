import { useEffect, useMemo, useState } from 'react'
import { backend } from '../constants/backend'
import { Player } from '../constants/types'

export function useSearchbar(searchValue: string) {
  const [players, setPlayers] = useState<{
    list: Array<Player>
    isLoading: boolean
  }>({
    list: [],
    isLoading: false
  })

  const filteredList = useMemo(
    () =>
      players.list.filter((player) => {
        const upperSearchValue = searchValue.toUpperCase()
        const playerName =
          `${player.first_name} ${player.last_name}`.toUpperCase()

        return (
          playerName.includes(upperSearchValue) ||
          player.team.toUpperCase().includes(upperSearchValue)
        )
      }),
    [searchValue, players.list]
  )

  const fetchPlayers = async () => {
    setPlayers({ ...players, isLoading: true })
    try {
      const res = await backend.get('players/')

      setPlayers({ ...players, list: [...res.data], isLoading: false })
    } catch (error) {
      console.error(error)
      setPlayers({ ...players, isLoading: false })
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

  return { isLoading: players.isLoading, list: filteredList }
}
