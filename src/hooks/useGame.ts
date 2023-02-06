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
      answersList: [...answers, player],
      date: moment
        .utc()
        .set('hours', RESET_HOUR * 2)
        .set('minutes', 0)
        .set('seconds', 0)
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
    const dailyDate = moment
      .utc(dailyPlayer.data?.daily_date)
      .set('hours', RESET_HOUR * 2)
      .set('minutes', 0)
      .set('seconds', 0)

    let gameStatus = await getGameStatus()

    if (gameStatus === null) {
      setIsLoadingGameStatus(false)
      return
    }

    if (gameStatus.date === undefined) {
      gameStatus = null
      resetGameStatus()
    }

    const hoursDiff = dailyDate.diff(moment.utc(gameStatus.date), 'hours')

    if (hoursDiff >= 23) {
      gameStatus = null
      resetGameStatus()
    }

    if (gameStatus != null) {
      setAnswers([...gameStatus.answersList])
      setIsWinner(gameStatus.isWinner)
    }

    setIsLoadingGameStatus(false)
  }

  useEffect(() => {
    retrieveGameStatus()
  }, [dailyPlayer.data])

  return {
    isWinner,
    isLoadingGameStatus,
    handlePlayerSubmit,
    animationControls,
    answers,
    latestAnswer
  }
}
