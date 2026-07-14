import { describe, it, expect } from 'vitest'
import { validateLoginInput, authenticate } from './authUtils'

describe('validateLoginInput', () => {
    it('requires an email', () => {
        expect(validateLoginInput('', 'password123')).toBe('Email is required')
    })

    it('requires a password', () => {
        expect(validateLoginInput('alice@example.com', '')).toBe('Password is required')
    })

    it('checks email before password when both are missing', () => {
        expect(validateLoginInput('', '')).toBe('Email is required')
    })

    it('passes when both fields are present', () => {
        expect(validateLoginInput('alice@example.com', 'password123')).toBeNull()
    })
})

describe('authenticate', () => {
    it('authenticates alice with the correct password', () => {
        expect(authenticate('alice@example.com', 'password123')).toEqual({
            email: 'alice@example.com',
            name: 'alice',
        })
    })

    it('authenticates bob with the correct password', () => {
        expect(authenticate('bob@example.com', 'hunter2')).toEqual({
            email: 'bob@example.com',
            name: 'bob',
        })
    })

    it('rejects a wrong password', () => {
        expect(authenticate('alice@example.com', 'wrong')).toBeNull()
    })

    it('rejects an unknown email', () => {
        expect(authenticate('carol@example.com', 'anything')).toBeNull()
    })
})
