import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'

const faqs = [
  {
    q: 'Bagaimana cara mendaftar akun?',
    a: 'Klik tombol Register di halaman utama, lalu isi data diri Anda dengan lengkap. Pastikan email yang digunakan valid untuk verifikasi.',
    category: 'Account',
  },
  {
    q: 'Bagaimana jika lupa password?',
    a: 'Gunakan fitur Forgot Password di halaman login. Masukkan email yang terdaftar, lalu ikuti instruksi yang dikirim ke email Anda.',
    category: 'Account',
  },
  {
    q: 'Bagaimana cara menghubungi admin?',
    a: 'Silakan kirim email ke support@jagoanacademy.com atau gunakan fitur chat yang tersedia di dashboard.',
    category: 'Support',
  },
  {
    q: 'Bagaimana cara mengakses course?',
    a: 'Setelah login, pilih course yang ingin dipelajari dari halaman Courses. Klik "Enroll" untuk mulai belajar.',
    category: 'Learning',
  },
  {
    q: 'Apakah ada sertifikat setelah menyelesaikan course?',
    a: 'Ya, Anda akan mendapatkan sertifikat digital setelah menyelesaikan course dengan nilai minimal yang ditentukan.',
    category: 'Learning',
  },
  {
    q: 'Bagaimana cara mengunduh materi pembelajaran?',
    a: 'Materi dapat diunduh dari halaman course detail. Klik tombol download di samping setiap materi.',
    category: 'Learning',
  },
]

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(faqs.map((faq) => faq.category))]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
          <div className="max-w-4xl w-full">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Help Center
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Temukan jawaban dari pertanyaan yang sering diajukan di bawah
                ini. Jika masih ada kendala, silakan hubungi admin melalui email
                atau chat.
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Cari pertanyaan atau jawaban..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                  />
                </div>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tidak ada hasil ditemukan
                  </h3>
                  <p className="text-gray-600">
                    Coba ubah kata kunci pencarian atau pilih kategori yang
                    berbeda.
                  </p>
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-pink-600 font-bold text-sm">
                          Q
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {faq.q}
                          </h3>
                          <span className="inline-block bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
                            {faq.category}
                          </span>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-green-600 font-bold text-sm">
                              A
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Contact Section */}
            <div className="mt-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl shadow-lg p-8 text-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Masih butuh bantuan?
                </h3>
                <p className="text-pink-100 mb-6">
                  Tim support kami siap membantu Anda 24/7
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:support@jagoanacademy.com"
                    className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email Support
                  </a>
                  <button className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Live Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpCenter
