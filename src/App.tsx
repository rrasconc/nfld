import { useState } from 'react'
import { AnswersBoard, CATEGORIES } from './components/Answers.Board'

import { SearchBar } from './components/Search.Bar'
import { Splash } from './components/Splash'
import { Player } from './constants/types'
import { useDailyPlayer } from './hooks/useDailyPlayer'
import { motion, useAnimationControls } from 'framer-motion'

function App() {
  const dailyPlayer = useDailyPlayer()
  const animationControls = useAnimationControls()

  const [answers, setAnswers] = useState<Player[]>([])
  const [isWinner, setIsWinner] = useState(false)

  const handlePlayerSubmit = (player: Player) => {
    if (answers.length >= CATEGORIES.length) {
      return
    }
    setAnswers([...answers, player])

    if (JSON.stringify(player) !== JSON.stringify(dailyPlayer.data)) {
      return
    }

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
  }

  if (dailyPlayer.isLoading) {
    return <Splash />
  }

  return (
    <main className="flex flex-col bg-[url('/nfl.jpg')] bg-cover bg-blend-multiply min-h-screen bg-zinc-800 text-zinc-200 p-4 items-center">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src="./logo.png"
        className="h-48 w-48 my-4"
      />
      <SearchBar onPlayerSubmit={handlePlayerSubmit} disabled={isWinner} />
      {dailyPlayer.data && answers.length > 0 && (
        <AnswersBoard
          answersList={answers}
          winnerPlayer={dailyPlayer.data}
          animationControls={animationControls}
        />
      )}
    </main>
  )
}

export default App
