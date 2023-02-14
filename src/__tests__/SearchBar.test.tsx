import { render, screen } from '@testing-library/react'
import { SearchBar } from '../components/Search.Bar'
import { mockPlayers } from '../mocks/handlers'
import userEvent from '@testing-library/user-event'

describe('SearchBar', () => {
  const placeholder = 'Search a player'
  const emptyListLabel = 'Empty'
  const user = userEvent.setup()

  beforeEach(() => {
    render(
      <SearchBar
        placeholder={placeholder}
        onPlayerSubmit={() => console.log('Player submitted!')}
        emptyListLabel={emptyListLabel}
      />
    )
  })

  it("Shouldn't display list if no search value", () => {
    expect(screen.queryByText(emptyListLabel)).toBeNull()
  })

  it("Shouldn't display list if search value entered", async () => {
    const input = screen.getByPlaceholderText(placeholder)
    await user.type(input, 'some random player')

    expect(screen.getByText(emptyListLabel)).toBeDefined()
  })

  it('Should display a list of players matching search value', async () => {
    const input = screen.getByPlaceholderText(placeholder)

    await user.type(input, ' ')

    mockPlayers.forEach((player) => {
      expect(
        screen.getByText(
          `${player.first_name} ${player.last_name} (${player.team})`
        )
      ).toBeDefined()
    })
  })

  it("Should set input value to player's name on player button click", async () => {
    const player = mockPlayers[0]

    const input = screen.getByPlaceholderText(placeholder)
    await user.type(input, player.first_name)

    const playerButton = screen.getByRole('button', {
      name: `${player.first_name} ${player.last_name} (${player.team})`
    })
    await user.click(playerButton)
    expect(screen.getByDisplayValue(`${player.first_name} ${player.last_name}`))
  })
})
