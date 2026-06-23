import { useState } from 'react'

const USERS = {
  'alice@example.com': 'password123',
  'bob@example.com': 'hunter2',
}

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email) { setError('Email is required'); return }
    if (!password) { setError('Password is required'); return }

    if (USERS[email] === password) {
      onLogin({ email, name: email.split('@')[0] })
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Task Manager</h1>
        <p>Sign in to manage your tasks</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="alice@example.com"
              autoComplete="email"
              data-testid="email-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              data-testid="password-input"
            />
            {error && <p className="error-msg" role="alert" data-testid="login-error">{error}</p>}
          </div>

          <button type="submit" className="btn btn-primary" data-testid="login-button">
            Sign in
          </button>
        </form>

        <p className="hint">Demo: alice@example.com / password123</p>
      </div>
    </div>
  )
}
