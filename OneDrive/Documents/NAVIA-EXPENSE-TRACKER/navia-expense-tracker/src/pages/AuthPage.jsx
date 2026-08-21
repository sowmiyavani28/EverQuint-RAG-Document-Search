import { useState } from 'react'
import { validateEmail, validatePassword } from '../utils/validation'

export default function AuthPage({ mode, onSubmit, onSwitchMode }) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    }

    const hasErrors = Object.values(nextErrors).some(Boolean)
    setErrors(nextErrors)

    if (hasErrors) {
      return
    }

    setIsSubmitting(true)
    await onSubmit(formData.email, formData.password)
    setIsSubmitting(false)
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-card__header">
          <span className="brand-pill">Navia</span>
          <h1>{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
          <p>{mode === 'login' ? 'Sign in to continue tracking expenses.' : 'Register to start managing your budget.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email ? <span className="error-text">{errors.email}</span> : null}
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password ? <span className="error-text">{errors.password}</span> : null}
          </div>

          <button type="submit" className="button button--primary button--full" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="auth-switch">
          <span>{mode === 'login' ? 'Need an account?' : 'Already registered?'}</span>
          <button type="button" className="link-button" onClick={onSwitchMode}>
            {mode === 'login' ? 'Register here' : 'Login here'}
          </button>
        </div>
      </div>
    </div>
  )
}
