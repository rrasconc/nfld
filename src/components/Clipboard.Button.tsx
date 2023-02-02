import { faCheck, faPaste } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Player } from '../constants/types'

import { CATEGORIES } from './Answers.Board'

export function ClipboardButton({
  answersList,
  winnerPlayer
}: {
  answersList: Player[]
  winnerPlayer: Player
}) {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const getResultsEmojis = () => {
    const resultsEmojis = answersList.map((answer) => {
      let answerEmojis = ''
      CATEGORIES.forEach((category) => {
        answerEmojis =
          answerEmojis +
          `${
            answer[category.key as keyof Player] ===
            winnerPlayer[category.key as keyof Player]
              ? '🟩'
              : '🟥'
          }`
      })

      return answerEmojis
    })
    return resultsEmojis.join('\n')
  }

  const handlePress = () => {
    setIsCopied(true)
    const resultEmojis = getResultsEmojis()
    const message = `NFLdle #1 🏈\n\n${resultEmojis}\n\nwww.nfldle.com`
    navigator.clipboard.writeText(message)
  }

  return (
    <button
      type="button"
      onClick={handlePress}
      className="p-4 mt-4 mb-2 border border-sky-900 rounded-md bg-sky-800 hover:border-zinc-400 focus:border-zinc-400"
    >
      <FontAwesomeIcon
        className="text-md mr-1"
        icon={isCopied ? faCheck : faPaste}
      />
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  )
}
