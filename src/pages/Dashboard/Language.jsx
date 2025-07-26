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
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
          <div className="max-w-2xl w-full">
            <h1 className="text-2xl font-bold text-pink-700 mb-6">
              Language Management
            </h1>
            {isAdmin && (
              <form onSubmit={handleAdd} className="flex gap-2 mb-6">
                <input
                  type="text"
                  className="border rounded-lg px-4 py-2 flex-1"
                  placeholder="Tambah bahasa baru..."
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value)}
                  disabled={saving}
                />
                <button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
                  disabled={saving}
                >
                  {saving ? 'Menyimpan...' : 'Tambah'}
                </button>
              </form>
            )}
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              <table className="min-w-full border border-pink-100 rounded-xl bg-white">
                <thead>
                  <tr className="bg-pink-600 text-white">
                    <th className="py-2 px-4 text-left">No</th>
                    <th className="py-2 px-4 text-left">Language</th>
                    {isAdmin && (
                      <th className="py-2 px-4 text-left">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {languages.map((lang, idx) => (
                    <tr key={lang.id} className="border-b hover:bg-pink-50">
                      <td className="py-2 px-4">{idx + 1}</td>
                      <td className="py-2 px-4">
                        {editId === lang.id ? (
                          <form
                            onSubmit={handleEditSave}
                            className="flex gap-2"
                          >
                            <input
                              type="text"
                              className="border rounded-lg px-2 py-1"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              autoFocus
                            />
                            <button
                              type="submit"
                              className="bg-pink-600 text-white px-3 py-1 rounded-lg"
                              disabled={saving}
                            >
                              Simpan
                            </button>
                            <button
                              type="button"
                              className="text-gray-500 px-3 py-1"
                              onClick={() => setEditId(null)}
                              disabled={saving}
                            >
                              Batal
                            </button>
                          </form>
                        ) : (
                          lang.name
                        )}
                      </td>
                      {isAdmin && (
                        <td className="py-2 px-4 flex gap-2">
                          <button
                            className="text-blue-600 hover:text-blue-800 underline text-sm"
                            onClick={() => handleEdit(lang.id, lang.name)}
                            disabled={saving || deleting}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700 underline text-sm"
                            onClick={() => handleDelete(lang.id)}
                            disabled={saving || deleting === lang.id}
                          >
                            {deleting === lang.id ? 'Menghapus...' : 'Hapus'}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Language
