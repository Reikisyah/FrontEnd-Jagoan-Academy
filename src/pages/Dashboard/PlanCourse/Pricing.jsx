import React, { useState } from 'react'
import DashboardHeader from '../../../components/DashboardHeader'
import Tab from '../../../components/Tab'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import {
  FiDollarSign,
  FiGift,
  FiTrendingUp,
  FiCheckCircle,
  FiInfo,
  FiUsers,
} from 'react-icons/fi'

const Pricing = () => {
  // Check user role
  const userRole = localStorage.getItem('role') || 'mentor'
  const isMentor = userRole === 'mentor'

  const [type, setType] = useState('paid')
  const [price, setPrice] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await Swal.fire({
      icon: 'success',
      title: 'Harga course disimpan!',
      showConfirmButton: false,
      timer: 1500,
      customClass: { popup: 'rounded-xl' },
      position: 'center',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 flex">
      <Tab />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isMentor ? 'Course Pricing' : 'Course Pricing'}
              </h1>
              <p className="text-gray-600">
                {isMentor
                  ? 'Set the right price to make your course accessible to students'
                  : 'Set the right price to maximize your course revenue'}
              </p>
            </div>

            {/* Main Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Pricing Type Selection */}
                <div>
                  <label className="block font-semibold text-gray-900 mb-4 text-lg">
                    Choose Your Pricing Model
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label
                      className={`relative cursor-pointer transition-all duration-200 ${
                        type === 'free'
                          ? 'ring-2 ring-pink-500 ring-offset-2'
                          : 'hover:ring-2 hover:ring-gray-300 ring-offset-2'
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value="free"
                        checked={type === 'free'}
                        onChange={() => setType('free')}
                        className="sr-only"
                      />
                      <div
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                          type === 'free'
                            ? 'border-pink-500 bg-pink-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              type === 'free' ? 'bg-pink-100' : 'bg-gray-100'
                            }`}
                          >
                            <FiGift
                              className={`w-6 h-6 ${type === 'free' ? 'text-pink-600' : 'text-gray-600'}`}
                            />
                          </div>
                          <div>
                            <div
                              className={`font-semibold text-lg ${type === 'free' ? 'text-pink-900' : 'text-gray-900'}`}
                            >
                              Free Course
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {isMentor
                                ? 'Share your knowledge and build your reputation'
                                : 'Offer your course for free to build your audience'}
                            </div>
                          </div>
                        </div>
                        {type === 'free' && (
                          <div className="mt-4 flex items-center gap-2 text-pink-700 text-sm">
                            <FiCheckCircle className="w-4 h-4" />
                            <span>Selected</span>
                          </div>
                        )}
                      </div>
                    </label>

                    <label
                      className={`relative cursor-pointer transition-all duration-200 ${
                        type === 'paid'
                          ? 'ring-2 ring-pink-500 ring-offset-2'
                          : 'hover:ring-2 hover:ring-gray-300 ring-offset-2'
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value="paid"
                        checked={type === 'paid'}
                        onChange={() => setType('paid')}
                        className="sr-only"
                      />
                      <div
                        className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                          type === 'paid'
                            ? 'border-pink-500 bg-pink-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              type === 'paid' ? 'bg-pink-100' : 'bg-gray-100'
                            }`}
                          >
                            <FiDollarSign
                              className={`w-6 h-6 ${type === 'paid' ? 'text-pink-600' : 'text-gray-600'}`}
                            />
                          </div>
                          <div>
                            <div
                              className={`font-semibold text-lg ${type === 'paid' ? 'text-pink-900' : 'text-gray-900'}`}
                            >
                              Paid Course
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {isMentor
                                ? 'Set a price that reflects the value of your expertise'
                                : 'Set a price and earn from every enrollment'}
                            </div>
                          </div>
                        </div>
                        {type === 'paid' && (
                          <div className="mt-4 flex items-center gap-2 text-pink-700 text-sm">
                            <FiCheckCircle className="w-4 h-4" />
                            <span>Selected</span>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Price Input */}
                {type === 'paid' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold text-gray-900 mb-2">
                        Course Price (IDR)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-lg">Rp</span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors text-lg"
                          placeholder="0"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required={type === 'paid'}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Enter the price in Indonesian Rupiah (IDR). Example:
                        150000
                      </p>
                    </div>

                    {/* Price Preview */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Preview:</span>
                        <span className="text-2xl font-bold text-gray-900">
                          Rp
                          {price
                            ? parseInt(price).toLocaleString('id-ID')
                            : '0'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Info Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FiInfo className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">
                        {isMentor
                          ? 'Pricing Strategy Tips for Mentors:'
                          : 'Pricing Strategy Tips:'}
                      </p>
                      <ul className="space-y-1 text-blue-700">
                        {isMentor ? (
                          <>
                            <li>
                              • Consider your expertise level and teaching
                              experience
                            </li>
                            <li>• Research similar courses in your field</li>
                            <li>
                              • Start with competitive pricing to attract
                              students
                            </li>
                            <li>• Focus on value rather than just price</li>
                          </>
                        ) : (
                          <>
                            <li>• Research similar courses in your niche</li>
                            <li>• Consider your target audience's budget</li>
                            <li>
                              • Start with competitive pricing and adjust based
                              on demand
                            </li>
                            <li>
                              • You can change the price later, but notify
                              existing students
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-bold py-4 rounded-xl text-lg shadow-lg transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <FiTrendingUp className="w-5 h-5" />
                  Save Pricing Settings
                </button>
              </form>
            </div>

            {/* Additional Tips */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {isMentor
                  ? '💡 Pricing Best Practices for Mentors'
                  : '💡 Pricing Best Practices'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    {isMentor
                      ? 'Free courses help build your reputation as a mentor'
                      : 'Free courses help build your instructor reputation and student base'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    {isMentor
                      ? 'Paid courses should reflect the quality of your teaching'
                      : 'Paid courses should provide clear value that justifies the price'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    {isMentor
                      ? 'Consider offering early-bird discounts to attract initial students'
                      : 'Consider offering early-bird discounts to boost initial sales'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    {isMentor
                      ? 'Monitor student feedback and adjust pricing accordingly'
                      : 'Monitor your course performance and adjust pricing accordingly'}
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

export default Pricing
