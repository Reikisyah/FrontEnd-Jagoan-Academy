// Login.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { login as loginApi, getMe } from '../../utils/api/authApi'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Validasi email format sebelum submit
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      toast.error('Format email tidak valid')
      setLoading(false)
      return
    }
    try {
      const requestData = {
        email: form.email,
        password: form.password,
        remember: remember,
      }
      console.log('🚀 [LOGIN] Data yang akan dikirim:', {
        email: form.email,
        remember: remember,
      })

      console.log('📡 [LOGIN] Mengirim request ke backend...')
      const res = await loginApi(requestData)

      console.log('✅ [LOGIN] Response dari backend:', res)

      // Jika backend mengembalikan token, simpan ke localStorage/sessionStorage
      const token = res.token || (res.data && res.data.token)
      const role = res.role || (res.data && res.data.role)
      const name = res.name || (res.data && res.data.name)
      const email = res.email || (res.data && res.data.email)
      const mentor_id = res.id || (res.data && res.data.id)
      if (token) {
        if (remember) {
          localStorage.setItem('token', token)
          if (role) localStorage.setItem('role', role)
          if (name) localStorage.setItem('name', name)
          if (email) localStorage.setItem('email', email)
          if (mentor_id) localStorage.setItem('mentor_id', mentor_id)
          console.log(
            '💾 [LOGIN] Token dan role tersimpan di localStorage (remember = true)',
          )
        } else {
          sessionStorage.setItem('token', token)
          localStorage.removeItem('token')
          if (role) localStorage.setItem('role', role)
          if (name) localStorage.setItem('name', name)
          if (email) localStorage.setItem('email', email)
          if (mentor_id) localStorage.setItem('mentor_id', mentor_id)
          console.log(
            '💾 [LOGIN] Token tersimpan di sessionStorage (remember = false)',
          )
        }
        // Jika name/email/mentor_id belum ada, ambil dari /me
        if (!name || !email || !mentor_id) {
          try {
            const userData = await getMe(token)
            if (userData.name) localStorage.setItem('name', userData.name)
            if (userData.email) localStorage.setItem('email', userData.email)
            if (userData.id) localStorage.setItem('mentor_id', userData.id)
          } catch (err) {
            console.error('[LOGIN] Gagal mengambil data user dari /me:', err)
          }
        }
      }

      localStorage.setItem('rememberMeChecked', remember ? 'true' : 'false')
      console.log('🎉 [LOGIN] Login berhasil! Redirect ke homepage...')
      setSuccess(true)
      toast.success('Login berhasil!')
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } catch (err) {
      console.error('❌ [LOGIN] Error:', err)
      console.error('❌ [LOGIN] Error message:', err.message)
      // Tampilkan pesan error spesifik dari BE jika ada
      if (err && err.message) {
        toast.error(err.message)
      } else if (err && err.errors) {
        // Jika BE mengembalikan errors object
        const errorMessages = Object.values(err.errors).flat().join(', ')
        toast.error(errorMessages)
      } else {
        toast.error('Login gagal. Pastikan email dan password benar.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Handler untuk Google Auth
  const handleGoogleAuth = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://lms.alanwari.ponpes.id/api/auth/google')
      const json = await res.json()
      if (json.data) {
        window.location.href = json.data
      } else {
        alert('Gagal mendapatkan link Google Auth')
      }
    } catch (err) {
      alert('Gagal menghubungi server Google Auth')
    }
  }

  // Sembunyikan Navbar dan Footer jika ada (untuk layout global)
  useEffect(() => {
    // Cari elemen navbar dengan berbagai kemungkinan
    let navbar =
      document.querySelector(
        'header, .navbar, #navbar, nav, [role="navigation"]',
      ) ||
      Array.from(document.querySelectorAll('div,section')).find(
        (el) =>
          el.textContent &&
          el.textContent
            .replace(/\s+/g, '')
            .toLowerCase()
            .includes('jagoanacademy') &&
          el.querySelector('a,button,input'),
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
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-pink-50 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg">
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
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-pink-600 mb-3 sm:mb-4">
                Masuk ke Akun Anda
              </h2>
              <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                Belum punya akun?{' '}
                <Link
                  to="/register"
                  className="text-pink-500 font-medium hover:underline transition-colors duration-200"
                >
                  Daftar gratis
                </Link>
              </p>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Alamat Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 text-sm sm:text-base transition-all duration-200"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Kata Sandi"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 pr-12 text-sm sm:text-base transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={18} />
                    ) : (
                      <FaEye size={18} />
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3 mb-4">
                  <label className="flex items-center text-sm text-gray-600 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox accent-pink-500 mr-2 w-4 h-4"
                      style={{ accentColor: '#ec4899' }}
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    Ingat saya
                  </label>
                  <Link
                    to="#"
                    className="text-pink-500 text-sm font-medium hover:underline whitespace-nowrap transition-colors duration-200"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 sm:py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    'Masuk'
                  )}
                </button>
              </form>
              {/* Login dengan Google */}
              <div className="mt-6 flex flex-col items-center">
                <span className="text-gray-400 text-sm mb-2">atau</span>
                <button
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-lg shadow-sm transition-colors duration-200"
                  style={{ textDecoration: 'none' }}
                  type="button"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Login dengan Google
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login
