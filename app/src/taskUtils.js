export function filterTasks(tasks, filter) {
    if (filter === 'active') return tasks.filter(t => !t.completed)
    if (filter === 'completed') return tasks.filter(t => t.completed)
    return tasks
}

export function computeStats(tasks) {
    return {
        total: tasks.length,
        active: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length,
    }
}

export function validateTaskTitle(title) {
    return title.trim() ? null : 'Task title cannot be empty'
}
