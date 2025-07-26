// API untuk FAQ (Frequently Asked Questions)
import { API_BASE_URL, getHeaders } from './baseApi'

// Ambil semua FAQ
export async function getAllFAQ() {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/faqs`, {
      method: 'GET',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok) throw new Error(resJson.message || 'Failed to fetch FAQ')
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

// Tambah FAQ baru
export async function addFAQ(data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/faqs`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok) throw new Error(resJson.message || 'Failed to add FAQ')
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

// Hapus FAQ
export async function deleteFAQ(id) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/faqs/${id}`, {
      method: 'DELETE',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok) throw new Error(resJson.message || 'Failed to delete FAQ')
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

// Update FAQ
export async function updateFAQ(id, data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/faqs/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok) throw new Error(resJson.message || 'Failed to update FAQ')
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
