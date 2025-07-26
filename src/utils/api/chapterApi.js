// API untuk Chapter & Sub-Chapter (section, item, curriculum)
import { API_BASE_URL, getHeaders } from './baseApi'

// Ambil semua chapter
export async function getAllChapters() {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/chapters`, {
      method: 'GET',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to fetch chapters')
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

// Tambah chapter baru
export async function addChapter(data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/chapters`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw { status: response.status, response: resJson }
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

// Update chapter
export async function updateChapter(id, data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/chapters/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to update chapter')
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

// Hapus chapter
export async function deleteChapter(id) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/chapters/${id}`, {
      method: 'DELETE',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to delete chapter')
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

// Update urutan sub-chapter
export async function updateSubChapterOrder(orderPayload) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/sub-chapters/order`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ order: orderPayload }),
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to update sub-chapter order')
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

// Ambil semua chapter berdasarkan courseId
export async function getChaptersByCourseId(courseId) {
  try {
    const headers = getHeaders()
    const response = await fetch(
      `${API_BASE_URL}/chapters/${courseId}/courses`,
      {
        method: 'GET',
        headers,
      },
    )
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to fetch chapters')
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

// Hapus sub-chapter
export async function deleteSubChapter(id) {
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

// Tambah sub-chapter baru
export async function addSubChapter(data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/sub-chapters`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to add sub-chapter')
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

// Update sub-chapter
export async function updateSubChapter(id, data) {
  try {
    const headers = { ...getHeaders(false) }
    const response = await fetch(`${API_BASE_URL}/sub-chapters/${id}`, {
      method: 'POST', // BE kadang pakai POST + _method=PUT
      headers,
      body: data,
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to update sub-chapter')
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
