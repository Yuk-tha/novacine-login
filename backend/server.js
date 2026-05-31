const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

// ── Middleware ───────────────────────────────────────────
app.use(cors())
app.use(express.json())

// ── Mock credentials ─────────────────────────────────────
const MOCK_USERS = [
  { email: 'user@novacine.com', password: 'nova123' },
  { email: 'admin@novacine.com', password: 'admin123' },
]

// ── Login Route ──────────────────────────────────────────
app.post('/api/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  )

  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or password.' })
  }

  return res.status(200).json({
    message: 'Login successful',
    user: { email: user.email },
  })
})

// ── Health check ─────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'NovaCine API is running 🎬' })
})
// ── Signup Route ─────────────────────────────────────────
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  // Check if user already exists
  const exists = MOCK_USERS.find((u) => u.email === email)
  if (exists) {
    return res.status(409).json({ message: 'An account with this email already exists.' })
  }

  // Add new user to mock list
  MOCK_USERS.push({ email, password })

  return res.status(201).json({ message: 'Account created successfully!' })
})
// ── Start server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})