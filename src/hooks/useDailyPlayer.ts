import { useEffect, useState } from 'react'
import { backend } from '../constants/backend'
import { DailyPlayer } from '../constants/types'

export function useDailyPlayer() {
  const [data, setData] = useState<DailyPlayer | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchDailyPlayer = async () => {
    try {
      const res = await backend.get('players/random/')
      setData({ ...res.data })
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)
  }
  useEffect(() => {
    fetchDailyPlayer()
  }, [])

  return { data, isLoading }
}
