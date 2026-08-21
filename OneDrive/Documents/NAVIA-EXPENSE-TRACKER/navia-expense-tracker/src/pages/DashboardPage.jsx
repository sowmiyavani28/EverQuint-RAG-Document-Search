import { useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseTable from '../components/ExpenseTable'
import StatCard from '../components/StatCard'
import { EXPENSE_CATEGORIES } from '../data/categories'
import { filterExpenses, summarizeExpenses } from '../services/expenseService'
import { formatCurrency } from '../utils/formatters'

export default function DashboardPage({ expenses, user, onAddExpense, onEditExpense, onDeleteExpense, onLogout }) {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [isAddingExpense, setIsAddingExpense] = useState(false)
  const [editExpenseId, setEditExpenseId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const summary = useMemo(() => summarizeExpenses(user?.id, expenses), [user, expenses])
  const filteredExpenses = useMemo(
    () => filterExpenses(expenses, search, categoryFilter),
    [expenses, search, categoryFilter],
  )

  const handleAdd = (formData) => {
    onAddExpense(formData)
    setIsAddingExpense(false)
  }

  const handleEditSave = (formData) => {
    onEditExpense(editExpenseId, formData)
    setEditExpenseId(null)
  }

  const handleDelete = () => {
    if (!deleteId) return
    onDeleteExpense(deleteId)
    setDeleteId(null)
  }

  const currentEditExpense = expenses.find((expense) => expense.id === editExpenseId) || null

  return (
    <div className="dashboard-shell">
      <header className="topbar">
        <div>
          <p className="topbar__eyebrow">Navia Expense Tracker</p>
          <h1>Dashboard</h1>
        </div>
        <div className="topbar__profile">
          <span>{user?.email}</span>
          <button type="button" className="button button--secondary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="stats-grid">
        <StatCard label="Total expense" value={formatCurrency(summary.totalAmount)} tone="primary" />
        <StatCard label="No. of expenses" value={summary.count} tone="secondary" />
        <StatCard label="Monthly total" value={formatCurrency(summary.monthlyTotal)} tone="success" />
      </section>

      <section className="card">
        <div className="panel-header">
          <h2>Category summary</h2>
        </div>
        <div className="category-list">
          {EXPENSE_CATEGORIES.map((category) => (
            <div key={category} className="category-item">
              <div className="category-item__meta">
                <span className="category-dot" />
                <span>{category}</span>
              </div>
              <strong>{formatCurrency(summary.categoryTotals[category] || 0)}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <div className="panel-header">
          <div>
            <h2>Recent expenses</h2>
          </div>
        </div>
        {summary.recentExpenses.length ? (
          <ul className="recent-list">
            {summary.recentExpenses.map((expense) => (
              <li key={expense.id}>
                <div>
                  <strong>{expense.category}</strong>
                  <span>{expense.description || 'No description'}</span>
                </div>
                <span>{formatCurrency(expense.amount)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="No recent expenses" message="Your recent transactions will appear here." />
        )}
      </section>

      <section className="card expense-panel">
        <div className="panel-header panel-header--split">
          <h2>Expenses</h2>
          <button type="button" className="button button--primary" onClick={() => setIsAddingExpense(true)}>
            Add expense
          </button>
        </div>

        <div className="toolbar">
          <input
            type="text"
            value={search}
            placeholder="Search by description or category"
            onChange={(event) => setSearch(event.target.value)}
          />
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value="All">All categories</option>
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {(search || categoryFilter !== 'All') && (
            <button type="button" className="button button--secondary" onClick={() => {
              setSearch('')
              setCategoryFilter('All')
            }}>
              Clear filters
            </button>
          )}
        </div>

        {isAddingExpense ? (
          <div className="form-card">
            <ExpenseForm
              initialValues={{ amount: '', category: '', date: '', description: '' }}
              onSubmit={handleAdd}
              submitLabel="Save expense"
              onCancel={() => setIsAddingExpense(false)}
            />
          </div>
        ) : null}

        {editExpenseId && currentEditExpense ? (
          <div className="form-card">
            <ExpenseForm
              initialValues={{
                amount: String(currentEditExpense.amount),
                category: currentEditExpense.category,
                date: currentEditExpense.date,
                description: currentEditExpense.description || '',
              }}
              onSubmit={handleEditSave}
              submitLabel="Update expense"
              onCancel={() => setEditExpenseId(null)}
            />
          </div>
        ) : null}

        {filteredExpenses.length ? (
          <ExpenseTable
            expenses={filteredExpenses}
            onEdit={(expense) => setEditExpenseId(expense.id)}
            onDelete={(expenseId) => setDeleteId(expenseId)}
          />
        ) : (
          <EmptyState
            title="No expenses found"
            message="Start tracking your expenses by adding your first expense."
          />
        )}

        {deleteId ? (
          <div className="modal-backdrop" onClick={() => setDeleteId(null)}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>
              <h3>Delete expense?</h3>
              <p>This action permanently removes the expense from your records.</p>
              <div className="form-actions">
                <button type="button" className="button button--secondary" onClick={() => setDeleteId(null)}>
                  Cancel
                </button>
                <button type="button" className="button button--danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}
