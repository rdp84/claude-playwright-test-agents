# Task Management Test Plan

## Application Overview

A React-based task management application accessible after logging in with alice@example.com / password123. The Tasks page displays a stats bar (Total, Active, Completed counts), an Add Task form (text input + priority dropdown + Add button), filter buttons (All / Active / Completed), an optional Clear Completed button, and a scrollable task list. The app ships with three pre-seeded tasks on every fresh page load: "Set up Playwright" (high, incomplete), "Write end-to-end tests" (medium, incomplete), and "Review test coverage" (low, completed). Each task row contains a toggle checkbox, title, priority badge, creation date, and a Delete button. All interactive elements carry data-testid attributes used by the test model.

## Test Scenarios

### 1. Adding Tasks

**Seed:** `functional-tests/tests/seed.spec.ts`

#### 1.1. Add a task with a valid title and default (medium) priority

**File:** `functional-tests/tests/adding-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in with email 'alice@example.com' and password 'password123'
    - expect: The task list is visible via data-testid 'task-list'
  2. Click the task title input (data-testid 'task-input') and type 'Buy groceries'
    - expect: The input field shows the text 'Buy groceries'
  3. Leave the priority select (data-testid 'priority-select') at its default value 'medium'
    - expect: The priority select still shows 'Medium'
  4. Click the 'Add' button (data-testid 'add-task-button')
    - expect: A new task item appears in the task list with the title 'Buy groceries'
    - expect: The new task has a priority badge showing 'medium'
    - expect: The task title input is cleared back to empty
    - expect: The Total stat (data-testid 'stat-total') increments by one (from 3 to 4)
    - expect: The Active stat (data-testid 'stat-active') increments by one (from 2 to 3)

#### 1.2. Add a task with high priority

**File:** `functional-tests/tests/adding-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in with email 'alice@example.com' and password 'password123'
    - expect: The task list is visible
  2. Click the task input (data-testid 'task-input') and type 'Fix critical bug'
    - expect: The input shows 'Fix critical bug'
  3. Open the priority select (data-testid 'priority-select') and choose 'high'
    - expect: The select now shows 'High'
  4. Click the 'Add' button (data-testid 'add-task-button')
    - expect: A new task appears in the list with title 'Fix critical bug'
    - expect: The task's priority badge (data-testid 'task-priority-{id}') shows 'high'
    - expect: The task item has data-priority attribute equal to 'high'

#### 1.3. Add a task with low priority

**File:** `functional-tests/tests/adding-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The task list is visible
  2. Type 'Read a book' in the task input (data-testid 'task-input')
    - expect: Input shows 'Read a book'
  3. Select 'low' from the priority select (data-testid 'priority-select')
    - expect: The select shows 'Low'
  4. Click the 'Add' button (data-testid 'add-task-button')
    - expect: The new task appears with the title 'Read a book'
    - expect: The priority badge shows 'low'
    - expect: The task item has data-priority attribute equal to 'low'

#### 1.4. Attempt to add a task with an empty title

**File:** `functional-tests/tests/adding-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The task list is visible
  2. Leave the task input (data-testid 'task-input') empty and click the 'Add' button (data-testid 'add-task-button')
    - expect: No new task is added to the task list
    - expect: An error message 'Task title cannot be empty' appears (data-testid 'task-input-error')
    - expect: The error element has role 'alert'
    - expect: The Total stat count remains unchanged

#### 1.5. Attempt to add a task with a whitespace-only title

**File:** `functional-tests/tests/adding-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The task list is visible
  2. Type '   ' (three spaces) into the task input (data-testid 'task-input')
    - expect: The input shows whitespace characters
  3. Click the 'Add' button (data-testid 'add-task-button')
    - expect: No new task is added
    - expect: The error message 'Task title cannot be empty' appears (data-testid 'task-input-error')
    - expect: The task count stats remain unchanged

#### 1.6. Error message clears when the user starts typing after a failed submission

**File:** `functional-tests/tests/adding-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The task list is visible
  2. Click the 'Add' button without entering a title to trigger the validation error
    - expect: Error message 'Task title cannot be empty' is visible (data-testid 'task-input-error')
  3. Type a single character 'A' into the task input (data-testid 'task-input')
    - expect: The error message (data-testid 'task-input-error') is no longer visible
    - expect: The input shows the character 'A'

#### 1.7. Submit the add-task form by pressing Enter

**File:** `functional-tests/tests/adding-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The task list is visible
  2. Click the task input (data-testid 'task-input') and type 'Deploy to production'
    - expect: The input shows 'Deploy to production'
  3. Press the Enter key while the input is focused
    - expect: The task 'Deploy to production' is added to the task list
    - expect: The input is cleared
    - expect: The Total stat increments by one

### 2. Toggling Tasks Complete / Incomplete

**Seed:** `functional-tests/tests/seed.spec.ts`

#### 2.1. Toggle an active task to completed

**File:** `functional-tests/tests/toggling-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The task list shows the three seeded tasks; task 1 ('Set up Playwright') is incomplete
  2. Click the checkbox button for task 1 (data-testid 'task-checkbox-1')
    - expect: Task 1's checkbox now has aria-pressed='true'
    - expect: Task 1's checkbox button shows the '✓' checkmark
    - expect: The task item (data-testid 'task-item-1') gains the 'completed' CSS class
    - expect: The Active stat (data-testid 'stat-active') decreases by one (from 2 to 1)
    - expect: The Completed stat (data-testid 'stat-completed') increases by one (from 1 to 2)
    - expect: The Total stat remains unchanged

#### 2.2. Toggle a completed task back to active

**File:** `functional-tests/tests/toggling-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Task 3 ('Review test coverage') is already completed; its checkbox shows aria-pressed='true'
  2. Click the checkbox button for task 3 (data-testid 'task-checkbox-3')
    - expect: Task 3's checkbox now has aria-pressed='false'
    - expect: The '✓' checkmark is no longer visible on the checkbox
    - expect: The task item (data-testid 'task-item-3') no longer has the 'completed' CSS class
    - expect: The Active stat increases by one (from 2 to 3)
    - expect: The Completed stat decreases by one (from 1 to 0)

#### 2.3. Toggle the same task complete and then incomplete in sequence

**File:** `functional-tests/tests/toggling-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Task 2 is incomplete
  2. Click the checkbox for task 2 (data-testid 'task-checkbox-2') to mark it complete
    - expect: Task 2 is now marked completed (aria-pressed='true', has 'completed' class)
    - expect: Completed stat is 2, Active stat is 1
  3. Click the checkbox for task 2 again (data-testid 'task-checkbox-2') to mark it incomplete
    - expect: Task 2 is now incomplete again (aria-pressed='false', no 'completed' class)
    - expect: Completed stat is back to 1, Active stat is back to 2

### 3. Deleting Tasks

**Seed:** `functional-tests/tests/seed.spec.ts`

#### 3.1. Delete an active task

**File:** `functional-tests/tests/deleting-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Three seeded tasks are visible in the list
  2. Click the Delete button for task 1 (data-testid 'task-delete-1')
    - expect: Task 1 (data-testid 'task-item-1') is no longer present in the DOM
    - expect: The task list now shows only 2 tasks
    - expect: The Total stat (data-testid 'stat-total') decreases from 3 to 2
    - expect: The Active stat decreases from 2 to 1

#### 3.2. Delete a completed task

**File:** `functional-tests/tests/deleting-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Task 3 ('Review test coverage') is visible and completed
  2. Click the Delete button for task 3 (data-testid 'task-delete-3')
    - expect: Task 3 (data-testid 'task-item-3') is removed from the list
    - expect: The Total stat decreases from 3 to 2
    - expect: The Completed stat decreases from 1 to 0
    - expect: The 'Clear completed' button (data-testid 'clear-completed') disappears since there are no more completed tasks

#### 3.3. Delete all tasks to reach an empty state

**File:** `functional-tests/tests/deleting-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Three tasks are visible in the list
  2. Click the Delete button for task 1 (data-testid 'task-delete-1')
    - expect: Task 1 is removed; 2 tasks remain
  3. Click the Delete button for task 2 (data-testid 'task-delete-2')
    - expect: Task 2 is removed; 1 task remains
  4. Click the Delete button for task 3 (data-testid 'task-delete-3')
    - expect: Task 3 is removed
    - expect: The empty-state element (data-testid 'empty-state') appears with the text 'No tasks — add one above'
    - expect: All stats show 0: Total=0, Active=0, Completed=0

### 4. Filtering Tasks

**Seed:** `functional-tests/tests/seed.spec.ts`

#### 4.1. Default filter shows all tasks

**File:** `functional-tests/tests/filtering-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The 'All' filter button (data-testid 'filter-all') has the active CSS class
    - expect: All three seeded task items are visible in the task list
    - expect: The 'All' button label shows 'All (3)'

#### 4.2. Active filter shows only incomplete tasks

**File:** `functional-tests/tests/filtering-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Three tasks are visible under the 'All' filter
  2. Click the 'Active' filter button (data-testid 'filter-active')
    - expect: The 'Active' filter button gains the active CSS class
    - expect: The 'All' filter button loses the active CSS class
    - expect: Only task 1 ('Set up Playwright') and task 2 ('Write end-to-end tests') are visible
    - expect: Task 3 ('Review test coverage', which is completed) is not rendered
    - expect: The 'Active' button label shows 'Active (2)'

#### 4.3. Completed filter shows only completed tasks

**File:** `functional-tests/tests/filtering-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Three tasks are visible under the 'All' filter
  2. Click the 'Completed' filter button (data-testid 'filter-completed')
    - expect: The 'Completed' filter button gains the active CSS class
    - expect: Only task 3 ('Review test coverage') is visible
    - expect: Tasks 1 and 2 are not rendered
    - expect: The 'Completed' button label shows 'Completed (1)'

#### 4.4. Switching from Active back to All shows all tasks again

**File:** `functional-tests/tests/filtering-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Three tasks are visible
  2. Click the 'Active' filter button (data-testid 'filter-active')
    - expect: Only 2 incomplete tasks are visible
  3. Click the 'All' filter button (data-testid 'filter-all')
    - expect: All three tasks are visible again
    - expect: The 'All' filter button has the active CSS class

#### 4.5. Completed filter with no completed tasks shows empty state

**File:** `functional-tests/tests/filtering-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Task 3 is the only completed task
  2. Click Delete on task 3 (data-testid 'task-delete-3') to remove the only completed task
    - expect: Task 3 is removed; Completed stat is 0
  3. Click the 'Completed' filter button (data-testid 'filter-completed')
    - expect: The empty-state element (data-testid 'empty-state') is visible
    - expect: The empty-state text reads 'No completed tasks yet'

#### 4.6. Active filter with no active tasks shows empty state

**File:** `functional-tests/tests/filtering-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Tasks 1 and 2 are active
  2. Click the checkbox for task 1 (data-testid 'task-checkbox-1') to complete it
    - expect: Task 1 is now completed
  3. Click the checkbox for task 2 (data-testid 'task-checkbox-2') to complete it
    - expect: Task 2 is now completed; Active stat is 0
  4. Click the 'Active' filter button (data-testid 'filter-active')
    - expect: The empty-state element (data-testid 'empty-state') is visible
    - expect: The empty-state text reads 'No tasks — add one above'

#### 4.7. Filter state updates dynamically when a task is toggled

**File:** `functional-tests/tests/filtering-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in, then click the 'Active' filter button (data-testid 'filter-active')
    - expect: Only tasks 1 and 2 are visible
  2. Click the checkbox for task 1 (data-testid 'task-checkbox-1') to mark it complete while the Active filter is active
    - expect: Task 1 immediately disappears from the filtered list
    - expect: Only task 2 remains visible
    - expect: The 'Active' button label updates to 'Active (1)'

#### 4.8. A newly added task appears in the All and Active filters but not in Completed

**File:** `functional-tests/tests/filtering-tasks.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Three tasks are visible
  2. Type 'New filter test task' in the task input and click 'Add'
    - expect: A new task 'New filter test task' appears in the list; Total is now 4
  3. Click the 'Active' filter button (data-testid 'filter-active')
    - expect: The new task 'New filter test task' is visible in the Active filter list
  4. Click the 'Completed' filter button (data-testid 'filter-completed')
    - expect: The new task 'New filter test task' is NOT visible in the Completed filter list
    - expect: Only the pre-existing completed task (task 3) is shown

### 5. Clearing Completed Tasks

**Seed:** `functional-tests/tests/seed.spec.ts`

#### 5.1. Clear completed button is visible only when completed tasks exist

**File:** `functional-tests/tests/clear-completed.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The 'Clear completed' button (data-testid 'clear-completed') is visible because task 3 is already completed
    - expect: The Completed stat shows 1
  2. Click the checkbox for task 3 (data-testid 'task-checkbox-3') to mark it incomplete
    - expect: The Completed stat drops to 0
    - expect: The 'Clear completed' button (data-testid 'clear-completed') is no longer in the DOM

#### 5.2. Clear completed removes all completed tasks at once

**File:** `functional-tests/tests/clear-completed.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Task 3 is completed; Completed stat is 1
  2. Mark task 1 as completed by clicking its checkbox (data-testid 'task-checkbox-1')
    - expect: Completed stat is now 2; 'Clear completed' button is visible
  3. Click the 'Clear completed' button (data-testid 'clear-completed')
    - expect: Both task 1 and task 3 are removed from the task list
    - expect: Only task 2 ('Write end-to-end tests') remains
    - expect: The Total stat decreases to 1
    - expect: The Active stat is 1
    - expect: The Completed stat is 0
    - expect: The 'Clear completed' button disappears from the DOM

#### 5.3. Clear completed leaves active tasks untouched

**File:** `functional-tests/tests/clear-completed.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Tasks 1 and 2 are active; task 3 is completed
  2. Click the 'Clear completed' button (data-testid 'clear-completed')
    - expect: Task 3 is removed
    - expect: Task 1 ('Set up Playwright') and task 2 ('Write end-to-end tests') remain in the list
    - expect: Their completed status is unchanged (both still active)

#### 5.4. Clear completed works correctly when the Completed filter is active

**File:** `functional-tests/tests/clear-completed.spec.ts`

**Steps:**
  1. Navigate to '/' and log in, then click the 'Completed' filter button (data-testid 'filter-completed')
    - expect: Only task 3 is visible under the Completed filter
  2. Click the 'Clear completed' button (data-testid 'clear-completed')
    - expect: Task 3 is removed
    - expect: The empty-state element (data-testid 'empty-state') appears with 'No completed tasks yet'
    - expect: The 'Clear completed' button disappears

### 6. Task Statistics

**Seed:** `functional-tests/tests/seed.spec.ts`

#### 6.1. Initial stats reflect the seeded data correctly

**File:** `functional-tests/tests/task-statistics.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The Total stat (data-testid 'stat-total') shows 3
    - expect: The Active stat (data-testid 'stat-active') shows 2
    - expect: The Completed stat (data-testid 'stat-completed') shows 1

#### 6.2. Stats update immediately when a task is added

**File:** `functional-tests/tests/task-statistics.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Total=3, Active=2, Completed=1
  2. Add a new task titled 'Stats test task' using the form
    - expect: The Total stat updates to 4
    - expect: The Active stat updates to 3
    - expect: The Completed stat remains 1

#### 6.3. Stats update immediately when a task is toggled to completed

**File:** `functional-tests/tests/task-statistics.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Total=3, Active=2, Completed=1
  2. Click the checkbox for task 2 (data-testid 'task-checkbox-2')
    - expect: The Active stat updates to 1
    - expect: The Completed stat updates to 2
    - expect: The Total stat remains 3

#### 6.4. Stats update immediately when a task is deleted

**File:** `functional-tests/tests/task-statistics.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Total=3, Active=2, Completed=1
  2. Delete task 3 by clicking its Delete button (data-testid 'task-delete-3')
    - expect: The Total stat updates to 2
    - expect: The Completed stat updates to 0
    - expect: The Active stat remains 2

#### 6.5. Filter buttons display correct counts matching the stats

**File:** `functional-tests/tests/task-statistics.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The 'All' filter button (data-testid 'filter-all') label reads 'All (3)'
    - expect: The 'Active' filter button (data-testid 'filter-active') label reads 'Active (2)'
    - expect: The 'Completed' filter button (data-testid 'filter-completed') label reads 'Completed (1)'

#### 6.6. Filter button counts update after toggling a task

**File:** `functional-tests/tests/task-statistics.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: All (3), Active (2), Completed (1)
  2. Click the checkbox for task 1 (data-testid 'task-checkbox-1') to complete it
    - expect: The 'All' button label still reads 'All (3)'
    - expect: The 'Active' button label updates to 'Active (1)'
    - expect: The 'Completed' button label updates to 'Completed (2)'

### 7. Empty State Display

**Seed:** `functional-tests/tests/seed.spec.ts`

#### 7.1. Empty state is not shown when tasks exist under the All filter

**File:** `functional-tests/tests/empty-state.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The task list contains three task items
    - expect: The empty-state element (data-testid 'empty-state') is not visible

#### 7.2. Empty state appears with the correct message when all tasks are deleted

**File:** `functional-tests/tests/empty-state.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: Three tasks are present
  2. Delete all three tasks one by one using their Delete buttons (data-testid 'task-delete-1', 'task-delete-2', 'task-delete-3')
    - expect: After all deletions the empty-state element (data-testid 'empty-state') is visible
    - expect: The empty-state text reads 'No tasks — add one above'

#### 7.3. Empty state under Completed filter reads 'No completed tasks yet'

**File:** `functional-tests/tests/empty-state.spec.ts`

**Steps:**
  1. Navigate to '/' and log in, then delete task 3 to remove the only completed task
    - expect: Completed stat is 0
  2. Click the 'Completed' filter button (data-testid 'filter-completed')
    - expect: The empty-state element (data-testid 'empty-state') is visible
    - expect: The empty-state text reads 'No completed tasks yet' (not 'No tasks — add one above')

#### 7.4. Empty state under Active filter reads 'No tasks — add one above'

**File:** `functional-tests/tests/empty-state.spec.ts`

**Steps:**
  1. Navigate to '/' and log in, then complete both active tasks (task 1 and task 2) using their checkboxes
    - expect: Active stat is 0
  2. Click the 'Active' filter button (data-testid 'filter-active')
    - expect: The empty-state element (data-testid 'empty-state') is visible
    - expect: The empty-state text reads 'No tasks — add one above'

#### 7.5. Empty state disappears immediately when a task is added

**File:** `functional-tests/tests/empty-state.spec.ts`

**Steps:**
  1. Navigate to '/' and log in, then delete all three seeded tasks
    - expect: Empty state shows 'No tasks — add one above'
  2. Type 'Recover from empty state' in the task input and click 'Add'
    - expect: The empty-state element (data-testid 'empty-state') disappears
    - expect: The new task 'Recover from empty state' appears in the task list

### 8. Input Validation

**Seed:** `functional-tests/tests/seed.spec.ts`

#### 8.1. No error is shown on initial page load before any submission attempt

**File:** `functional-tests/tests/input-validation.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The task input (data-testid 'task-input') is empty
    - expect: The error element (data-testid 'task-input-error') is not present in the DOM

#### 8.2. Submitting with an empty input shows the required error

**File:** `functional-tests/tests/input-validation.spec.ts`

**Steps:**
  1. Navigate to '/' and log in, ensuring the task input is empty
    - expect: The input is empty
  2. Click the 'Add' button (data-testid 'add-task-button')
    - expect: The error message 'Task title cannot be empty' appears (data-testid 'task-input-error')
    - expect: The error element has role='alert'
    - expect: The task list task count does not change

#### 8.3. Submitting with a whitespace-only title shows the required error

**File:** `functional-tests/tests/input-validation.spec.ts`

**Steps:**
  1. Navigate to '/' and log in, then type '   ' (spaces) into the task input (data-testid 'task-input')
    - expect: The input contains whitespace
  2. Click the 'Add' button (data-testid 'add-task-button')
    - expect: The error message 'Task title cannot be empty' appears (data-testid 'task-input-error')
    - expect: No task is added to the list

#### 8.4. Error clears automatically when the user begins typing a valid title

**File:** `functional-tests/tests/input-validation.spec.ts`

**Steps:**
  1. Navigate to '/' and log in, trigger the error by clicking 'Add' with an empty input
    - expect: Error message is visible
  2. Type any character into the task input (data-testid 'task-input')
    - expect: The error message (data-testid 'task-input-error') is no longer present in the DOM

#### 8.5. A valid title containing special characters is accepted

**File:** `functional-tests/tests/input-validation.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The task form is ready for input
  2. Type 'Fix bug #42 <urgent> & deploy!' into the task input and click 'Add'
    - expect: No error message appears
    - expect: A new task with the title 'Fix bug #42 <urgent> & deploy!' is added to the list
    - expect: The title is displayed exactly as entered

#### 8.6. A very long task title is accepted without truncation in the data

**File:** `functional-tests/tests/input-validation.spec.ts`

**Steps:**
  1. Navigate to '/' and log in
    - expect: The task form is ready
  2. Type a string of 200 characters into the task input and click 'Add'
    - expect: No error message appears
    - expect: The task is added to the list
    - expect: The title element (data-testid matching 'task-title-{id}') contains the full 200-character string
