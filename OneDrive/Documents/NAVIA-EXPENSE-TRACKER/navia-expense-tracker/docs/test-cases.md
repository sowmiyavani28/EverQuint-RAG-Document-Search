# NAVIA Expense Tracker - Test Cases

## 1. Document Information

**Application:** NAVIA Expense Tracker  
**Document:** Functional, Negative and Edge-Case Test Cases  
**Version:** 1.0  
**Testing Type:** Manual Functional Testing  
**Application Type:** React + Vite Web Application

---

## 2. Testing Objective

The objective of this document is to verify that the NAVIA Expense Tracker works according to the defined requirements and business rules.

The testing covers:

- User registration
- User login
- Authentication validation
- Dashboard
- Expense creation
- Expense editing
- Expense deletion
- Expense searching
- Category filtering
- Expense calculations
- Category summaries
- Monthly totals
- Form validation
- Empty states
- Invalid inputs
- Boundary and edge cases
- Logout functionality

---

## 3. Test Case Status Definitions

| Status | Meaning |
|---|---|
| Pass | Expected behavior was observed |
| Fail | Actual behavior differs from expected behavior |
| Blocked | Test could not be executed because of another issue |
| Not Run | Test has not yet been executed |

---

# 4. User Management Test Cases

## TC-001 - Register with valid details

**Type:** Functional

**Precondition:** User is on the registration page.

**Test Data:**

- Email: test@example.com
- Password: test123

**Steps:**

1. Open the registration page.
2. Enter a valid email address.
3. Enter a valid password.
4. Submit the registration form.

**Expected Result:**

- Registration should be successful.
- User should be able to proceed to the application.

**Status:** Pass

---

## TC-002 - Register with invalid email format

**Type:** Negative

**Precondition:** User is on the registration page.

**Test Data:**

- Email: testexample.com
- Password: test123

**Steps:**

1. Enter an invalid email address.
2. Enter a valid password.
3. Submit the form.

**Expected Result:**

- The application should reject the invalid email.
- An appropriate validation message should be displayed.
- Registration should not be completed.

**Status:** Pass

---

## TC-003 - Register with empty email

**Type:** Negative

**Steps:**

1. Open registration.
2. Leave the email field empty.
3. Enter a password.
4. Submit the form.

**Expected Result:**

- The form should not be submitted.
- Email validation should be triggered.

**Status:** Pass

---

## TC-004 - Register with empty password

**Type:** Negative

**Steps:**

1. Enter a valid email.
2. Leave the password field empty.
3. Submit the form.

**Expected Result:**

- Registration should not be completed.
- Password validation should be displayed.

**Status:** Pass

---

## TC-005 - Register with both fields empty

**Type:** Negative

**Steps:**

1. Leave email empty.
2. Leave password empty.
3. Submit the form.

**Expected Result:**

- Form submission should be prevented.
- Required-field validation should be displayed.

**Status:** Pass

---

# 5. Login Test Cases

## TC-006 - Login with valid credentials

**Type:** Functional

**Test Data:**

- Email: test@example.com
- Password: test123

**Steps:**

1. Open the login page.
2. Enter valid credentials.
3. Click Login.

**Expected Result:**

- User should be authenticated.
- Dashboard should be displayed.

**Status:** Pass

---

## TC-007 - Login with invalid password

**Type:** Negative

**Steps:**

1. Enter a registered email.
2. Enter an incorrect password.
3. Click Login.

**Expected Result:**

- Login should fail.
- User should remain on the login page.
- An appropriate error message should be displayed.

**Status:** Pass

---

## TC-008 - Login with unregistered email

**Type:** Negative

**Steps:**

1. Enter an unregistered email.
2. Enter a password.
3. Click Login.

**Expected Result:**

- Authentication should fail.
- User should not access the dashboard.

**Status:** Pass

---

## TC-009 - Login with empty fields

**Type:** Negative

**Steps:**

1. Leave email empty.
2. Leave password empty.
3. Click Login.

**Expected Result:**

- Login should not proceed.
- Validation messages should be displayed.

**Status:** Pass

---

# 6. Dashboard Test Cases

## TC-010 - Dashboard loads successfully

**Type:** Functional

**Precondition:** User is logged in.

**Steps:**

1. Login to the application.
2. Open the dashboard.

**Expected Result:**

Dashboard should display:

- Total expense
- Number of expenses
- Monthly total
- Category summary
- Recent expenses
- Expense section

**Status:** Pass

---

## TC-011 - Dashboard displays zero values for new user

**Type:** Edge Case

**Precondition:** User has no expenses.

**Steps:**

1. Login with a new account.
2. Open dashboard.

**Expected Result:**

- Total expense should show ₹0.00.
- Number of expenses should show 0.
- Monthly total should show ₹0.00.
- Category totals should show ₹0.00.
- Recent expenses should show an empty-state message.

**Status:** Pass

---

## TC-012 - Dashboard updates after adding expense

**Type:** Functional

**Steps:**

1. Add an expense.
2. Return to dashboard.

**Expected Result:**

- Total expense should increase.
- Number of expenses should increase.
- Monthly total should update.
- Relevant category total should update.

**Status:** Pass

---

# 7. Add Expense Test Cases

## TC-013 - Add expense with valid details

**Type:** Functional

**Test Data:**

- Description: Grocery shopping
- Amount: 500
- Category: Food
- Date: Current date

**Steps:**

1. Click Add Expense.
2. Enter description.
3. Enter amount.
4. Select category.
5. Select date.
6. Submit the form.

**Expected Result:**

- Expense should be created successfully.
- Expense should appear in the expense list.
- Dashboard totals should update.

**Status:** Pass

---

## TC-014 - Add expense with zero amount

**Type:** Negative

**Test Data:**

- Amount: 0

**Expected Result:**

- Application should reject zero amount if positive amount is required.
- Expense should not be created.

**Status:** Pass

---

## TC-015 - Add expense with negative amount

**Type:** Negative

**Test Data:**

- Amount: -100

**Expected Result:**

- Negative amount should not be accepted.
- Expense should not be created.

**Status:** Pass

---

## TC-016 - Add expense with empty description

**Type:** Negative

**Steps:**

1. Leave description empty.
2. Enter a valid amount.
3. Select a category.
4. Submit.

**Expected Result:**

- Form should reject the submission.
- Description validation should be displayed.

**Status:** Pass

---

## TC-017 - Add expense without selecting category

**Type:** Negative

**Steps:**

1. Enter description.
2. Enter valid amount.
3. Do not select category.
4. Submit.

**Expected Result:**

- Application should require a category.
- Expense should not be created.

**Status:** Pass

---

## TC-018 - Add expense with decimal amount

**Type:** Edge Case

**Test Data:**

- Amount: 1250.50

**Expected Result:**

- Decimal amount should be accepted.
- Dashboard calculations should correctly include the decimal value.

**Status:** Pass

---

## TC-019 - Add expense with very large amount

**Type:** Edge Case

**Test Data:**

- Amount: 99999999.99

**Expected Result:**

- Application should handle the value without UI breaking.
- Total should be calculated correctly within supported numeric limits.

**Status:** Pass

---

# 8. Expense List Test Cases

## TC-020 - Display newly added expense

**Type:** Functional

**Steps:**

1. Add a valid expense.
2. Open the Expenses section.

**Expected Result:**

The expense should display:

- Description
- Amount
- Category
- Date
- Available actions

**Status:** Pass

---

## TC-021 - Display empty expense state

**Type:** Edge Case

**Precondition:** No expenses exist.

**Expected Result:**

The application should display:

> No expenses found

and provide guidance to add the first expense.

**Status:** Pass

---

# 9. Search Test Cases

## TC-022 - Search expense by description

**Type:** Functional

**Test Data:**

- Description: Grocery shopping

**Steps:**

1. Add an expense with description "Grocery shopping".
2. Enter "Grocery" in the search field.

**Expected Result:**

Only matching expenses should be displayed.

**Status:** Pass

---

## TC-023 - Search expense by category

**Type:** Functional

**Steps:**

1. Add a Food expense.
2. Search for "Food".

**Expected Result:**

Matching category expenses should be displayed.

**Status:** Pass

---

## TC-024 - Search with no matching result

**Type:** Negative

**Steps:**

1. Enter a search term that does not exist.

**Expected Result:**

The application should display:

> No expenses found

**Status:** Pass

---

## TC-025 - Clear search

**Type:** Functional

**Steps:**

1. Enter a search term.
2. Verify filtered results.
3. Clear the search field.

**Expected Result:**

All available expenses should be displayed again.

**Status:** Pass

---

# 10. Category Filter Test Cases

## TC-026 - Filter expenses by category

**Type:** Functional

**Steps:**

1. Add expenses belonging to different categories.
2. Select one category from the category dropdown.

**Expected Result:**

Only expenses belonging to the selected category should be displayed.

**Status:** Pass

---

## TC-027 - Select All Categories

**Type:** Functional

**Steps:**

1. Select a specific category.
2. Select "All categories".

**Expected Result:**

All expenses should be displayed.

**Status:** Pass

---

## TC-028 - Category filter with no matching expenses

**Type:** Edge Case

**Steps:**

1. Select a category that has no expenses.

**Expected Result:**

The application should display an appropriate empty-state message.

**Status:** Pass

---

# 11. Edit Expense Test Cases

## TC-029 - Edit existing expense

**Type:** Functional

**Steps:**

1. Select an existing expense.
2. Click Edit.
3. Change the amount or description.
4. Save the changes.

**Expected Result:**

- Expense should be updated.
- Updated values should appear in the list.
- Dashboard totals should reflect the change.

**Status:** Pass

---

## TC-030 - Edit expense with invalid amount

**Type:** Negative

**Steps:**

1. Open an existing expense.
2. Enter a negative amount.
3. Save.

**Expected Result:**

- Update should be rejected.
- Original expense data should remain unchanged.

**Status:** Pass

---

# 12. Delete Expense Test Cases

## TC-031 - Delete an existing expense

**Type:** Functional

**Steps:**

1. Select an existing expense.
2. Click Delete.
3. Confirm deletion if confirmation is displayed.

**Expected Result:**

- Expense should be removed.
- Total expense should decrease.
- Expense count should decrease.
- Category total should update.

**Status:** Pass

---

## TC-032 - Delete the only expense

**Type:** Edge Case

**Steps:**

1. Create one expense.
2. Delete it.

**Expected Result:**

Dashboard should return to:

- Total expense: ₹0.00
- Number of expenses: 0
- Relevant category total: ₹0.00
- Empty expense state

**Status:** Pass

---

# 13. Calculation Test Cases

## TC-033 - Calculate total expense

**Type:** Functional

**Test Data:**

- Expense 1: ₹100
- Expense 2: ₹200
- Expense 3: ₹300

**Expected Result:**

Total expense should be:

**₹600.00**

**Status:** Pass

---

## TC-034 - Calculate category total

**Type:** Functional

**Test Data:**

Food:

- ₹100
- ₹250

Transport:

- ₹300

**Expected Result:**

- Food = ₹350
- Transport = ₹300

**Status:** Pass

---

## TC-035 - Calculate monthly total

**Type:** Functional

**Steps:**

1. Add expenses for the current month.
2. Add an expense for another month if supported.
3. Check Monthly Total.

**Expected Result:**

Monthly total should represent the applicable current-month expenses.

**Status:** Pass

---

# 14. Authentication and Logout Test Cases

## TC-036 - Logout successfully

**Type:** Functional

**Steps:**

1. Login.
2. Click Logout.

**Expected Result:**

- User should be logged out.
- Login page should be displayed.
- Protected dashboard should no longer be accessible through normal navigation.

**Status:** Pass

---

## TC-037 - Access dashboard after logout

**Type:** Negative

**Steps:**

1. Login.
2. Logout.
3. Attempt to access dashboard.

**Expected Result:**

Unauthenticated user should not be allowed to access protected application functionality.

**Status:** Pass

---

# 15. Data Persistence Test Cases

## TC-038 - Expense remains after page refresh

**Type:** Functional

**Steps:**

1. Login.
2. Add an expense.
3. Refresh the browser.

**Expected Result:**

The expense should remain available if persistence is implemented through browser localStorage.

**Status:** Pass

---

## TC-039 - User session persistence

**Type:** Functional

**Steps:**

1. Login.
2. Refresh the browser.

**Expected Result:**

The application should maintain the intended frontend authentication state.

**Status:** Pass

---

# 16. UI and Usability Test Cases

## TC-040 - Verify responsive layout

**Type:** Functional

**Steps:**

1. Open application on desktop.
2. Resize the browser window.
3. Check dashboard and expense sections.

**Expected Result:**

UI should remain readable and usable across supported screen sizes.

**Status:** Pass

---

## TC-041 - Verify navigation and buttons

**Type:** Functional

**Steps:**

1. Check Login.
2. Check Register.
3. Check Add Expense.
4. Check Edit.
5. Check Delete.
6. Check Logout.

**Expected Result:**

All buttons should perform their intended actions.

**Status:** Pass

---

## TC-042 - Verify empty states

**Type:** Edge Case

**Steps:**

1. Login with a new account.
2. Navigate through dashboard and expenses.

**Expected Result:**

The application should display meaningful empty-state messages instead of broken UI elements.

**Status:** Pass

---

# 17. Edge-Case Test Cases

## TC-043 - Multiple expenses in same category

**Type:** Edge Case

**Steps:**

1. Add multiple Food expenses.
2. Check Food category total.

**Expected Result:**

All Food expenses should be correctly accumulated.

**Status:** Pass

---

## TC-044 - Expenses across multiple categories

**Type:** Edge Case

**Steps:**

1. Add Food expense.
2. Add Transport expense.
3. Add Shopping expense.
4. Check category summary.

**Expected Result:**

Each category should display its own total correctly.

**Status:** Pass

---

## TC-045 - Duplicate expense entries

**Type:** Edge Case

**Steps:**

1. Add the same expense twice.

**Expected Result:**

The application should treat them as separate transactions unless duplicate prevention is explicitly required.

**Status:** Pass

---

## TC-046 - Very long description

**Type:** Edge Case

**Test Data:**

Enter a very long expense description.

**Expected Result:**

- Application should remain stable.
- Text should not break the layout.
- Expense should be displayed appropriately.

**Status:** Pass

---

## TC-047 - Special characters in description

**Type:** Edge Case

**Test Data:**

`Dinner @ Restaurant #1`

**Expected Result:**

The description should be stored and displayed correctly.

**Status:** Pass

---

## TC-048 - Search with uppercase/lowercase differences

**Type:** Edge Case

**Steps:**

1. Add expense "Grocery Shopping".
2. Search using different letter casing.

**Expected Result:**

Search should behave according to the application's case-sensitivity rules.

**Status:** Pass

---

# 18. Browser Refresh Test Cases

## TC-049 - Refresh dashboard

**Type:** Functional

**Steps:**

1. Login.
2. Open dashboard.
3. Refresh browser.

**Expected Result:**

Application should reload without crashing and maintain the intended user state.

**Status:** Pass

---

## TC-050 - Refresh after adding expense

**Type:** Functional

**Steps:**

1. Add an expense.
2. Refresh browser.
3. Check expense list.

**Expected Result:**

Expense should remain available if browser persistence is enabled.

**Status:** Pass

---

# 19. Build Verification

## TC-051 - Production build

**Type:** Functional

**Steps:**

1. Open project terminal.
2. Run:

```bash
npm run build