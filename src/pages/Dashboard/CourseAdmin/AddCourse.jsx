import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addCourse } from '../../../utils/api/courseApi'
import { getAllCategories } from '../../../utils/api/categoryApi'

const stepTitles = ['Course Title', 'Description', 'Category']

const initialForm = {
  title: '',
  description: '',
  category_id: '',
}

const AddCourse = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [addStep, setAddStep] = useState(1)
  const [formError, setFormError] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoryError, setCategoryError] = useState(null)

  // Fetch categories from backend
  React.useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data || []))
      .catch((err) => {
        setCategories([])
        setCategoryError(err.message || 'Gagal memuat kategori')
      })
  }, [])

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
    if (addStep === 3 && !form.category_id) {
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
    try {
      const { title, description, category_id } = form
      const mentor_id = localStorage.getItem('mentor_id')
      // Siapkan payload hanya dengan field yang ada nilainya
      const payload = { title }
      if (description && description.trim()) payload.description = description
      if (category_id) payload.category_id = category_id
      if (mentor_id) payload.mentor_id = mentor_id
      console.log('[ADD COURSE] Payload yang dikirim:', payload)
      const res = await addCourse(payload)
      localStorage.setItem('lastCourse', JSON.stringify(res))
      navigate('/plan-course/landing-page', { state: { course: res } })
    } catch (err) {
      console.error('[ADD COURSE] Error response:', err)
      if (err.errors) {
        const errorMessages = Object.values(err.errors).flat().join(', ')
        setFormError(errorMessages)
      } else if (typeof err === 'object') {
        // Jika object kosong, tampilkan pesan user-friendly
        if (Object.keys(err).length === 0) {
          setFormError(
            'Terjadi kesalahan validasi, silakan cek data yang diinput.',
          )
        } else {
          setFormError(JSON.stringify(err))
        }
      } else {
        setFormError(err.message || String(err))
      }
    } finally {
      setFormLoading(false)
    }
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
            {categoryError && (
              <div className="text-red-500 text-sm mb-2">{categoryError}</div>
            )}
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleFormChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 w-full bg-white mb-4"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
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
