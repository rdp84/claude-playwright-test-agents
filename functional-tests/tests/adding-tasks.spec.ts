import { test, expect } from '@fixtures/fixtures'

test.describe('Adding Tasks', () => {
  test('should add a task successfully', async ({ taskManagerPage }) => {
    await taskManagerPage.addTask('Buy groceries')
    await expect(taskManagerPage.taskItem('Buy groceries')).toBeVisible()
    await expect(taskManagerPage.taskInput).toHaveValue('')
    await expect(taskManagerPage.totalCount).toHaveText('4')
    await expect(taskManagerPage.activeCount).toHaveText('3')
    await expect(taskManagerPage.taskPriority('Buy groceries')).toHaveText('medium')
    await expect(taskManagerPage.taskDate('Buy groceries')).toHaveText(new Date().toLocaleDateString('en-US'))
  })

  test('should show error for empty title', async ({ taskManagerPage }) => {
    await taskManagerPage.addTaskButton.click()
    await expect(taskManagerPage.inputError).toBeVisible()
    await expect(taskManagerPage.inputError).toHaveText('Task title cannot be empty')
    await expect(taskManagerPage.totalCount).toHaveText('3')
  })

  test('should show error for whitespace-only title', async ({ taskManagerPage }) => {
    await taskManagerPage.addTask('   ')
    await expect(taskManagerPage.inputError).toBeVisible()
    await expect(taskManagerPage.inputError).toHaveText('Task title cannot be empty')
    await expect(taskManagerPage.totalCount).toHaveText('3')
  })

  test('should clear error when user starts typing', async ({ taskManagerPage }) => {
    await taskManagerPage.addTaskButton.click()
    await expect(taskManagerPage.inputError).toBeVisible()
    await taskManagerPage.taskInput.fill('Something')
    await expect(taskManagerPage.inputError).not.toBeVisible()
  })

  test('should add a task using the Enter key', async ({ taskManagerPage }) => {
    await taskManagerPage.taskInput.fill('Walk the dog')
    await taskManagerPage.taskInput.press('Enter')
    await expect(taskManagerPage.taskItem('Walk the dog')).toBeVisible()
    await expect(taskManagerPage.totalCount).toHaveText('4')
  })
})
