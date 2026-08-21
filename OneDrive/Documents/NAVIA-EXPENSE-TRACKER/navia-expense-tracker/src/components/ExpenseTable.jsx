import { formatCurrency } from '../utils/formatters'

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  if (!expenses.length) {
    return null
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{new Date(`${expense.date}T00:00:00`).toLocaleDateString()}</td>
              <td>{expense.category}</td>
              <td>{expense.description || '—'}</td>
              <td>{formatCurrency(expense.amount)}</td>
              <td>
                <div className="action-group">
                  <button type="button" className="link-button" onClick={() => onEdit(expense)}>
                    Edit
                  </button>
                  <button type="button" className="link-button link-button--danger" onClick={() => onDelete(expense.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
