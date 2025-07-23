import React from 'react'
import { useLocation } from 'react-router-dom'

const PlanCourse = () => {
  const location = useLocation()
  const course = location.state?.course

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-pink-700 mb-4">
          No Course Data
        </h1>
        <p className="text-gray-500">
          Please add a course first or navigate from the dashboard.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">
        Course Landing Page
      </h1>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-2">{course.title}</h2>
        <div className="mb-2 text-gray-700">{course.description}</div>
        <div className="mb-2">
          <span className="font-semibold">Category:</span> {course.category}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Sub Category:</span>{' '}
          {course.sub_category}
        </div>
        <div className="mt-6 text-gray-400 text-sm">
          (This is a dummy preview. You can continue building this page.)
        </div>
      </div>
    </div>
  )
}

export default PlanCourse

