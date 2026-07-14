import { describe, it, expect } from 'vitest'
import { filterTasks, computeStats, validateTaskTitle } from './taskUtils'

const tasks = [
    { id: 1, title: 'One', completed: false },
    { id: 2, title: 'Two', completed: true },
    { id: 3, title: 'Three', completed: true },
]

describe('filterTasks', () => {
    it('returns all tasks for the "all" filter', () => {
        expect(filterTasks(tasks, 'all')).toEqual(tasks)
    })

    it('returns only incomplete tasks for the "active" filter', () => {
        expect(filterTasks(tasks, 'active')).toEqual([tasks[0]])
    })

    it('returns only completed tasks for the "completed" filter', () => {
        expect(filterTasks(tasks, 'completed')).toEqual([tasks[1], tasks[2]])
    })

    it('returns an empty array when there are no tasks', () => {
        expect(filterTasks([], 'all')).toEqual([])
        expect(filterTasks([], 'active')).toEqual([])
        expect(filterTasks([], 'completed')).toEqual([])
    })
})

describe('computeStats', () => {
    it('counts total, active and completed tasks', () => {
        expect(computeStats(tasks)).toEqual({ total: 3, active: 1, completed: 2 })
    })

    it('returns zeroes for an empty list', () => {
        expect(computeStats([])).toEqual({ total: 0, active: 0, completed: 0 })
    })

    it('reports all tasks as active when none are completed', () => {
        const allActive = [{ id: 1, completed: false }, { id: 2, completed: false }]
        expect(computeStats(allActive)).toEqual({ total: 2, active: 2, completed: 0 })
    })
})

describe('validateTaskTitle', () => {
    it('rejects an empty title', () => {
        expect(validateTaskTitle('')).toBe('Task title cannot be empty')
    })

    it('rejects a whitespace-only title', () => {
        expect(validateTaskTitle('   ')).toBe('Task title cannot be empty')
    })

    it('accepts a non-empty title', () => {
        expect(validateTaskTitle('Buy milk')).toBeNull()
    })
})
