import { render, screen } from '@testing-library/react'
import { SearchBar } from '../components/Search.Bar'
import { players } from '../mocks/handlers'
import userEvent from '@testing-library/user-event'

describe('SearchBar', () => {
  const placeholder = 'Search a player'
  const emptyListLabel = 'Empty'
  const user = userEvent.setup()

  beforeEach(() => {
    render(
      <SearchBar
        placeholder={placeholder}
        onPlayerSubmit={() => console.log('Player submited!')}
        emptyListLabel={emptyListLabel}
      />
    )
  })

  it('Should not display players list if no search value', () => {
    expect(screen.queryByText(emptyListLabel)).toBeNull()
  })

  it('Should display players list if search value', async () => {
    const input = screen.getByPlaceholderText(placeholder)
    await user.type(input, 'some random player')

    expect(screen.getByText(emptyListLabel)).toBeDefined()
  })

  it('Should display a list of players matching search value', async () => {
    const input = screen.getByPlaceholderText(placeholder)
    await user.type(input, players[0].first_name)

    players.forEach((player) => {
      expect(
        screen.getByText(
          `${player.first_name} ${player.last_name} (${player.team})`
        )
      ).toBeDefined()
    })
  })

  it('Should display a Guess button', () => {
    expect(screen.getByPlaceholderText(placeholder)).toBeDefined()
  })
})
