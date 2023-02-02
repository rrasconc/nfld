import { AnswersBoard, CATEGORIES } from './components/Answers.Board'

import { SearchBar } from './components/Search.Bar'
import { Splash } from './components/Splash'

import { useDailyPlayer } from './hooks/useDailyPlayer'
import { motion } from 'framer-motion'

import { CountDownTimer } from './components/Count.Down.Timer'
import { useGame } from './hooks/useGame'

import { ClipboardButton } from './components/Clipboard.Button'

function App() {
  const dailyPlayer = useDailyPlayer()
  const game = useGame(dailyPlayer)
  const {
    isWinner,
    isLoadingGameStatus,
    handlePlayerSubmit,
    answers,
    animationControls
  } = game

  if (dailyPlayer.isLoading || isLoadingGameStatus) {
    return <Splash />
  }

  return (
    <main className="flex flex-col bg-[url('/nfl.jpg')] bg-cover bg-blend-multiply min-h-screen bg-zinc-800 text-zinc-200 p-4 items-center">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        src="./logo.png"
        className="h-32 w-32 my-4"
      />
      <SearchBar onPlayerSubmit={handlePlayerSubmit} disabled={isWinner} />

      {dailyPlayer.data && answers.length > 0 && (
        <AnswersBoard
          answersList={answers}
          winnerPlayer={dailyPlayer.data}
          animationControls={animationControls}
        />
      )}
      {(isWinner || answers.length === CATEGORIES.length) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center"
        >
          <ClipboardButton answersList={answers} />
          <CountDownTimer />
        </motion.div>
      )}
    </main>
  )
}

export default App
