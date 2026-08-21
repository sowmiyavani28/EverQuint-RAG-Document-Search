import { useEffect, useMemo, useState } from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import {
  clearSession,
  createExpense,
  deleteExpense,
  getAllExpenses,
  getCurrentSession,
  loginUser,
  registerUser,
  setCurrentSession,
  updateExpense,
} from './services/storageService'

function App() {
  const [authMode, setAuthMode] = useState('login')
  const [session, setSession] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [notice, setNotice] = useState({ type: '', message: '' })
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const currentSession = getCurrentSession()
    setSession(currentSession)
    setExpenses(getAllExpenses().filter((expense) => expense.userId === currentSession?.id))
    setIsReady(true)
  }, [])

  const currentUser = useMemo(() => session, [session])

  useEffect(() => {
    if (!currentUser) {
      setExpenses([])
      return
    }

    setExpenses(getAllExpenses().filter((expense) => expense.userId === currentUser.id))
  }, [currentUser])

  const showNotice = (type, message) => {
    setNotice({ type, message })
    window.setTimeout(() => {
      setNotice({ type: '', message: '' })
    }, 3500)
  }

  const handleRegister = async (email, password) => {
    const result = await registerUser(email, password)
    if (!result.success) {
      showNotice('error', result.message)
      return
    }

    showNotice('success', result.message)
    setAuthMode('login')
  }

  const handleLogin = async (email, password) => {
    const result = await loginUser(email, password)
    if (!result.success) {
      showNotice('error', result.message)
      return
    }

    setCurrentSession(result.user)
    setSession(result.user)
    setExpenses(getAllExpenses().filter((expense) => expense.userId === result.user.id))
    showNotice('success', result.message)
  }

  const handleLogout = () => {
    clearSession()
    setSession(null)
    setExpenses([])
    setAuthMode('login')
    showNotice('success', 'You have been logged out.')
  }

  const handleAddExpense = (expenseInput) => {
    if (!currentUser) return

    const payload = { ...expenseInput, userId: currentUser.id }
    createExpense(payload)
    setExpenses(getAllExpenses().filter((expense) => expense.userId === currentUser.id))
    showNotice('success', 'Expense added successfully.')
  }

  const handleEditExpense = (expenseId, expenseInput) => {
    if (!currentUser) return

    const updatedExpense = updateExpense(expenseId, currentUser.id, expenseInput)
    if (!updatedExpense) {
      showNotice('error', 'You can only edit your own expense.')
      return
    }

    setExpenses(getAllExpenses().filter((expense) => expense.userId === currentUser.id))
    showNotice('success', 'Expense updated successfully.')
  }

  const handleDeleteExpense = (expenseId) => {
    if (!currentUser) return

    const filteredExpenses = getAllExpenses()
    const existingExpense = filteredExpenses.find(
      (expense) => expense.id === expenseId && expense.userId === currentUser.id,
    )

    if (!existingExpense) {
      showNotice('error', 'You can only delete your own expense.')
      return
    }

    deleteExpense(expenseId, currentUser.id)
    setExpenses(filteredExpenses.filter((expense) => expense.userId === currentUser.id && expense.id !== expenseId))
    showNotice('success', 'Expense deleted successfully.')
  }

  if (!isReady) {
    return <div className="loading-shell">Loading...</div>
  }

  return (
    <div className="app-shell">
      {notice.message ? <div className={`notice notice--${notice.type}`}>{notice.message}</div> : null}

      {!currentUser ? (
        <AuthPage
          mode={authMode}
          onSubmit={authMode === 'login' ? handleLogin : handleRegister}
          onSwitchMode={() => setAuthMode((previous) => (previous === 'login' ? 'register' : 'login'))}
        />
      ) : (
        <DashboardPage
          user={currentUser}
          expenses={expenses}
          onAddExpense={handleAddExpense}
          onEditExpense={handleEditExpense}
          onDeleteExpense={handleDeleteExpense}
          onLogout={handleLogout}
        />
      )}
    </div>
  )
}

export default App
