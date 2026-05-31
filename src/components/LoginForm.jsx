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

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = 'Please enter your email or phone number.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!password.trim()) {
      newErrors.password = 'Your password must contain between 4 and 60 characters.'
    } else if (password.length < 4) {
      newErrors.password = 'Your password must contain between 4 and 60 characters.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    setApiError('')
    if (!validate()) return

    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      })

      if (response.status === 200) {
        navigate('/dashboard')
      }
    } catch (error) {
      if (error.response) {
        setApiError(error.response.data.message)
      } else {
        setApiError('Unable to connect to server. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-black/75 rounded-lg px-16 py-12">
      <h2 className="text-white text-3xl font-bold mb-8">Sign In</h2>

      <div className="flex flex-col gap-4">

        {/* API error banner */}
        {apiError && (
          <div className="bg-orange-500/20 border border-orange-500 text-orange-300 text-sm rounded px-4 py-3">
            {apiError}
          </div>
        )}

        {/* Email */}
        <InputField
          type="email"
          placeholder="Email or phone number"
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

        {/* Sign In Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-900
            disabled:cursor-not-allowed text-white font-semibold py-4 rounded
            mt-2 transition-colors"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Footer links */}
        <div className="flex justify-between text-sm text-zinc-400 mt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-red-600" />
            Remember me
          </label>
          <a href="#" className="hover:underline">Need help?</a>
        </div>

        {/* Sign up link — navigates to /signup */}
        <p className="text-zinc-500 text-sm mt-4">
          New to NovaCine?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-white hover:underline font-medium cursor-pointer"
          >
            Sign up now
          </span>
        </p>

      </div>
    </div>
  )
}

export default LoginForm