import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] sm:min-h-[80vh] w-full bg-white px-4 sm:px-6 lg:px-8">
      <div className="text-center mt-16 sm:mt-20 lg:mt-24 mb-8 sm:mb-12 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
          <span className="block">Temukan Potensi Anda</span>
          <span className="text-pink-600 block mt-2">di Jagoan Academy</span>
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
          Kembangkan keterampilan Anda dengan kursus berkualitas tinggi dari
          para ahli di bidangnya.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
          <button className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-4 rounded-lg bg-pink-600 text-white font-semibold shadow-lg hover:bg-pink-700 hover:shadow-xl transition-all duration-200 text-sm sm:text-base">
            Mulai Belajar Sekarang
          </button>
          <button className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-4 rounded-lg border-2 border-pink-500 text-pink-600 font-semibold bg-white hover:bg-pink-50 hover:border-pink-600 transition-all duration-200 text-sm sm:text-base">
            Lihat Kursus
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
