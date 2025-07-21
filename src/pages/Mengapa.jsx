
import React from "react";

const features = [
  {
    icon: (
      <span className="inline-block bg-pink-100 p-3 rounded-full mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12V4l8 4-8 4-8-4 8-4z" /></svg>
      </span>
    ),
    title: "Kursus Terbaik",
    desc: "Akses ribuan kursus berkualitas tinggi dari para ahli di bidangnya."
  },
  {
    icon: (
      <span className="inline-block bg-blue-100 p-3 rounded-full mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </span>
    ),
    title: "Belajar Fleksibel",
    desc: "Pelajari kapan saja dan di mana saja sesuai kebutuhan Anda."
  },
  {
    icon: (
      <span className="inline-block bg-green-100 p-3 rounded-full mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </span>
    ),
    title: "Sertifikat Resmi",
    desc: "Dapatkan sertifikat resmi yang diakui industri setelah menyelesaikan kursus."
  },
  {
    icon: (
      <span className="inline-block bg-purple-100 p-3 rounded-full mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      </span>
    ),
    title: "Komunitas Aktif",
    desc: "Gabung dengan ribuan pelajar lainnya dan dapatkan dukungan dari komunitas."
  }
];

const Mengapa = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Mengapa Memilih Jagoan Academy?</h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Platform kami dirancang untuk memberikan pengalaman belajar terbaik dengan berbagai keunggulan yang mendukung kesuksesan Anda.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center transition hover:shadow-lg">
              {f.icon}
              <h3 className="font-semibold text-lg mb-2 text-gray-900">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mengapa;
