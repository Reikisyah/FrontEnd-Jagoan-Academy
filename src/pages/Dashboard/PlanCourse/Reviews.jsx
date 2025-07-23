import React from 'react'
import DashboardHeader from '../../../components/DashboardHeader'
import Tab from '../../../components/Tab'

const Reviews = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Tab />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Reviews</h1>
            <div className="text-gray-400 text-lg mt-8 mb-4">
              No reviews yet.
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Reviews
