import type { TestFixture, Page } from '@playwright/test'
import { TaskManagerPage } from '@model/pages/task-manager'

export const taskManagerPage: TestFixture<TaskManagerPage, { page: Page }> = async (
  { page },
  use,
) => {
  await use(new TaskManagerPage(page))
}
