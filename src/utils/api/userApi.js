// API untuk User Management (admin/mentor/participant)
import { API_BASE_URL, getHeaders } from './baseApi'

// Ambil semua user
export async function getAllUsers() {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to fetch users')
    return resJson.data || []
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
      )
    }
    throw error
  }
}

// Update user
export async function updateUser(id, data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to update user')
    return resJson.data || resJson
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
      )
    }
    throw error
  }
}

// Hapus user
export async function deleteUser(id) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to delete user')
    return resJson
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
      )
    }
    throw error
  }
}

// Ganti role user
export async function changeUserRole(id, role) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ role }),
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to change user role')
    return resJson.data || resJson
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(
        'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.',
      )
    }
    throw error
  }
}
