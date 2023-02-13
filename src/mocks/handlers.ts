import { rest } from 'msw'

//mock data
export const players = [
  {
    id: 1,
    first_name: 'Denzel',
    last_name: 'Ward',
    conference: 'AFC',
    division: 'NORTH',
    position: 'CB',
    position_type: 'DEF',
    team: 'CLE',
    drafted: 2018
  }
]

export const handlers = [
  // Handles a POST /login request
  rest.get('http://127.0.0.1:8000/api/players/', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(players)
    )
  })
]
