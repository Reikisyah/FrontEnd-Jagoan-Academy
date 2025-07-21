const API_BASE_URL = 'https://lms.alanwari.ponpes.id/api'

// Register peserta/mentor
export async function register(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        role: data.role || 'participant'
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
      throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.')
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
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password
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
      throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.')
    }
    throw error
  }
}
