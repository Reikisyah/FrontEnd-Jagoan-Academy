
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] w-full bg-gradient-to-tr from-pink-50 via-white to-yellow-50">
      <div className="text-center mt-24 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Temukan Potensi Anda
          <br />
          <span className="text-pink-600">di Jagoan Academy</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
          Kembangkan keterampilan Anda dengan kursus berkualitas tinggi dari para ahli di bidangnya.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-7 py-3 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition">
            Mulai Belajar Sekarang
          </button>
          <button className="px-7 py-3 rounded-lg border-2 border-pink-500 text-pink-600 font-semibold bg-white hover:bg-pink-50 transition">
            Lihat Kursus
          </button>
        </div>
      </div>
      {/* Decorative faded circles background */}
      <div className="pointer-events-none select-none">
        {/* Pink faded circle - very large, soft, and centered left */}
        <div className="absolute -z-10 left-[-10vw] top-[-10vh] w-[900px] h-[900px] bg-pink-200 rounded-full opacity-40 blur-[220px]"></div>
        {/* Yellow faded circle - very large, soft, and centered right */}
        <div className="absolute -z-10 right-[-12vw] top-[0vh] w-[1000px] h-[1000px] bg-yellow-100 rounded-full opacity-35 blur-[240px]"></div>
      </div>
    </section>
  );
};

export default HeroSection;

