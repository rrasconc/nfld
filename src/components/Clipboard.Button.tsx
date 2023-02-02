import { faCheck, faPaste } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Player } from '../constants/types'

export function ClipboardButton({ answersList }: { answersList: Player[] }) {
  const [isCopied, setIsCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setIsCopied(true)}
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
