import { useState } from 'react'
import LoginPage from './LoginPage'
import TasksPage from './TasksPage'
import './index.css'

export default function App() {
  const [user, setUser] = useState(null)

  if (!user) {
    return <LoginPage onLogin={setUser} />
  }

  return <TasksPage user={user} onLogout={() => setUser(null)} />
}
