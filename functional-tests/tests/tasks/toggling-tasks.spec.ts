import { test, expect } from '@fixtures/fixtures'

test.describe('Toggling Tasks Complete/Incomplete', () => {
  test('should toggle an active task to completed', async ({ taskManagerPage }) => {
    const checkbox = taskManagerPage.taskCheckbox('Set up Playwright')
    await checkbox.click()

    await expect(checkbox).toHaveAttribute('aria-pressed', 'true')
    await expect(taskManagerPage.activeCount).toHaveText('1')
    await expect(taskManagerPage.completedCount).toHaveText('2')
  })

  test('should toggle a completed task back to active', async ({ taskManagerPage }) => {
    const checkbox = taskManagerPage.taskCheckbox('Review test coverage')
    await checkbox.click()

    await expect(checkbox).toHaveAttribute('aria-pressed', 'false')
    await expect(taskManagerPage.activeCount).toHaveText('3')
    await expect(taskManagerPage.completedCount).toHaveText('0')
  })

  test('should toggle a task twice to return to original state', async ({ taskManagerPage }) => {
    const checkbox = taskManagerPage.taskCheckbox('Write end-to-end tests')
    await checkbox.click()
    await checkbox.click()

    await expect(checkbox).toHaveAttribute('aria-pressed', 'false')
    await expect(taskManagerPage.activeCount).toHaveText('2')
    await expect(taskManagerPage.completedCount).toHaveText('1')
  })
})
