import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { getAllCourses } from '../../utils/api'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Fallback course data in case of API failure
const fallbackCourseData = [
  {
    id: 1,
    title: 'Dasar-Dasar Pengembangan Website: HTML, CSS dan...',
    author: 'Remote Worker Indonesia',
    rating: 4.6,
    reviews: 56,
    price: 'Rp309.000',
    image_url:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=400&h=200&q=80',
    label: null,
  },
  {
    id: 2,
    title: 'Belajar Web Development Menggunakan Bahasa...',
    author: 'CodePolitan Online',
    rating: 4.4,
    reviews: 397,
    price: 'Rp549.000',
    image_url:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=facearea&w=400&h=200&q=80',
    label: null,
  },
  {
    id: 3,
    title: 'Web Programming Dasar Sampai Mahir',
    author: 'Dr. (c). Junaidi S.Kom, M.Kom, GCT, GCE',
    rating: 4.7,
    reviews: 38,
    price: 'Rp289.000',
    image_url:
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=200&q=80',
    label: null,
  },
  {
    id: 4,
    title: 'The Complete Full-Stack Web Development Bootcamp',
    author: 'Dr. Angela Yu, Developer and Lead...',
    rating: 4.7,
    reviews: 446057,
    price: 'Rp669.000',
    image_url:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=200&q=80',
    label: 'Terlaris',
  },
  {
    id: 5,
    title: 'React JS: Pemula sampai Mahir',
    author: 'Dicoding Indonesia',
    rating: 4.8,
    reviews: 120,
    price: 'Rp399.000',
    image_url:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&h=200&q=80',
    label: 'Terlaris',
  },
  {
    id: 6,
    title: 'Node.js & Express: Web API Development',
    author: 'Udemy',
    rating: 4.5,
    reviews: 210,
    price: 'Rp359.000',
    image_url:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=200&q=80',
    label: null,
  },
  {
    id: 7,
    title: 'UI/UX Design Fundamentals',
    author: 'Coursera',
    rating: 4.6,
    reviews: 89,
    price: 'Rp299.000',
    image_url:
      'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=400&h=200&q=80',
    label: null,
  },
  {
    id: 8,
    title: 'Digital Marketing Mastery',
    author: 'Skill Academy',
    rating: 4.3,
    reviews: 75,
    price: 'Rp279.000',
    image_url:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&h=200&q=80',
    label: null,
  },
]

const fallbackSvg =
  'data:image/svg+xml;utf8,<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg"><rect fill="%23f3f4f6" width="400" height="200"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="20">No Image</text></svg>'

const CourseCard = ({ course }) => {
  // Helper for image URL (from BE: course.thumbnail)
  const getImageUrl = (url) => {
    if (
      !url ||
      typeof url !== 'string' ||
      url.trim() === '' ||
      url === 'null' ||
      url === 'undefined'
    )
      return fallbackSvg
    if (url.startsWith('http')) return url
    return `https://lms.alanwari.ponpes.id/storage/${url}`
  }

  // Format price to Rupiah
  const formatRupiah = (value) => {
    if (!value) return 'Rp0'
    const number = Number(value)
    if (isNaN(number)) return value
    return 'Rp' + number.toLocaleString('id-ID')
  }

  // Calculate rating & review count from reviews array
  const reviews = Array.isArray(course.reviews) ? course.reviews : []
  const reviewCount = reviews.length
  const avgRating =
    reviewCount > 0
      ? (
          reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
          reviewCount
        ).toFixed(1)
      : '5.0'

  // State for handling image error
  const [imgSrc, setImgSrc] = React.useState(getImageUrl(course.thumbnail))
  React.useEffect(() => {
    setImgSrc(getImageUrl(course.thumbnail))
  }, [course.thumbnail])

  // Tambahkan log URL gambar
  console.log(
    'Image URL:',
    getImageUrl(course.thumbnail),
    'for course:',
    course.title,
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 p-3 sm:p-4 w-full max-w-[280px] min-h-[320px] sm:min-h-[340px] flex flex-col cursor-pointer h-full mx-auto relative">
      {/* Badge publish status */}
      <div className="absolute top-2 right-2">
        {course.is_published ? (
          <span className="bg-green-100 text-green-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
            Published
          </span>
        ) : (
          <span className="bg-gray-200 text-gray-500 text-[11px] font-semibold px-2 py-0.5 rounded-full">
            Draft
          </span>
        )}
      </div>
      <div className="h-[120px] sm:h-[140px] w-full rounded-lg overflow-hidden mb-3 bg-gray-100 flex items-center justify-center">
        <img
          src={imgSrc}
          alt={course.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
          onError={() => {
            if (imgSrc !== fallbackSvg) setImgSrc(fallbackSvg)
          }}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 leading-tight line-clamp-2 hover:text-pink-600 transition-colors">
          {course.title}
        </h3>
        <div className="text-xs sm:text-[13px] text-gray-700 mb-1 line-clamp-2 min-h-[36px]">
          {/* Deskripsi, max 2 baris */}
          {course.description || (
            <span className="italic text-gray-400">
              Deskripsi tidak tersedia
            </span>
          )}
        </div>
        {/* Category & Subcategory */}
        <div className="text-[11px] italic text-gray-500 mb-1">
          {course.category || '-'}
          {course.sub_category ? (
            <span> &bull; {course.sub_category}</span>
          ) : null}
        </div>
        <div className="text-xs sm:text-sm text-gray-500 mb-2 line-clamp-1">
          {course.created_by || 'Penulis tidak tersedia'}
        </div>
        <div className="flex items-center gap-1 text-yellow-500 text-sm sm:text-base font-semibold mb-2">
          {avgRating}
          <span className="text-yellow-400">★</span>
          <span className="text-gray-400 text-xs font-normal">
            ({reviewCount})
          </span>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-end justify-between mt-2 gap-2">
          <div className="text-pink-600 font-bold text-base sm:text-lg">
            {formatRupiah(course.price)}
          </div>
          {/* Label/Tag custom jika ada */}
          {course.label && (
            <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
              {course.label}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [slide, setSlide] = useState(0) // 0: first 4, 1: next 4
  const [animating, setAnimating] = useState(false)
  const [slideDir, setSlideDir] = useState(0) // -1: left, 1: right, 0: idle
  const [viewAllState, setViewAllState] = useState('hidden') // 'hidden', 'entering', 'visible', 'exiting'
  const sliderRef = useRef(null)
  const [hoveredCourse, setHoveredCourse] = useState(null)
  const [hoveredCardPos, setHoveredCardPos] = useState({
    top: 0,
    left: 0,
    width: 0,
  })
  const [fetchError, setFetchError] = useState(false)

  // Fetch courses from API
  const fetchCourses = async () => {
    setLoading(true)
    setError(null)
    setFetchError(false)
    try {
      const data = await getAllCourses()
      setCourses(data.length > 0 ? data : fallbackCourseData)
      if (data.length === 0) setFetchError(true)
    } catch (err) {
      setError('Gagal memuat data kursus.')
      setCourses([])
      setFetchError(true)
      toast.error('Gagal memuat data kursus!')
    } finally {
      setLoading(false)
    }
  }

  // Handle view all click
  const handleViewAll = () => {
    setViewAllState('entering')
  }

  // Handle close all click
  const handleCloseAll = () => {
    setViewAllState('exiting')
  }

  // Load courses on component mount
  useEffect(() => {
    fetchCourses()
  }, [])

  const visibleCourses = showAll
    ? courses
    : courses.slice(slide * 4, slide * 4 + 4)

  const canSlideLeft = slide > 0
  const canSlideRight = !showAll && (slide + 1) * 4 < courses.length

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

  // View All animation handled by handleViewAll and handleCloseAll functions defined above

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

  // Loading state
  if (loading) {
    return (
      <section className="w-full py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4 sm:mb-6">
            Jelajahi Kursus Populer Kami
          </h2>
          <p className="text-center text-gray-500 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
            Dari keahlian{' '}
            <span className="font-semibold text-gray-900">penting</span> hingga
            topik teknis, Jagoan Academy mendukung pengembangan profesional
            Anda.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4 sm:px-0">
            <button className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-pink-600 text-white font-semibold shadow-md hover:bg-pink-700 hover:shadow-lg transition-all duration-200 text-sm sm:text-base">
              Semua
            </button>
            <button className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gray-100 text-gray-700 font-semibold border border-gray-300 hover:bg-gray-200 hover:border-gray-400 transition-all duration-200 text-sm sm:text-base">
              Bisnis (0)
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 w-full max-w-[280px] min-h-[320px] sm:min-h-[340px] flex flex-col animate-pulse"
              >
                <div className="h-[140px] w-full rounded-lg bg-gray-200 mb-3" />
                <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-1/2 mb-1" />
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-1/4 mb-2" />
                <div className="flex-1" />
                <div className="h-6 w-24 bg-gray-200 rounded mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error && courses.length === 0) {
    return (
      <React.Fragment>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <section className="w-full py-8 sm:py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[300px]">
            <p className="text-red-600 text-lg font-bold mb-4">
              Courses gagal ditemukan.
            </p>
            <button
              onClick={fetchCourses}
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
            >
              Coba Lagi
            </button>
          </div>
        </section>
      </React.Fragment>
    )
  }

  // No courses found
  if (courses.length === 0) {
    return (
      <section className="w-full py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Tidak ada kursus yang tersedia saat ini.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="w-full py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4 sm:mb-6">
            Jelajahi Kursus Populer Kami
          </h2>
          <p className="text-center text-gray-500 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
            Dari keahlian{' '}
            <span className="font-semibold text-gray-900">penting</span> hingga
            topik teknis, Jagoan Academy mendukung pengembangan profesional
            Anda.
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
                    <CourseCard key={course.id || idx} course={course} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center opacity-0 animate-fade-in">
                {courses.map((course, idx) => (
                  <CourseCard key={course.id || idx} course={course} />
                ))}
              </div>
            )}
            {/* Hover Detail Card */}
            {hoveredCourse &&
              createPortal(
                <CourseHoverDetail
                  course={hoveredCourse}
                  position={hoveredCardPos}
                  onClose={() => setHoveredCourse(null)}
                />,
                document.body,
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
    </React.Fragment>
  )
}

// Floating hover detail card
const CourseHoverDetail = ({ course, position, onClose }) => {
  if (!course) return null
  // Format price
  const formatRupiah = (value) => {
    if (!value) return 'Rp0'
    const number = Number(value)
    if (isNaN(number)) return value
    return 'Rp' + number.toLocaleString('id-ID')
  }
  // Calculate rating & review count from reviews array
  const reviews = Array.isArray(course.reviews) ? course.reviews : []
  const reviewCount = reviews.length
  const avgRating =
    reviewCount > 0
      ? (
          reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
          reviewCount
        ).toFixed(1)
      : '5.0'
  return (
    <div
      className="z-50 fixed shadow-2xl rounded-xl bg-white border border-gray-200 p-6 w-[340px] max-w-[95vw] animate-fade-in"
      style={{
        top: position.top,
        left: position.left,
      }}
      onMouseLeave={onClose}
      onMouseEnter={(e) => e.stopPropagation()}
    >
      <h3 className="font-bold text-lg mb-1 text-gray-900 leading-tight">
        {course.title}
      </h3>
      <div className="text-xs text-gray-500 mb-1">
        {course.created_by || 'Penulis tidak tersedia'}
      </div>
      <div className="flex items-center gap-1 text-yellow-500 text-base font-semibold mb-2">
        {avgRating}
        <span className="text-yellow-400">★</span>
        <span className="text-gray-400 text-xs font-normal">
          ({reviewCount})
        </span>
      </div>
      <div className="mb-3 text-sm text-gray-700 whitespace-pre-line">
        {course.description || (
          <span className="italic text-gray-400">Deskripsi tidak tersedia</span>
        )}
      </div>
      <div className="mb-2 text-xs text-gray-500 italic">
        {course.category || '-'}
        {course.sub_category ? (
          <span> &bull; {course.sub_category}</span>
        ) : null}
      </div>
      <div className="mb-3 font-bold text-pink-600 text-lg">
        {formatRupiah(course.price)}
      </div>
      <button className="w-full py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold text-base transition-all duration-200 shadow">
        Tambahkan ke keranjang
      </button>
    </div>
  )
}

export default Courses
