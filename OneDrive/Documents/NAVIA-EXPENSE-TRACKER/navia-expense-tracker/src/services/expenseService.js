import { EXPENSE_CATEGORIES } from '../data/categories'
import { getExpensesByUser } from './storageService'

export function summarizeExpenses(userId, expenses = getExpensesByUser(userId)) {
  const normalisedExpenses = Array.isArray(expenses) ? expenses : []
  const categoryTotals = EXPENSE_CATEGORIES.reduce((totals, category) => {
    totals[category] = 0
    return totals
  }, {})

  let totalAmount = 0

  normalisedExpenses.forEach((expense) => {
    const amount = Number(expense.amount) || 0
    totalAmount += amount

    if (Object.prototype.hasOwnProperty.call(categoryTotals, expense.category)) {
      categoryTotals[expense.category] += amount
    }
  })

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

  const monthlyTotal = normalisedExpenses.reduce((sum, expense) => {
    const expenseDate = new Date(`${expense.date}T00:00:00`)
    if (expenseDate >= monthStart && expenseDate <= monthEnd) {
      return sum + (Number(expense.amount) || 0)
    }
    return sum
  }, 0)

  const recentExpenses = [...normalisedExpenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return {
    totalAmount,
    count: normalisedExpenses.length,
    monthlyTotal,
    categoryTotals,
    recentExpenses,
  }
}

export function filterExpenses(expenses, searchTerm = '', selectedCategory = 'All') {
  const query = String(searchTerm ?? '').trim().toLowerCase()

  return expenses.filter((expense) => {
    const matchesSearch =
      !query ||
      String(expense.description ?? '').toLowerCase().includes(query) ||
      String(expense.category ?? '').toLowerCase().includes(query)

    const matchesCategory = selectedCategory === 'All' || expense.category === selectedCategory

    return matchesSearch && matchesCategory
  })
}
