import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password.length < 8 || form.confirm.length < 8) {
      alert('Password dan konfirmasi password minimal 8 karakter')
      return
    }
    if (form.password !== form.confirm) {
      alert('Password dan konfirmasi password tidak sama')
      return
    }
    // Ambil data users dari localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    // Cek email sudah terdaftar
    if (users.some((u) => u.email === form.email)) {
      alert('Email sudah terdaftar!')
      return
    }
    // Simpan user baru
    users.push({
      name: form.name,
      email: form.email,
      password: form.password,
    })
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('token', 'dummy-token')
    setSuccess(true)
    setTimeout(() => {
      navigate('/login')
    }, 1500)
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
    if (navbar) navbar.style.display = 'none'
    if (footer) footer.style.display = 'none'
    return () => {
      if (navbar) navbar.style.display = ''
      if (footer) footer.style.display = ''
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-pink-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-md">
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
              Registrasi Berhasil!
            </h2>
            <p className="text-gray-500">Mengalihkan ke halaman login...</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-2">
              Daftar Akun Baru
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Sudah punya akun?{' '}
              <Link
                to="/login"
                className="text-pink-500 font-medium hover:underline"
              >
                Masuk sekarang
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
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
                  minLength={8}
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
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirm"
                  placeholder="Confirm Password"
                  value={form.confirm}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 pr-10"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowConfirm((v) => !v)}
                  tabIndex={-1}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg mt-2 transition-colors"
              >
                Create Account
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default Register