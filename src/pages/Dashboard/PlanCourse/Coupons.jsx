import React, { useState } from 'react'
import DashboardHeader from '../../../components/DashboardHeader'
import Tab from '../../../components/Tab'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import {
  FiGift,
  FiCalendar,
  FiDollarSign,
  FiPercent,
  FiUsers,
  FiClock,
  FiPlus,
  FiX,
} from 'react-icons/fi'

const Coupons = () => {
  // Check user role
  const userRole = localStorage.getItem('role') || 'mentor'
  const isMentor = userRole === 'mentor'

  const [form, setForm] = useState({
    code: '',
    discountType: 'percent',
    discountValue: '10',
    maxRedemptions: '1',
    status: 'SCHEDULED',
    startDate: '',
    endDate: '',
  })
  const [showForm, setShowForm] = useState(true)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await Swal.fire({
      icon: 'success',
      title: 'Coupon saved!',
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
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isMentor ? 'Course Coupons' : 'Course Coupons'}
              </h1>
              <p className="text-gray-600">
                {isMentor
                  ? 'Create discount codes to make your course more accessible to students'
                  : 'Create discount codes to boost your course enrollments'}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiGift className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-500">Active Coupons</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiUsers className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-500">
                      {isMentor ? 'Students Enrolled' : 'Total Redemptions'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiClock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-500">
                      {isMentor ? 'Student Questions' : 'Expired Coupons'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Create Coupon Form */}
              {showForm && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <FiPlus className="w-5 h-5 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          Create New Coupon
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {isMentor
                            ? 'Set up a discount code to help students access your course'
                            : 'Set up a discount code for your course'}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setShowForm(false)}
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Coupon Code */}
                      <div>
                        <label className="block font-semibold text-gray-900 mb-2">
                          Coupon Code *
                        </label>
                        <input
                          type="text"
                          name="code"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                          placeholder="e.g., WELCOME10"
                          value={form.code}
                          onChange={handleChange}
                          required
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Use uppercase letters and numbers
                        </p>
                      </div>

                      {/* Discount Type */}
                      <div>
                        <label className="block font-semibold text-gray-900 mb-2">
                          Discount Type *
                        </label>
                        <select
                          name="discountType"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                          value={form.discountType}
                          onChange={handleChange}
                        >
                          <option value="percent">Percentage (%)</option>
                          <option value="amount">Fixed Amount (Rp)</option>
                        </select>
                      </div>

                      {/* Discount Value */}
                      <div>
                        <label className="block font-semibold text-gray-900 mb-2">
                          Discount Value *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            {form.discountType === 'percent' ? (
                              <FiPercent className="w-4 h-4 text-gray-500" />
                            ) : (
                              <span className="text-gray-500">Rp</span>
                            )}
                          </div>
                          <input
                            type="number"
                            name="discountValue"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                            placeholder={
                              form.discountType === 'percent' ? '10' : '50000'
                            }
                            value={form.discountValue}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Max Redemptions */}
                      <div>
                        <label className="block font-semibold text-gray-900 mb-2">
                          Max Redemptions
                        </label>
                        <input
                          type="number"
                          name="maxRedemptions"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                          placeholder="1"
                          value={form.maxRedemptions}
                          onChange={handleChange}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Leave empty for unlimited
                        </p>
                      </div>

                      {/* Start Date */}
                      <div>
                        <label className="block font-semibold text-gray-900 mb-2">
                          Start Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiCalendar className="w-4 h-4 text-gray-500" />
                          </div>
                          <input
                            type="date"
                            name="startDate"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                            value={form.startDate}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* End Date */}
                      <div>
                        <label className="block font-semibold text-gray-900 mb-2">
                          End Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiCalendar className="w-4 h-4 text-gray-500" />
                          </div>
                          <input
                            type="date"
                            name="endDate"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                            value={form.endDate}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Coupon Preview
                      </h4>
                      <div className="flex items-center gap-4">
                        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                          <span className="font-mono text-lg font-bold text-pink-600">
                            {form.code || 'COUPONCODE'}
                          </span>
                        </div>
                        <div className="text-gray-600">
                          {form.discountType === 'percent' ? (
                            <span className="font-semibold">
                              {form.discountValue}% off
                            </span>
                          ) : (
                            <span className="font-semibold">
                              Rp
                              {parseInt(form.discountValue || 0).toLocaleString(
                                'id-ID',
                              )}{' '}
                              off
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-bold py-4 rounded-xl text-lg shadow-lg transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <FiGift className="w-5 h-5" />
                      Create Coupon
                    </button>
                  </form>
                </div>
              )}

              {/* Show Form Button */}
              {!showForm && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <FiPlus className="w-5 h-5" />
                    Create New Coupon
                  </button>
                </div>
              )}

              {/* Coupons List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiGift className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Your Coupons
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {isMentor
                        ? 'Manage your existing discount codes'
                        : 'Manage your existing discount codes'}
                    </p>
                  </div>
                </div>

                {/* Empty State */}
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiGift className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    No coupons yet
                  </h4>
                  <p className="text-gray-500 mb-6">
                    {isMentor
                      ? 'Create your first coupon to help students access your course'
                      : 'Create your first coupon to start boosting enrollments'}
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
                  >
                    <FiPlus className="w-4 h-4" />
                    Create Coupon
                  </button>
                </div>
              </div>

              {/* Tips Section */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {isMentor
                    ? '💡 Coupon Best Practices for Mentors'
                    : '💡 Coupon Best Practices'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      {isMentor
                        ? "Use memorable codes like 'WELCOME10' or 'STUDENT20'"
                        : "Use memorable codes like 'WELCOME10' or 'LAUNCH20'"}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      {isMentor
                        ? 'Set expiration dates to create urgency for enrollment'
                        : 'Set expiration dates to create urgency'}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      {isMentor
                        ? 'Limit redemptions to manage student capacity'
                        : 'Limit redemptions to control costs'}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      {isMentor
                        ? 'Test different discount amounts to find what works best'
                        : 'Test different discount amounts to find the sweet spot'}
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

export default Coupons
