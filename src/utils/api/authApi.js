// API untuk autentikasi dan user profile (register, login, getMe, updateProfileMentor, getProfileMentor)
import { API_BASE_URL, getHeaders } from './baseApi'

// Register user baru (peserta/mentor)
export async function register(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        role: data.role || 'participant',
      }),
    })
    const resJson = await response.json()
    if (!response.ok) {
      if (response.status === 422 && resJson.errors) {
        const errorMessages = Object.values(resJson.errors).flat().join(', ')
        throw new Error(errorMessages)
      }
      throw new Error(resJson.message || 'Register failed')
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

// Login user
export async function login(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
    const resJson = await response.json()
    if (!response.ok) {
      if (response.status === 422 && resJson.errors) {
        const errorMessages = Object.values(resJson.errors).flat().join(', ')
        throw new Error(errorMessages)
      }
      throw new Error(resJson.message || 'Login failed')
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

// Ambil data user yang sedang login
export async function getMe(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${token}`,
      },
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Gagal mengambil data user')
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

// Update profile mentor
export async function updateProfileMentor(data, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/update-profile/mentor`, {
      method: 'POST',
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Gagal update profile mentor')
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

// Ambil profile mentor (opsional)
export async function getProfileMentor(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${token}`,
      },
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Gagal mengambil data profile mentor')
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
