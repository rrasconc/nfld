import { rest } from 'msw'
import { DailyPlayer, Player } from '../constants/types'

//mock data
export const mockPlayers: Player[] = [
  {
    conference: 'AFC',
    division: 'WEST',
    drafted: 2017,
    first_name: 'Patrick',
    id: 61,
    last_name: 'Mahomes',
    position: 'QB',
    position_type: 'OFF',
    team: 'KC'
  },
  {
    conference: 'NFC',
    division: 'EAST',
    drafted: 2020,
    first_name: 'Jalen',
    id: 22,
    last_name: 'Hurts',
    position: 'QB',
    position_type: 'OFF',
    team: 'PHI'
  },
  {
    id: 1,
    first_name: 'Denzel',
    last_name: 'Ward',
    conference: 'AFC',
    division: 'NORTH',
    position: 'CB',
    position_type: 'OFF',
    team: 'CLE',
    drafted: 2018
  }
]

export const mockDaily: DailyPlayer = {
  id: 1,
  first_name: 'Denzel',
  last_name: 'Ward',
  conference: 'AFC',
  division: 'NORTH',
  position: 'CB',
  position_type: 'OFF',
  team: 'CLE',
  drafted: 2018,
  daily_date: '2022-01-22',
  daily_number: 3
}

export const handlers = [
  rest.get('http://127.0.0.1:8000/api/players/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockPlayers))
  }),
  rest.get('http://127.0.0.1:8000/api/players/random/', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockDaily))
  })
]
