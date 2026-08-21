# Known Issues

## 1. Frontend-Only Authentication

**Status:** Known limitation

The current application implements authentication using browser `localStorage`.

### Details
- User registration and login are handled on the frontend.
- User/session information is stored locally in the browser.
- There is no backend authentication service.
- Passwords are not suitable for production storage in this implementation.

### Impact
This approach is acceptable for the assessment/demo scope but should not be considered production-grade authentication.

### Recommended Improvement
Implement backend authentication using:
- Secure password hashing
- Session or JWT-based authentication
- Server-side user validation
- Secure HTTP-only cookies where appropriate

---

## 2. Data Persistence Uses Browser Storage

**Status:** Known limitation

Expense and user data are stored in browser `localStorage`.

### Details
- Data remains available after page refresh in the same browser.
- Data is not synchronized across devices or browsers.
- Clearing browser storage will remove locally stored application data.

### Impact
The application is not suitable for multi-device or multi-user production use without a backend database.

### Recommended Improvement
Use a backend API and persistent database such as:
- PostgreSQL
- MySQL
- MongoDB
- SQLite for a small deployment

---

## 3. No Backend API

**Status:** Known limitation

The application currently operates entirely on the frontend.

### Impact
There is no server-side validation, centralized data management, or database persistence.

### Recommended Improvement
Introduce a backend API for:
- Authentication
- User management
- Expense CRUD operations
- Data validation
- Persistent storage

---

## 4. Dashboard Uses Summary Cards Instead of Dedicated Charts

**Status:** Partially implemented

The dashboard displays:
- Total expense
- Number of expenses
- Monthly total
- Category-wise expense summary

A dedicated chart library has not been added.

### Impact
Users can view category totals, but visual trend analysis is limited.

### Recommended Improvement
Add charts such as:
- Category-wise pie/doughnut chart
- Monthly expense bar chart
- Expense trend line chart

---

## 5. Monthly Summary Is Based on the Current Month

**Status:** Known limitation

The monthly total currently represents the current month's expenses.

### Impact
Users cannot select an arbitrary month from the dashboard for historical analysis.

### Recommended Improvement
Add:
- Month selector
- Year selector
- Historical monthly summaries
- Monthly comparison

---

## 6. No Advanced Expense Analytics

**Status:** Future enhancement

The application currently focuses on basic expense tracking and summary information.

### Possible Improvements
Add:
- Monthly spending trends
- Budget tracking
- Category percentage distribution
- Highest spending category
- Average daily spending
- Monthly comparison
- Budget alerts

---

## 7. Limited Error Handling

**Status:** Known limitation

Basic validation is implemented, but a production application would require more comprehensive error handling.

### Recommended Improvement
Add:
- Consistent error messages
- Network error handling
- Storage failure handling
- Unexpected application error handling
- User-friendly validation messages

---

## 8. No Automated Test Suite

**Status:** Known limitation

The application has manual test cases documented, but an automated testing framework has not been added.

### Recommended Improvement
Introduce automated tests using tools such as:
- Vitest
- React Testing Library
- Playwright or Cypress for end-to-end testing

---

## 9. Browser Storage Limitations

**Status:** Known limitation

Because the application uses browser storage, behavior can vary depending on browser settings and storage availability.

### Impact
Clearing site data or using private browsing may remove or change stored application state.

### Recommended Improvement
Move persistent application data to a backend database.

---

## 10. Production Security Hardening Required

**Status:** Known limitation

The current implementation is designed for assessment/demo purposes.

Before production deployment, additional security controls should be implemented.

### Recommended Improvements
- Backend authentication
- Password hashing
- Authorization checks
- Input sanitization
- Server-side validation
- Secure session management
- HTTPS
- Rate limiting
- CSRF protection where applicable
- Secure headers