// API untuk Resource (materi/file pendukung kursus)
import { API_BASE_URL, getHeaders } from './baseApi'

// Ambil semua resource
export async function getAllResources() {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/lecture-resources`, {
      method: 'GET',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to fetch resources')
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

// Tambah resource baru
export async function addResource(formData) {
  try {
    const headers = { ...getHeaders(false) }
    const response = await fetch(`${API_BASE_URL}/lecture-resources`, {
      method: 'POST',
      headers,
      body: formData,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to add resource')
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

// Hapus resource
export async function deleteResource(id) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/lecture-resources/${id}`, {
      method: 'DELETE',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to delete resource')
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

// Update resource
export async function updateResource(id, data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/lecture-resources/${id}`, {
      method: 'PUT',
      headers,
      body: data,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to update resource')
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
