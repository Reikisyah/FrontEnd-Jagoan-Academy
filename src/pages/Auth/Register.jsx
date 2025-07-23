import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { register as registerApi } from '../../utils/api'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: 'participant', // Tambahkan default role
  })
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (form.password.length < 8) {
      toast.error('Password minimal 8 karakter')
      setLoading(false)
      return
    }
    if (form.password !== form.confirm) {
      toast.error('Password dan konfirmasi password tidak sama')
      setLoading(false)
      return
    }
    // Validasi email format sebelum submit
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      toast.error('Format email tidak valid')
      setLoading(false)
      return
    }
    try {
      // Debug: cek data yang akan dikirim
      const requestData = {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirm,
        role: form.role, // Ambil dari form
      }
      console.log('🚀 [REGISTER] Data yang akan dikirim:', requestData)

      // Kirim ke backend
      console.log('📡 [REGISTER] Mengirim request ke backend...')
      const res = await registerApi(requestData)

      console.log('✅ [REGISTER] Response dari backend:', res)
      // Ambil token dari res.token atau res.data.token
      const token = res.token || (res.data && res.data.token)
      const role = res.role || (res.data && res.data.role) || form.role
      if (token) {
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        localStorage.setItem('name', form.name)
        localStorage.setItem('email', form.email)
        console.log('💾 [REGISTER] Token dan role tersimpan di localStorage')
      }

      console.log('🎉 [REGISTER] Registrasi berhasil! Redirect ke login...')
      setSuccess(true)
      toast.success('Registrasi berhasil!')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
      console.error('❌ [REGISTER] Error:', err)
      console.error('❌ [REGISTER] Error message:', err.message)
      // Tampilkan pesan error spesifik dari BE jika ada
      if (err && err.message) {
        toast.error(err.message)
      } else if (err && err.errors) {
        // Jika BE mengembalikan errors object
        const errorMessages = Object.values(err.errors).flat().join(', ')
        toast.error(errorMessages)
      } else {
        toast.error(
          'Register gagal. Pastikan email belum terdaftar dan format benar.',
        )
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
    if (navbar) navbar.style.display = 'none'
    if (footer) footer.style.display = 'none'
    return () => {
      if (navbar) navbar.style.display = ''
      if (footer) footer.style.display = ''
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
                Registrasi Berhasil!
              </h2>
              <p className="text-gray-500">Mengalihkan ke halaman login...</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-pink-600 mb-2">
                Daftar Akun Baru
              </h2>
              <p className="text-center text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
                Sudah punya akun?{' '}
                <Link
                  to="/login"
                  className="text-pink-500 font-medium hover:underline"
                >
                  Masuk sekarang
                </Link>
              </p>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm sm:text-base"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm sm:text-base"
                  required
                />
                {/* Dropdown role */}
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm sm:text-base"
                  required
                >
                  <option value="participant">Participant</option>
                  <option value="mentor">Mentor</option>
                </select>

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
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg mt-2 transition-colors flex items-center justify-center"
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
                    'Create Account'
                  )}
                </button>
              </form>
              {/* Register dengan Google */}
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
                  Daftar dengan Google
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Register
