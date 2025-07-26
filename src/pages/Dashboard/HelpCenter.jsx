import React from 'react'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'

const faqs = [
  {
    q: 'Bagaimana cara mendaftar akun?',
    a: 'Klik tombol Register di halaman utama, lalu isi data diri Anda.',
  },
  {
    q: 'Bagaimana jika lupa password?',
    a: 'Gunakan fitur Forgot Password di halaman login.',
  },
  {
    q: 'Bagaimana cara menghubungi admin?',
    a: 'Silakan kirim email ke support@lms.com.',
  },
]

const HelpCenter = () => (
  <div className="flex min-h-screen bg-white">
    <Sidebar />
    <div className="flex-1 flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
        <div className="max-w-2xl w-full">
          <h1 className="text-2xl font-bold text-pink-700 mb-4">Help Center</h1>
          <p className="mb-8 text-gray-600">
            Temukan jawaban dari pertanyaan yang sering diajukan di bawah ini.
            Jika masih ada kendala, silakan hubungi admin.
          </p>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-pink-50 rounded-xl p-4 shadow">
                <div className="font-semibold text-pink-700 mb-1">{faq.q}</div>
                <div className="text-gray-700">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default HelpCenter
