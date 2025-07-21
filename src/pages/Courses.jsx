
import React from "react";

const Courses = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Jelajahi Kursus Populer Kami</h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          Dari keahlian <span className="font-semibold text-gray-900">penting</span> hingga topik teknis, Jagoan Academy mendukung pengembangan profesional Anda.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <button className="px-6 py-2 rounded-full bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition">Semua</button>
          <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold border border-gray-300">Bisnis (0)</button>
        </div>
        {/* Tempatkan daftar kursus di sini jika ada */}
      </div>
    </section>
  );
};

export default Courses;
