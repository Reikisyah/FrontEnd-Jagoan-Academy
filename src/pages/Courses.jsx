import React, { useState, useRef } from 'react'

const courseData = [
  {
    title: 'Dasar-Dasar Pengembangan Website: HTML, CSS dan...',
    author: 'Remote Worker Indonesia',
    rating: 4.6,
    reviews: 56,
    price: 'Rp309.000',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=400&h=200&q=80',
    label: null,
  },
  {
    title: 'Belajar Web Development Menggunakan Bahasa...',
    author: 'CodePolitan Online',
    rating: 4.4,
    reviews: 397,
    price: 'Rp549.000',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=400&h=200&q=80',
    label: null,
  },
  {
    title: 'Web Programming Dasar Sampai Mahir',
    author: 'Dr. (c). Junaidi S.Kom, M.Kom, GCT, GCE',
    rating: 4.7,
    reviews: 38,
    price: 'Rp289.000',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=200&q=80',
    label: null,
  },
  {
    title: 'The Complete Full-Stack Web Development Bootcamp',
    author: 'Dr. Angela Yu, Developer and Lead...',
    rating: 4.7,
    reviews: 446057,
    price: 'Rp669.000',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=200&q=80',
    label: 'Terlaris',
  },
  {
    title: 'React JS: Pemula sampai Mahir',
    author: 'Dicoding Indonesia',
    rating: 4.8,
    reviews: 120,
    price: 'Rp399.000',
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&h=200&q=80',
    label: 'Terlaris', // Tambahkan label di card ke-5 (slide kedua)
  },
  {
    title: 'Node.js & Express: Web API Development',
    author: 'Udemy',
    rating: 4.5,
    reviews: 210,
    price: 'Rp359.000',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=200&q=80',
    label: null,
  },
  {
    title: 'UI/UX Design Fundamentals',
    author: 'Coursera',
    rating: 4.6,
    reviews: 89,
    price: 'Rp299.000',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=400&h=200&q=80',
    label: null,
  },
  {
    title: 'Digital Marketing Mastery',
    author: 'Skill Academy',
    rating: 4.3,
    reviews: 75,
    price: 'Rp279.000',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&h=200&q=80',
    label: null,
  },
]

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 p-3 sm:p-4 w-full max-w-[280px] min-h-[320px] sm:min-h-[340px] flex flex-col cursor-pointer h-full mx-auto">
    <div className="h-[120px] sm:h-[140px] w-full rounded-lg overflow-hidden mb-3 bg-gray-100 flex items-center justify-center">
      <img
        src={course.img}
        alt={course.title}
        className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
      />
    </div>
    <div className="flex-1 flex flex-col">
      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 leading-tight line-clamp-2 hover:text-pink-600 transition-colors">
        {course.title}
      </h3>
      <div className="text-xs sm:text-sm text-gray-500 mb-2 line-clamp-1">
        {course.author}
      </div>
      <div className="flex items-center gap-1 text-yellow-500 text-sm sm:text-base font-semibold mb-2">
        {course.rating}
        <span className="text-yellow-400">★</span>
        <span className="text-gray-400 text-xs font-normal">
          ({course.reviews.toLocaleString()})
        </span>
      </div>
      <div className="flex-1"></div>
      <div className="flex items-end justify-between mt-2 gap-2">
        <div className="text-pink-600 font-bold text-base sm:text-lg">
          {course.price}
        </div>
        {course.label && (
          <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
            {course.label}
          </span>
        )}
      </div>
    </div>
  </div>
)

const Courses = () => {
  const [showAll, setShowAll] = useState(false)
  const [slide, setSlide] = useState(0) // 0: first 4, 1: next 4
  const [animating, setAnimating] = useState(false)
  const [slideDir, setSlideDir] = useState(0) // -1: left, 1: right, 0: idle
  const [viewAllState, setViewAllState] = useState('hidden') // 'hidden', 'entering', 'visible', 'exiting'
  const sliderRef = useRef(null)

  const visibleCourses = showAll
    ? courseData
    : courseData.slice(slide * 4, slide * 4 + 4)

  const canSlideLeft = slide > 0
  const canSlideRight = !showAll && (slide + 1) * 4 < courseData.length

  // Animasi slide horizontal yang smooth dengan grid wrapper
  const handleSlide = (dir) => {
    if (animating) return
    setSlideDir(dir)
    setAnimating(true)
    setTimeout(() => {
      setSlide((s) => s + dir)
      setAnimating(false)
      setSlideDir(0)
    }, 250)
  }

  // View All animasi geser horizontal (slide in/out)
  const handleViewAll = () => setShowAll(true)
  const handleCloseAll = () => setShowAll(false)

  // Transition end handler for view all
  const handleViewAllTransitionEnd = () => {
    if (viewAllState === 'entering') setViewAllState('visible')
    if (viewAllState === 'exiting') setViewAllState('hidden')
  }

  React.useEffect(() => {
    if (viewAllState === 'entering') setShowAll(true)
    if (viewAllState === 'hidden') setShowAll(false)
    if (viewAllState === 'exiting') setSlide(0)
  }, [viewAllState])

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4 sm:mb-6">
          Jelajahi Kursus Populer Kami
        </h2>
        <p className="text-center text-gray-500 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
          Dari keahlian{' '}
          <span className="font-semibold text-gray-900">penting</span> hingga
          topik teknis, Jagoan Academy mendukung pengembangan profesional Anda.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4 sm:px-0">
          <button className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-pink-600 text-white font-semibold shadow-md hover:bg-pink-700 hover:shadow-lg transition-all duration-200 text-sm sm:text-base">
            Semua
          </button>
          <button className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gray-100 text-gray-700 font-semibold border border-gray-300 hover:bg-gray-200 hover:border-gray-400 transition-all duration-200 text-sm sm:text-base">
            Bisnis (0)
          </button>
        </div>
        <div className="relative">
          {/* Slider arrows - Hidden on mobile */}
          {!showAll && (
            <>
              <button
                className={`hidden lg:flex absolute left-[-30px] top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow rounded-full w-10 h-10 items-center justify-center text-gray-500 hover:text-pink-500 z-10 ${!canSlideLeft ? 'opacity-0 pointer-events-none' : ''}`}
                onClick={() => handleSlide(-1)}
                disabled={!canSlideLeft || animating}
                aria-label="Sebelumnya"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className={`hidden lg:flex absolute right-[-30px] top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow rounded-full w-10 h-10 items-center justify-center text-gray-500 hover:text-pink-500 z-10 ${!canSlideRight ? 'opacity-0 pointer-events-none' : ''}`}
                onClick={() => handleSlide(1)}
                disabled={!canSlideRight || animating}
                aria-label="Selanjutnya"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                  `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center transition-all duration-500 ease-in-out ` +
                  (slideDir === -1 ? 'opacity-0 -translate-x-8' : '') +
                  (slideDir === 1 ? 'opacity-0 translate-x-8' : '') +
                  (slideDir === 0 ? 'opacity-100 translate-x-0' : '')
                }
                onTransitionEnd={() => setSlideDir(0)}
              >
                {visibleCourses.map((course, idx) => (
                  <CourseCard key={idx} course={course} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center opacity-0 animate-fade-in">
              {courseData.map((course, idx) => (
                <CourseCard key={idx} course={course} />
              ))}
            </div>
          )}
        </div>
        {/* View All Button */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <div className="relative">
            <button
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm transform hover:scale-105 ${
                !showAll 
                  ? 'bg-pink-600 text-white hover:bg-pink-700 opacity-100' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 opacity-100'
              }`}
              onClick={!showAll ? handleViewAll : handleCloseAll}
            >
              {!showAll ? 'View All' : 'Tutup'}
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Courses
