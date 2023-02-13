import { render, screen } from '@testing-library/react'
import { SearchBar } from '../components/Search.Bar'

describe('SearchBar', () => {
  test('should render', () => {
    render(<SearchBar onPlayerSubmit={() => console.log('Submited!')} />)

    expect(screen.getByPlaceholderText('Search a player')).toBeDefined()
  })
})
