import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TasksPage from './TasksPage'

const user = { email: 'alice@example.com', name: 'alice' }

function setup() {
    const onLogout = vi.fn()
    render(<TasksPage user={user} onLogout={onLogout} />)
    return { onLogout, userEvt: userEvent.setup() }
}

function statNumber(name) {
    return screen.getByTestId(`stat-${name}`).querySelector('.stat-number').textContent
}

function taskContainer(title) {
    return screen.getByText(title).closest('[data-testid^="task-item-"]')
}

describe('TasksPage', () => {
    it('renders the seeded tasks and stat counts on mount', () => {
        setup()
        expect(screen.getByText('Set up Playwright')).toBeInTheDocument()
        expect(screen.getByText('Write end-to-end tests')).toBeInTheDocument()
        expect(screen.getByText('Review test coverage')).toBeInTheDocument()
        expect(statNumber('total')).toBe('3')
        expect(statNumber('active')).toBe('2')
        expect(statNumber('completed')).toBe('1')
    })

    it('adds a task and updates the stats', async () => {
        const { userEvt } = setup()
        await userEvt.type(screen.getByTestId('task-input'), 'Buy milk')
        await userEvt.click(screen.getByTestId('add-task-button'))

        expect(screen.getByText('Buy milk')).toBeInTheDocument()
        expect(statNumber('total')).toBe('4')
        expect(statNumber('active')).toBe('3')
    })

    it('shows an inline error and adds nothing when the title is empty', async () => {
        const { userEvt } = setup()
        await userEvt.click(screen.getByTestId('add-task-button'))

        expect(screen.getByTestId('task-input-error')).toHaveTextContent('Task title cannot be empty')
        expect(statNumber('total')).toBe('3')
    })

    it('toggles a task and updates the stats', async () => {
        const { userEvt } = setup()
        const checkbox = within(taskContainer('Set up Playwright')).getByRole('button', { name: 'Mark complete' })
        await userEvt.click(checkbox)

        expect(checkbox).toHaveAttribute('aria-pressed', 'true')
        expect(statNumber('active')).toBe('1')
        expect(statNumber('completed')).toBe('2')
    })

    it('deletes a task', async () => {
        const { userEvt } = setup()
        const deleteButton = within(taskContainer('Review test coverage')).getByRole('button', { name: /delete/i })
        await userEvt.click(deleteButton)

        expect(screen.queryByText('Review test coverage')).not.toBeInTheDocument()
        expect(statNumber('total')).toBe('2')
    })

    it('filters to only active tasks', async () => {
        const { userEvt } = setup()
        await userEvt.click(screen.getByTestId('filter-active'))

        expect(screen.getByText('Set up Playwright')).toBeInTheDocument()
        expect(screen.getByText('Write end-to-end tests')).toBeInTheDocument()
        expect(screen.queryByText('Review test coverage')).not.toBeInTheDocument()
    })

    it('filters to only completed tasks', async () => {
        const { userEvt } = setup()
        await userEvt.click(screen.getByTestId('filter-completed'))

        expect(screen.getByText('Review test coverage')).toBeInTheDocument()
        expect(screen.queryByText('Set up Playwright')).not.toBeInTheDocument()
        expect(screen.queryByText('Write end-to-end tests')).not.toBeInTheDocument()
    })

    it('clears completed tasks and hides the button when none remain', async () => {
        const { userEvt } = setup()
        await userEvt.click(screen.getByTestId('clear-completed'))

        expect(screen.queryByText('Review test coverage')).not.toBeInTheDocument()
        expect(statNumber('total')).toBe('2')
        expect(screen.queryByTestId('clear-completed')).not.toBeInTheDocument()
    })

    it('calls onLogout when the logout button is clicked', async () => {
        const { userEvt, onLogout } = setup()
        await userEvt.click(screen.getByTestId('logout-button'))

        expect(onLogout).toHaveBeenCalled()
    })
})
