import type { TestFixture, Page } from '@playwright/test'
import type { LoginPage } from '@model/pages/login'
import { TaskManagerPage } from '@model/pages/task-manager'

export const taskManagerPage: TestFixture<TaskManagerPage, { loginPage: LoginPage; page: Page }> = async (
  { loginPage, page },
  use,
) => {
  await loginPage.login('alice@example.com', 'password123')
  const taskManagerPage = new TaskManagerPage(page)
  await taskManagerPage.taskList.waitFor()
  await use(taskManagerPage)
}
