import { useEffect, useState } from 'react'
import { backend } from '../constants/backend'
import { Player } from '../constants/types'

export function useDailyPlayer() {
  const [data, setData] = useState<Player | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchDailyPlayer = async () => {
    setIsLoading(true)
    try {
      const res = await backend.get('players/random/')
      setData({ ...res.data })
    } catch (error) {
      console.error(error)
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  useEffect(() => {
    fetchDailyPlayer()
  }, [])

  return { data, isLoading }
}
