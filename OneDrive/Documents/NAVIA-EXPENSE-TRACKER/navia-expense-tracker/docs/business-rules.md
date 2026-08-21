# Business Rules & Validation

## 1. User Management Rules

### BR-001 — Unique User

Each registered email address must be unique.

**Validation:**
- Email is required.
- Email must have a valid format.
- Duplicate email registration is not allowed.

### BR-002 — Password

Password is required during registration and login.

**Validation:**
- Password cannot be empty.
- Password must meet the minimum length defined by the application.

### BR-003 — Login

A user can log in only when the supplied credentials match a registered user.

Invalid credentials must display an appropriate error message.

### BR-004 — User Session

After successful login, the application must maintain the logged-in user's session.

When the user logs out, the session must be cleared.

---

# 2. Expense Rules

### BR-005 — Expense Ownership

Every expense must belong to exactly one user.

A user can access only their own expenses.

### BR-006 — Expense Amount

Expense amount:

- Is mandatory.
- Must be numeric.
- Must be greater than zero.
- Must not be negative.
- Must not be zero.

Example:

| Input | Result |
|---|---|
| ₹500 | Valid |
| ₹0 | Invalid |
| ₹-100 | Invalid |
| `abc` | Invalid |
| Empty | Invalid |

### BR-007 — Expense Category

Every expense must have a category.

Only predefined categories are allowed.

Categories:

- Food
- Transport
- Shopping
- Bills
- Healthcare
- Entertainment
- Education
- Other

### BR-008 — Expense Date

Expense date is mandatory.

The application does not allow future-dated expenses.

Example:

- Today's date → Valid
- Yesterday → Valid
- Future date → Invalid

### BR-009 — Expense Description

Description is optional.

If provided, the description must not exceed the maximum allowed length.

### BR-010 — Create Expense

A valid expense must contain:

- User ID
- Amount
- Category
- Date

Description is optional.

### BR-011 — Edit Expense

A user can edit only an expense belonging to them.

Edited values must pass the same validation rules as a newly created expense.

### BR-012 — Delete Expense

A user can delete only their own expense.

Deletion permanently removes the expense from the application's active data.

A confirmation should be displayed before deletion.

---

# 3. Dashboard Rules

## BR-013 — Total Expense

Total Expense must equal the sum of all valid expenses belonging to the currently logged-in user.

Formula:

Total Expense = Expense 1 + Expense 2 + Expense 3 + ...

---

## BR-014 — Monthly Expense

Monthly expense should represent the sum of expenses for the selected calendar month.

Example:

August 2026

Expense 1 = ₹500
Expense 2 = ₹1000
Expense 3 = ₹250

Monthly Total = ₹1750

---

## BR-015 — Category-Wise Expense

The dashboard should calculate the total amount spent for each category.

Example:

Food        ₹5,000
Transport   ₹2,000
Shopping    ₹3,000
Bills       ₹4,000

---

## BR-016 — Dashboard Synchronization

Dashboard values must update after:

- Adding an expense
- Editing an expense
- Deleting an expense

The user should not need to manually refresh the browser.

---

## BR-017 — User-Specific Dashboard

Dashboard calculations must include only the currently logged-in user's expenses.

Data belonging to other users must never affect:

- Total expense
- Monthly expense
- Category totals
- Transaction count
- Charts

---

# 4. Expense List Rules

## BR-018 — Expense List

A logged-in user should be able to view their expenses.

The expense list should display:

- Date
- Category
- Description
- Amount
- Edit action
- Delete action

---

## BR-019 — Empty Expense List

If the user has no expenses, display a meaningful message.

Example:

No expenses found.

Start tracking your expenses by adding your first expense.

---

## BR-020 — Search

The user should be able to search their expenses using relevant information such as:

- Description
- Category

Search should not modify the underlying stored data.

---

## BR-021 — Category Filter

The user should be able to filter expenses by category.

For example:

Food → Display only Food expenses.

---

## BR-022 — Clear Filters

The user should be able to clear active filters and return to the complete expense list.

---

# 5. Expense Editing Rules

## BR-023 — Edit Expense

A user can edit their own expense.

The edited expense must pass the same validation rules as a newly created expense.

---

## BR-024 — Unauthorized Edit

A user must not be able to edit an expense belonging to another user.

If an unauthorized edit is attempted, the operation must be rejected.

---

## BR-025 — Non-Existing Expense

If an expense does not exist, the application must handle the situation safely without crashing.

---

# 6. Expense Deletion Rules

## BR-026 — Delete Expense

A user can delete their own expense.

---

## BR-027 — Delete Confirmation

Before deleting an expense, the application should ask for confirmation.

Example:

Are you sure you want to delete this expense?

Options:

- Cancel
- Delete

If the user selects Cancel, the expense must remain unchanged.

---

## BR-028 — Unauthorized Delete

A user must not be able to delete another user's expense.

---

# 7. Data Persistence Rules

## BR-029 — Local Storage

For this assessment MVP, browser localStorage will be used for data persistence.

The application should preserve valid data after a browser refresh.

---

## BR-030 — Application Startup

When the application starts:

1. Read stored data.
2. Load valid data.
3. Handle missing data gracefully.
4. Prevent application crashes caused by invalid stored data.

---

## BR-031 — Storage Updates

Whenever a valid change occurs, localStorage should be updated.

Changes include:

- User registration
- Adding an expense
- Editing an expense
- Deleting an expense
- Login/session changes
- Logout

---

# 8. Data Integrity Rules

## BR-032 — Unique Expense ID

Every expense must have a unique identifier.

The ID is used to:

- Identify the expense
- Edit the expense
- Delete the expense

---

## BR-033 — Expense Ownership

Every expense must contain the ID of the user who created it.

Example:

{
  id: "expense_001",
  userId: "user_001",
  amount: 500,
  category: "Food",
  date: "2026-08-20",
  description: "Lunch"
}

---

## BR-034 — No Cross-User Data Access

A user must never see another user's expenses.

Example:

User A → User A expenses only

User B → User B expenses only

---

# 9. Currency Rules

## BR-035 — Currency

The application will use Indian Rupees (INR).

Currency symbol:

₹

Example:

₹500
₹1,250.50
₹10,000

---

## BR-036 — Consistent Currency Display

Currency should be displayed consistently across:

- Expense form
- Expense list
- Dashboard
- Charts
- Summary cards

---

# 10. Form Validation Rules

## BR-037 — Required Fields

Required fields must be validated before submitting a form.

---

## BR-038 — Validation Before Saving

Validation must occur before data is stored.

Invalid data must never be persisted.

---

## BR-039 — User-Friendly Error Messages

Error messages should clearly explain the problem.

Bad:

Invalid input.

Better:

Amount must be greater than zero.

---

# 11. Edge-Case Rules

## BR-040 — Zero Amount

Input:

₹0

Expected:

Rejected.

---

## BR-041 — Negative Amount

Input:

₹-500

Expected:

Rejected.

---

## BR-042 — Decimal Amount

Decimal amounts are allowed.

Example:

₹125.50

Expected:

Accepted.

---

## BR-043 — Very Large Amount

The application should handle reasonably large expense amounts without breaking calculations or the user interface.

---

## BR-044 — Empty Expense List

The application must display an appropriate empty state when the user has no expenses.

---

## BR-045 — Delete Last Expense

When the last expense is deleted:

- Total expense becomes ₹0.
- Transaction count becomes 0.
- Dashboard updates.
- Empty-state message is displayed.

---

## BR-046 — Edit to Invalid Data

If a user changes a valid expense to an invalid value, the update must be rejected.

The original valid expense should remain unchanged.

---

## BR-047 — Browser Refresh

Refreshing the browser must not remove valid stored data.

---

# 12. Security and Authentication Limitations

## BR-048 — LocalStorage Authentication

This assessment uses localStorage for the MVP.

This is not production-grade authentication.

Potential limitations include:

- Client-side data can be modified.
- Stored credentials may be exposed.
- Client-side authentication can be bypassed.
- There is no server-side authorization.

---

## BR-049 — Production Authentication

A production application should use:

- Secure backend authentication
- Password hashing
- Secure sessions or tokens
- HTTPS
- Server-side authorization
- Database access controls

These are outside the scope of this assessment.

---

# 13. Error Handling Rules

## BR-050 — Application Should Not Crash

Invalid user input should not cause the application to crash.

---

## BR-051 — Graceful Failure

When an operation fails, the application should:

1. Prevent invalid state changes.
2. Display an understandable error message.
3. Preserve existing valid data.

---

## BR-052 — Corrupted Local Storage

If stored data is corrupted or invalid, the application should handle the error gracefully instead of crashing.

---

# 14. UI and Usability Rules

## BR-053 — Responsive Design

The application should work reasonably well on:

- Desktop
- Tablet
- Mobile

---

## BR-054 — Clear Navigation

The user should be able to easily navigate between:

- Dashboard
- Expenses
- Add Expense
- Logout

---

## BR-055 — Consistent Interface

Buttons, forms, cards, tables, and messages should use consistent styling.

---

## BR-056 — Empty States

The application should provide meaningful messages when:

- No expenses exist.
- No search results are found.
- An operation fails.

---

# 15. Testing Rules

The application must be tested using three categories.

## Functional Testing

Test:

- Registration
- Login
- Logout
- Add expense
- View expense
- Edit expense
- Delete expense
- Search
- Filter
- Dashboard calculations

## Negative Testing

Test:

- Invalid email
- Empty password
- Incorrect password
- Duplicate registration
- Negative amount
- Zero amount
- Missing category
- Missing date
- Future date
- Invalid expense data

## Edge-Case Testing

Test:

- No expenses
- Delete last expense
- Very large amount
- Decimal amount
- Long description
- Multiple users
- Browser refresh
- Corrupted localStorage
- Non-existing expense
- Unauthorized expense access

---

# 16. Acceptance Criteria

The application will be considered functionally complete when:

1. A user can register successfully.
2. Duplicate email registration is prevented.
3. A registered user can log in.
4. Invalid login credentials are rejected.
5. A user can log out.
6. A logged-in user can add an expense.
7. Invalid expense data is rejected.
8. A user can view their expenses.
9. A user can edit their expenses.
10. A user can delete their expenses.
11. A user cannot access another user's expenses.
12. Search and filtering work correctly.
13. Dashboard totals are accurate.
14. Dashboard data is user-specific.
15. Dashboard updates after adding, editing, or deleting expenses.
16. Data remains available after browser refresh.
17. Empty states are handled properly.
18. Negative and edge cases are handled safely.
19. The application does not have critical runtime errors.

---

# 17. AI-Assisted Development Validation

AI-generated code must not be accepted without review.

For every major AI-generated implementation, verify:

- Does it satisfy the business rules?
- Does validation work correctly?
- Does it handle invalid input?
- Does it handle edge cases?
- Does it preserve user data?
- Does it prevent cross-user access?
- Does it update the dashboard correctly?
- Does it introduce security concerns?
- Does it create console/runtime errors?

The developer is responsible for reviewing, testing, modifying, and validating AI-generated output.

---

# 18. Final Business Rule

The core application flow should follow:

Validate → Process → Persist → Display → Verify

For every important operation:

1. Validate user input.
2. Apply the relevant business rules.
3. Update application state.
4. Persist valid data.
5. Update the UI.
6. Test and verify the result.