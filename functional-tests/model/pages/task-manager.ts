import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base'

export class TaskManagerPage extends BasePage {
  readonly taskList: Locator
  readonly userBadge: Locator
  readonly logoutButton: Locator
  readonly taskInput: Locator
  readonly prioritySelect: Locator
  readonly addTaskButton: Locator

  constructor(page: Page) {
    super(page)
    this.taskList = this.page.getByTestId('task-list')
    this.userBadge = this.page.getByTestId('user-badge')
    this.logoutButton = this.page.getByTestId('logout-button')
    this.taskInput = this.page.getByTestId('task-input')
    this.prioritySelect = this.page.getByTestId('priority-select')
    this.addTaskButton = this.page.getByTestId('add-task-button')
  }
}
