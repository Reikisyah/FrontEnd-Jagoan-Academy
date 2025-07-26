import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import DashboardHeader from '../../../components/DashboardHeader'
import { getAllCourses } from '../../../utils/api/courseApi'
import {
  getAllEnrollments,
  createEnrollment,
} from '../../../utils/api/enrollmentApi'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  FiPlay,
  FiClock,
  FiStar,
  FiUsers,
  FiBook,
  FiCheckCircle,
  FiUpload,
  FiX,
  FiSearch,
  FiFilter,
  FiEye,
  FiTrendingUp,
  FiAward,
  FiHeart,
  FiShare2,
  FiChevronRight,
  FiChevronLeft,
} from 'react-icons/fi'

const fallbackImg = 'https://via.placeholder.com/400x220?text=No+Image'
const getImageUrl = (url) => {
  if (!url || url === 'null' || url === 'undefined') return fallbackImg
  if (url.startsWith('http')) return url
  return `https://lms.alanwari.ponpes.id/storage/${url}`
}

const CourseStudent = () => {
  const [courses, setCourses] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [enrollLoading, setEnrollLoading] = useState(null)
  const [error, setError] = useState(null)
  const [modalCourse, setModalCourse] = useState(null)
  const [proofFile, setProofFile] = useState(null)
  const [proofError, setProofError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [previewCourse, setPreviewCourse] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Read search query from URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchQuery = urlParams.get('search')
    if (searchQuery) {
      setSearchTerm(decodeURIComponent(searchQuery))
    }
  }, [location.search])

  // Fetch courses & enrollments
  useEffect(() => {
    setLoading(true)
    Promise.all([getAllCourses(), getAllEnrollments()])
      .then(([courseList, enrollList]) => {
        setCourses(courseList)
        setEnrollments(enrollList)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // Helper: cek apakah student sudah enroll course
  const getEnrollment = (courseId) =>
    enrollments.find((e) => e.course_id === courseId)

  // Get unique categories
  const categories = [
    'all',
    ...new Set(courses.map((c) => c.category?.name || 'Uncategorized')),
  ]

  // Search suggestions
  const searchSuggestions = courses
    .filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, 5)
    .map((course) => course.title)

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel =
      selectedLevel === 'all' || course.level === selectedLevel
    const matchesCategory =
      selectedCategory === 'all' || course.category?.name === selectedCategory
    return matchesSearch && matchesLevel && matchesCategory
  })

  // Handle open modal bayar
  const openPayModal = (course) => {
    setModalCourse(course)
    setProofFile(null)
    setProofError(null)
    setSuccessMsg(null)
  }
  const closePayModal = () => {
    setModalCourse(null)
    setProofFile(null)
    setProofError(null)
    setSuccessMsg(null)
  }

  // Handle course preview
  const openPreviewModal = (course) => {
    setPreviewCourse(course)
  }
  const closePreviewModal = () => {
    setPreviewCourse(null)
  }

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setProofError('File harus berupa JPG atau PNG')
      setProofFile(null)
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setProofError('File terlalu besar. Maksimal 5MB')
      setProofFile(null)
      return
    }
    setProofFile(file)
    setProofError(null)
  }

  // Handle submit bukti bayar (DUMMY)
  const handleSubmitPay = async (e) => {
    e.preventDefault()
    if (!proofFile) {
      setProofError('Silakan upload bukti bayar (JPG/PNG)')
      return
    }
    setEnrollLoading(modalCourse.id)
    setProofError(null)
    try {
      // DUMMY: Simulasikan sukses enroll
      setSuccessMsg('Enrollment & bukti bayar berhasil (dummy)!')
      // Update enrollments lokal agar card berubah status
      setEnrollments((prev) => [
        ...prev,
        {
          course_id: modalCourse.id,
          status: 'success',
          proof_of_payment: [{ path: URL.createObjectURL(proofFile) }],
        },
      ])
      setTimeout(() => {
        closePayModal()
      }, 1200)
    } catch (err) {
      setProofError('Gagal dummy enroll')
    } finally {
      setEnrollLoading(null)
    }
  }

  // Get difficulty color
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Get difficulty icon
  const getDifficultyIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return '🌱'
      case 'intermediate':
        return '🚀'
      case 'advanced':
        return '🔥'
      default:
        return '📚'
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto text-center">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                <div className="text-red-600 text-6xl mb-4">⚠️</div>
                <h2 className="text-xl font-semibold text-red-800 mb-2">
                  Error Loading Courses
                </h2>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Available Courses
              </h1>
              <p className="text-gray-600">
                Discover and enroll in courses to enhance your skills
              </p>
            </div>

            {/* Enhanced Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Enhanced Search */}
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search courses by title, description, or instructor..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setShowSuggestions(e.target.value.length > 0)
                    }}
                    onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 200)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                  />
                  {/* Search Suggestions */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchTerm(suggestion)
                            setShowSuggestions(false)
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2"
                        >
                          <FiSearch className="w-4 h-4 text-gray-400" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors appearance-none bg-white min-w-[150px]"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div className="relative">
                  <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors appearance-none bg-white min-w-[150px]"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Results count and clear filters */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {filteredCourses.length} of {courses.length} courses
                </div>
                {(searchTerm ||
                  selectedLevel !== 'all' ||
                  selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedLevel('all')
                      setSelectedCategory('all')
                    }}
                    className="text-pink-600 hover:text-pink-700 text-sm font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => {
                const enrollment = getEnrollment(course.id)
                // Fallback/dummy data
                const thumbnail = getImageUrl(course.thumbnail)
                const instructor =
                  course.instructor ||
                  course.created_by ||
                  'Udemy Instructor Team'
                const rating = course.rating || 4.7
                const ratingCount = course.rating_count || 7911
                const duration = course.duration || '1.5 total hours'
                const lectures = course.lectures || 32
                const level = course.level || 'Beginner'
                const price = course.price
                  ? `Rp${Number(course.price).toLocaleString('id-ID')}`
                  : 'Free'
                const enrollmentCount =
                  course.enrollment_count ||
                  Math.floor(Math.random() * 1000) + 100

                return (
                  <div
                    key={course.id}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative"
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden">
                      <img
                        src={thumbnail}
                        alt={course.title}
                        className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openPreviewModal(course)}
                            className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                            title="Preview Course"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                            title="Add to Wishlist"
                          >
                            <FiHeart className="w-4 h-4" />
                          </button>
                          <button
                            className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
                            title="Share Course"
                          >
                            <FiShare2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Status badges */}
                      {enrollment && (
                        <div className="absolute top-3 right-3">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              enrollment.status === 'success'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {enrollment.status === 'success'
                              ? 'Enrolled'
                              : 'Pending'}
                          </div>
                        </div>
                      )}

                      {/* Difficulty badge */}
                      <div className="absolute bottom-3 left-3">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getDifficultyColor(level)}`}
                        >
                          <span>{getDifficultyIcon(level)}</span>
                          {level}
                        </div>
                      </div>

                      {/* Category badge */}
                      {course.category?.name && (
                        <div className="absolute top-3 left-3">
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                            {course.category.name}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      {/* Title */}
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-pink-600 transition-colors">
                        {course.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Instructor */}
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <FiUsers className="w-4 h-4" />
                        <span className="truncate">{instructor}</span>
                      </div>

                      {/* Course Info */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                          <FiStar className="w-3 h-3" />
                          {rating} ({ratingCount.toLocaleString()})
                        </div>
                        <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          <FiClock className="w-3 h-3" />
                          {duration}
                        </div>
                        <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          <FiBook className="w-3 h-3" />
                          {lectures} lectures
                        </div>
                        <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                          <FiTrendingUp className="w-3 h-3" />
                          {enrollmentCount.toLocaleString()} enrolled
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="flex flex-col gap-2">
                        <div>
                          <span className="font-bold text-lg text-gray-900">
                            {price}
                          </span>
                          {course.price && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              Rp
                              {(Number(course.price) * 1.5).toLocaleString(
                                'id-ID',
                              )}
                            </span>
                          )}
                        </div>

                        {enrollment ? (
                          <div className="flex items-center gap-2">
                            {enrollment.status === 'success' ? (
                              <button
                                onClick={() =>
                                  navigate(`/student/course/${course.id}`)
                                }
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mt-2"
                              >
                                <FiPlay className="w-4 h-4" />
                                Mulai Belajar
                              </button>
                            ) : (
                              <div className="text-yellow-600 font-semibold text-sm mt-2">
                                Menunggu Pembayaran
                              </div>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => openPayModal(course)}
                            className={`w-full px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mt-2 ${course.price ? 'bg-pink-600 hover:bg-pink-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                          >
                            {course.price ? (
                              <>
                                <FiCheckCircle className="w-4 h-4" />
                                Bayar Sekarang
                              </>
                            ) : (
                              <>
                                <FiAward className="w-4 h-4" />
                                Ambil Gratis
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiBook className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search terms or filters to find what you're
                  looking for
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedLevel('all')
                    setSelectedCategory('all')
                  }}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Course Preview Modal */}
          {previewCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="relative">
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
                    onClick={closePreviewModal}
                  >
                    <FiX className="w-5 h-5" />
                  </button>

                  <div className="relative h-64 bg-gradient-to-r from-pink-500 to-purple-600">
                    <img
                      src={getImageUrl(previewCourse.thumbnail)}
                      alt={previewCourse.title}
                      className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h2 className="text-3xl font-bold mb-2">
                          {previewCourse.title}
                        </h2>
                        <p className="text-lg opacity-90">
                          {previewCourse.instructor || previewCourse.created_by}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Course Overview
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {previewCourse.description}
                        </p>

                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <FiClock className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">
                              Duration:{' '}
                              {previewCourse.duration || '1.5 total hours'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <FiBook className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">
                              Lectures: {previewCourse.lectures || 32}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <FiStar className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">
                              Rating: {previewCourse.rating || 4.7} (
                              {previewCourse.rating_count || 7911} reviews)
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <FiUsers className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">
                              Students:{' '}
                              {(
                                previewCourse.enrollment_count ||
                                Math.floor(Math.random() * 1000) + 100
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          What you'll learn
                        </h3>
                        <div className="space-y-2">
                          {[
                            'Master the fundamentals of the subject',
                            'Build practical projects from scratch',
                            'Understand best practices and industry standards',
                            'Get hands-on experience with real-world examples',
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <FiCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 text-sm">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">
                              Course Price
                            </span>
                            <span className="text-2xl font-bold text-pink-600">
                              {previewCourse.price
                                ? `Rp${Number(previewCourse.price).toLocaleString('id-ID')}`
                                : 'Free'}
                            </span>
                          </div>
                          {previewCourse.price && (
                            <div className="text-sm text-gray-500">
                              <span className="line-through">
                                Rp
                                {(
                                  Number(previewCourse.price) * 1.5
                                ).toLocaleString('id-ID')}
                              </span>
                              <span className="text-green-600 ml-2">
                                33% off
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                      <button
                        onClick={() => {
                          closePreviewModal()
                          openPayModal(previewCourse)
                        }}
                        className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <FiCheckCircle className="w-4 h-4" />
                        Enroll Now
                      </button>
                      <button
                        onClick={closePreviewModal}
                        className="px-6 py-3 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Modal Upload Bukti Bayar */}
          {modalCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 relative">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={closePayModal}
                >
                  <FiX className="w-5 h-5" />
                </button>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiUpload className="w-8 h-8 text-pink-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Upload Payment Proof
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Complete your enrollment for{' '}
                    <span className="font-semibold text-pink-600">
                      {modalCourse.title}
                    </span>
                  </p>
                </div>

                <form onSubmit={handleSubmitPay} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Payment Proof (JPG/PNG, max 5MB)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleFileChange}
                        className="hidden"
                        id="proof-upload"
                        required
                      />
                      <label htmlFor="proof-upload" className="cursor-pointer">
                        <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {proofFile
                            ? proofFile.name
                            : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          JPG, PNG up to 5MB
                        </p>
                      </label>
                    </div>
                  </div>

                  {proofError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-600 text-sm">{proofError}</p>
                    </div>
                  )}

                  {successMsg && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-600 text-sm">{successMsg}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      disabled={enrollLoading === modalCourse.id}
                    >
                      {enrollLoading === modalCourse.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FiCheckCircle className="w-4 h-4" />
                          Submit Payment
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                      onClick={closePayModal}
                      disabled={enrollLoading === modalCourse.id}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default CourseStudent
