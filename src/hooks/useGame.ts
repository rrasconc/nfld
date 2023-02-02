import { useEffect, useState } from 'react'
import { Player } from '../constants/types'
import { getGameStatus, storeGameStatus } from '../constants/localStorage'
import { CATEGORIES } from '../components/Answers.Board'
import { useAnimationControls } from 'framer-motion'

export function useGame(dailyPlayer: {
  data: Player | null
  isLoading: boolean
}) {
  const animationControls = useAnimationControls()

  const [answers, setAnswers] = useState<Player[]>([])
  const [isWinner, setIsWinner] = useState(false)
  const [isLoadingGameStatus, setIsLoadingGameStatus] = useState(true)

  const handlePlayerSubmit = async (player: Player) => {
    if (answers.length >= CATEGORIES.length) {
      return
    }

    let currentGameStatus = {
      isWinner: false,
      answersList: [...answers, player]
    }

    setAnswers([...answers, player])

    if (JSON.stringify(player) !== JSON.stringify(dailyPlayer.data)) {
      storeGameStatus(currentGameStatus)
      return
    }

    currentGameStatus = { ...currentGameStatus, isWinner: true }
    setTimeout(async () => {
      setIsWinner(true)
      await animationControls.start({
        scale: 1.2,
        transition: { duration: 0.2 }
      })
      await animationControls.start({
        scale: 1,
        transition: { duration: 0.2 }
      })
    }, 2800)

    storeGameStatus(currentGameStatus)
  }

  const retrieveGameStatus = async () => {
    const gameStatus = getGameStatus()
    if (gameStatus) {
      setAnswers([...gameStatus.answersList])
      setIsWinner(gameStatus.isWinner)
    }

    setIsLoadingGameStatus(false)
  }

  useEffect(() => {
    retrieveGameStatus()
  }, [])

  return {
    isWinner,
    isLoadingGameStatus,
    handlePlayerSubmit,
    animationControls,
    answers
  }
}
