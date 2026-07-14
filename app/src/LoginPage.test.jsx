import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from './LoginPage'

function setup() {
    const onLogin = vi.fn()
    render(<LoginPage onLogin={onLogin} />)
    return {
        onLogin,
        user: userEvent.setup(),
        emailInput: screen.getByTestId('email-input'),
        passwordInput: screen.getByTestId('password-input'),
        loginButton: screen.getByTestId('login-button'),
    }
}

describe('LoginPage', () => {
    it('renders the login form', () => {
        setup()
        expect(screen.getByTestId('email-input')).toBeInTheDocument()
        expect(screen.getByTestId('password-input')).toBeInTheDocument()
        expect(screen.getByTestId('login-button')).toBeInTheDocument()
    })

    it('shows an error when submitted with no email', async () => {
        const { user, loginButton } = setup()
        await user.click(loginButton)
        expect(screen.getByTestId('login-error')).toHaveTextContent('Email is required')
    })

    it('shows an error when submitted with no password', async () => {
        const { user, emailInput, loginButton } = setup()
        await user.type(emailInput, 'alice@example.com')
        await user.click(loginButton)
        expect(screen.getByTestId('login-error')).toHaveTextContent('Password is required')
    })

    it('shows an error for wrong credentials', async () => {
        const { user, emailInput, passwordInput, loginButton } = setup()
        await user.type(emailInput, 'alice@example.com')
        await user.type(passwordInput, 'wrong-password')
        await user.click(loginButton)
        expect(screen.getByTestId('login-error')).toHaveTextContent('Invalid email or password')
    })

    it('calls onLogin with the derived user on valid credentials', async () => {
        const { user, emailInput, passwordInput, loginButton, onLogin } = setup()
        await user.type(emailInput, 'alice@example.com')
        await user.type(passwordInput, 'password123')
        await user.click(loginButton)
        expect(onLogin).toHaveBeenCalledWith({ email: 'alice@example.com', name: 'alice' })
    })

    it('clears the previous error on resubmission', async () => {
        const { user, emailInput, passwordInput, loginButton } = setup()
        await user.click(loginButton)
        expect(screen.getByTestId('login-error')).toHaveTextContent('Email is required')

        await user.type(emailInput, 'alice@example.com')
        await user.type(passwordInput, 'password123')
        await user.click(loginButton)
        expect(screen.queryByTestId('login-error')).not.toBeInTheDocument()
    })
})
