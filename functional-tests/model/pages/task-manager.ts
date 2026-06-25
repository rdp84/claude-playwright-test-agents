import type { Locator, Page } from '@playwright/test'
import { BasePage } from './base'

export class TaskManagerPage extends BasePage {
  readonly taskList: Locator
  readonly userBadge: Locator
  readonly logoutButton: Locator
  readonly taskInput: Locator
  readonly prioritySelect: Locator
  readonly addTaskButton: Locator
  readonly inputError: Locator
  readonly emptyState: Locator

  // Stat count numbers
  readonly totalCount: Locator
  readonly activeCount: Locator
  readonly completedCount: Locator

  // Filter buttons
  readonly filterAll: Locator
  readonly filterActive: Locator
  readonly filterCompleted: Locator
  readonly clearCompletedButton: Locator

  constructor(page: Page) {
    super(page)
    this.taskList = this.page.getByTestId('task-list')
    this.userBadge = this.page.getByTestId('user-badge')
    this.logoutButton = this.page.getByTestId('logout-button')
    this.taskInput = this.page.getByTestId('task-input')
    this.prioritySelect = this.page.getByTestId('priority-select')
    this.addTaskButton = this.page.getByTestId('add-task-button')
    this.inputError = this.page.getByTestId('task-input-error')
    this.emptyState = this.page.getByTestId('empty-state')

    this.totalCount = this.page.getByTestId('stat-total').locator('.stat-number')
    this.activeCount = this.page.getByTestId('stat-active').locator('.stat-number')
    this.completedCount = this.page.getByTestId('stat-completed').locator('.stat-number')

    this.filterAll = this.page.getByTestId('filter-all')
    this.filterActive = this.page.getByTestId('filter-active')
    this.filterCompleted = this.page.getByTestId('filter-completed')
    this.clearCompletedButton = this.page.getByTestId('clear-completed')
  }

  // Task item accessors — by title so tests remain readable regardless of internal ID
  taskItem(title: string): Locator {
    return this.page.locator('[data-testid^="task-item-"]').filter({ hasText: title })
  }

  taskCheckbox(title: string): Locator {
    return this.taskItem(title).locator('[data-testid^="task-checkbox-"]')
  }

  taskDeleteButton(title: string): Locator {
    return this.taskItem(title).locator('[data-testid^="task-delete-"]')
  }
}
