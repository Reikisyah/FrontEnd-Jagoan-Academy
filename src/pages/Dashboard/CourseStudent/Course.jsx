import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import DashboardHeader from '../../../components/DashboardHeader'
import { getAllCourses } from '../../../utils/api/courseApi'
import {
  getAllEnrollments,
  createEnrollment,
} from '../../../utils/api/enrollmentApi'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

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

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setProofError('File harus berupa JPG atau PNG')
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

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 max-w-6xl mx-auto py-10 px-4">
          <h1 className="text-2xl font-bold mb-6 text-pink-700">
            Daftar Course
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map((course) => {
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
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow border border-gray-200 p-0 overflow-hidden flex flex-col transition hover:shadow-xl"
                  style={{ minHeight: 340, maxWidth: 340, margin: '0 auto' }}
                >
                  {/* Thumbnail */}
                  <div className="w-full bg-gray-100">
                    <img
                      src={thumbnail}
                      alt={course.title}
                      className="w-full h-32 object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 flex flex-col p-4 pt-3">
                    {/* Judul */}
                    <div className="font-bold text-base mb-1 text-gray-900 leading-tight line-clamp-2">
                      {course.title}
                    </div>
                    {/* Deskripsi singkat */}
                    <div className="text-gray-600 text-xs mb-2 line-clamp-2">
                      {course.description}
                    </div>
                    {/* Nama instruktur */}
                    <div className="text-xs text-gray-500 mb-2">
                      {instructor}
                    </div>
                    {/* Info bar */}
                    <div className="flex flex-wrap gap-1 text-[11px] mb-3">
                      <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-semibold">
                        <span>★</span> {rating}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {ratingCount.toLocaleString()} ratings
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {duration}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {lectures} lectures
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {level}
                      </span>
                    </div>
                    {/* Harga & tombol */}
                    <div className="flex items-center justify-between mt-auto pt-1">
                      <span className="font-extrabold text-base text-gray-900">
                        {price}
                      </span>
                      {enrollment ? (
                        <div className="flex items-center gap-2 ml-2">
                          <span className="text-green-600 font-semibold text-xs">
                            {enrollment.status === 'success'
                              ? 'Enrolled'
                              : 'Pending'}
                          </span>
                          {enrollment.status === 'success' && (
                            <button
                              className="bg-white text-purple-700 border border-purple-600 px-3 py-1.5 rounded-lg font-bold shadow hover:bg-purple-50 transition text-xs"
                              onClick={() =>
                                navigate(`/student/course/${course.id}`)
                              }
                            >
                              Start Course
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          className="ml-2 bg-white text-purple-700 border border-purple-600 px-4 py-1.5 rounded-lg font-bold shadow hover:bg-purple-50 transition text-sm"
                          onClick={() => openPayModal(course)}
                        >
                          Enroll now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {/* Modal Upload Bukti Bayar */}
          {modalCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                <button
                  className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                  onClick={closePayModal}
                >
                  ×
                </button>
                <h2 className="text-lg font-bold mb-4 text-pink-700">
                  Upload Bukti Bayar untuk{' '}
                  <span className="text-pink-600">{modalCourse.title}</span>
                </h2>
                <form
                  onSubmit={handleSubmitPay}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                    className="border rounded-lg px-4 py-2"
                    required
                  />
                  {proofError && (
                    <div className="text-red-500 text-sm">{proofError}</div>
                  )}
                  {successMsg && (
                    <div className="text-green-600 text-sm">{successMsg}</div>
                  )}
                  <div className="flex gap-3 mt-2">
                    <button
                      type="submit"
                      className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50"
                      disabled={enrollLoading === modalCourse.id}
                    >
                      {enrollLoading === modalCourse.id
                        ? 'Mengirim...'
                        : 'Kirim Bukti Bayar'}
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                      onClick={closePayModal}
                      disabled={enrollLoading === modalCourse.id}
                    >
                      Batal
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
