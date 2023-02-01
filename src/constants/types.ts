import { AnimationControls } from 'framer-motion'

export interface Player {
  id: number
  first_name: string
  last_name: string
  conference: string
  division: string
  position: string
  position_type: string
  team: string
  drafted: number
}

export interface AnswerCardProps {
  value: string
  isCorrect: boolean
  delay: number
}

export interface AnswersBoardProps {
  answersList: Player[]
  winnerPlayer: Player
  animationControls: AnimationControls
}

export interface SearchBarProps {
  onPlayerSubmit: (player: Player) => void
  disabled: boolean
}
