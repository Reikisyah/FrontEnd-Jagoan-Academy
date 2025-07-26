import React, { useState, useEffect } from 'react'
import {
  FiBook,
  FiClock,
  FiAward,
  FiPlay,
  FiCheckCircle,
  FiStar,
  FiCalendar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'
import Sidebar from '../../../components/Sidebar'
import DashboardHeader from '../../../components/DashboardHeader'
import { getAllCourses } from '../../../utils/api/courseApi'
import { getAllEnrollments } from '../../../utils/api/enrollmentApi'
import { useNavigate } from 'react-router-dom'

const fallbackImg = 'https://via.placeholder.com/400x220?text=No+Image'
const getImageUrl = (url) => {
  if (!url || url === 'null' || url === 'undefined') return fallbackImg
  if (url.startsWith('http')) return url
  return `https://lms.alanwari.ponpes.id/storage/${url}`
}

const DashboardStudent = ({ hideNavbarFooter }) => {
  const [courses, setCourses] = useState([])
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Handle hideNavbarFooter prop
  React.useEffect(() => {
    if (hideNavbarFooter) {
      const navbar = document.querySelector(
        '.navbar,#navbar,[role="navigation"]',
      )
      const footer = document.querySelector('footer,.footer,#footer')
      if (navbar) navbar.style.display = 'none'
      if (footer) footer.style.display = 'none'
      return () => {
        if (navbar) navbar.style.display = ''
        if (footer) footer.style.display = ''
      }
    }
  }, [hideNavbarFooter])

  // Fetch data
  useEffect(() => {
    setLoading(true)
    Promise.all([getAllCourses(), getAllEnrollments()])
      .then(([courseList, enrollList]) => {
        setCourses(courseList)
        setEnrollments(enrollList)
      })
      .catch((err) => console.error('Error fetching data:', err))
      .finally(() => setLoading(false))
  }, [])

  // Calculate student-specific statistics
  const enrolledCourses = enrollments.filter((e) => e.status === 'success')
  const completedCourses = enrolledCourses.filter((e) => e.progress === 100)
  const inProgressCourses = enrolledCourses.filter(
    (e) => e.progress > 0 && e.progress < 100,
  )
  const totalLearningHours = enrolledCourses.length * 2.5 // Dummy calculation
  const averageProgress =
    enrolledCourses.length > 0
      ? Math.round(
          enrolledCourses.reduce((sum, e) => sum + (e.progress || 0), 0) /
            enrolledCourses.length,
        )
      : 0

  // Get current courses (in progress)
  const currentCourses = inProgressCourses
    .slice(0, 3)
    .map((enrollment) => {
      const course = courses.find((c) => c.id === enrollment.course_id)
      return course ? { ...course, enrollment } : null
    })
    .filter(Boolean)

  // Get recommended courses (not enrolled)
  const recommendedCourses = courses
    .filter((course) => !enrollments.find((e) => e.course_id === course.id))
    .slice(0, 3)

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <main className="flex-1 p-8">
            <div className="max-w-6xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-6 border border-gray-100"
                    >
                      <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-pink-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Learning Dashboard
              </h1>
              <p className="text-gray-600">
                Track your progress and continue your learning journey
              </p>
            </div>

            {/* Student Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiBook className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {enrolledCourses.length}
                    </div>
                    <div className="text-sm text-gray-500">
                      Enrolled Courses
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiCheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {averageProgress}%
                    </div>
                    <div className="text-sm text-gray-500">
                      Average Progress
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiClock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {totalLearningHours}h
                    </div>
                    <div className="text-sm text-gray-500">Learning Hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Courses Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Continue Learning
                </h3>
                <button
                  onClick={() => navigate('/student/courses')}
                  className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                >
                  View all courses →
                </button>
              </div>

              {currentCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={getImageUrl(course.thumbnail)}
                          alt={course.title}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                            {course.title}
                          </h4>
                          <p className="text-gray-500 text-xs mb-2">
                            {course.instructor || 'Instructor'}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${course.enrollment.progress || 0}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {course.enrollment.progress || 0}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={() =>
                            navigate(`/student/course/${course.id}`)
                          }
                          className="w-full bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <FiPlay className="w-3 h-3" />
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiBook className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    No courses in progress
                  </h4>
                  <p className="text-gray-500 mb-4">
                    Start your learning journey by enrolling in a course
                  </p>
                  <button
                    onClick={() => navigate('/student/courses')}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Browse Courses
                  </button>
                </div>
              )}
            </div>

            {/* Recommended Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recommended for You
                </h3>
                <button
                  onClick={() => navigate('/student/courses')}
                  className="text-pink-600 hover:text-pink-700 font-medium text-sm"
                >
                  View all courses →
                </button>
              </div>

              {recommendedCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={getImageUrl(course.thumbnail)}
                          alt={course.title}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                            {course.title}
                          </h4>
                          <p className="text-gray-500 text-xs mb-2">
                            {course.instructor || 'Instructor'}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FiStar className="w-3 h-3 text-yellow-500" />
                            <span>{course.rating || 4.7}</span>
                            <span>•</span>
                            <span>{course.level || 'Beginner'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={() => navigate('/student/courses')}
                          className="w-full bg-gray-600 hover:bg-gray-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiTrendingUp className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    No recommendations yet
                  </h4>
                  <p className="text-gray-500 mb-4">
                    Complete more courses to get personalized recommendations
                  </p>
                </div>
              )}
            </div>

            {/* Learning Goals & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Learning Goals */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <FiTarget className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">Learning Goals</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Complete 5 courses</span>
                    <span className="text-sm">{completedCourses.length}/5</span>
                  </div>
                  <div className="w-full bg-blue-400 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((completedCourses.length / 5) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Study 20 hours</span>
                    <span className="text-sm">{totalLearningHours}/20h</span>
                  </div>
                  <div className="w-full bg-blue-400 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((totalLearningHours / 20) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <FiCalendar className="w-8 h-8" />
                  <h3 className="text-lg font-semibold">Quick Actions</h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm text-left">
                    📚 Browse New Courses
                  </button>
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm text-left">
                    🏆 View Certificates
                  </button>
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm text-left">
                    📊 Check Progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardStudent
