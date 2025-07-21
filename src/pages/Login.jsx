// Login.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [remember, setRemember] = useState(() => {
    // Try to persist checkbox state if needed
    const saved = localStorage.getItem('rememberMeChecked')
    return saved === 'true'
  })
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ambil data users dari localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(
      (u) => u.email === form.email && u.password === form.password
    )
    if (user) {
      if (remember) {
        localStorage.setItem('token', 'dummy-token')
      } else {
        sessionStorage.setItem('token', 'dummy-token')
        localStorage.removeItem('token')
      }
      localStorage.setItem('rememberMeChecked', remember ? 'true' : 'false')
      setSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } else {
      alert('Email atau password salah!')
    }
  }

  // Sembunyikan Navbar dan Footer jika ada (untuk layout global)
  useEffect(() => {
    // Cari elemen navbar dengan berbagai kemungkinan
    let navbar =
      document.querySelector(
        'header, .navbar, #navbar, nav, [role="navigation"]'
      ) ||
      Array.from(document.querySelectorAll('div,section')).find(
        (el) =>
          el.textContent &&
          el.textContent
            .replace(/\s+/g, '')
            .toLowerCase()
            .includes('jagoanacademy') &&
          el.querySelector('a,button,input')
      )
    const footer = document.querySelector('footer, .footer, #footer')
    if (navbar) {
      navbar._oldDisplay = navbar.style.display
      navbar._oldVisibility = navbar.style.visibility
      navbar._oldPosition = navbar.style.position
      navbar.style.display = 'none'
      navbar.style.visibility = 'hidden'
      navbar.style.position = 'absolute'
    }
    if (footer) {
      footer._oldDisplay = footer.style.display
      footer._oldVisibility = footer.style.visibility
      footer._oldPosition = footer.style.position
      footer.style.display = 'none'
      footer.style.visibility = 'hidden'
      footer.style.position = 'absolute'
    }
    return () => {
      if (navbar) {
        navbar.style.display = navbar._oldDisplay || ''
        navbar.style.visibility = navbar._oldVisibility || ''
        navbar.style.position = navbar._oldPosition || ''
      }
      if (footer) {
        footer.style.display = footer._oldDisplay || ''
        footer.style.visibility = footer._oldVisibility || ''
        footer.style.position = footer._oldPosition || ''
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-pink-50">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-md">
        {success ? (
          <div className="flex flex-col items-center justify-center h-64">
            <svg
              className="animate-bounce mb-4 text-pink-500"
              width="48"
              height="48"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">
              Login Berhasil!
            </h2>
            <p className="text-gray-500">Mengalihkan ke halaman utama...</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-600 mb-2 whitespace-nowrap">
              Masuk ke Akun Anda
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Belum punya akun?{' '}
              <Link
                to="/register"
                className="text-pink-500 font-medium hover:underline"
              >
                Daftar gratis
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex items-center justify-between mt-2 mb-2">
                <label className="flex items-center text-sm text-gray-600 select-none">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-pink-500 mr-2"
                    style={{ accentColor: '#ec4899' }}
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember me
                </label>
                <Link
                  to="#"
                  className="text-pink-400 text-sm font-bold hover:underline whitespace-nowrap"
                >
                  Forgot your password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg mt-2 transition-colors"
              >
                Login
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default Login