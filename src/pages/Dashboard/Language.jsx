import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import {
  getAllLanguages,
  addLanguage,
  updateLanguage,
  deleteLanguage,
} from '../../utils/api/languageApi'
import { API_BASE_URL } from '../../utils/api/baseApi'

const Language = () => {
  const [languages, setLanguages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newLang, setNewLang] = useState('')
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)

  // Ambil role dari localStorage/sessionStorage
  const role =
    localStorage.getItem('role') || sessionStorage.getItem('role') || ''
  const isAdmin = role === 'admin'

  // Fetch all languages
  const fetchLanguages = async () => {
    setLoading(true)
    setError(null)
    try {
      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token')
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }
      if (token) headers['Authorization'] = `Bearer ${token}`
      const res = await fetch(`${API_BASE_URL}/languages`, { headers })
      const data = await res.json()
      if (!res.ok)
        throw new Error(data.message || 'Gagal mengambil data bahasa')
      setLanguages(data.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLanguages()
  }, [])

  // Add language (admin only)
  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newLang.trim()) return
    setSaving(true)
    try {
      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token')
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }
      if (token) headers['Authorization'] = `Bearer ${token}`
      const res = await fetch(`${API_BASE_URL}/languages`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: newLang }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Gagal menambah bahasa')
      setNewLang('')
      fetchLanguages()
      await Swal.fire({
        icon: 'success',
        title: 'Bahasa berhasil ditambahkan!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal menambah bahasa',
        text: err.message,
        confirmButtonColor: '#e11d48',
        customClass: { popup: 'rounded-xl' },
      })
    } finally {
      setSaving(false)
    }
  }

  // Edit language (admin only)
  const handleEdit = (id, name) => {
    setEditId(id)
    setEditName(name)
  }
  const handleEditSave = async (e) => {
    e.preventDefault()
    if (!editName.trim()) return
    setSaving(true)
    try {
      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token')
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }
      if (token) headers['Authorization'] = `Bearer ${token}`
      const res = await fetch(`${API_BASE_URL}/languages/${editId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ name: editName }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Gagal update bahasa')
      setEditId(null)
      setEditName('')
      fetchLanguages()
      await Swal.fire({
        icon: 'success',
        title: 'Bahasa berhasil diupdate!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal update bahasa',
        text: err.message,
        confirmButtonColor: '#e11d48',
        customClass: { popup: 'rounded-xl' },
      })
    } finally {
      setSaving(false)
    }
  }

  // Delete language (admin only)
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Yakin hapus bahasa ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Ya',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) return
    setDeleting(id)
    try {
      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token')
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }
      if (token) headers['Authorization'] = `Bearer ${token}`
      const res = await fetch(`${API_BASE_URL}/languages/${id}`, {
        method: 'DELETE',
        headers,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Gagal hapus bahasa')
      fetchLanguages()
      await Swal.fire({
        icon: 'success',
        title: 'Bahasa berhasil dihapus!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal hapus bahasa',
        text: err.message,
        confirmButtonColor: '#e11d48',
        customClass: { popup: 'rounded-xl' },
      })
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
          <div className="max-w-4xl w-full">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Language Management
              </h1>
              <p className="text-gray-600">
                Manage available languages for the platform
              </p>
            </div>

            {/* Add Language Form */}
            {isAdmin && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-pink-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add New Language
                </h2>
                <form onSubmit={handleAdd} className="flex gap-3">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                    placeholder="Enter language name..."
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value)}
                    disabled={saving}
                  />
                  <button
                    type="submit"
                    className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    disabled={saving || !newLang.trim()}
                  >
                    {saving ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add Language
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Languages Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-pink-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Available Languages
                </h2>
              </div>

              {loading ? (
                <div className="p-8">
                  <div className="animate-pulse space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex gap-2">
                          <div className="h-6 w-12 bg-gray-200 rounded"></div>
                          <div className="h-6 w-12 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : error ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Error Loading Languages
                  </h3>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={fetchLanguages}
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : languages.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Languages Found
                  </h3>
                  <p className="text-gray-600">
                    Start by adding your first language above.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {languages.map((lang, idx) => (
                    <div
                      key={lang.id}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-6 bg-pink-100 rounded flex items-center justify-center">
                            <span className="text-pink-600 font-medium text-sm">
                              {idx + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            {editId === lang.id ? (
                              <form
                                onSubmit={handleEditSave}
                                className="flex gap-3"
                              >
                                <input
                                  type="text"
                                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  autoFocus
                                />
                                <button
                                  type="submit"
                                  className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors disabled:opacity-50"
                                  disabled={saving}
                                >
                                  {saving ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                  type="button"
                                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                  onClick={() => setEditId(null)}
                                  disabled={saving}
                                >
                                  Cancel
                                </button>
                              </form>
                            ) : (
                              <span className="text-gray-900 font-medium">
                                {lang.name}
                              </span>
                            )}
                          </div>
                        </div>
                        {isAdmin && editId !== lang.id && (
                          <div className="flex gap-2">
                            <button
                              className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                              onClick={() => handleEdit(lang.id, lang.name)}
                              disabled={saving || deleting}
                              title="Edit language"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                              onClick={() => handleDelete(lang.id)}
                              disabled={saving || deleting === lang.id}
                              title="Delete language"
                            >
                              {deleting === lang.id ? (
                                <svg
                                  className="animate-spin w-4 h-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Language
