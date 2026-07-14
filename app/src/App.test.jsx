import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
    it('renders the login page first', () => {
        render(<App />)
        expect(screen.getByTestId('login-button')).toBeInTheDocument()
        expect(screen.queryByTestId('user-badge')).not.toBeInTheDocument()
    })

    it('shows the tasks page after a successful login', async () => {
        const user = userEvent.setup()
        render(<App />)

        await user.type(screen.getByTestId('email-input'), 'alice@example.com')
        await user.type(screen.getByTestId('password-input'), 'password123')
        await user.click(screen.getByTestId('login-button'))

        expect(screen.getByTestId('user-badge')).toHaveTextContent('alice')
        expect(screen.queryByTestId('login-button')).not.toBeInTheDocument()
    })

    it('returns to the login page after logout', async () => {
        const user = userEvent.setup()
        render(<App />)

        await user.type(screen.getByTestId('email-input'), 'alice@example.com')
        await user.type(screen.getByTestId('password-input'), 'password123')
        await user.click(screen.getByTestId('login-button'))
        await user.click(screen.getByTestId('logout-button'))

        expect(screen.getByTestId('login-button')).toBeInTheDocument()
    })
})
