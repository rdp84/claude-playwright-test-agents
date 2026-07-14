export const USERS = {
  'alice@example.com': 'password123',
  'bob@example.com': 'hunter2',
}

export function validateLoginInput(email, password) {
  if (!email) return 'Email is required'
  if (!password) return 'Password is required'
  return null
}

export function authenticate(email, password) {
  if (USERS[email] !== password) return null
  return { email, name: email.split('@')[0] }
}
