import React, { useEffect, useState, useRef } from 'react'
import {
  getAllCategories,
  deleteCategory,
  updateCategory,
  addCategory as addCategoryAPI,
} from '../../utils/api/categoryApi'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
  FaFolder,
  FaGripVertical,
} from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

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
  const [searchTerm, setSearchTerm] = useState('')
  const dragItem = useRef()
  const dragOverItem = useRef()

  // State for bulk actions
  const [selectedIds, setSelectedIds] = useState([])
  const allIds = categories.map((c) => c.id)
  const isAllSelected =
    allIds.length > 0 && allIds.every((id) => selectedIds.includes(id))
  const toggleSelectAll = () => {
    if (isAllSelected) setSelectedIds([])
    else setSelectedIds([...allIds])
  }
  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }
  const clearSelection = () => setSelectedIds([])
  const handleBulkDelete = async () => {
    for (const id of selectedIds) {
      await handleDelete(id)
    }
    clearSelection()
  }

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // State for confirmation modal
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    ids: [],
    names: [],
  })
  const openConfirmModal = (ids, names) =>
    setConfirmModal({ open: true, ids, names })
  const closeConfirmModal = () =>
    setConfirmModal({ open: false, ids: [], names: [] })
  const handleConfirmDelete = async () => {
    for (const id of confirmModal.ids) {
      await handleDelete(id)
    }
    closeConfirmModal()
  }

  // State for undo delete
  const [undoData, setUndoData] = useState(null)
  const [undoTimeout, setUndoTimeout] = useState(null)

  // State for edit modal
  const [showEdit, setShowEdit] = useState(false)

  // State untuk add multiple
  const [addNames, setAddNames] = useState([''])
  const handleAddNameChange = (idx, value) => {
    setAddNames((prev) => prev.map((n, i) => (i === idx ? value : n)))
  }
  const handleAddNameRemove = (idx) => {
    setAddNames((prev) => prev.filter((_, i) => i !== idx))
  }
  const handleAddNameAdd = () => {
    setAddNames((prev) => [...prev, ''])
  }
  const handleAddDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(addNames)
    const [removed] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, removed)
    setAddNames(items)
  }

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
    const names = addNames.map((n) => n.trim()).filter((n) => n)
    if (names.length === 0) {
      setAddError('Please enter at least one category name.')
      setAddLoading(false)
      return
    }
    try {
      for (const name of names) {
        await addCategoryAPI({ name })
      }
      setAddNames([''])
      setShowAdd(false)
      setSuccessMsg('Categories added!')
      fetchCategories()
      setTimeout(() => setSuccessMsg(null), 2000)
      toast.success('Categories added successfully!')
    } catch (err) {
      setAddError(err.message)
      toast.error(err.message)
    } finally {
      setAddLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this category?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) return
    setDeleteLoading(id)
    setDeleteError(null)
    try {
      const deletedCat = categories.find((c) => c.id === id)
      await deleteCategory(id)
      setUndoData(deletedCat)
      const timeout = setTimeout(() => {
        setUndoData(null)
      }, 3000)
      setUndoTimeout(timeout)
      fetchCategories()
      setSuccessMsg('Category deleted!')
      await Swal.fire({
        icon: 'success',
        title: 'Category deleted!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
      setTimeout(() => setSuccessMsg(null), 2000)
    } catch (err) {
      setDeleteError(err.message)
      await Swal.fire({
        icon: 'error',
        title: 'Failed to delete category',
        text: err.message,
        confirmButtonColor: '#e11d48',
        customClass: { popup: 'rounded-xl' },
      })
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleUndoDelete = async () => {
    if (!undoData) return
    clearTimeout(undoTimeout)
    setUndoTimeout(null)
    setAddLoading(true)
    try {
      await addCategoryAPI({ name: undoData.name })
      setUndoData(null)
      fetchCategories()
      setSuccessMsg('Category restored!')
      setTimeout(() => setSuccessMsg(null), 2000)
      toast.success('Category restored successfully!')
    } catch (err) {
      setAddError('Failed to restore category')
      toast.error('Failed to restore category')
    } finally {
      setAddLoading(false)
    }
  }

  const handleEdit = (cat) => {
    setEditId(cat.id)
    setEditName(cat.name)
    setEditError(null)
    setShowEdit(true)
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
      toast.success('Category updated successfully!')
    } catch (err) {
      setEditError(err.message)
      toast.error(err.message)
    } finally {
      setEditLoading(false)
    }
  }

  const closeEditModal = () => {
    setShowEdit(false)
    setEditId(null)
    setEditName('')
    setEditError(null)
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
    setAddNames([''])
    setAddError(null)
  }

  return (
    <>
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
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <div className="flex-1 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Categories Management
                  </h1>
                  <p className="text-gray-600">
                    Organize courses with categories for better navigation
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white rounded-lg shadow-sm px-4 py-2">
                    <span className="text-sm text-gray-500">
                      Total Categories:
                    </span>
                    <span className="ml-2 font-semibold text-gray-900">
                      {categories.length}
                    </span>
                  </div>
                  <button
                    className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition shadow-lg flex items-center space-x-2"
                    onClick={() => setShowAdd(true)}
                    disabled={editId}
                  >
                    <FaPlus className="w-4 h-4" />
                    <span>Add Category</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Success/Error Messages */}
            {successMsg && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center">
                  <FaPlus className="text-green-500 mr-3" />
                  <span className="text-green-800 font-medium">
                    {successMsg}
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center">
                  <FaTrash className="text-red-500 mr-3" />
                  <span className="text-red-800 font-medium">{error}</span>
                </div>
              </div>
            )}

            {orderChanged && (
              <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-center">
                  <FaFolder className="text-yellow-500 mr-3" />
                  <span className="text-yellow-800 font-medium">
                    Order changed (not saved to backend)
                  </span>
                </div>
              </div>
            )}

            {/* Categories List */}
            {loading ? (
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="animate-pulse">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/6"></div>
                  </div>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-b border-gray-100 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                          <div>
                            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-48"></div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                          <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <FaFolder className="mx-auto text-gray-400 text-4xl mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No categories found' : 'No categories yet'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm
                    ? 'Try adjusting your search criteria'
                    : 'Categories will appear here once they are created'}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Clear search
                  </button>
                )}
                {!searchTerm && (
                  <button
                    className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition shadow-lg flex items-center space-x-2 mx-auto"
                    onClick={() => setShowAdd(true)}
                  >
                    <FaPlus className="w-4 h-4" />
                    <span>Add First Category</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {selectedIds.length > 0
                          ? `${selectedIds.length} selected`
                          : 'Select all'}
                      </span>
                    </div>
                    {selectedIds.length > 0 && (
                      <button
                        onClick={() =>
                          openConfirmModal(
                            selectedIds,
                            categories
                              .filter((c) => selectedIds.includes(c.id))
                              .map((c) => c.name),
                          )
                        }
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete Selected
                      </button>
                    )}
                  </div>
                </div>

                {/* Categories Cards */}
                <div className="divide-y divide-gray-100">
                  {filteredCategories.map((cat, idx) => (
                    <div
                      key={cat.id}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-move"
                      draggable
                      onDragStart={() => handleDragStart(idx)}
                      onDragEnter={() => handleDragEnter(idx)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(cat.id)}
                            onChange={() => toggleSelectOne(cat.id)}
                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                          />
                          <div className="h-10 w-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                            <FaFolder className="text-white w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {cat.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Category #{idx + 1}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(cat)}
                            className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                            title="Edit category"
                            disabled={
                              editLoading || deleteLoading === cat.id || showAdd
                            }
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              openConfirmModal([cat.id], [cat.name])
                            }
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete category"
                            disabled={
                              deleteLoading === cat.id || editLoading || showAdd
                            }
                          >
                            {deleteLoading === cat.id ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <FaTrash className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                      {deleteError && deleteLoading === cat.id && (
                        <div className="text-red-500 text-sm mt-2 ml-14">
                          {deleteError}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirmation Modal */}
            {confirmModal.open && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative">
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    onClick={closeConfirmModal}
                  >
                    ×
                  </button>
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                      <FaTrash className="h-6 w-6 text-red-600" />
                    </div>
                    <h2 className="text-xl font-bold mb-4 text-gray-900">
                      Delete{' '}
                      {confirmModal.ids.length > 1 ? 'Categories' : 'Category'}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Are you sure you want to delete{' '}
                      {confirmModal.ids.length > 1
                        ? 'these categories'
                        : 'this category'}
                      ? This action cannot be undone.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3 mb-6">
                      {confirmModal.names.map((name, i) => (
                        <div key={i} className="font-medium text-gray-900">
                          {name}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button
                        className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                        onClick={handleConfirmDelete}
                      >
                        Delete
                      </button>
                      <button
                        className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                        onClick={closeConfirmModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Undo Delete Toast */}
            {undoData && (
              <div className="fixed top-20 right-6 z-50 px-6 py-3 rounded-lg shadow-lg font-semibold text-white bg-yellow-600 flex items-center gap-4 animate-fade-in">
                Category "{undoData.name}" deleted.
                <button
                  className="bg-white text-yellow-700 font-bold px-3 py-1 rounded hover:bg-yellow-100 transition"
                  onClick={handleUndoDelete}
                  disabled={addLoading}
                >
                  Undo
                </button>
              </div>
            )}

            {/* Edit Category Modal */}
            {showEdit && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    onClick={closeEditModal}
                  >
                    ×
                  </button>
                  <h2 className="text-xl font-bold mb-6 text-gray-900">
                    Edit Category
                  </h2>
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        required
                        autoFocus
                      />
                    </div>
                    {editError && (
                      <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                        {editError}
                      </div>
                    )}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={editLoading}
                      >
                        {editLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                        onClick={closeEditModal}
                        disabled={editLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Add Category Modal */}
            {showAdd && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    onClick={closeAddModal}
                  >
                    ×
                  </button>
                  <h2 className="text-xl font-bold mb-6 text-gray-900">
                    Add Categories
                  </h2>
                  <div className="text-sm text-gray-600 mb-4 bg-blue-50 p-4 rounded-lg">
                    <p className="font-medium mb-2">💡 Tips:</p>
                    <ul className="space-y-1 text-sm">
                      <li>
                        • Enter multiple category names to add them all at once
                      </li>
                      <li>• Use drag & drop to reorder the categories</li>
                      <li>• Empty fields will be automatically ignored</li>
                    </ul>
                  </div>
                  <form onSubmit={addCategory} className="space-y-4">
                    <DragDropContext onDragEnd={handleAddDragEnd}>
                      <Droppable droppableId="add-names-list">
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="space-y-3"
                          >
                            {addNames.map((name, idx) => (
                              <Draggable
                                key={idx}
                                draggableId={String(idx)}
                                index={idx}
                              >
                                {(prov, snapshot) => (
                                  <div
                                    ref={prov.innerRef}
                                    {...prov.draggableProps}
                                    className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg border-2 ${
                                      snapshot.isDragging
                                        ? 'border-pink-300 shadow-lg'
                                        : 'border-transparent'
                                    }`}
                                  >
                                    <span
                                      {...prov.dragHandleProps}
                                      className="cursor-move text-pink-500 hover:text-pink-600"
                                    >
                                      <FaGripVertical />
                                    </span>
                                    <input
                                      type="text"
                                      value={name}
                                      onChange={(e) =>
                                        handleAddNameChange(idx, e.target.value)
                                      }
                                      placeholder={`Category name #${idx + 1}`}
                                      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                      required
                                    />
                                    {addNames.length > 1 && (
                                      <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        onClick={() => handleAddNameRemove(idx)}
                                        title="Remove"
                                      >
                                        <FaTrash className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <button
                      type="button"
                      className="text-pink-600 hover:text-pink-700 font-medium flex items-center space-x-2"
                      onClick={handleAddNameAdd}
                    >
                      <FaPlus className="w-4 h-4" />
                      <span>Add another category</span>
                    </button>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={addLoading}
                      >
                        {addLoading ? 'Adding...' : 'Add Categories'}
                      </button>
                      <button
                        type="button"
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                        onClick={closeAddModal}
                        disabled={addLoading}
                      >
                        Cancel
                      </button>
                    </div>
                    {addError && (
                      <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                        {addError}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories
