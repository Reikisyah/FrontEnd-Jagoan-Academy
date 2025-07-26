export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://lms.alanwari.ponpes.id/api'

export function getToken() {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || ''
}

export function getHeaders(isJson = true) {
  const headers = {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
  if (isJson) headers['Content-Type'] = 'application/json'
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}
