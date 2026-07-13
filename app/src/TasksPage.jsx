import { useState } from 'react'

const PRIORITIES = ['high', 'medium', 'low']
const FILTERS = ['all', 'active', 'completed']

let nextId = 4

const INITIAL_TASKS = [
  { id: 1, title: 'Set up Playwright', priority: 'high', completed: false, createdAt: new Date().toISOString() },
  { id: 2, title: 'Write end-to-end tests', priority: 'medium', completed: false, createdAt: new Date().toISOString() },
  { id: 3, title: 'Review test coverage', priority: 'low', completed: true, createdAt: new Date().toISOString() },
]

export default function TasksPage({ user, onLogout }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [newTitle, setNewTitle] = useState('')
  const [newPriority, setNewPriority] = useState('medium')
  const [filter, setFilter] = useState('all')
  const [inputError, setInputError] = useState('')

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  }

  function addTask(e) {
    e.preventDefault()
    if (!newTitle.trim()) {
      setInputError('Task title cannot be empty')
      return
    }
    setInputError('')
    setTasks(prev => [...prev, {
      id: nextId++,
      title: newTitle.trim(),
      priority: newPriority,
      completed: false,
      createdAt: new Date().toISOString(),
    }])
    setNewTitle('')
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function clearCompleted() {
    setTasks(prev => prev.filter(t => !t.completed))
  }

  return (
    <div className="app-layout">
      <header className="app-header">
        <span className="logo">Task Manager</span>
        <div className="header-right">
          <span className="user-badge" data-testid="user-badge">{user.name}</span>
          <button className="btn btn-ghost btn-sm" onClick={onLogout} data-testid="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="app-main">
        {/* Stats */}
        <div className="stats">
          <div className="stat" data-testid="stat-total">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat" data-testid="stat-active">
            <div className="stat-number">{stats.active}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat" data-testid="stat-completed">
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        {/* Add task */}
        <div className="task-form-card">
          <h2>Add Task</h2>
          <form onSubmit={addTask}>
            <div className="task-input-row">
              <input
                type="text"
                value={newTitle}
                onChange={e => { setNewTitle(e.target.value); setInputError('') }}
                placeholder="What needs to be done?"
                data-testid="task-input"
              />
              <select
                className="task-priority"
                value={newPriority}
                onChange={e => setNewPriority(e.target.value)}
                data-testid="priority-select"
              >
                {PRIORITIES.map(p => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
              <button type="submit" className="btn btn-add" data-testid="add-task-button">
                Add
              </button>
            </div>
            {inputError && <p className="error-msg" role="alert" data-testid="task-input-error">{inputError}</p>}
          </form>
        </div>

        {/* Filters */}
        <div className="filters" role="group" aria-label="Filter tasks">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
              data-testid={`filter-${f}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'all' ? ` (${stats.total})` : f === 'active' ? ` (${stats.active})` : ` (${stats.completed})`}
            </button>
          ))}
          {stats.completed > 0 && (
            <button className="btn btn-ghost btn-sm" onClick={clearCompleted} data-testid="clear-completed">
              Clear completed
            </button>
          )}
        </div>

        {/* Task list */}
        <div className="task-list" data-testid="task-list">
          {filtered.length === 0 ? (
            <div className="empty-state" data-testid="empty-state">
              {filter === 'completed' ? 'No completed tasks yet' : 'No tasks — add one above'}
            </div>
          ) : (
            filtered.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div
      className={`task-item${task.completed ? ' completed' : ''}`}
      data-testid={`task-item-${task.id}`}
      data-priority={task.priority}
      data-completed={task.completed}
    >
      <button
        className={`task-checkbox${task.completed ? ' checked' : ''}`}
        onClick={onToggle}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        aria-pressed={task.completed}
        data-testid={`task-ckbx-${task.id}`}
      >
        {task.completed && '✓'}
      </button>

      <div className="task-body">
        <div className="task-title" data-testid={`task-title-${task.id}`}>{task.title}</div>
        <div className="task-meta">
          <span className={`priority-badge priority-${task.priority}`} data-testid={`task-priority-${task.id}`}>
            {task.priority}
          </span>
          <span className="task-date" data-testid={`task-date-${task.id}`}>
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn btn-danger btn-sm"
          onClick={onDelete}
          aria-label={`Delete ${task.title}`}
          data-testid={`task-delete-${task.id}`}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
