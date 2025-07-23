import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const categories = [
  'Programming',
  'Design',
  'Business',
  'Marketing',
  'Photography',
]

const stepTitles = ['Course Title', 'Description', 'Category']

const initialForm = {
  title: '',
  description: '',
  category: '',
  sub_category: '',
}

const AddCourse = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [addStep, setAddStep] = useState(1)
  const [formError, setFormError] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  // Step info
  const stepIndex = addStep - 1
  const stepTitle = stepTitles[stepIndex]
  const progress = ((addStep - 1) / (3 - 1)) * 100

  // Handler
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleNextAddStep = () => {
    setFormError(null)
    if (addStep === 1 && !form.title.trim()) {
      setFormError('Title is required')
      return
    }
    if (addStep === 2 && !form.description.trim()) {
      setFormError('Description is required')
      return
    }
    if (addStep === 3 && !form.category.trim()) {
      setFormError('Category is required')
      return
    }
    setAddStep((s) => Math.min(3, s + 1))
  }

  const handleBackAddStep = () => {
    setFormError(null)
    setAddStep((s) => Math.max(1, s - 1))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    setFormLoading(true)
    // Simulasi submit, bisa diganti dengan API call
    setTimeout(() => {
      setFormLoading(false)
      localStorage.setItem('lastCourse', JSON.stringify(form))
      navigate('/plan-course/landing-page', { state: { course: form } })
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-10">
      {/* Progress & Header */}
      <div className="w-full max-w-xl mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 font-medium">Step {addStep} of 3</span>
          <span className="text-gray-500 font-semibold text-lg">
            {stepTitle}
          </span>
        </div>
        <div className="w-full h-2 bg-pink-100 rounded-full">
          <div
            className="h-2 bg-pink-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {/* Card */}
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-xl bg-gray-50 rounded-2xl shadow-2xl shadow-pink-200 p-8"
        style={{
          boxShadow:
            '0 8px 40px 0 rgba(236, 72, 153, 0.15), 0 1.5px 8px 0 rgba(0,0,0,0.04)',
        }}
      >
        {/* Step 1: Title */}
        {addStep === 1 && (
          <div className="mb-6">
            <div className="font-bold text-lg mb-1">Course Title</div>
            <div className="text-gray-600 mb-2">Name your course</div>
            <div className="font-semibold text-xl mb-1">
              How about a working title?
            </div>
            <div className="text-gray-500 mb-4">
              Don't worry, you can change this later.
            </div>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              placeholder="e.g., Learn Advanced JavaScript"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 w-full bg-white"
              required
              autoFocus
            />
            <div className="text-gray-400 text-sm mt-2">
              What will students learn in your course?
            </div>
          </div>
        )}
        {/* Step 2: Description */}
        {addStep === 2 && (
          <div className="mb-6">
            <div className="font-bold text-lg mb-1">Description</div>
            <div className="text-gray-600 mb-2">Describe your course</div>
            <div className="font-semibold text-xl mb-1">
              What will students learn?
            </div>
            <div className="text-gray-500 mb-4">
              Give a short summary of what students will achieve.
            </div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="What will students learn in your course?"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 w-full bg-white"
              rows={3}
              required
            />
          </div>
        )}
        {/* Step 3: Category & Sub Category */}
        {addStep === 3 && (
          <div className="mb-6">
            <div className="font-bold text-lg mb-1">Category</div>
            <div className="text-gray-600 mb-2">Select a category</div>
            <div className="font-semibold text-xl mb-1">
              What category best fits the knowledge you'll share?
            </div>
            <div className="text-gray-500 mb-4">
              Choose a category that best describes your course.
            </div>
            <select
              name="category"
              value={form.category}
              onChange={handleFormChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 w-full bg-white mb-4"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="sub_category"
              value={form.sub_category}
              onChange={handleFormChange}
              placeholder="Sub Category (optional)"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 w-full bg-white"
            />
          </div>
        )}
        {formError && (
          <div className="text-red-500 text-sm mb-2">{formError}</div>
        )}
        {/* Tombol navigasi */}
        <div className="flex justify-between mt-8">
          {addStep > 1 ? (
            <button
              type="button"
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 font-semibold"
              onClick={handleBackAddStep}
              disabled={formLoading}
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          {addStep < 3 ? (
            <button
              type="button"
              className="bg-pink-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNextAddStep}
              disabled={formLoading}
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              className="bg-pink-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formLoading}
            >
              {formLoading ? 'Saving...' : 'Add'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AddCourse
