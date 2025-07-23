import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import {
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
} from '../utils/api'

const initialCourse = {
  title: '',
  description: '',
  price: '',
  category: '',
  sub_category: '',
  thumbnail: '',
}

const CoursesDashboard = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [form, setForm] = useState(initialCourse)
  const [editId, setEditId] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [publishLoading, setPublishLoading] = useState(null)
  const [publishSuccess, setPublishSuccess] = useState(null)
  const [publishError, setPublishError] = useState(null)
  const [search, setSearch] = useState('')
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const modalRef = useRef()

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = () => {
    setLoading(true)
    setError(null)
    getAllCourses()
      .then((data) => setCourses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  const handleAdd = () => {
    setForm(initialCourse)
    setShowAdd(true)
    setFormError(null)
  }

  const handleEdit = (course) => {
    setEditId(course.id)
    setForm({
      title: course.title || '',
      description: course.description || '',
      price: course.price || '',
      category: course.category || '',
      sub_category: course.sub_category || '',
      thumbnail: course.thumbnail || '',
    })
    setShowEdit(true)
    setFormError(null)
  }

  const handleDelete = async (id) => {
    setDeleteLoading(id)
    try {
      await deleteCourse(id)
      setSuccessMsg('Course deleted!')
      fetchCourses()
      setTimeout(() => setSuccessMsg(null), 2000)
    } catch (err) {
      setFormError(err.message)
    } finally {
      setDeleteLoading(null)
      setDeleteConfirmId(null)
    }
  }

  const handlePublish = async (id) => {
    setPublishLoading(id)
    setPublishError(null)
    try {
      await publishCourse(id)
      setPublishSuccess('Course published!')
      fetchCourses()
      setTimeout(() => setPublishSuccess(null), 2000)
    } catch (err) {
      setPublishError(err.message)
      setTimeout(() => setPublishError(null), 2000)
    } finally {
      setPublishLoading(null)
    }
  }

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError(null)
    try {
      if (showAdd) {
        await addCourse(form)
        setSuccessMsg('Course added!')
      } else if (showEdit && editId) {
        await updateCourse(editId, form)
        setSuccessMsg('Course updated!')
      }
      setShowAdd(false)
      setShowEdit(false)
      fetchCourses()
      setTimeout(() => setSuccessMsg(null), 2000)
    } catch (err) {
      setFormError(err.message)
    } finally {
      setFormLoading(false)
    }
  }

  const closeModal = () => {
    setShowAdd(false)
    setShowEdit(false)
    setFormError(null)
    setForm(initialCourse)
  }

  // Filtered courses by search
  const filteredCourses = courses.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.category || '').toLowerCase().includes(q)
    )
  })

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
          <div className="max-w-6xl w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold text-pink-700">Courses</h1>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search courses..."
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 w-full sm:w-64"
                />
                <button
                  className="bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-pink-700 transition shadow"
                  onClick={handleAdd}
                >
                  + Add Course
                </button>
              </div>
            </div>
            {successMsg && (
              <div className="mb-4 text-green-600 font-semibold bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                {successMsg}
              </div>
            )}
            {publishSuccess && (
              <div className="mb-4 text-green-600 font-semibold bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                {publishSuccess}
              </div>
            )}
            {publishError && (
              <div className="mb-4 text-red-500 font-semibold bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                {publishError}
              </div>
            )}
            {(loading || error) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 border border-pink-100 animate-pulse"
                  >
                    <div className="w-full h-40 bg-gray-200 rounded-lg mb-2" />
                    <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-1/2 mb-1" />
                    <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
                    <div className="flex gap-2">
                      <div className="h-8 w-16 bg-gray-100 rounded" />
                      <div className="h-8 w-16 bg-gray-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!loading && !error && filteredCourses.length === 0 && (
              <div className="flex flex-col items-center py-10">
                <div className="mb-4 text-gray-500 text-lg font-semibold">
                  No courses found.
                </div>
                <button
                  className="bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-pink-700 transition shadow"
                  onClick={handleAdd}
                >
                  + Add Course
                </button>
              </div>
            )}
            {/* Add/Edit Course Modal */}
            {(showAdd || showEdit) && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                <div
                  className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative"
                  ref={modalRef}
                >
                  <button
                    className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                  <h2 className="text-lg font-bold mb-4 text-pink-700">
                    {showAdd ? 'Add Course' : 'Edit Course'}
                  </h2>
                  <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-4"
                  >
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleFormChange}
                      placeholder="Title"
                      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      required
                      autoFocus
                    />
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleFormChange}
                      placeholder="Description"
                      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      rows={2}
                      required
                    />
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleFormChange}
                      placeholder="Price"
                      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      required
                      min={0}
                    />
                    <input
                      type="text"
                      name="category"
                      value={form.category}
                      onChange={handleFormChange}
                      placeholder="Category"
                      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                    <input
                      type="text"
                      name="sub_category"
                      value={form.sub_category}
                      onChange={handleFormChange}
                      placeholder="Sub Category"
                      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                    <input
                      type="text"
                      name="thumbnail"
                      value={form.thumbnail}
                      onChange={handleFormChange}
                      placeholder="Thumbnail (URL or path)"
                      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                    <div className="flex gap-3 mt-2">
                      <button
                        type="submit"
                        className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={formLoading}
                      >
                        {formLoading ? 'Saving...' : showAdd ? 'Add' : 'Save'}
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                        onClick={closeModal}
                        disabled={formLoading}
                      >
                        Cancel
                      </button>
                    </div>
                    {formError && (
                      <div className="text-red-500 mt-2">{formError}</div>
                    )}
                  </form>
                </div>
              </div>
            )}
            {!loading && !error && filteredCourses.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredCourses.map((course, idx) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 border border-pink-100 relative"
                  >
                    <img
                      src={
                        course.thumbnail ||
                        'https://via.placeholder.com/300x180?text=No+Image'
                      }
                      alt={course.title}
                      className="w-full h-40 object-cover rounded-lg mb-2 border"
                    />
                    <div className="font-bold text-lg text-pink-700 truncate">
                      {course.title}
                    </div>
                    <div className="text-gray-500 text-sm line-clamp-2 mb-1">
                      {course.description}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs mb-2">
                      <span className="bg-pink-50 text-pink-600 px-2 py-1 rounded">
                        Category: {course.category}
                      </span>
                      <span className="bg-pink-50 text-pink-600 px-2 py-1 rounded">
                        Sub: {course.sub_category}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        By: {course.created_by}
                      </span>
                    </div>
                    <div className="flex gap-4 items-center mb-2">
                      <span className="text-pink-600 font-bold text-lg">
                        Rp{course.price}
                      </span>
                      <span className="text-yellow-600 font-semibold flex items-center gap-1">
                        <svg
                          className="w-4 h-4 inline"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                        </svg>
                        {course.rating}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {course.total_reviews} reviews
                      </span>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-auto">
                      <button
                        className="px-3 py-1 rounded-lg border border-pink-500 text-pink-600 font-semibold hover:bg-pink-50 text-sm"
                        onClick={() => handleEdit(course)}
                        disabled={
                          formLoading ||
                          publishLoading === course.id ||
                          deleteLoading === course.id
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 rounded-lg border border-red-400 text-red-500 font-semibold hover:bg-red-50 text-sm"
                        onClick={() => setDeleteConfirmId(course.id)}
                        disabled={
                          deleteLoading === course.id ||
                          formLoading ||
                          publishLoading === course.id
                        }
                      >
                        {deleteLoading === course.id ? 'Deleting...' : 'Delete'}
                      </button>
                      <button
                        className="px-3 py-1 rounded-lg border border-green-500 text-green-600 font-semibold hover:bg-green-50 text-sm"
                        onClick={() => handlePublish(course.id)}
                        disabled={
                          publishLoading === course.id ||
                          formLoading ||
                          deleteLoading === course.id
                        }
                      >
                        {publishLoading === course.id
                          ? 'Publishing...'
                          : 'Publish'}
                      </button>
                    </div>
                    {/* Delete confirmation */}
                    {deleteConfirmId === course.id && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 rounded-xl">
                        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center gap-3">
                          <div className="font-semibold text-lg text-pink-700">
                            Delete this course?
                          </div>
                          <div className="flex gap-3 mt-2">
                            <button
                              className="bg-pink-600 text-white px-4 py-1 rounded-lg font-semibold hover:bg-pink-700 transition"
                              onClick={() => handleDelete(course.id)}
                              disabled={deleteLoading === course.id}
                            >
                              Yes, delete
                            </button>
                            <button
                              className="px-4 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                              onClick={() => setDeleteConfirmId(null)}
                              disabled={deleteLoading === course.id}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursesDashboard
