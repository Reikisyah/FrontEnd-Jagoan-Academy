import React, { useState } from 'react'

const faqData = [
  {
    question: 'Bagaimana cara mendaftar di Jagoan Academy?',
    answer:
      "Anda dapat mendaftar dengan mengklik tombol 'Sign up' di pojok kanan atas dan mengisi formulir pendaftaran.",
  },
  {
    question: 'Apakah ada biaya tersembunyi?',
    answer:
      'Tidak, semua biaya akan diinformasikan secara transparan sebelum Anda melakukan pembayaran.',
  },
  {
    question: 'Bisakah saya mendapatkan pengembalian dana?',
    answer:
      'Ya, Anda dapat mengajukan pengembalian dana sesuai dengan kebijakan refund kami.',
  },
  {
    question: 'Bagaimana cara mengakses materi kursus?',
    answer:
      'Setelah mendaftar dan membayar, Anda dapat mengakses materi kursus melalui dashboard akun Anda.',
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="w-full py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-3">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-center text-gray-500 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto text-sm sm:text-base">
          Temukan jawaban atas pertanyaan yang sering ditanyakan tentang Jagoan
          Academy.
        </p>
        <div className="space-y-3 sm:space-y-4 lg:space-y-5">
          {faqData.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg sm:rounded-xl shadow p-4 sm:p-5"
            >
              <button
                className="w-full flex justify-between items-center text-base sm:text-lg font-medium text-gray-900 focus:outline-none"
                onClick={() => toggle(idx)}
              >
                {item.question}
                <span
                  className={`ml-2 text-2xl inline-block transition-transform duration-500 ease-in-out`}
                  style={{
                    color: '#ec4899',
                    transition: 'color 0.3s, transform 0.5s',
                    transform:
                      openIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  {openIndex === idx ? '−' : '+'}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out mt-3 text-gray-600 text-base ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{
                  transitionProperty: 'max-height, opacity',
                }}
              >
                <div className="py-1">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
