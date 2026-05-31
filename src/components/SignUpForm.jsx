import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const InputField = ({ type, placeholder, value, onChange, error }) => (
  <div className="flex flex-col gap-1">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full bg-zinc-800 text-white placeholder-zinc-400 rounded px-4 py-4
        focus:outline-none focus:ring-2 transition-all
        ${error ? 'ring-2 ring-orange-500' : 'focus:ring-white/30'}`}
    />
    {error && (
      <p className="text-orange-400 text-xs px-1">{error}</p>
    )}
  </div>
)

function SignUpForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Please enter your full name.'
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!password.trim()) {
      newErrors.password = 'Please enter a password.'
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters.'
    }

    if (!confirm.trim()) {
      newErrors.confirm = 'Please confirm your password.'
    } else if (confirm !== password) {
      newErrors.confirm = 'Passwords do not match.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password,
      })

      if (response.status === 201) {
        setSuccess('Account created! Redirecting to login...')
        setTimeout(() => navigate('/'), 2000)
      }
    } catch (error) {
      if (error.response) {
        setErrors({ api: error.response.data.message })
      } else {
        setErrors({ api: 'Unable to connect to server. Please try again.' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-black/75 rounded-lg px-16 py-12">
      <h2 className="text-white text-3xl font-bold mb-8">Sign Up</h2>

      <div className="flex flex-col gap-4">

        {/* API error */}
        {errors.api && (
          <div className="bg-orange-500/20 border border-orange-500 text-orange-300 text-sm rounded px-4 py-3">
            {errors.api}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-300 text-sm rounded px-4 py-3">
            {success}
          </div>
        )}

        {/* Name */}
        <InputField
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }))
          }}
          error={errors.name}
        />

        {/* Email */}
        <InputField
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }))
          }}
          error={errors.email}
        />

        {/* Password */}
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }))
          }}
          error={errors.password}
        />

        {/* Confirm Password */}
        <InputField
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value)
            if (errors.confirm) setErrors((prev) => ({ ...prev, confirm: '' }))
          }}
          error={errors.confirm}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900
            disabled:cursor-not-allowed text-white font-semibold py-4 rounded
            mt-2 transition-colors"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="text-zinc-500 text-sm mt-4">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/')}
            className="text-white hover:underline font-medium cursor-pointer"
          >
            Sign in
          </span>
        </p>

      </div>
    </div>
  )
}

export default SignUpForm