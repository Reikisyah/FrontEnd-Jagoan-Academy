const API_BASE_URL = 'https://lms.alanwari.ponpes.id/api'

// Register peserta/mentor
export async function register(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
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
      // Handle validation errors
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

// Get all FAQs
export async function getAllFAQ() {
  try {
    const response = await fetch(`${API_BASE_URL}/faqs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })

    const resJson = await response.json()

    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to fetch FAQs')
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

// Get all partners
export async function getAllPartners() {
  try {
    const response = await fetch(`${API_BASE_URL}/partners`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })

    const resJson = await response.json()

    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to fetch partners')
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

// Get all courses
export async function getAllCourses() {
  try {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
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

// Add course
export async function addCourse(data) {
  try {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to add course')
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

// Update course (POST /courses/:id)
export async function updateCourse(id, data) {
  try {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'POST',
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

// Delete course
export async function deleteCourse(id) {
  try {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
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

// Publish course (PUT /courses/:id)
export async function publishCourse(id) {
  try {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'PUT',
      headers,
    })
    const resJson = await response.json()
    if (!response.ok) {
      throw new Error(resJson.message || 'Failed to publish course')
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

export async function login(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })

    const resJson = await response.json()

    if (!response.ok) {
      // Handle validation errors
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
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
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
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
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

// Get profile mentor (optional, jika ingin fetch detail mentor saja)
export async function getProfileMentor(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
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

// Get all categories
export async function getAllCategories() {
  try {
    // Ambil token jika ada
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'GET',
      headers,
    })
    const resJson = await response.json()
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

// Add category
export async function addCategory(data) {
  try {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
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

// Delete category
export async function deleteCategory(id) {
  try {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
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

// Update category
export async function updateCategory(id, data) {
  try {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
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
