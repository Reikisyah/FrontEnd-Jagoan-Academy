import React from 'react'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'

const Analytics = () => (
  <div className="flex min-h-screen bg-white">
    <Sidebar />
    <div className="flex-1 flex flex-col min-h-screen">
      <DashboardHeader />
      <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
        <div className="max-w-2xl w-full">
          <h1 className="text-2xl font-bold text-pink-700 mb-4">Analytics</h1>
          <p className="mb-8 text-gray-600">
            Lihat statistik performa kursus Anda di bawah ini.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-pink-50 rounded-xl p-6 shadow text-center">
              <div className="text-3xl font-bold text-pink-700 mb-2">120</div>
              <div className="text-gray-600">Total Students</div>
            </div>
            <div className="bg-pink-50 rounded-xl p-6 shadow text-center">
              <div className="text-3xl font-bold text-pink-700 mb-2">8</div>
              <div className="text-gray-600">Active Courses</div>
            </div>
            <div className="bg-pink-50 rounded-xl p-6 shadow text-center">
              <div className="text-3xl font-bold text-pink-700 mb-2">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Analytics
