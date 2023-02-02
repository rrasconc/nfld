import { GameStatus } from './types'

const gameStatusKey = '@gameStatus'
export const storeGameStatus = (gameStatus: GameStatus) => {
  try {
    localStorage.setItem(gameStatusKey, JSON.stringify(gameStatus))
  } catch (error) {
    console.error(error)
  }
}

export const getGameStatus = () => {
  try {
    const gameStatus = localStorage.getItem(gameStatusKey)
    if (gameStatus) {
      return JSON.parse(gameStatus)
    }
    return null
  } catch (error) {
    console.error(error)
  }
}

export const resetGameStatus = () => {
  try {
    localStorage.removeItem(gameStatusKey)
  } catch (error) {
    console.error(error)
  }
}
