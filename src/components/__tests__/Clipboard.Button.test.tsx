import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockDaily } from '../../mocks/handlers'
import { ClipboardButton } from '../Clipboard.Button'

describe('ClipboardButton', () => {
  beforeEach(() => {
    render(<ClipboardButton answersList={[]} winnerPlayer={mockDaily} />)
  })

  it('should display "Copy" text on button', () => {
    expect(screen.getByText(/copy/i)).toBeDefined()
  })

  it('should display "Copied!" text on button after click', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => null
      }
    })

    const button = screen.getByRole('button', { name: /copy/i })
    await userEvent.click(button)
    expect(screen.getByText(/copied!/i)).toBeDefined()
  })
})
