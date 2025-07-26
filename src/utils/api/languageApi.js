// API untuk Bahasa (Language) pada kursus
import { API_BASE_URL, getHeaders } from './baseApi'

// Ambil semua bahasa
export async function getAllLanguages() {
  try {
    const headers = getHeaders()
    const response = await fetch(`${API_BASE_URL}/languages`, {
      method: 'GET',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok)
      throw new Error(resJson.message || 'Failed to fetch languages')
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
