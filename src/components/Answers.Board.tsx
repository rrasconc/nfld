import { AnswerCardProps, AnswersBoardProps } from '../constants/types'

const CATEGORIES = [
  'Conf.',
  'Division',
  'Team',
  'Position',
  'Drafted'
  // 'College'
]

export function AnswerCard({ value, isCorrect }: AnswerCardProps) {
  return (
    <span
      className={`flex ${
        isCorrect ? 'bg-green-600' : 'bg-red-600'
      }  h-16 w-16 p-1 rounded-md border items-center justify-center border-zinc-400`}
    >
      {value}
    </span>
  )
}

export function AnswersBoard({ answersList }: AnswersBoardProps) {
  return (
    <div className="w-full overflow-y-hidden overflow-x-scroll md:overflow-x-hidden sm:flex sm:flex-col sm:items-center py-4">
      <div className="flex min-w-max flex-row md:justify-center font-bold text-xs gap-3">
        {CATEGORIES.map((item) => (
          <span className="w-16 border-b border-zinc-600 py-2 flex justify-center">
            {item}
          </span>
        ))}
      </div>
      {answersList.map((item) => (
        <div className="flex min-w-max flex-row gap-3 my-3">
          <AnswerCard isCorrect={true} value={item.conference} />
          <AnswerCard isCorrect={true} value={item.division} />
          <AnswerCard isCorrect={true} value={item.team} />
          <AnswerCard isCorrect={true} value={item.position} />
        </div>
      ))}
      {/* <span className="flex bg-green-600 h-16 w-16 rounded-md border items-center text-center justify-center border-zinc-400">
          Michigan west
        </span> */}
    </div>
  )
}
