import React, { useState } from 'react'
import DashboardHeader from '../../../components/DashboardHeader'
import Tab from '../../../components/Tab'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import {
  FiCopy,
  FiLink,
  FiTag,
  FiGift,
  FiTrendingUp,
  FiUsers,
  FiMessageSquare,
} from 'react-icons/fi'

const Promotions = () => {
  // Check user role
  const userRole = localStorage.getItem('role') || 'mentor'
  const isMentor = userRole === 'mentor'

  const [refLink] = useState(
    'http://localhost:3000/course/2c8610d3-1acd-4db8-8ae5-ca6ddcdc7a4e?ref=yourcode',
  )
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    navigator.clipboard.writeText(refLink)
    setCopied(true)
    await Swal.fire({
      icon: 'success',
      title: 'Referral link copied!',
      showConfirmButton: false,
      timer: 1200,
      customClass: { popup: 'rounded-xl' },
      position: 'center',
    })
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 flex">
      <Tab />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isMentor ? 'Course Promotion' : 'Course Promotions'}
              </h1>
              <p className="text-gray-600">
                {isMentor
                  ? 'Share your course and help students discover your expertise'
                  : 'Boost your course visibility and increase enrollments'}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiLink className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-500">
                      {isMentor ? 'Course Views' : 'Referral Clicks'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiUsers className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-500">
                      {isMentor ? 'Students Enrolled' : 'Referral Sales'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiMessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-500">
                      {isMentor ? 'Student Questions' : 'Referral Earnings'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Announcement Banner */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiTrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-2">
                      {isMentor
                        ? 'Share Your Expertise'
                        : 'Enhanced Coupon System'}
                    </h3>
                    <p className="text-purple-700 text-sm mb-3">
                      {isMentor
                        ? 'Help more students discover your course and learn from your experience. Share your course link on social media and professional networks.'
                        : 'We have updated the coupon system with new free coupon limits and bulk coupon creation features.'}
                    </p>
                    <a
                      href="#"
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm underline"
                    >
                      {isMentor
                        ? 'Learn more about sharing your course →'
                        : 'Learn more about the new features →'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Referral Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiLink className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {isMentor ? 'Share Your Course' : 'Refer Students'}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {isMentor
                        ? 'Share your course link to help students discover your expertise'
                        : 'Share your course and earn from every referral'}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-600 text-sm mb-3">
                    {isMentor
                      ? 'Share this link with your network, students, or on social media to help more people discover your course.'
                      : 'Any time a student uses this link, we will credit you with the sale.'}
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-700 underline ml-1"
                    >
                      {isMentor
                        ? 'Learn more about course sharing'
                        : 'Learn more about our referral program'}
                    </a>
                  </p>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"
                        value={refLink}
                        readOnly
                      />
                    </div>
                    <button
                      type="button"
                      className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center gap-2 ${
                        copied
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      onClick={handleCopy}
                    >
                      <FiCopy className="w-4 h-4" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Coupons Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FiGift className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Coupons
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {isMentor
                        ? 'Create discount codes to make your course more accessible'
                        : 'Create discount codes to boost enrollments'}
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <FiTag className="w-5 h-5 text-orange-600" />
                    <p className="text-orange-800 text-sm font-medium">
                      You cannot create coupons for a free course
                    </p>
                  </div>
                </div>

                {/* Active Coupons */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Active/Scheduled Coupons
                  </h4>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-500 transition-colors"
                      placeholder="Search coupon code..."
                      disabled
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <FiTag className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    No active coupons found
                  </p>
                </div>

                {/* Expired Coupons */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Expired Coupons
                  </h4>
                  <p className="text-gray-400 text-sm">
                    No expired coupons found
                  </p>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {isMentor ? '🚀 Course Sharing Tips' : '🚀 Promotion Tips'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      {isMentor
                        ? 'Share your course link on LinkedIn and professional networks'
                        : 'Share your referral link on social media and professional networks'}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      {isMentor
                        ? 'Create engaging content about your course topic'
                        : 'Create limited-time discount coupons to create urgency'}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      {isMentor
                        ? 'Ask your current students to share with their network'
                        : 'Collaborate with other instructors for cross-promotion'}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      {isMentor
                        ? 'Use student testimonials to build credibility'
                        : 'Use analytics to track which promotion methods work best'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Promotions
