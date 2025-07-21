const API_BASE_URL = 'https://lms.alanwari.ponpes.id/api'

// Register peserta/mentor (form-data)
export async function register(data, isMentor = false) {
  const formData = new FormData()
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key])
    }
  }
  // Pilih endpoint sesuai role
  let endpoint = isMentor ? '/auth/register/mentor' : '/auth/register'
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    body: formData,
  })
  const resJson = await response.json()
  if (!response.ok) {
    throw new Error(resJson.message || 'Register failed')
  }
  return resJson.data || resJson
}

export async function login(data) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const resJson = await response.json()
  if (!response.ok) {
    throw new Error(resJson.message || 'Login failed')
  }
  return resJson.data || resJson
}
