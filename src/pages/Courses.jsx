
import React, { useState, useRef } from "react";


const courseData = [
  {
    title: "Dasar-Dasar Pengembangan Website: HTML, CSS dan...",
    author: "Remote Worker Indonesia",
    rating: 4.6,
    reviews: 56,
    price: "Rp309.000",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=400&h=200&q=80",
    label: null
  },
  {
    title: "Belajar Web Development Menggunakan Bahasa...",
    author: "CodePolitan Online",
    rating: 4.4,
    reviews: 397,
    price: "Rp549.000",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=400&h=200&q=80",
    label: null
  },
  {
    title: "Web Programming Dasar Sampai Mahir",
    author: "Dr. (c). Junaidi S.Kom, M.Kom, GCT, GCE",
    rating: 4.7,
    reviews: 38,
    price: "Rp289.000",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=200&q=80",
    label: null
  },
  {
    title: "The Complete Full-Stack Web Development Bootcamp",
    author: "Dr. Angela Yu, Developer and Lead...",
    rating: 4.7,
    reviews: 446057,
    price: "Rp669.000",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=200&q=80",
    label: "Terlaris"
  },
  {
    title: "React JS: Pemula sampai Mahir",
    author: "Dicoding Indonesia",
    rating: 4.8,
    reviews: 120,
    price: "Rp399.000",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&h=200&q=80",
    label: "Terlaris" // Tambahkan label di card ke-5 (slide kedua)
  },
  {
    title: "Node.js & Express: Web API Development",
    author: "Udemy",
    rating: 4.5,
    reviews: 210,
    price: "Rp359.000",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=200&q=80",
    label: null
  },
  {
    title: "UI/UX Design Fundamentals",
    author: "Coursera",
    rating: 4.6,
    reviews: 89,
    price: "Rp299.000",
    img: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=400&h=200&q=80",
    label: null
  },
  {
    title: "Digital Marketing Mastery",
    author: "Skill Academy",
    rating: 4.3,
    reviews: 75,
    price: "Rp279.000",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&h=200&q=80",
    label: null
  }
];

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition p-4 w-[250px] min-h-[340px] flex flex-col cursor-pointer h-full">
    <div className="h-[140px] w-full rounded-lg overflow-hidden mb-3 bg-gray-100 flex items-center justify-center">
      <img src={course.img} alt={course.title} className="object-cover w-full h-full" />
    </div>
    <div className="flex-1 flex flex-col">
      <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight line-clamp-2">{course.title}</h3>
      <div className="text-sm text-gray-500 mb-1">{course.author}</div>
      <div className="flex items-center gap-1 text-yellow-500 text-base font-semibold mb-1">
        {course.rating}
        <span className="text-yellow-400">★</span>
        <span className="text-gray-400 text-xs font-normal">({course.reviews.toLocaleString()})</span>
      </div>
      <div className="flex-1"></div>
      <div className="flex items-end justify-between mt-2">
        <div className="text-pink-600 font-bold text-lg">{course.price}</div>
        {course.label && (
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded w-fit ml-2">{course.label}</span>
        )}
      </div>
    </div>
  </div>
);

const Courses = () => {

  const [showAll, setShowAll] = useState(false);
  const [slide, setSlide] = useState(0); // 0: first 4, 1: next 4
  const [animating, setAnimating] = useState(false);
  const sliderRef = useRef(null);


  const visibleCourses = showAll
    ? courseData
    : courseData.slice(slide * 4, slide * 4 + 4);

  const canSlideLeft = slide > 0;
  const canSlideRight = !showAll && (slide + 1) * 4 < courseData.length;

  // Animasi slide horizontal yang smooth dengan grid wrapper
  const [slideAnim, setSlideAnim] = useState(0); // % offset
  const handleSlide = (dir) => {
    if (animating) return;
    setAnimating(true);
    setSlideAnim(-dir * 100); // -100% (left), 100% (right)
    setTimeout(() => {
      setSlide((s) => s + dir);
      setSlideAnim(0);
      setAnimating(false);
    }, 400);
  };

  // View All animasi geser horizontal (slide in/out)
  const [viewAllAnim, setViewAllAnim] = useState(false); // 'in', 'out', or false
  const [showGrid, setShowGrid] = useState(false); // render grid

  const handleViewAll = () => {
    setShowGrid(true);
    setTimeout(() => {
      setViewAllAnim('in'); // animasi masuk (geser dari kanan)
      setTimeout(() => {
        setShowAll(true);
        setViewAllAnim(false);
      }, 500);
    }, 10);
  };

  const handleCloseAll = () => {
    setViewAllAnim('out'); // animasi keluar (geser ke kanan)
    setTimeout(() => {
      setShowAll(false);
      setSlide(0);
      setViewAllAnim(false);
      setShowGrid(false);
    }, 500);
  };

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Jelajahi Kursus Populer Kami</h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          Dari keahlian <span className="font-semibold text-gray-900">penting</span> hingga topik teknis, Jagoan Academy mendukung pengembangan profesional Anda.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <button className="px-6 py-2 rounded-full bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition">Semua</button>
          <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold border border-gray-300">Bisnis (0)</button>
        </div>
        <div className="relative">
          {/* Slider arrows */}
          {!showAll && (
            <>
              <button
                className={`absolute left-[-30px] top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow rounded-full w-10 h-10 flex items-center justify-center text-gray-500 hover:text-pink-500 transition z-10 ${!canSlideLeft ? 'opacity-0 pointer-events-none' : ''}`}
                onClick={() => handleSlide(-1)}
                disabled={!canSlideLeft || animating}
                aria-label="Sebelumnya"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button
                className={`absolute right-[-30px] top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow rounded-full w-10 h-10 flex items-center justify-center text-gray-500 hover:text-pink-500 transition z-10 ${!canSlideRight ? 'opacity-0 pointer-events-none' : ''}`}
                onClick={() => handleSlide(1)}
                disabled={!canSlideRight || animating}
                aria-label="Selanjutnya"
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </>
          )}
          {/* Card grid/slider */}
          {!showAll ? (
            <div
              className="overflow-hidden"
              style={{ maxWidth: '1100px', margin: '0 auto' }}
            >
              <div
                className={
                  `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12 justify-items-center transition-transform duration-500 h-full`
                }
                style={{
                  transform: `translateX(${slideAnim}%)`,
                }}
              >
                {visibleCourses.map((course, idx) => (
                  <CourseCard key={idx} course={course} />
                ))}
              </div>
            </div>
          ) : (
            showGrid && (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12 justify-items-center transition-transform duration-500 h-full`
                  + (viewAllAnim === 'in' ? ' translate-x-full opacity-0 pointer-events-none' : '')
                  + (showAll && !viewAllAnim ? ' translate-x-0 opacity-100 pointer-events-auto' : '')
                  + (viewAllAnim === 'out' ? ' -translate-x-full opacity-0 pointer-events-none' : '')}
                style={{ transitionProperty: 'transform, opacity', transitionDuration: '500ms' }}
              >
                {courseData.map((course, idx) => <CourseCard key={idx} course={course} />)}
              </div>
            )
          )}
        </div>
        {/* View All Button */}
        {!showAll && (
          <div className="flex justify-center mt-8">
            <button
              className="text-sm text-gray-400 font-semibold hover:underline focus:outline-none bg-transparent p-0 min-w-0 shadow-none border-none"
              style={{ background: 'none', boxShadow: 'none' }}
              onClick={handleViewAll}
              disabled={animating}
            >
              View All
            </button>
          </div>
        )}
        {showAll && (
          <div className="flex justify-center mt-8">
            <button
              className="text-sm text-gray-400 font-semibold hover:underline focus:outline-none bg-transparent p-0 min-w-0 shadow-none border-none"
              style={{ background: 'none', boxShadow: 'none' }}
              onClick={handleCloseAll}
              disabled={animating}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;
