import App from '../App'
import {
  cleanup,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CATEGORIES } from '../constants/game'

describe('App', () => {
  const user = userEvent.setup()

  beforeEach(async () => {
    window.localStorage.clear()
    render(<App />)
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
  })

  afterEach(() => cleanup())

  it("shouldn't display scoreboard if no players selected", async () => {
    await waitFor(() => {
      expect(screen.queryByText('Team')).toBeNull()
    })
  })

  it('should display scoreboard after player selected', async () => {
    const input = await screen.findByPlaceholderText(/search a player/i)

    await user.type(input, 'Patrick')
    await user.click(screen.getByRole('button', { name: /patrick/i }))
    await user.click(screen.getByRole('button', { name: /guess/i }))

    const scoreBoard = await screen.findByText('Team')
    expect(scoreBoard).toBeDefined()
  })

  it('should display timer after win', async () => {
    const input = await screen.findByPlaceholderText(/search a player/i)

    await user.type(input, 'Denzel')
    await user.click(screen.getByRole('button', { name: /denzel/i }))
    await user.click(screen.getByRole('button', { name: /guess/i }))

    await waitFor(
      () => {
        expect(screen.getByText(/next player in/i)).toBeDefined()
      },
      {
        timeout: 2800
      }
    )
  })

  it('should display timer after 6 tries', async () => {
    const input = await screen.findByPlaceholderText(/search a player/i)
    const guessButton = screen.getByRole('button', { name: /guess/i })

    for await (const i of CATEGORIES) {
      await user.type(input, 'Jalen')
      await user.click(screen.getByRole('button', { name: /jalen/i }))
      await user.click(guessButton)
    }

    await waitFor(
      () => {
        expect(screen.getByText(/next player in/i)).toBeDefined()
      },
      {
        timeout: 2800
      }
    )
  })
})
