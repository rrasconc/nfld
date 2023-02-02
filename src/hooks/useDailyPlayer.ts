import { useEffect, useState } from 'react'
import { backend } from '../constants/backend'
import { DailyPlayer } from '../constants/types'

export function useDailyPlayer() {
  const [data, setData] = useState<DailyPlayer | null>(null)
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
    }, 500)
  }
  useEffect(() => {
    fetchDailyPlayer()
  }, [])

  return { data, isLoading }
}
