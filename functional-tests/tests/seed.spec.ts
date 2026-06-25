import { test, expect } from '@fixtures/fixtures'

test('user can log in and reach the task manager', async ({ taskManagerPage }) => {
  await expect(taskManagerPage.taskList).toBeVisible()
})
