
import React from "react";

const Pengalaman = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">Pengalaman Terbukti Kami</h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          Bergabunglah dengan ribuan pelajar yang telah meraih kesuksesan dan membangun karier impian bersama kami.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8">
          <div className="flex-1 bg-white rounded-xl shadow-lg p-8 text-center transition hover:shadow-2xl">
            <div className="text-3xl md:text-4xl font-extrabold text-pink-600 mb-2">10,000+</div>
            <div className="text-gray-600 text-lg">Pelajar Terdaftar</div>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-lg p-8 text-center transition hover:shadow-2xl">
            <div className="text-3xl md:text-4xl font-extrabold text-pink-600 mb-2">200+</div>
            <div className="text-gray-600 text-lg">Kursus Tersedia</div>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-lg p-8 text-center transition hover:shadow-2xl">
            <div className="text-3xl md:text-4xl font-extrabold text-pink-600 mb-2">95%</div>
            <div className="text-gray-600 text-lg">Tingkat Kepuasan</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pengalaman;
