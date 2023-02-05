import { AnswersBoard } from './components/Answers.Board'

import { SearchBar } from './components/Search.Bar'
import { Splash } from './components/Splash'

import { useDailyPlayer } from './hooks/useDailyPlayer'
import { AnimatePresence, motion } from 'framer-motion'

import { CountDownTimer } from './components/Count.Down.Timer'
import { useGame } from './hooks/useGame'

import { ClipboardButton } from './components/Clipboard.Button'
import { CATEGORIES } from './constants/game'

function App() {
  const dailyPlayer = useDailyPlayer()
  const game = useGame(dailyPlayer)
  const {
    isWinner,
    isLoadingGameStatus,
    handlePlayerSubmit,
    answers,
    animationControls,
    latestAnswer
  } = game

  if (dailyPlayer.isLoading || isLoadingGameStatus) {
    return <Splash />
  }

  return (
    <>
      <main className="flex flex-col bg-[url('/bg.png')] bg-cover min-h-screen text-zinc-200 p-4 items-center">
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

        {latestAnswer && answers.length < CATEGORIES.length && !isWinner && (
          <AnimatePresence>
            <motion.h1
              key={latestAnswer.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="my-4 text-lg text-zinc-200"
            >
              {`${latestAnswer.first_name} ${latestAnswer.last_name}`}
            </motion.h1>
          </AnimatePresence>
        )}

        {(answers.length === CATEGORIES.length || isWinner) && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="my-4 text-lg text-zinc-500"
          >
            Daily player:{' '}
            <span className="text-lg text-zinc-200">
              {`${dailyPlayer.data?.first_name} ${dailyPlayer.data?.last_name}`}
            </span>
          </motion.h1>
        )}

        {(isWinner || answers.length === CATEGORIES.length) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center"
          >
            <ClipboardButton
              answersList={answers}
              winnerPlayer={dailyPlayer.data}
            />
            <CountDownTimer />
          </motion.div>
        )}
      </main>
      <footer className="flex flex-row items-center justify-center py-4 border-t border-zinc-700 text-sm text-zinc-500 bg-black">
        <span>
          {'by a NFL fan '}
          <a className="underline" href="http://www.rrascon.online">
            {'rrascon'}
          </a>
        </span>
      </footer>
    </>
  )
}

export default App
