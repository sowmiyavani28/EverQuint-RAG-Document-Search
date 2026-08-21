# Navia Expense Tracker

A lightweight React + Vite assessment app for tracking personal expenses with local user accounts, validation, and per-user data isolation.

## Features

- Registration and login flows
- Logout and persisted user session
- Expense CRUD with validation
- User-only access to their own financial records
- Dashboard summary with totals, category breakdowns, recent expense activity, and search/filtering
- Browser localStorage persistence for users, session, and expenses

## LocalStorage and security note

This application is designed as a frontend-only MVP for assessment purposes. Authentication and data persistence are handled with browser localStorage, which means:

- Passwords are hashed in the browser before being stored, but this is not equivalent to production-grade authentication.
- LocalStorage is readable by the user and not suitable for sensitive data in a real application.
- A secure backend with proper password hashing, session management, and authorization controls would be required for production use.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- Expense data is stored per logged-in user and only returned for the active user.
- The app includes validation and user isolation consistent with the assessment business rules.
