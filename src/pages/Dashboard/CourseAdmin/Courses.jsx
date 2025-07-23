import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../../../components/Sidebar'
import DashboardHeader from '../../../components/DashboardHeader'
import {
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
} from '../../../utils/api'
import {
  FaEye,
  FaEdit,
  FaCheck,
  FaTimes,
  FaTrash,
  FaClock,
  FaRegCopy,
  FaStar,
} from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
// import AddCourse from './AddCourse' // Tidak perlu lagi

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
  // const [showAdd, setShowAdd] = useState(false) // Hapus
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
  // Tambahkan state untuk modal konfirmasi universal
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    type: '',
    course: null,
  })
  // Tambahkan state untuk sorting dan filtering
  const [sortBy, setSortBy] = useState('title')
  const [sortDir, setSortDir] = useState('asc')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  // State for view detail modal
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  // State for bulk actions
  const [selectedIds, setSelectedIds] = useState([])
  const allPageIds = courses.map((c) => c.id)
  const isAllSelected =
    allPageIds.length > 0 && allPageIds.every((id) => selectedIds.includes(id))
  const toggleSelectAll = () => {
    if (isAllSelected)
      setSelectedIds(selectedIds.filter((id) => !allPageIds.includes(id)))
    else setSelectedIds([...new Set([...selectedIds, ...allPageIds])])
  }
  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }
  const clearSelection = () => setSelectedIds([])

  // Bulk action handlers
  const handleBulkDelete = async () => {
    for (const id of selectedIds) {
      await handleDelete(id)
    }
    clearSelection()
  }
  const handleBulkPublish = async () => {
    for (const id of selectedIds) {
      await handlePublish(id)
    }
    clearSelection()
  }
  const handleBulkUnpublish = async () => {
    for (const id of selectedIds) {
      await handlePublish(id)
    }
    clearSelection()
  }

  // Tambahkan state untuk bulk edit
  const [showBulkEdit, setShowBulkEdit] = useState(false)
  const [bulkEditForm, setBulkEditForm] = useState({
    category: '',
    sub_category: '',
    price: '',
  })
  const [bulkEditLoading, setBulkEditLoading] = useState(false)
  const [bulkEditError, setBulkEditError] = useState(null)
  const [bulkEditSuccess, setBulkEditSuccess] = useState(null)

  // Handler untuk buka modal bulk edit
  const openBulkEdit = () => {
    setBulkEditForm({ category: '', sub_category: '', price: '' })
    setBulkEditError(null)
    setShowBulkEdit(true)
  }
  const closeBulkEdit = () => {
    setShowBulkEdit(false)
    setBulkEditError(null)
  }
  // Handler submit bulk edit
  const handleBulkEditSubmit = async (e) => {
    e.preventDefault()
    setBulkEditLoading(true)
    setBulkEditError(null)
    let updated = 0
    try {
      for (const id of selectedIds) {
        const course = courses.find((c) => c.id === id)
        if (!course) continue
        const updateData = {
          ...course,
          ...(bulkEditForm.category && { category: bulkEditForm.category }),
          ...(bulkEditForm.sub_category && {
            sub_category: bulkEditForm.sub_category,
          }),
          ...(bulkEditForm.price && { price: bulkEditForm.price }),
        }
        await updateCourse(id, updateData)
        updated++
      }
      setBulkEditSuccess(`${updated} course(s) updated!`)
      fetchCourses()
      setTimeout(() => setBulkEditSuccess(null), 2000)
      setShowBulkEdit(false)
      clearSelection()
    } catch (err) {
      setBulkEditError(err.message)
    } finally {
      setBulkEditLoading(false)
    }
  }

  // Tambahkan state untuk stepper
  const [addStep, setAddStep] = useState(1)
  const totalAddSteps = 3

  // Tambahkan state spendTime
  const [spendTime, setSpendTime] = useState('')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = () => {
    setLoading(true)
    setError(null)
    setFetchError(false)
    getAllCourses()
      .then((data) => setCourses(data))
      .catch((err) => {
        setError(err.message)
        setFetchError(true)
        toast.error('Gagal memuat data courses!')
      })
      .finally(() => setLoading(false))
  }

  const navigate = useNavigate()

  // const handleAdd = () => {
  //   setForm(initialCourse)
  //   setShowAdd(true)
  //   setFormError(null)
  // }

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
      toast.success('Course berhasil dihapus!')
      fetchCourses()
      setTimeout(() => setSuccessMsg(null), 2000)
    } catch (err) {
      setFormError(err.message)
      toast.error('Gagal menghapus course!')
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
      toast.success('Course berhasil dipublish!')
      fetchCourses()
      setTimeout(() => setPublishSuccess(null), 2000)
    } catch (err) {
      setPublishError(err.message)
      toast.error('Gagal publish course!')
      setTimeout(() => setPublishError(null), 2000)
    } finally {
      setPublishLoading(null)
    }
  }

  // Helper for formatting price
  const formatPrice = (value) => {
    if (!value) return ''
    return Number(value.toString().replace(/\D/g, '')).toLocaleString('id-ID')
  }

  const handleFormChange = (e) => {
    if (e.target.name === 'price') {
      // Only allow numbers and format
      const raw = e.target.value.replace(/\D/g, '')
      setForm({ ...form, price: raw })
    } else {
      setForm({ ...form, [e.target.name]: e.target.value })
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError(null)
    try {
      // if (showAdd) {
      //   const payload = {
      //     title: form.title,
      //     description: form.description,
      //     category: form.category,
      //     sub_category: form.sub_category,
      //   }
      //   let newCourse = null
      //   try {
      //     const res = await addCourse(payload)
      //     newCourse = res
      //   } catch (err) {
      //     // Jika gagal, simulasikan dummy
      //     newCourse = {
      //       id: Date.now(),
      //       title: form.title,
      //       description: form.description,
      //       category: form.category,
      //       sub_category: form.sub_category,
      //       created_by: 'dummy',
      //       students_count: 0,
      //       is_published: false,
      //     }
      //     setCourses((prev) => [newCourse, ...prev])
      //     setSuccessMsg('Dummy course added (offline)!')
      //     toast.success('Dummy course added (offline)!')
      //     setTimeout(() => setSuccessMsg(null), 2000)
      //   }
      //   setShowAdd(false)
      //   setShowEdit(false)
      //   // Redirect ke PlanCourse dengan data course baru
      //   navigate('/plan-course', { state: { course: newCourse } })
      //   return
      // } else
      if (showEdit && editId) {
        await updateCourse(editId, form)
        setSuccessMsg('Course updated!')
        toast.success('Course berhasil diupdate!')
      }
      // setShowAdd(false)
      setShowEdit(false)
      fetchCourses()
      setTimeout(() => setSuccessMsg(null), 2000)
    } catch (err) {
      setFormError(err.message)
      toast.error('Gagal menyimpan course!')
    } finally {
      setFormLoading(false)
    }
  }

  // const closeModal = () => {
  //   setShowAdd(false)
  //   setShowEdit(false)
  //   setFormError(null)
  //   setForm(initialCourse)
  // }

  // Fungsi untuk membuka modal konfirmasi
  const openConfirmModal = (type, course) => {
    setConfirmModal({ open: true, type, course })
  }
  // Fungsi untuk menutup modal konfirmasi
  const closeConfirmModal = () => {
    setConfirmModal({ open: false, type: '', course: null })
  }

  // Fungsi handle untuk bulk action/modal
  const handleConfirmAction = async () => {
    if (!confirmModal.course) return
    if (confirmModal.type === 'delete') {
      await handleDelete(confirmModal.course.id)
    } else if (confirmModal.type === 'publish') {
      await handlePublish(confirmModal.course.id)
    } else if (confirmModal.type === 'unpublish') {
      await handlePublish(confirmModal.course.id)
    }
    closeConfirmModal()
  }

  // Sorting & filtering logic
  const sortedFilteredCourses = courses
    .filter((c) => {
      if (filterCategory && c.category !== filterCategory) return false
      if (filterStatus) {
        if (filterStatus === 'published' && !c.is_published) return false
        if (filterStatus === 'draft' && c.is_published) return false
      }
      return true
    })
    .sort((a, b) => {
      let valA = a[sortBy] || ''
      let valB = b[sortBy] || ''
      if (sortBy === 'status') {
        valA = a.is_published ? 1 : 0
        valB = b.is_published ? 1 : 0
      }
      if (typeof valA === 'string') valA = valA.toLowerCase()
      if (typeof valB === 'string') valB = valB.toLowerCase()
      if (valA < valB) return sortDir === 'asc' ? -1 : 1
      if (valA > valB) return sortDir === 'asc' ? 1 : -1
      return 0
    })

  // Improved search: search by title, description, category, instructor, status
  const filteredBySearch = sortedFilteredCourses.filter((c) => {
    const q = search.toLowerCase()
    return (
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.category || '').toLowerCase().includes(q) ||
      (c.created_by || '').toLowerCase().includes(q) ||
      (c.is_published ? 'published' : 'draft').includes(q)
    )
  })

  // Ambil semua kategori unik dari courses
  const allCategories = Array.from(
    new Set(courses.map((c) => c.category).filter(Boolean)),
  )

  // Tambahkan state untuk pagination
  const [page, setPage] = useState(1)
  const pageSize = 10 // Number of items per page

  // Ganti filteredCourses dengan sortedFilteredCourses di pagination
  const totalPages = Math.ceil(filteredBySearch.length / pageSize)
  const paginatedCourses = filteredBySearch.slice(
    (page - 1) * pageSize,
    page * pageSize,
  )

  const handleView = (course) => {
    setSelectedCourse(course)
    setShowDetailModal(true)
  }
  const closeDetailModal = () => {
    setShowDetailModal(false)
    setSelectedCourse(null)
  }

  // Helper for image URL (from BE: course.thumbnail)
  const getImageUrl = (url) => {
    if (
      !url ||
      typeof url !== 'string' ||
      url.trim() === '' ||
      url === 'null' ||
      url === 'undefined'
    )
      return 'https://via.placeholder.com/40x40?text=No+Image'
    if (url.startsWith('http')) return url
    return `https://lms.alanwari.ponpes.id/storage/${url}`
  }

  // State for copy feedback
  const [copied, setCopied] = useState({ id: false, slug: false })
  const handleCopy = (type, value) => {
    navigator.clipboard.writeText(value)
    setCopied((prev) => ({ ...prev, [type]: true }))
    setTimeout(() => setCopied((prev) => ({ ...prev, [type]: false })), 1200)
  }

  const [fetchError, setFetchError] = useState(false)

  // Reset spendTime saat modal add dibuka/ditutup
  useEffect(() => {
    // if (showAdd) {
    //   setAddStep(1)
    //   setSpendTime('')
    // }
  }, [])

  const handleNextAddStep = () => {
    // Validasi tiap step
    if (addStep === 1 && !form.title.trim()) {
      toast.error('Title is required')
      return
    }
    if (addStep === 2 && !form.description.trim()) {
      toast.error('Description is required')
      return
    }
    if (addStep === 3 && !form.category.trim()) {
      toast.error('Category is required')
      return
    }
    setAddStep((s) => Math.min(totalAddSteps, s + 1))
  }
  const handleBackAddStep = () => setAddStep((s) => Math.max(1, s - 1))

  if (error && courses.length === 0) {
    return (
      <React.Fragment>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-red-600 text-lg font-bold mb-4">
            Gagal memuat data courses.
          </p>
          <button
            onClick={fetchCourses}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            Coba Lagi
          </button>
        </div>
      </React.Fragment>
    )
  }

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
                  onClick={() => navigate('/dashboard/courses/add')}
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
              <div className="overflow-x-auto animate-pulse">
                <table className="min-w-full border border-pink-100 rounded-xl bg-white">
                  <thead>
                    <tr className="bg-pink-600 text-white">
                      <th className="py-2 px-4 text-left">COURSE</th>
                      <th className="py-2 px-4 text-left">CATEGORY</th>
                      <th className="py-2 px-4 text-left">INSTRUCTOR</th>
                      <th className="py-2 px-4 text-left">STUDENTS</th>
                      <th className="py-2 px-4 text-left">STATUS</th>
                      <th className="py-2 px-4 text-left">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-2 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gray-200 rounded mr-2" />
                            <div>
                              <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
                              <div className="h-3 w-24 bg-gray-100 rounded" />
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-4">
                          <div className="h-4 w-20 bg-gray-200 rounded" />
                        </td>
                        <td className="py-2 px-4">
                          <div className="h-4 w-24 bg-gray-200 rounded" />
                        </td>
                        <td className="py-2 px-4">
                          <div className="h-4 w-8 bg-gray-200 rounded" />
                        </td>
                        <td className="py-2 px-4">
                          <div className="h-6 w-16 bg-gray-100 rounded" />
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex gap-2">
                            <div className="h-8 w-8 bg-gray-100 rounded" />
                            <div className="h-8 w-8 bg-gray-100 rounded" />
                            <div className="h-8 w-8 bg-gray-100 rounded" />
                            <div className="h-8 w-8 bg-gray-100 rounded" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!loading && !error && filteredBySearch.length === 0 && (
              <div className="flex flex-col items-center py-10">
                <div className="mb-4 text-gray-500 text-lg font-semibold">
                  No courses found.
                </div>
                <button
                  className="bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-pink-700 transition shadow"
                  onClick={() => navigate('/dashboard/courses/add')}
                >
                  + Add Course
                </button>
              </div>
            )}
            {/* Add/Edit Course Modal */}
            {/* <AddCourse
              form={form}
              formError={formError}
              formLoading={formLoading}
              addStep={addStep}
              totalAddSteps={totalAddSteps}
              handleFormChange={handleFormChange}
              handleFormSubmit={handleFormSubmit}
              handleNextAddStep={handleNextAddStep}
              handleBackAddStep={handleBackAddStep}
              closeModal={closeModal}
              showAdd={showAdd}
            /> */}
            {!loading && !error && filteredBySearch.length > 0 && (
              <>
                {/* Filter & Sort Controls */}
                <div className="flex flex-wrap gap-2 mb-4 items-center">
                  <label className="text-sm font-semibold">Filter:</label>
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={filterCategory}
                    onChange={(e) => {
                      setFilterCategory(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value="">All Categories</option>
                    {allCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={filterStatus}
                    onChange={(e) => {
                      setFilterStatus(e.target.value)
                      setPage(1)
                    }}
                  >
                    <option value="">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                  <label className="ml-4 text-sm font-semibold">Sort by:</label>
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="title">Title</option>
                    <option value="status">Status</option>
                  </select>
                  <button
                    className="ml-1 px-2 py-1 border rounded text-sm"
                    onClick={() =>
                      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
                    }
                  >
                    {sortDir === 'asc' ? '▲' : '▼'}
                  </button>
                </div>
                {/* Bulk Action Bar */}
                {selectedIds.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2 items-center bg-pink-50 border border-pink-200 rounded-lg px-4 py-2">
                    <span className="font-semibold text-pink-700">
                      {selectedIds.length} selected
                    </span>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={openBulkEdit}
                      disabled={bulkEditLoading}
                    >
                      Bulk Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={handleBulkDelete}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      onClick={handleBulkPublish}
                    >
                      Publish
                    </button>
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
                      onClick={handleBulkUnpublish}
                    >
                      Unpublish
                    </button>
                    <button
                      className="ml-2 text-gray-500 hover:text-pink-600 underline text-sm"
                      onClick={clearSelection}
                    >
                      Clear
                    </button>
                  </div>
                )}
                {/* Modal Bulk Edit */}
                {showBulkEdit && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                      <button
                        className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                        onClick={closeBulkEdit}
                      >
                        ×
                      </button>
                      <h2 className="text-lg font-bold mb-4 text-pink-700">
                        Bulk Edit Courses ({selectedIds.length} selected)
                      </h2>
                      <form
                        onSubmit={handleBulkEditSubmit}
                        className="flex flex-col gap-4"
                      >
                        <input
                          type="text"
                          name="category"
                          value={bulkEditForm.category}
                          onChange={(e) =>
                            setBulkEditForm((f) => ({
                              ...f,
                              category: e.target.value,
                            }))
                          }
                          placeholder="New Category (optional)"
                          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                        />
                        <input
                          type="text"
                          name="sub_category"
                          value={bulkEditForm.sub_category}
                          onChange={(e) =>
                            setBulkEditForm((f) => ({
                              ...f,
                              sub_category: e.target.value,
                            }))
                          }
                          placeholder="New Sub Category (optional)"
                          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                        />
                        <input
                          type="text"
                          name="price"
                          value={bulkEditForm.price}
                          onChange={(e) =>
                            setBulkEditForm((f) => ({
                              ...f,
                              price: e.target.value.replace(/\D/g, ''),
                            }))
                          }
                          placeholder="New Price (optional)"
                          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                        />
                        {bulkEditError && (
                          <div className="text-red-500 text-sm">
                            {bulkEditError}
                          </div>
                        )}
                        {bulkEditSuccess && (
                          <div className="text-green-600 text-sm">
                            {bulkEditSuccess}
                          </div>
                        )}
                        <div className="flex gap-3 mt-2">
                          <button
                            type="submit"
                            className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={bulkEditLoading}
                          >
                            {bulkEditLoading ? 'Saving...' : 'Save Changes'}
                          </button>
                          <button
                            type="button"
                            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                            onClick={closeBulkEdit}
                            disabled={bulkEditLoading}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                <div className="flex-1 flex flex-col min-h-[400px] overflow-x-auto w-full justify-between">
                  <table className="min-w-[900px] border border-pink-100 rounded-xl bg-white flex-grow">
                    <thead>
                      <tr className="bg-pink-600 text-white">
                        <th
                          className="py-2 px-4 text-left cursor-pointer"
                          onClick={() => {
                            setSortBy('title')
                            setSortDir(
                              sortBy === 'title' && sortDir === 'asc'
                                ? 'desc'
                                : 'asc',
                            )
                          }}
                        >
                          COURSE{' '}
                          {sortBy === 'title'
                            ? sortDir === 'asc'
                              ? '▲'
                              : '▼'
                            : ''}
                        </th>
                        <th className="py-2 px-4 text-left">CATEGORY</th>
                        <th className="py-2 px-4 text-left">INSTRUCTOR</th>
                        <th className="py-2 px-4 text-left">STUDENTS</th>
                        <th
                          className="py-2 px-4 text-left cursor-pointer"
                          onClick={() => {
                            setSortBy('status')
                            setSortDir(
                              sortBy === 'status' && sortDir === 'asc'
                                ? 'desc'
                                : 'asc',
                            )
                          }}
                        >
                          STATUS{' '}
                          {sortBy === 'status'
                            ? sortDir === 'asc'
                              ? '▲'
                              : '▼'
                            : ''}
                        </th>
                        <th className="py-2 px-4 text-left">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedCourses.map((course) => (
                        <tr
                          key={course.id}
                          className="border-b hover:bg-pink-50"
                        >
                          <td className="py-2 px-4">
                            <div className="flex items-center gap-2">
                              <img
                                src={getImageUrl(course.thumbnail)}
                                alt={course.title}
                                className="w-10 h-10 object-cover rounded mr-2 border"
                              />
                              <div>
                                <div className="font-semibold text-gray-900 leading-tight">
                                  {course.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {course.description || '-'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-4 text-gray-700">
                            {course.category}
                          </td>
                          <td className="py-2 px-4 text-gray-700">
                            {course.created_by}
                          </td>
                          <td className="py-2 px-4 text-gray-700">
                            {course.students_count || 0}
                          </td>
                          <td className="py-2 px-4">
                            {course.is_published ? (
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                                PUBLISHED
                              </span>
                            ) : (
                              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                                DRAFT
                              </span>
                            )}
                          </td>
                          <td className="py-2 px-4">
                            <div className="flex gap-2 items-center">
                              <button
                                className="text-gray-500 hover:text-pink-600"
                                title="View"
                                onClick={() => handleView(course)}
                                disabled={
                                  formLoading ||
                                  publishLoading === course.id ||
                                  deleteLoading === course.id
                                }
                              >
                                <FaEye />
                              </button>
                              <button
                                className="text-pink-500 hover:text-pink-700"
                                title="Edit"
                                onClick={() =>
                                  navigate('/plan-course/landing-page', {
                                    state: { course },
                                  })
                                }
                                disabled={
                                  formLoading ||
                                  publishLoading === course.id ||
                                  deleteLoading === course.id
                                }
                              >
                                <FaEdit />
                              </button>
                              {course.is_published ? (
                                <button
                                  className="text-orange-500 hover:text-orange-700"
                                  title="Unpublish"
                                  onClick={() =>
                                    openConfirmModal('unpublish', course)
                                  }
                                  disabled={
                                    publishLoading === course.id ||
                                    formLoading ||
                                    deleteLoading === course.id
                                  }
                                >
                                  <FaTimes />
                                </button>
                              ) : (
                                <button
                                  className="text-green-600 hover:text-green-800"
                                  title="Publish"
                                  onClick={() =>
                                    openConfirmModal('publish', course)
                                  }
                                  disabled={
                                    publishLoading === course.id ||
                                    formLoading ||
                                    deleteLoading === course.id
                                  }
                                >
                                  <FaCheck />
                                </button>
                              )}
                              <button
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                                onClick={() =>
                                  openConfirmModal('delete', course)
                                }
                                disabled={
                                  deleteLoading === course.id ||
                                  formLoading ||
                                  publishLoading === course.id
                                }
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center items-center gap-2 mt-4">
                  <button
                    className="px-3 py-1 rounded border bg-white text-pink-600 font-semibold disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <span className="font-semibold text-gray-700">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="px-3 py-1 rounded border bg-white text-pink-600 font-semibold disabled:opacity-50"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {/* Universal Confirmation Modal */}
            {confirmModal.open && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm relative flex flex-col items-center">
                  <button
                    className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                    onClick={closeConfirmModal}
                  >
                    ×
                  </button>
                  <h2 className="text-lg font-bold mb-4 text-pink-700">
                    {confirmModal.type === 'delete' && 'Delete this course?'}
                    {confirmModal.type === 'publish' && 'Publish this course?'}
                    {confirmModal.type === 'unpublish' &&
                      'Unpublish this course?'}
                  </h2>
                  <div className="mb-4 text-gray-700 text-center">
                    {confirmModal.course && (
                      <>
                        <div className="font-semibold mb-2">
                          {confirmModal.course.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          /
                          {confirmModal.course.slug ||
                            confirmModal.course.title
                              ?.toLowerCase()
                              .replace(/\s+/g, '-')}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
                      onClick={handleConfirmAction}
                    >
                      {confirmModal.type === 'delete' && 'Yes, Delete'}
                      {confirmModal.type === 'publish' && 'Yes, Publish'}
                      {confirmModal.type === 'unpublish' && 'Yes, Unpublish'}
                    </button>
                    <button
                      className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                      onClick={closeConfirmModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* View Detail Modal */}
            {showDetailModal && selectedCourse && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
                  <button
                    className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                    onClick={closeDetailModal}
                    title="Close"
                  >
                    ×
                  </button>
                  <h2 className="text-xl font-bold mb-4 text-pink-700 mt-2">
                    Course Detail
                  </h2>
                  <div className="flex gap-4 mb-4">
                    <img
                      src={getImageUrl(selectedCourse.thumbnail)}
                      alt={selectedCourse.title}
                      className="w-24 h-24 object-cover rounded border"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg text-gray-900 mb-1 flex items-center gap-2">
                        {selectedCourse.title}
                        {selectedCourse.label && (
                          <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold ml-1">
                            {selectedCourse.label}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                        <span className="font-semibold">Slug:</span> /
                        {selectedCourse.slug ||
                          selectedCourse.title
                            ?.toLowerCase()
                            .replace(/\s+/g, '-')}
                        <button
                          className="ml-1 text-gray-400 hover:text-pink-600 text-xs"
                          title="Copy Slug"
                          onClick={() =>
                            handleCopy(
                              'slug',
                              '/' +
                                (selectedCourse.slug ||
                                  selectedCourse.title
                                    ?.toLowerCase()
                                    .replace(/\s+/g, '-')),
                            )
                          }
                        >
                          <FaRegCopy />
                        </button>
                        {copied.slug && (
                          <span className="text-green-600 text-xs ml-1">
                            Copied!
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">Category:</span>{' '}
                        {selectedCourse.category}
                      </div>
                      <div className="text-sm text-gray-700 mb-1 flex items-center gap-2">
                        <span className="font-semibold">Sub Category:</span>
                        {selectedCourse.sub_category && (
                          <span className="inline-block bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-bold">
                            {selectedCourse.sub_category}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">Instructor:</span>{' '}
                        {selectedCourse.created_by}
                      </div>
                      <div className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">Price:</span> Rp
                        {Number(selectedCourse.price).toLocaleString('id-ID')}
                      </div>
                      <div className="text-sm text-gray-700 mb-1 flex items-center gap-2">
                        <span className="font-semibold">Rating:</span>
                        <span className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          {selectedCourse.rating || '-'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">Total Reviews:</span>{' '}
                        {selectedCourse.total_reviews || 0}
                      </div>
                      <div className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">Created At:</span>{' '}
                        {selectedCourse.created_at
                          ? new Date(selectedCourse.created_at).toLocaleString(
                              'id-ID',
                              { dateStyle: 'medium', timeStyle: 'short' },
                            )
                          : '-'}
                      </div>
                      <div className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">Published At:</span>{' '}
                        {selectedCourse.published_at
                          ? new Date(
                              selectedCourse.published_at,
                            ).toLocaleString('id-ID', {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            })
                          : '-'}
                      </div>
                      <div className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">Students:</span>{' '}
                        {selectedCourse.students_count || 0}
                      </div>
                      <div className="text-sm mb-1 flex items-center gap-2">
                        <span className="font-semibold">Status:</span>
                        {selectedCourse.is_published ? (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            <FaCheck className="inline-block" /> PUBLISHED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                            <FaClock className="inline-block" /> DRAFT
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="font-semibold text-gray-700 mb-1">
                      Description:
                    </div>
                    <div className="text-gray-600 text-sm whitespace-pre-line">
                      {selectedCourse.description}
                    </div>
                  </div>
                  {/* Edit Button */}
                  <div className="flex justify-end mt-6">
                    <button
                      className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 shadow"
                      onClick={() => {
                        closeDetailModal()
                        navigate('/plan-course/landing-page', {
                          state: { course: selectedCourse },
                        })
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default CoursesDashboard
