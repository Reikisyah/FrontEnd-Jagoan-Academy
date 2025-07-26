// API untuk SubCategory (subkategori kursus)
import { API_BASE_URL, getHeaders } from './baseApi'

// Ambil semua subkategori
export async function getAllSubcategories() {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/sub-categories`, {
      method: 'GET',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to fetch subcategories')
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

// Tambah subkategori baru
export async function addSubcategory(data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/sub-categories`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to add subcategory')
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

// Update subkategori
export async function updateSubcategory(id, data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/sub-categories/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to update subcategory')
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

// Hapus subkategori
export async function deleteSubcategory(id) {
  try {
    const headers = getHeaders()
    const endpoint = `${API_BASE_URL}/sub-chapters/${id}`
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to delete sub-chapter')
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
