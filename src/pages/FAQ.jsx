import React, { useState } from "react";

const faqData = [
  {
    question: "Bagaimana cara mendaftar di Jagoan Academy?",
    answer: "Anda dapat mendaftar dengan mengklik tombol 'Sign up' di pojok kanan atas dan mengisi formulir pendaftaran."
  },
  {
    question: "Apakah ada biaya tersembunyi?",
    answer: "Tidak, semua biaya akan diinformasikan secara transparan sebelum Anda melakukan pembayaran."
  },
  {
    question: "Bisakah saya mendapatkan pengembalian dana?",
    answer: "Ya, Anda dapat mengajukan pengembalian dana sesuai dengan kebijakan refund kami."
  },
  {
    question: "Bagaimana cara mengakses materi kursus?",
    answer: "Setelah mendaftar dan membayar, Anda dapat mengakses materi kursus melalui dashboard akun Anda."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">Pertanyaan yang Sering Diajukan</h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          Temukan jawaban atas pertanyaan yang sering ditanyakan tentang Jagoan Academy.
        </p>
        <div className="space-y-5">
          {faqData.map((item, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl shadow p-5">
              <button
                className="w-full flex justify-between items-center text-lg font-medium text-gray-900 focus:outline-none"
                onClick={() => toggle(idx)}
              >
                {item.question}
                <span className="ml-2 text-2xl text-gray-400">{openIndex === idx ? "−" : "+"}</span>
              </button>
              {openIndex === idx && (
                <div className="mt-3 text-gray-600 text-base animate-fade-in">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
