import moment from 'moment'
import { useEffect, useState } from 'react'
import { TimeLeft } from '../constants/types'

export function CountDownTimer() {
  const [countdown, setCountdown] = useState<TimeLeft>({
    hours: 24,
    minutes: 0,
    seconds: 0
  })

  const getTimeLeft = () => {
    const now = moment()
    const nextDaily = moment().add(1, 'days').set('hour', 8).set('minute', 0)

    const secondsLeft = nextDaily.diff(now, 'seconds') - now.seconds()

    return {
      hours: Math.floor((secondsLeft % (60 * 60 * 24)) / (60 * 60)),
      minutes: Math.floor((secondsLeft % (60 * 60)) / 60),
      seconds: Math.floor(secondsLeft % 60)
    }
  }

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      const timeLeft = getTimeLeft()
      setCountdown(timeLeft)
    }, 1000)

    return () => {
      clearInterval(countDownInterval)
    }
  }, [])

  if (!countdown) {
    return null
  }
  return (
    <div className="flex flex-col items-center mt-2 mb-4">
      <h1 className="text-lg text-zinc-500">Next player in</h1>

      <span className="text-2xl">
        {countdown.hours < 10 && '0'}
        {countdown.hours}:{countdown.minutes < 10 && '0'}
        {countdown.minutes}:{countdown.seconds < 10 && '0'}
        {countdown.seconds}
      </span>
    </div>
  )
}
