// API untuk Partner (mitra LMS)
import { API_BASE_URL, getHeaders } from './baseApi'

// Ambil semua partner
export async function getAllPartners() {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/partners`, {
      method: 'GET',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to fetch partners')
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

// Tambah partner baru
export async function addPartner(data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/partners`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to add partner')
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

// Hapus partner
export async function deletePartner(id) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/partners/${id}`, {
      method: 'DELETE',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to delete partner')
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

// Update partner
export async function updatePartner(id, data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/partners/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to update partner')
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
