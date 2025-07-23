import React, { useEffect, useState } from 'react'
import {
  getAllUsers,
  updateUser,
  deleteUser,
  changeUserRole,
} from '../../utils/api'
import { FaEdit, FaTrash, FaUserShield, FaCheck, FaTimes } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedIds, setSelectedIds] = useState([])
  const [showEdit, setShowEdit] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [editForm, setEditForm] = useState({ name: '', email: '' })
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState(null)
  const [showRole, setShowRole] = useState(false)
  const [roleUser, setRoleUser] = useState(null)
  const [roleValue, setRoleValue] = useState('participant')
  const [roleLoading, setRoleLoading] = useState(false)
  const [roleError, setRoleError] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])
  const fetchUsers = () => {
    setLoading(true)
    setError(null)
    getAllUsers()
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }
  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }
  const toggleSelectAll = () => {
    if (selectedIds.length === users.length) setSelectedIds([])
    else setSelectedIds(users.map((u) => u.id))
  }
  // Edit user
  const openEdit = (user) => {
    setEditUser(user)
    setEditForm({ name: user.name, email: user.email })
    setShowEdit(true)
    setEditError(null)
  }
  const closeEdit = () => {
    setShowEdit(false)
    setEditUser(null)
    setEditError(null)
  }
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setEditLoading(true)
    setEditError(null)
    try {
      await updateUser(editUser.id, editForm)
      setSuccessMsg('User updated!')
      fetchUsers()
      setShowEdit(false)
      setTimeout(() => setSuccessMsg(null), 2000)
      toast.success('User updated successfully!')
    } catch (err) {
      setEditError(err.message)
      toast.error(err.message)
    } finally {
      setEditLoading(false)
    }
  }
  // Change role
  const openRole = (user) => {
    setRoleUser(user)
    setRoleValue(user.role)
    setShowRole(true)
    setRoleError(null)
  }
  const closeRole = () => {
    setShowRole(false)
    setRoleUser(null)
    setRoleError(null)
  }
  const handleRoleSubmit = async (e) => {
    e.preventDefault()
    setRoleLoading(true)
    setRoleError(null)
    try {
      await changeUserRole(roleUser.id, roleValue)
      setSuccessMsg('Role updated!')
      fetchUsers()
      setShowRole(false)
      setTimeout(() => setSuccessMsg(null), 2000)
      toast.success('Role updated successfully!')
    } catch (err) {
      setRoleError(err.message)
      toast.error(err.message)
    } finally {
      setRoleLoading(false)
    }
  }
  // Delete user
  const openDelete = (id) => {
    setDeleteUserId(id)
    setShowDelete(true)
  }
  const closeDelete = () => {
    setShowDelete(false)
    setDeleteUserId(null)
  }
  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      await deleteUser(deleteUserId)
      setSuccessMsg('User deleted!')
      fetchUsers()
      setShowDelete(false)
      setTimeout(() => setSuccessMsg(null), 2000)
      toast.success('User deleted successfully!')
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setDeleteLoading(false)
    }
  }
  // Bulk delete
  const handleBulkDelete = async () => {
    for (const id of selectedIds) await deleteUser(id)
    setSuccessMsg('Users deleted!')
    fetchUsers()
    setSelectedIds([])
    setTimeout(() => setSuccessMsg(null), 2000)
    toast.success('Users deleted successfully!')
  }
  // Bulk change role
  const [showBulkRole, setShowBulkRole] = useState(false)
  const [bulkRole, setBulkRole] = useState('participant')
  const [bulkRoleLoading, setBulkRoleLoading] = useState(false)
  const [bulkRoleError, setBulkRoleError] = useState(null)
  const handleBulkRole = () => {
    setShowBulkRole(true)
    setBulkRole('participant')
    setBulkRoleError(null)
  }
  const closeBulkRole = () => {
    setShowBulkRole(false)
    setBulkRoleError(null)
  }
  const handleBulkRoleSubmit = async (e) => {
    e.preventDefault()
    setBulkRoleLoading(true)
    setBulkRoleError(null)
    try {
      for (const id of selectedIds) await changeUserRole(id, bulkRole)
      setSuccessMsg('Roles updated!')
      fetchUsers()
      setShowBulkRole(false)
      setSelectedIds([])
      setTimeout(() => setSuccessMsg(null), 2000)
      toast.success('Roles updated successfully!')
    } catch (err) {
      setBulkRoleError(err.message)
      toast.error(err.message)
    } finally {
      setBulkRoleLoading(false)
    }
  }
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">User Management</h1>
      {successMsg && (
        <div className="mb-4 text-green-600 font-semibold bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="mb-4 text-red-500 font-semibold bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </div>
      )}
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
      <div className="overflow-x-auto">
        <table className="min-w-full border border-pink-100 rounded-xl bg-white">
          <thead>
            <tr className="bg-pink-600 text-white">
              <th className="py-2 px-4">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === users.length && users.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-pink-50">
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(user.id)}
                      onChange={() => toggleSelectOne(user.id)}
                    />
                  </td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-blue-100 text-blue-700' : user.role === 'mentor' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex gap-2">
                      <button
                        className="text-pink-500 hover:text-pink-700"
                        title="Edit"
                        onClick={() => openEdit(user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        title="Change Role"
                        onClick={() => openRole(user)}
                      >
                        <FaUserShield />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                        onClick={() => openDelete(user.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 items-center bg-pink-50 border border-pink-200 rounded-lg px-4 py-2">
          <span className="font-semibold text-pink-700">
            {selectedIds.length} selected
          </span>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            onClick={handleBulkRole}
          >
            Bulk Change Role
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            onClick={handleBulkDelete}
          >
            Bulk Delete
          </button>
          <button
            className="ml-2 text-gray-500 hover:text-pink-600 underline text-sm"
            onClick={() => setSelectedIds([])}
          >
            Clear
          </button>
        </div>
      )}
      {/* Modal Edit User */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
              onClick={closeEdit}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4 text-pink-700">Edit User</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="Name"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                required
              />
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="Email"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                required
              />
              {editError && (
                <div className="text-red-500 text-sm">{editError}</div>
              )}
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
                  onClick={closeEdit}
                  disabled={editLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Change Role */}
      {showRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
              onClick={closeRole}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4 text-pink-700">
              Change User Role
            </h2>
            <form onSubmit={handleRoleSubmit} className="flex flex-col gap-4">
              <select
                value={roleValue}
                onChange={(e) => setRoleValue(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option value="admin">Admin</option>
                <option value="mentor">Mentor</option>
                <option value="participant">Participant</option>
              </select>
              {roleError && (
                <div className="text-red-500 text-sm">{roleError}</div>
              )}
              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={roleLoading}
                >
                  {roleLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                  onClick={closeRole}
                  disabled={roleLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Bulk Change Role */}
      {showBulkRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
              onClick={closeBulkRole}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4 text-pink-700">
              Bulk Change Role ({selectedIds.length} selected)
            </h2>
            <form
              onSubmit={handleBulkRoleSubmit}
              className="flex flex-col gap-4"
            >
              <select
                value={bulkRole}
                onChange={(e) => setBulkRole(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
              >
                <option value="admin">Admin</option>
                <option value="mentor">Mentor</option>
                <option value="participant">Participant</option>
              </select>
              {bulkRoleError && (
                <div className="text-red-500 text-sm">{bulkRoleError}</div>
              )}
              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={bulkRoleLoading}
                >
                  {bulkRoleLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                  onClick={closeBulkRole}
                  disabled={bulkRoleLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal Delete */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm relative flex flex-col items-center">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
              onClick={closeDelete}
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4 text-pink-700">
              Delete this user?
            </h2>
            <div className="mb-4 text-gray-700 text-center">
              Are you sure you want to delete this user?
            </div>
            <div className="flex gap-3 mt-2">
              <button
                className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                onClick={closeDelete}
                disabled={deleteLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement
