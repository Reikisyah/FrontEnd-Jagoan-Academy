import React from 'react'
import DashboardHeader from '../../../components/DashboardHeader'
import Tab from '../../../components/Tab'
import { FiStar, FiMessageSquare, FiUsers, FiTrendingUp } from 'react-icons/fi'

const Reviews = () => {
  // Check user role
  const userRole = localStorage.getItem('role') || 'mentor'
  const isMentor = userRole === 'mentor'

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
                Course Reviews
              </h1>
              <p className="text-gray-600">
                {isMentor
                  ? 'Monitor student feedback and improve your teaching'
                  : 'Monitor and respond to student feedback for your course'}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiStar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-500">Total Reviews</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiTrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">0.0</div>
                    <div className="text-sm text-gray-500">Average Rating</div>
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
                      {isMentor ? 'Student Questions' : 'Pending Responses'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Empty State */}
              <div className="flex flex-col items-center justify-center py-16 px-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <FiStar className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No reviews yet
                </h3>
                <p className="text-gray-500 text-center max-w-md mb-8">
                  {isMentor
                    ? 'Once students start enrolling and completing your course, their reviews will appear here. Use this feedback to improve your teaching and course content.'
                    : "Once students start enrolling and completing your course, their reviews will appear here. You'll be able to respond to feedback and monitor your course performance."}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2">
                    <FiTrendingUp className="w-4 h-4" />
                    {isMentor
                      ? 'Improve Course Content'
                      : 'Promote Your Course'}
                  </button>
                  <button className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors duration-200">
                    {isMentor
                      ? 'View Student Progress'
                      : 'View Course Analytics'}
                  </button>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {isMentor
                  ? '💡 Tips for Getting Great Reviews as a Mentor'
                  : '💡 Tips for Getting Great Reviews'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    {isMentor
                      ? 'Provide clear explanations and practical examples'
                      : 'Engage with your students through discussions and Q&A sessions'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    {isMentor
                      ? 'Respond quickly to student questions and concerns'
                      : 'Provide clear, actionable feedback on assignments'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    {isMentor
                      ? 'Keep your course content updated and relevant'
                      : 'Keep your course content updated and relevant'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    {isMentor
                      ? 'Create engaging and interactive learning experiences'
                      : 'Respond promptly to student questions and concerns'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Reviews
