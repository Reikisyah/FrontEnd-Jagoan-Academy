// API untuk Course (kursus)
import { API_BASE_URL, getHeaders } from './baseApi'

// Ambil semua course (untuk homepage)
export async function getAllCourses() {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'GET',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to fetch courses')
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

// Ambil semua course mentor/admin
export async function getAllCoursesMentor() {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/courses-mentor`, {
      method: 'GET',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to fetch courses mentor')
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

// Tambah course baru
export async function addCourse(data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok) throw new Error(resJson.message || 'Failed to add course')
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

// Update course
export async function updateCourse(id, data) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to update course')
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

// Hapus course
export async function deleteCourse(id) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'DELETE',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to delete course')
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

// Set publish/unpublish course
export async function setCoursePublished(id, isPublished) {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ is_published: isPublished }),
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to update publish status')
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
