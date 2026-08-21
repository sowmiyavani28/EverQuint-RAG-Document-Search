import { EXPENSE_CATEGORIES } from '../data/categories'

const STORAGE_KEYS = {
  users: 'navia_users',
  session: 'navia_session',
  expenses: 'navia_expenses',
}

function readStorage(key) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : []
  } catch (error) {
    console.error(`Unable to read localStorage key: ${key}`, error)
    return []
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function makeSafeUser(user) {
  if (!user) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
  }
}

function normalizeEmail(email) {
  return String(email ?? '').trim().toLowerCase()
}

export async function hashPassword(password) {
  const text = String(password ?? '')

  if (!window.crypto || !window.crypto.subtle) {
    return text
  }

  const encoded = new TextEncoder().encode(text)
  const digest = await window.crypto.subtle.digest('SHA-256', encoded)
  const bytes = Array.from(new Uint8Array(digest))
  return bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function getStoredUsers() {
  return readStorage(STORAGE_KEYS.users)
}

export function saveUsers(users) {
  writeStorage(STORAGE_KEYS.users, users)
}

export function getCurrentSession() {
  const session = readStorage(STORAGE_KEYS.session)
  return session && session.user ? session.user : null
}

export function setCurrentSession(user) {
  writeStorage(STORAGE_KEYS.session, { user: makeSafeUser(user) })
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session)
}

export function getAllExpenses() {
  return readStorage(STORAGE_KEYS.expenses)
}

export function getExpensesByUser(userId) {
  const expenses = getAllExpenses()
  return expenses.filter((expense) => expense.userId === userId)
}

export async function registerUser(email, password) {
  const normalizedEmail = normalizeEmail(email)
  const users = getStoredUsers()
  const existing = users.find((user) => normalizeEmail(user.email) === normalizedEmail)

  if (existing) {
    return {
      success: false,
      message: 'An account with this email already exists.',
    }
  }

  const hashedPassword = await hashPassword(password)
  const newUser = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)

  return {
    success: true,
    message: 'Registration successful.',
  }
}

export async function loginUser(email, password) {
  const normalizedEmail = normalizeEmail(email)
  const hashedPassword = await hashPassword(password)
  const users = getStoredUsers()
  const user = users.find(
    (entry) =>
      normalizeEmail(entry.email) === normalizedEmail && entry.password === hashedPassword,
  )

  if (!user) {
    return {
      success: false,
      message: 'Invalid email or password.',
    }
  }

  return {
    success: true,
    user: makeSafeUser(user),
    message: 'Login successful.',
  }
}

export function createExpense(expense) {
  const expenses = getAllExpenses()
  const newExpense = {
    id: crypto.randomUUID(),
    ...expense,
    amount: Number(expense.amount),
    category: expense.category,
    date: expense.date,
    description: String(expense.description ?? '').trim(),
    createdAt: new Date().toISOString(),
  }

  expenses.push(newExpense)
  writeStorage(STORAGE_KEYS.expenses, expenses)
  return newExpense
}

export function updateExpense(expenseId, userId, updates) {
  const expenses = getAllExpenses()
  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === expenseId && expense.userId === userId,
  )

  if (expenseIndex === -1) {
    return null
  }

  const updatedExpense = {
    ...expenses[expenseIndex],
    ...updates,
    amount: Number(updates.amount),
    description: String(updates.description ?? '').trim(),
    category: updates.category,
    date: updates.date,
    userId,
    updatedAt: new Date().toISOString(),
  }

  expenses[expenseIndex] = updatedExpense
  writeStorage(STORAGE_KEYS.expenses, expenses)
  return updatedExpense
}

export function deleteExpense(expenseId, userId) {
  const expenses = getAllExpenses()
  const filtered = expenses.filter(
    (expense) => !(expense.id === expenseId && expense.userId === userId),
  )

  writeStorage(STORAGE_KEYS.expenses, filtered)
  return filtered
}

export function getCategories() {
  return EXPENSE_CATEGORIES
}
