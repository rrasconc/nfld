import { AnswerCardProps, AnswersBoardProps } from '../constants/types'

export const CATEGORIES = [
  'Conf.',
  'Division',
  'Team',
  'Type',
  'Position',
  'Drafted'
]

export function AnswerCard({ value, isCorrect }: AnswerCardProps) {
  return (
    <span
      className={`flex ${
        isCorrect ? 'bg-green-600' : 'bg-red-600'
      }  h-16 w-16 p-1 rounded-sm border items-center justify-center border-zinc-400`}
    >
      {value}
    </span>
  )
}

export function AnswersBoard({ answersList, winnerPlayer }: AnswersBoardProps) {
  return (
    <div className="w-full overflow-y-hidden overflow-x-scroll md:overflow-x-hidden sm:flex sm:flex-col sm:items-center py-4">
      <div className="flex min-w-max flex-row md:justify-center font-bold text-xs gap-2">
        {CATEGORIES.map((item, index) => (
          <span
            key={index}
            className="w-16 border-b border-zinc-600 py-2 flex justify-center"
          >
            {item}
          </span>
        ))}
      </div>
      {answersList.map((player, index) => (
        <div key={index} className="flex min-w-max flex-row gap-2 mt-2">
          <AnswerCard
            isCorrect={player.conference === winnerPlayer.conference}
            value={player.conference}
          />
          <AnswerCard
            isCorrect={player.division === winnerPlayer.division}
            value={player.division}
          />
          <AnswerCard
            isCorrect={player.team === winnerPlayer.team}
            value={player.team}
          />
          <AnswerCard
            isCorrect={player.position_type === winnerPlayer.position_type}
            value={player.position_type}
          />
          <AnswerCard
            isCorrect={player.position === winnerPlayer.position}
            value={player.position}
          />
          <AnswerCard
            isCorrect={player.drafted === winnerPlayer.drafted}
            value={player.drafted.toString()}
          />
        </div>
      ))}
    </div>
  )
}
