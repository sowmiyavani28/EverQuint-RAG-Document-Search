import { DESCRIPTION_MAX_LENGTH, EXPENSE_CATEGORIES } from '../data/categories'

export function validateEmail(email) {
  const trimmed = String(email ?? '').trim()

  if (!trimmed) {
    return 'Email is required.'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(trimmed)) {
    return 'Enter a valid email address.'
  }

  return ''
}

export function validatePassword(password) {
  const trimmed = String(password ?? '')

  if (!trimmed.trim()) {
    return 'Password is required.'
  }

  if (trimmed.length < 6) {
    return 'Password must be at least 6 characters long.'
  }

  return ''
}

export function validateExpenseInput(expense) {
  const errors = {}
  const amount = Number(expense?.amount)
  const category = expense?.category
  const date = expense?.date
  const description = String(expense?.description ?? '').trim()

  if (expense?.amount === '' || expense?.amount === null || expense?.amount === undefined) {
    errors.amount = 'Amount is required.'
  } else if (!Number.isFinite(amount) || Number.isNaN(amount)) {
    errors.amount = 'Amount must be numeric.'
  } else if (amount <= 0) {
    errors.amount = 'Amount must be greater than zero.'
  }

  if (!category) {
    errors.category = 'Category is required.'
  } else if (!EXPENSE_CATEGORIES.includes(category)) {
    errors.category = 'Select a valid category.'
  }

  if (!date) {
    errors.date = 'Date is required.'
  } else {
    const selectedDate = new Date(`${date}T00:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate > today) {
      errors.date = 'Future dates are not allowed.'
    }
  }

  if (description && description.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `Description must be ${DESCRIPTION_MAX_LENGTH} characters or less.`
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
