export interface Player {
  id: number
  first_name: string
  last_name: string
  conference: string
  division: string
  position: string
  team: string
}

export interface AnswerCardProps {
  value: string
  isCorrect: boolean
}

export interface AnswersBoardProps {
  answersList: Player[]
}
