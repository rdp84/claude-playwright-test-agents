import { test as base } from '@playwright/test'
import { loginPage } from '@fixtures/login'
import { taskManagerPage } from '@fixtures/task-manager'
import type { LoginPage } from '@model/pages/login'
import type { TaskManagerPage } from '@model/pages/task-manager'

type Fixtures = {
  loginPage: LoginPage
  taskManagerPage: TaskManagerPage
}

export const test = base.extend<Fixtures>({
  loginPage,
  taskManagerPage,
})

export { expect } from '@playwright/test'
