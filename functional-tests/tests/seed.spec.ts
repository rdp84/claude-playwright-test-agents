import { test, expect } from '@fixtures/fixtures'

test('user can log in and reach the task manager', async ({ loginPage, taskManagerPage }) => {
  await loginPage.login('alice@example.com', 'password123')
  await expect(taskManagerPage.taskList).toBeVisible()
})
