# AI Output Review

## 1. Purpose

AI-assisted development was used to accelerate the implementation of the Expense Tracker application.

The generated output was reviewed manually against the requirement analysis, business rules, assumptions, and expected application behaviour.

The AI-generated code was not accepted blindly. The application was run locally and the implementation was reviewed for functionality, validation, maintainability, and alignment with the assessment requirements.

---

## 2. AI-Assisted Development Approach

AI tools were used for:

- Requirement interpretation
- Application architecture suggestions
- React component generation
- Form validation implementation
- Expense management logic
- Dashboard implementation
- Styling and UI improvements
- Error handling
- Documentation assistance
- Build and runtime verification

The generated code was reviewed and adjusted where necessary.

---

## 3. Output Review Summary

| Area | AI Output | Review Result |
|---|---|---|
| React application structure | Generated React/Vite application structure | Accepted after review |
| User registration | Registration flow implemented | Tested and reviewed |
| User login | Login functionality implemented | Tested and reviewed |
| User session | Session maintained using browser storage | Accepted for assessment scope |
| Expense creation | Add expense functionality implemented | Reviewed against validation rules |
| Expense editing | Edit functionality implemented | Reviewed |
| Expense deletion | Delete functionality implemented | Reviewed |
| Expense ownership | Expenses scoped to logged-in user | Reviewed |
| Dashboard | Summary information implemented | Accepted |
| Category validation | Predefined categories used | Reviewed |
| Amount validation | Positive amount validation implemented | Reviewed |
| Date validation | Future-date validation implemented | Reviewed |
| Build | Production build completed successfully | Verified |
| Runtime | Development server started successfully | Verified |

---

## 4. Manual Validation Performed

The application was executed locally using the Vite development server.

The application was verified to start successfully at:

http://localhost:5173/

The following areas were manually reviewed:

1. Login page
2. Registration flow
3. Dashboard navigation
4. Expense creation
5. Expense validation
6. Expense editing
7. Expense deletion
8. Logout behaviour
9. User-specific expense visibility
10. Production build

---

## 5. Validation of Business Rules

The generated implementation was compared against the documented business rules.

### User Management

The following rules were reviewed:

- Email is required.
- Email format is validated.
- Duplicate email registration is prevented.
- Password is required.
- Minimum password length is enforced.
- Invalid login credentials are rejected.
- Logout clears the active user session.

### Expense Management

The following rules were reviewed:

- Every expense belongs to a user.
- Expense amount is mandatory.
- Expense amount must be greater than zero.
- Negative amounts are rejected.
- Expense category is mandatory.
- Only predefined categories are accepted.
- Expense date is mandatory.
- Future dates are rejected.
- Description is optional.
- Users can edit their own expenses.
- Users can delete their own expenses.

### Dashboard

The dashboard was reviewed to ensure that expense information is calculated from the current user's expenses rather than from another user's data.

---

## 6. Negative and Edge-Case Review

The application was reviewed against the following scenarios:

| Scenario | Expected Behaviour |
|---|---|
| Empty email | Registration/login rejected |
| Invalid email format | Registration rejected |
| Empty password | Validation error |
| Password below minimum length | Validation error |
| Duplicate email | Registration rejected |
| Invalid login credentials | Login rejected |
| Empty expense amount | Expense rejected |
| Zero expense amount | Expense rejected |
| Negative expense amount | Expense rejected |
| Invalid category | Expense rejected |
| Missing expense date | Expense rejected |
| Future expense date | Expense rejected |
| Empty optional description | Expense accepted |
| Excessively long description | Validation should prevent invalid input |
| Edit another user's expense | Operation must not be allowed |
| Delete another user's expense | Operation must not be allowed |
| Logout | Session cleared |

---

## 7. AI Output Limitations Identified

The AI-generated implementation was reviewed critically and the following limitations were identified.

### 7.1 Frontend-only Authentication

The current implementation uses browser-side storage for authentication and expense persistence.

This is acceptable for the scope of the assessment but is not suitable for a production financial application.

A production implementation should use:

- Backend authentication
- Secure password hashing
- Server-side authorization
- Database persistence
- Secure session/token management

---

### 7.2 No Backend Database

The current application does not use a dedicated backend database.

Data is stored locally in the browser.

This means that data may not be available across different browsers or devices.

For a production application, a backend database would be required.

---

### 7.3 Dashboard Visualization

The assessment mentions dashboard monitoring.

The current implementation provides summary information and category-based expense information.

A dedicated chart library was not added because the objective was to keep the implementation simple and maintainable for the assessment scope.

---

### 7.4 Monthly Summary

The current dashboard provides a current-month expense summary.

A fully configurable month-selection/filtering interface was not implemented.

This is documented as a known limitation rather than being presented as a completed requirement.

---

## 8. Manual Improvements Over AI Output

The AI-generated implementation was reviewed rather than submitted without validation.

The following areas were specifically checked:

- Requirement-to-feature mapping
- Business-rule validation
- User ownership of expenses
- Invalid input handling
- Expense calculation
- Login/logout flow
- Application navigation
- Build errors
- Runtime errors
- UI behaviour

Where the generated implementation did not completely match the documented requirements, the limitation was identified and documented.

---

## 9. Build Verification

The production build was executed using:

```bash
npm run build