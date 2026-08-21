# Assumptions & Ambiguous Requirements

## Assumptions

1. This is an MVP/prototype application.
2. No backend API has been provided.
3. Browser localStorage will be used for persistence.
4. Authentication is simulated locally for demonstration purposes.
5. Currency will be INR (₹).
6. Expense categories will initially include:
   - Food
   - Transport
   - Shopping
   - Bills
   - Healthcare
   - Entertainment
   - Other

## Ambiguous Requirements

### 1. Password Policy

Requirement does not specify password complexity.

Assumption:
Password must contain at least 6 characters.

### 2. Currency

Requirement does not specify currency.

Assumption:
The application uses Indian Rupees (₹), considering the target
business context.

### 3. Expense Categories

Requirement does not define categories.

Assumption:
A predefined list of common personal expense categories will be used.

### 4. Backend

No backend/API requirement was specified.

Assumption:
localStorage will be used for the assessment prototype.

### 5. Authentication Security

Since authentication is implemented using localStorage,
this implementation is NOT production-grade authentication.

A production application should use a secure backend,
hashed passwords, session/token management and appropriate
security controls.