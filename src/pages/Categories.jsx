import React, { useEffect, useState, useRef } from 'react'
import {
  getAllCategories,
  deleteCategory,
  updateCategory,
  addCategory as addCategoryAPI,
} from '../utils/api'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [addError, setAddError] = useState(null)
  const [addLoading, setAddLoading] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [deleteError, setDeleteError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [orderChanged, setOrderChanged] = useState(false)
  const dragItem = useRef()
  const dragOverItem = useRef()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    setLoading(true)
    setError(null)
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  // Add category (real API)
  const addCategory = async (e) => {
    e.preventDefault()
    setAddError(null)
    setAddLoading(true)
    try {
      await addCategoryAPI({ name: newCategory })
      setNewCategory('')
      setShowAdd(false)
      setSuccessMsg('Category added!')
      fetchCategories()
      setTimeout(() => setSuccessMsg(null), 2000)
    } catch (err) {
      setAddError(err.message)
    } finally {
      setAddLoading(false)
    }
  }

  const handleDelete = async (id) => {
    setDeleteLoading(id)
    setDeleteError(null)
    try {
      await deleteCategory(id)
      fetchCategories()
      setSuccessMsg('Category deleted!')
      setTimeout(() => setSuccessMsg(null), 2000)
    } catch (err) {
      setDeleteError(err.message)
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleEdit = (cat) => {
    setEditId(cat.id)
    setEditName(cat.name)
    setEditError(null)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setEditLoading(true)
    setEditError(null)
    try {
      await updateCategory(editId, { name: editName })
      setEditId(null)
      setEditName('')
      fetchCategories()
      setSuccessMsg('Category updated!')
      setTimeout(() => setSuccessMsg(null), 2000)
    } catch (err) {
      setEditError(err.message)
    } finally {
      setEditLoading(false)
    }
  }

  // Drag and drop logic
  const handleDragStart = (index) => {
    dragItem.current = index
  }
  const handleDragEnter = (index) => {
    dragOverItem.current = index
  }
  const handleDragEnd = () => {
    if (editId || showAdd) return // disable drag while editing/adding
    const listCopy = [...categories]
    const dragIdx = dragItem.current
    const hoverIdx = dragOverItem.current
    if (dragIdx === hoverIdx || dragIdx == null || hoverIdx == null) return
    const draggedItem = listCopy[dragIdx]
    listCopy.splice(dragIdx, 1)
    listCopy.splice(hoverIdx, 0, draggedItem)
    setCategories(listCopy)
    setOrderChanged(true)
    dragItem.current = null
    dragOverItem.current = null
  }

  const closeAddModal = () => {
    setShowAdd(false)
    setNewCategory('')
    setAddError(null)
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
          <div className="max-w-3xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-pink-700">Categories</h1>
              <button
                className="bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-pink-700 transition shadow"
                onClick={() => setShowAdd(true)}
                disabled={editId}
              >
                + Add Category
              </button>
            </div>
            {successMsg && (
              <div className="mb-4 text-green-600 font-semibold bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                {successMsg}
              </div>
            )}
            {orderChanged && (
              <div className="mb-4 text-yellow-700 font-semibold bg-yellow-50 border-yellow-200 rounded-lg px-4 py-2">
                Order changed (not saved to backend)
              </div>
            )}
            {loading && <div>Loading...</div>}
            {error && (
              <div className="grid grid-cols-1">
                {/* Skeleton wireframe table */}
                <div className="overflow-x-auto animate-pulse">
                  <table className="min-w-full border border-pink-100 rounded-xl bg-white">
                    <thead>
                      <tr className="bg-pink-50">
                        <th className="py-2 px-4 text-left w-12">No</th>
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">ID</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(5)].map((_, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-2 px-4">
                            <div className="h-4 w-6 bg-gray-200 rounded" />
                          </td>
                          <td className="py-2 px-4">
                            <div className="h-4 w-32 bg-gray-200 rounded" />
                          </td>
                          <td className="py-2 px-4">
                            <div className="h-4 w-20 bg-gray-100 rounded" />
                          </td>
                          <td className="py-2 px-4">
                            <div className="flex gap-2">
                              <div className="h-8 w-14 bg-gray-100 rounded" />
                              <div className="h-8 w-14 bg-gray-100 rounded" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-4 flex flex-col items-center gap-2">
                    <div className="h-8 w-40 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-100 rounded" />
                  </div>
                </div>
              </div>
            )}
            {!loading && !error && categories.length === 0 && (
              <div className="flex flex-col items-center py-10">
                <div className="mb-4 text-gray-500 text-lg font-semibold">
                  No categories found.
                </div>
                <button
                  className="bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-pink-700 transition shadow"
                  onClick={() => setShowAdd(true)}
                >
                  + Add Category
                </button>
              </div>
            )}
            {/* Add Category Modal */}
            {showAdd && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm relative">
                  <button
                    className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                    onClick={closeAddModal}
                  >
                    ×
                  </button>
                  <h2 className="text-lg font-bold mb-4 text-pink-700">
                    Add Category
                  </h2>
                  <form onSubmit={addCategory} className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Category name"
                      className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      required
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
                      disabled={addLoading}
                    >
                      {addLoading ? 'Adding...' : 'Add'}
                    </button>
                    {addError && (
                      <div className="text-red-500 mt-2">{addError}</div>
                    )}
                  </form>
                </div>
              </div>
            )}
            {!loading && !error && categories.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-pink-100 rounded-xl bg-white">
                  <thead>
                    <tr className="bg-pink-50">
                      <th className="py-2 px-4 text-left">No</th>
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">ID</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, idx) => (
                      <tr
                        key={cat.id}
                        draggable={!editId && !showAdd}
                        onDragStart={() => handleDragStart(idx)}
                        onDragEnter={() => handleDragEnter(idx)}
                        onDragEnd={handleDragEnd}
                        className={`border-b ${dragItem.current === idx ? 'bg-pink-100' : 'hover:bg-pink-50'} ${editId || showAdd ? 'cursor-not-allowed' : 'cursor-move'}`}
                      >
                        <td className="py-2 px-4">{idx + 1}</td>
                        <td className="py-2 px-4">
                          {editId === cat.id ? (
                            <form
                              onSubmit={handleEditSubmit}
                              className="flex gap-2 items-center"
                            >
                              <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-200"
                                required
                                autoFocus
                              />
                              <button
                                type="submit"
                                className="bg-pink-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-pink-700 transition text-sm"
                                disabled={editLoading}
                              >
                                {editLoading ? 'Saving...' : 'Save'}
                              </button>
                              <button
                                type="button"
                                className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm"
                                onClick={() => setEditId(null)}
                                disabled={editLoading}
                              >
                                Cancel
                              </button>
                              {editError && (
                                <div className="text-red-500 ml-2">
                                  {editError}
                                </div>
                              )}
                            </form>
                          ) : (
                            cat.name
                          )}
                        </td>
                        <td className="py-2 px-4 text-xs text-gray-400">
                          {cat.id}
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex gap-2">
                            <button
                              className="px-3 py-1 rounded-lg border border-pink-500 text-pink-600 font-semibold hover:bg-pink-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() => handleEdit(cat)}
                              disabled={
                                editLoading ||
                                deleteLoading === cat.id ||
                                showAdd
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="px-3 py-1 rounded-lg border border-red-400 text-red-500 font-semibold hover:bg-red-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() => handleDelete(cat.id)}
                              disabled={
                                deleteLoading === cat.id ||
                                editLoading ||
                                showAdd
                              }
                            >
                              {deleteLoading === cat.id
                                ? 'Deleting...'
                                : 'Delete'}
                            </button>
                          </div>
                          {deleteError && deleteLoading === cat.id && (
                            <div className="text-red-500 mt-1">
                              {deleteError}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
