// API untuk Category (kategori kursus)
import { API_BASE_URL, getHeaders } from './baseApi'

// Ambil semua kategori
export async function getAllCategories() {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'GET',
      headers,
    })
    let resJson
    try {
      resJson = await response.json()
    } catch (e) {
      throw new Error('Response kategori tidak valid atau bukan JSON')
    }
    if (!resJson || typeof resJson !== 'object') {
      throw new Error('Response kategori kosong atau tidak valid')
    }
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to fetch categories')
    }
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

// Tambah kategori baru
export async function addCategory(data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to add category')
    }
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

// Hapus kategori
export async function deleteCategory(id) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to delete category')
    }
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

// Update kategori
export async function updateCategory(id, data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to update category')
    }
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
