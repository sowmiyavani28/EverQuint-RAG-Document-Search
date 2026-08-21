import { useEffect, useState } from 'react'
import { DESCRIPTION_MAX_LENGTH, EXPENSE_CATEGORIES } from '../data/categories'
import { validateExpenseInput } from '../utils/validation'

const emptyForm = {
  amount: '',
  category: '',
  date: '',
  description: '',
}

export default function ExpenseForm({ initialValues, onSubmit, submitLabel, onCancel }) {
  const [formData, setFormData] = useState(initialValues || emptyForm)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues)
    }
  }, [initialValues])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationResult = validateExpenseInput(formData)

    if (!validationResult.valid) {
      setErrors(validationResult.errors)
      return
    }

    setErrors({})
    onSubmit(formData)
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className={errors.amount ? 'input-error' : ''}
          />
          {errors.amount ? <span className="error-text">{errors.amount}</span> : null}
        </div>

        <div className="field-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'input-error' : ''}
          >
            <option value="">Select a category</option>
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? <span className="error-text">{errors.category}</span> : null}
        </div>

        <div className="field-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className={errors.date ? 'input-error' : ''}
          />
          {errors.date ? <span className="error-text">{errors.date}</span> : null}
        </div>

        <div className="field-group field-group--full">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            maxLength={DESCRIPTION_MAX_LENGTH}
            placeholder="Optional note about the expense"
            className={errors.description ? 'input-error' : ''}
          />
          <div className="field-meta">
            <span>{(formData.description ?? '').length}/{DESCRIPTION_MAX_LENGTH}</span>
          </div>
          {errors.description ? <span className="error-text">{errors.description}</span> : null}
        </div>
      </div>

      <div className="form-actions">
        {onCancel ? (
          <button type="button" className="button button--secondary" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button type="submit" className="button button--primary">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
