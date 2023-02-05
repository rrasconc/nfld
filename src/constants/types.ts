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

export interface DailyPlayer extends Player {
  daily_date: string
  daily_number: number
}

export interface AnswerCardProps {
  value: string
  isCorrect: boolean
  isSimilarPosition?: boolean
  delay: number
  flagUp?: boolean
  flagDown?: boolean
}

export interface AnswersBoardProps {
  answersList: Player[]
  winnerPlayer: DailyPlayer
  animationControls: AnimationControls
}

export interface SearchBarProps {
  onPlayerSubmit: (player: Player) => void
  disabled: boolean
}

export interface GameStatus {
  isWinner: boolean
  answersList: Player[]
}

export interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

export interface ClipBoardButtonProps {
  answersList: Player[]
  winnerPlayer: DailyPlayer | null
}
