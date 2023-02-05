import { motion } from 'framer-motion'
import { AnswerCardProps, AnswersBoardProps } from '../constants/types'
import { CATEGORIES, SIMILAR_POSITIONS } from '../constants/game'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faL } from '@fortawesome/free-solid-svg-icons'

export function AnswerCard({
  value,
  isCorrect,
  delay,
  flagUp,
  flagDown,
  isSimilarPosition
}: AnswerCardProps) {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay }}
      className={`flex relative ${
        isCorrect
          ? 'bg-green-700'
          : isSimilarPosition
          ? 'bg-yellow-700'
          : 'bg-red-700'
      }  h-16 w-16 p-1 rounded-sm border items-center justify-center border-zinc-400`}
    >
      <span className="z-20">{value}</span>
      {flagUp && (
        <FontAwesomeIcon
          className="absolute text-6xl text-red-900 z-10"
          icon={faArrowUp}
        />
      )}
      {flagDown && (
        <FontAwesomeIcon
          className="absolute text-6xl text-red-900 z-10"
          icon={faArrowDown}
        />
      )}
    </motion.span>
  )
}

export function AnswersBoard({
  answersList,
  winnerPlayer,
  animationControls
}: AnswersBoardProps) {
  const getIsSimilarPosition = (answerPosition: string) => {
    const { passDefenders, linemans, receivers } = SIMILAR_POSITIONS
    if (
      (receivers.includes(answerPosition) &&
        receivers.includes(winnerPlayer.position)) ||
      (linemans.includes(answerPosition) &&
        linemans.includes(winnerPlayer.position)) ||
      (passDefenders.includes(answerPosition) &&
        passDefenders.includes(winnerPlayer.position))
    ) {
      return true
    }
    return false
  }
  return (
    <div className="w-full overflow-y-hidden overflow-x-scroll md:overflow-x-hidden sm:flex sm:flex-col sm:items-center py-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-w-max flex-row md:justify-center font-bold text-xs gap-2"
      >
        {CATEGORIES.map((category, index) => (
          <span
            key={index}
            className="w-16 border-b border-zinc-600 py-2 flex justify-center"
          >
            {category.label}
          </span>
        ))}
      </motion.div>
      {answersList.map((player, index) => {
        const isWinner =
          JSON.stringify({
            ...player,
            daily_date: winnerPlayer.daily_date,
            daily_number: winnerPlayer.daily_number
          }) === JSON.stringify(winnerPlayer)
        return (
          <motion.div
            key={index}
            animate={isWinner ? animationControls : undefined}
            className="flex min-w-max flex-row gap-2 mt-2"
          >
            <AnswerCard
              delay={0}
              isCorrect={player.conference === winnerPlayer.conference}
              value={player.conference}
            />
            <AnswerCard
              delay={0.5}
              isCorrect={player.division === winnerPlayer.division}
              value={player.division}
            />
            <AnswerCard
              delay={1}
              isCorrect={player.team === winnerPlayer.team}
              value={player.team}
            />
            <AnswerCard
              delay={1.5}
              isCorrect={player.position_type === winnerPlayer.position_type}
              value={player.position_type}
            />
            <AnswerCard
              delay={2}
              isCorrect={player.position === winnerPlayer.position}
              isSimilarPosition={getIsSimilarPosition(player.position)}
              value={player.position}
            />
            <AnswerCard
              delay={2.5}
              isCorrect={player.drafted === winnerPlayer.drafted}
              value={player.drafted.toString()}
              flagUp={player.drafted < winnerPlayer.drafted}
              flagDown={player.drafted > winnerPlayer.drafted}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
