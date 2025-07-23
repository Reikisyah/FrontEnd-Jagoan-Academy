import React, { useEffect, useState } from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import {
  getAllSubcategories,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from '../../utils/api'
import { FaEdit, FaTrash, FaGripVertical } from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SubcategoriesMentor = () => {
  const [subcategories, setSubcategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newSubcategory, setNewSubcategory] = useState('')
  const [addError, setAddError] = useState(null)
  const [addLoading, setAddLoading] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [deleteError, setDeleteError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  // Bulk action state
  const [selectedIds, setSelectedIds] = useState([])
  const allIds = subcategories.map((s) => s.id)
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
  // Modal konfirmasi
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
  // Modal edit
  const [showEdit, setShowEdit] = useState(false)
  useEffect(() => {
    fetchSubcategories()
  }, [])
  const fetchSubcategories = () => {
    setLoading(true)
    setError(null)
    getAllSubcategories()
      .then((data) => setSubcategories(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }
  // Add subcategory
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
  const addSubcat = async (e) => {
    e.preventDefault()
    setAddError(null)
    setAddLoading(true)
    const names = addNames.map((n) => n.trim()).filter((n) => n)
    if (names.length === 0) {
      setAddError('Please enter at least one subcategory name.')
      setAddLoading(false)
      return
    }
    try {
      for (const name of names) {
        await addSubcategory({ name })
      }
      setAddNames([''])
      setShowAdd(false)
      setSuccessMsg('Subcategories added!')
      fetchSubcategories()
      setTimeout(() => setSuccessMsg(null), 2000)
      toast.success('Subcategories added successfully!')
    } catch (err) {
      setAddError(err.message)
      toast.error(err.message)
    } finally {
      setAddLoading(false)
    }
  }
  // Delete subcategory
  const handleDelete = async (id) => {
    setDeleteLoading(id)
    setDeleteError(null)
    try {
      await deleteSubcategory(id)
      fetchSubcategories()
      setSuccessMsg('Subcategory deleted!')
      setTimeout(() => setSuccessMsg(null), 2000)
      toast.success('Subcategory deleted successfully!')
    } catch (err) {
      setDeleteError(err.message)
      toast.error(err.message)
    } finally {
      setDeleteLoading(null)
    }
  }
  // Edit subcategory
  const handleEdit = (sub) => {
    setEditId(sub.id)
    setEditName(sub.name)
    setEditError(null)
    setShowEdit(true)
  }
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setEditLoading(true)
    setEditError(null)
    try {
      await updateSubcategory(editId, { name: editName })
      setEditId(null)
      setEditName('')
      fetchSubcategories()
      setSuccessMsg('Subcategory updated!')
      setTimeout(() => setSuccessMsg(null), 2000)
      toast.success('Subcategory updated successfully!')
      setShowEdit(false)
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
  const closeAddModal = () => {
    setShowAdd(false)
    setAddNames([''])
    setAddError(null)
  }
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DashboardHeader />
      <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
        <div className="max-w-3xl w-full">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-pink-700">Subcategories</h1>
            <button
              className="bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-pink-700 transition shadow"
              onClick={() => setShowAdd(true)}
              disabled={editId}
            >
              + Add Subcategory
            </button>
          </div>
          {successMsg && (
            <div className="mb-4 text-green-600 font-semibold bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              {successMsg}
            </div>
          )}
          {loading && (
            <div className="overflow-x-auto animate-pulse">
              <table className="min-w-full border border-pink-100 rounded-xl bg-white">
                <thead>
                  <tr className="bg-pink-50">
                    <th className="py-2 px-4 text-left w-8">
                      <div className="h-4 w-4 bg-gray-200 rounded" />
                    </th>
                    <th className="py-2 px-4 text-left w-12">
                      <div className="h-4 w-6 bg-gray-200 rounded" />
                    </th>
                    <th className="py-2 px-4 text-left">
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                    </th>
                    <th className="py-2 px-4 text-left">
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-4">
                        <div className="h-4 w-4 bg-gray-200 rounded" />
                      </td>
                      <td className="py-2 px-4">
                        <div className="h-4 w-6 bg-gray-200 rounded" />
                      </td>
                      <td className="py-2 px-4">
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex gap-2">
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
          {!loading && !error && subcategories.length === 0 && (
            <div className="flex flex-col items-center py-10">
              <div className="mb-4 text-gray-500 text-lg font-semibold">
                No subcategories found.
              </div>
              <button
                className="bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-pink-700 transition shadow"
                onClick={() => setShowAdd(true)}
              >
                + Add Subcategory
              </button>
            </div>
          )}
          {/* Bulk Action Bar */}
          {selectedIds.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2 items-center bg-pink-50 border border-pink-200 rounded-lg px-4 py-2">
              <span className="font-semibold text-pink-700">
                {selectedIds.length} selected
              </span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() =>
                  openConfirmModal(
                    selectedIds,
                    subcategories
                      .filter((s) => selectedIds.includes(s.id))
                      .map((s) => s.name),
                  )
                }
              >
                Delete Selected
              </button>
              <button
                className="ml-2 text-gray-500 hover:text-pink-600 underline text-sm"
                onClick={clearSelection}
              >
                Clear
              </button>
            </div>
          )}
          {!loading && !error && subcategories.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-pink-100 rounded-xl bg-white">
                <thead>
                  <tr className="bg-pink-600 text-white text-base font-bold border-b-2 border-pink-700">
                    <th className="py-2 px-4 text-left w-8">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        className="w-4 h-4"
                      />
                    </th>
                    <th className="py-2 px-4 text-left w-12">No</th>
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subcategories.map((sub, idx) => (
                    <tr
                      key={sub.id}
                      className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-pink-50 transition-all duration-200`}
                    >
                      <td className="py-2 px-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(sub.id)}
                          onChange={() => toggleSelectOne(sub.id)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="py-3 px-5 text-base">{idx + 1}</td>
                      <td className="py-3 px-5 text-base">{sub.name}</td>
                      <td className="py-3 px-5 text-base">
                        <div className="flex gap-2">
                          <button
                            className="p-2 rounded-lg border border-pink-500 text-pink-600 font-semibold hover:bg-pink-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => handleEdit(sub)}
                            disabled={
                              editLoading || deleteLoading === sub.id || showAdd
                            }
                            title="Edit Subcategory"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="p-2 rounded-lg border border-red-400 text-red-500 font-semibold hover:bg-red-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() =>
                              openConfirmModal([sub.id], [sub.name])
                            }
                            disabled={
                              deleteLoading === sub.id || editLoading || showAdd
                            }
                            title="Delete Subcategory"
                          >
                            {deleteLoading === sub.id ? '...' : <FaTrash />}
                          </button>
                        </div>
                        {deleteError && deleteLoading === sub.id && (
                          <div className="text-red-500 mt-1">{deleteError}</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Confirmation Modal */}
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
                  Delete{' '}
                  {confirmModal.ids.length > 1
                    ? 'these subcategories?'
                    : 'this subcategory?'}
                </h2>
                <div className="mb-4 text-gray-700 text-center">
                  {confirmModal.names.map((name, i) => (
                    <div key={i} className="font-semibold">
                      {name}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-2">
                  <button
                    className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
                    onClick={handleConfirmDelete}
                  >
                    Yes, Delete
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
          {/* Feedback Toast */}
          {(successMsg || addError || editError || deleteError) && (
            <div
              className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg font-semibold text-white transition-all animate-fade-in ${successMsg ? 'bg-green-600' : 'bg-red-500'}`}
            >
              {successMsg || addError || editError || deleteError}
            </div>
          )}
          {/* Edit Subcategory Modal */}
          {showEdit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm relative">
                <button
                  className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                  onClick={closeEditModal}
                >
                  ×
                </button>
                <h2 className="text-lg font-bold mb-4 text-pink-700">
                  Edit Subcategory
                </h2>
                <form
                  onSubmit={handleEditSubmit}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    required
                    autoFocus
                  />
                  <div className="flex gap-3 mt-2">
                    <button
                      type="submit"
                      className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={editLoading}
                    >
                      {editLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                      onClick={closeEditModal}
                      disabled={editLoading}
                    >
                      Cancel
                    </button>
                  </div>
                  {editError && (
                    <div className="text-red-500 mt-2">{editError}</div>
                  )}
                </form>
              </div>
            </div>
          )}
          {/* Add Subcategory Modal */}
          {showAdd && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                <button
                  className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                  onClick={closeAddModal}
                >
                  ×
                </button>
                <h2 className="text-lg font-bold mb-4 text-pink-700">
                  Add Subcategories
                </h2>
                <div className="text-sm text-gray-500 mb-2">
                  Masukkan beberapa nama subcategory. Satu nama per baris.
                  Urutkan dengan drag & drop jika perlu.
                </div>
                <form onSubmit={addSubcat} className="flex flex-col gap-4">
                  <DragDropContext onDragEnd={handleAddDragEnd}>
                    <Droppable droppableId="add-names-list">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
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
                                  className={`flex items-center gap-2 mb-2 bg-gray-50 rounded px-2 py-1 ${snapshot.isDragging ? 'ring-2 ring-pink-300' : ''}`}
                                >
                                  <span
                                    {...prov.dragHandleProps}
                                    className="cursor-move text-pink-500"
                                  >
                                    <FaGripVertical />
                                  </span>
                                  <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                      handleAddNameChange(idx, e.target.value)
                                    }
                                    placeholder={`Subcategory name #${idx + 1}`}
                                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                                    required
                                  />
                                  {addNames.length > 1 && (
                                    <button
                                      type="button"
                                      className="text-red-500 hover:text-red-700 px-2"
                                      onClick={() => handleAddNameRemove(idx)}
                                      title="Remove"
                                    >
                                      <FaTrash />
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
                    className="text-pink-600 hover:underline text-sm font-semibold self-start"
                    onClick={handleAddNameAdd}
                  >
                    + Add another
                  </button>
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

export default SubcategoriesMentor
