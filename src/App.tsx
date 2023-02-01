import { useState } from 'react'
import { AnswersBoard, CATEGORIES } from './components/Answers.Board'

import { SearchBar } from './components/Search.Bar'
import { Splash } from './components/Splash'
import { Player } from './constants/types'
import { useDailyPlayer } from './hooks/useDailyPlayer'

function App() {
  const dailyPlayer = useDailyPlayer()
  const [answers, setAnswers] = useState<Player[]>([])

  const handlePlayerSubmit = (player: Player) => {
    if (answers.length >= CATEGORIES.length) {
      return
    }
    setAnswers([...answers, player])
  }

  if (dailyPlayer.isLoading) {
    return <Splash />
  }

  return (
    <main className="flex flex-col bg-[url('/nfl.jpg')] bg-cover bg-blend-multiply min-h-screen bg-zinc-800 text-zinc-200 p-4 items-center">
      <img src="./nfld.png" className="h-48 w-48 my-4" />
      <SearchBar onPlayerSubmit={handlePlayerSubmit} />
      {dailyPlayer.data && answers.length > 0 && (
        <AnswersBoard answersList={answers} winnerPlayer={dailyPlayer.data} />
      )}
    </main>
  )
}

export default App
