import moment from 'moment'
import { useEffect, useState } from 'react'
import { DailyPlayer, Player } from '../constants/types'
import {
  getGameStatus,
  resetGameStatus,
  storeGameStatus
} from '../constants/localStorage'
import { useAnimationControls } from 'framer-motion'
import { CATEGORIES, RESET_HOUR } from '../constants/game'

export function useGame(dailyPlayer: {
  data: DailyPlayer | null
  isLoading: boolean
}) {
  const animationControls = useAnimationControls()

  const [answers, setAnswers] = useState<Player[]>([])
  const [isWinner, setIsWinner] = useState(false)
  const [isLoadingGameStatus, setIsLoadingGameStatus] = useState(true)

  const latestAnswer = answers[answers.length - 1]

  const handlePlayerSubmit = async (player: Player) => {
    if (answers.length >= CATEGORIES.length) {
      return
    }

    let currentGameStatus = {
      isWinner: false,
      answersList: [...answers, player]
    }

    setAnswers([...answers, player])

    if (
      JSON.stringify({
        ...player,
        daily_date: dailyPlayer.data?.daily_date,
        daily_number: dailyPlayer.data?.daily_number
      }) !== JSON.stringify(dailyPlayer.data)
    ) {
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

  const checkForReset = () => {
    const dailyDate = moment(dailyPlayer.data?.daily_date).set(
      'hours',
      RESET_HOUR
    )
    // .subtract(1, 'day') //for debug only

    const hoursDiff = moment().diff(dailyDate, 'hours')

    if (hoursDiff >= 24) {
      resetGameStatus()
    }
  }

  useEffect(() => {
    checkForReset()
  }, [])

  useEffect(() => {
    retrieveGameStatus()
  }, [])

  return {
    isWinner,
    isLoadingGameStatus,
    handlePlayerSubmit,
    animationControls,
    answers,
    latestAnswer
  }
}
