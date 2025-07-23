import React from 'react'

const Pengalaman = () => {
  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-3">
          Pengalaman Terbukti Kami
        </h2>
        <p className="text-center text-gray-500 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto text-sm sm:text-base">
          Bergabunglah dengan ribuan pelajar yang telah meraih kesuksesan dan
          membangun karier impian bersama kami.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8">
          <div className="flex-1 bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 text-center transition hover:shadow-2xl">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-pink-600 mb-2">
              10,000+
            </div>
            <div className="text-gray-600 text-base sm:text-lg">
              Pelajar Terdaftar
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 text-center transition hover:shadow-2xl">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-pink-600 mb-2">
              200+
            </div>
            <div className="text-gray-600 text-base sm:text-lg">
              Kursus Tersedia
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 text-center transition hover:shadow-2xl">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-pink-600 mb-2">
              95%
            </div>
            <div className="text-gray-600 text-base sm:text-lg">
              Tingkat Kepuasan
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pengalaman
