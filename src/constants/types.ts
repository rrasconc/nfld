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
}

export interface AnswersBoardProps {
  answersList: Player[]
  winnerPlayer: Player
}

export interface SearchBarProps {
  onPlayerSubmit: (player: Player) => void
}
