// API untuk Enrollment (pendaftaran course student)
import { API_BASE_URL, getHeaders } from './baseApi'

// Create enrollment (bayar course)
export async function createEnrollment(course_id, formData) {
  try {
    // Jangan set Content-Type, browser akan handle multipart/form-data
    const headers = getHeaders(false)
    // Pastikan formData berisi proof_of_payments (file) dan course_id
    if (!formData.has('course_id')) formData.append('course_id', course_id)
    const response = await fetch(`${API_BASE_URL}/enrollments/${course_id}`, {
      method: 'POST',
      headers, // tanpa Content-Type
      body: formData,
    })
    const resJson = await response.json()
    if (!response.ok) throw new Error(resJson.message || 'Failed to enroll')
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

// Get all enrollments for current student
export async function getAllEnrollments() {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/enrollments`, {
      method: 'GET',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to fetch enrollments')
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
