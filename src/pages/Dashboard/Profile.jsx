import React, { useEffect, useState, useRef } from 'react'
import { getMe, updateProfileParticipant, updateProfileMentor } from '../../utils/api/authApi'
import { API_BASE_URL } from '../../utils/api/baseApi'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({})
  const [updateLoading, setUpdateLoading] = useState(false)
  const [updateError, setUpdateError] = useState(null)
  const [updateSuccess, setUpdateSuccess] = useState(null)
  const [highlight, setHighlight] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const cardRef = useRef(null)
  const initialForm = useRef({})
  const userRole = localStorage.getItem('role') || 'participant'

  useEffect(() => {
    fetchProfile()
    // eslint-disable-next-line
  }, [])

  const fetchProfile = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Anda belum login')
      let data = await getMe(token)
      setProfile(data)
      
      // Form data berdasarkan role
      let formData = {}
      if (userRole === 'participant') {
        formData = {
          name: data.name || '',
          email: data.email || '',
          phone_number: data.phone_number || '',
          date_of_birth: data.date_of_birth ? data.date_of_birth.slice(0, 10) : '',
          address: data.address || '',
          occupation: data.occupation || '',
          organization: data.organization || '',
          source_information: data.source_information || '',
          linkedin: data.linkedin || '',
          instagram: data.instagram || '',
        }
      } else {
        // Mentor/Admin
        formData = {
          name: data.name || '',
          email: data.email || '',
          phone_number: data.phone_number || '',
          date_of_birth: data.date_of_birth ? data.date_of_birth.slice(0, 10) : '',
          address: data.address || '',
          linkedin: data.linkedin || '',
          instagram: data.instagram || '',
          skill: Array.isArray(data.skill) ? data.skill.join(', ') : '',
          job_role: data.job_role || '',
          bio: data.bio || '',
          experience: data.experience || '',
          contributions: Array.isArray(data.contributions) ? data.contributions.join(', ') : '',
          achievements: Array.isArray(data.achievements) ? data.achievements.join(', ') : '',
        }
      }
      
      setForm(formData)
      initialForm.current = formData
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const isFormChanged = () => {
    return Object.keys(form).some(
      (key) => (form[key] || '') !== (initialForm.current[key] || ''),
    )
  }

  // Update profile berdasarkan role
  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdateLoading(true)
    setUpdateError(null)
    setUpdateSuccess(null)
    try {
      const token = localStorage.getItem('token')
      if (!form.name.trim()) throw new Error('Nama wajib diisi')
      if (!form.email.includes('@')) throw new Error('Email tidak valid')
      
      let payload = {}
      if (userRole === 'participant') {
        payload = {
          name: form.name,
          email: form.email,
          phone_number: form.phone_number,
          date_of_birth: form.date_of_birth,
          address: form.address,
          occupation: form.occupation,
          organization: form.organization,
          source_information: form.source_information,
          linkedin: form.linkedin,
          instagram: form.instagram,
        }
        const res = await updateProfileParticipant(payload, token)
        setUpdateSuccess('Profile berhasil diupdate!')
      } else {
        // Mentor/Admin
        payload = {
          name: form.name,
          email: form.email,
          phone_number: form.phone_number,
          date_of_birth: form.date_of_birth,
          address: form.address,
          linkedin: form.linkedin,
          instagram: form.instagram,
          skill: form.skill.split(',').map(s => s.trim()).filter(Boolean),
          job_role: form.job_role,
          bio: form.bio,
          experience: Number(form.experience),
          contributions: form.contributions.split(',').map(s => s.trim()).filter(Boolean),
          achievements: form.achievements.split(',').map(s => s.trim()).filter(Boolean),
        }
        // Jika ada file upload (foto profil)
        if (form.profile && form.profile instanceof File) {
          payload.profile = form.profile;
        }
        const res = await updateProfileMentor(payload, token)
        setUpdateSuccess('Profile berhasil diupdate!')
      }
      
      setEditMode(false)
      setProfile((prev) => ({ ...prev, ...payload }))
      setTimeout(() => setUpdateSuccess(null), 2000)
      setTimeout(() => {
        setHighlight(true)
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => setHighlight(false), 1200)
      }, 200)
    } catch (err) {
      setUpdateError(err.message)
      setTimeout(() => setUpdateError(null), 2500)
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleCancelEdit = () => {
    if (isFormChanged()) {
      setShowCancelConfirm(true)
    } else {
      setEditMode(false)
    }
  }

  const confirmCancelEdit = () => {
    setEditMode(false)
    setShowCancelConfirm(false)
    setForm(initialForm.current)
  }

  if (loading)
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="max-w-3xl w-full">
              <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-gray-200 mb-4"></div>
                  <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-32 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  if (error)
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Oops! Something went wrong
                </h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                  onClick={fetchProfile}
                  className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  if (!profile) return null

  // Ambil foto profil jika ada
  let profilePic = ''
  if (
    profile.profile &&
    Array.isArray(profile.profile) &&
    profile.profile.length > 0
  ) {
    profilePic = `${API_BASE_URL}/${profile.profile[0].path}`
  }

  if (userRole === 'participant') {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="max-w-2xl w-full">
              <div
                ref={cardRef}
                className={`bg-white rounded-3xl shadow-2xl p-8 transition-all duration-500 ${
                  highlight ? 'ring-4 ring-pink-200 scale-105' : ''
                }`}
              >
                {/* Header Section */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative mb-6">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-pink-200 shadow-xl">
                      <img
                        src={
                          profilePic ||
                          'https://ui-avatars.com/api/?name=' +
                            encodeURIComponent(profile.name || 'User') +
                            '&size=160&background=pink&color=white'
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                    {profile.name}
                  </h2>
                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {profile.email}
                  </p>
                  {profile.occupation && (
                    <span className="inline-block bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                      {profile.occupation}
                    </span>
                  )}
                </div>

                {/* Success/Error Messages */}
                {updateSuccess && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top-2">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-800 font-medium">
                      {updateSuccess}
                    </span>
                  </div>
                )}
                {updateError && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top-2">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-red-800 font-medium">
                      {updateError}
                    </span>
                  </div>
                )}

                {!editMode ? (
                  <>
                    {/* Profile Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-pink-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                          <span className="font-semibold text-gray-700">
                            Email
                          </span>
                        </div>
                        <p className="text-gray-600">{profile.email}</p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </div>
                          <span className="font-semibold text-gray-700">
                            No. HP
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {profile.phone_number || '-'}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="font-semibold text-gray-700">
                            Tanggal Lahir
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {profile.date_of_birth
                            ? new Date(
                                profile.date_of_birth,
                              ).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })
                            : '-'}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-purple-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="font-semibold text-gray-700">
                            Alamat
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {profile.address || '-'}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-orange-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="font-semibold text-gray-700">
                            Pekerjaan
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {profile.occupation || '-'}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-indigo-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="font-semibold text-gray-700">
                            Organisasi
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {profile.organization || '-'}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.586 4.586a2 2 0 112.828 2.828L11.828 10H15a1 1 0 110 2h-4a1 1 0 01-1-1V6a1 1 0 011-1h1.172l-2.586-2.586z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="font-semibold text-gray-700">
                            LinkedIn
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {profile.linkedin ? (
                            <a
                              href={`https://linkedin.com/in/${profile.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {profile.linkedin}
                            </a>
                          ) : (
                            '-'
                          )}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-pink-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.586 4.586a2 2 0 112.828 2.828L11.828 10H15a1 1 0 110 2h-4a1 1 0 01-1-1V6a1 1 0 011-1h1.172l-2.586-2.586z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="font-semibold text-gray-700">
                            Instagram
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {profile.instagram ? (
                            <a
                              href={`https://instagram.com/${profile.instagram}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-600 hover:underline"
                            >
                              {profile.instagram}
                            </a>
                          ) : (
                            '-'
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        onClick={() => setEditMode(true)}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          No. HP
                        </label>
                        <input
                          type="text"
                          name="phone_number"
                          value={form.phone_number}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Tanggal Lahir
                        </label>
                        <input
                          type="date"
                          name="date_of_birth"
                          value={form.date_of_birth}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Alamat
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Pekerjaan
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          value={form.occupation}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Organisasi
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={form.organization}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          LinkedIn
                        </label>
                        <input
                          type="text"
                          name="linkedin"
                          value={form.linkedin}
                          onChange={handleChange}
                          placeholder="username"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Instagram
                        </label>
                        <input
                          type="text"
                          name="instagram"
                          value={form.instagram}
                          onChange={handleChange}
                          placeholder="username"
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Sumber Informasi
                        </label>
                        <select
                          name="source_information"
                          value={form.source_information}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                        >
                          <option value="">Pilih sumber informasi</option>
                          <option value="Website">Website</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Friend">Friend</option>
                          <option value="Advertisement">Advertisement</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        disabled={updateLoading || !isFormChanged()}
                      >
                        {updateLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Menyimpan...
                          </div>
                        ) : (
                          'Simpan Perubahan'
                        )}
                      </button>
                      <button
                        type="button"
                        className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all duration-200"
                        onClick={handleCancelEdit}
                        disabled={updateLoading}
                      >
                        Batal
                      </button>
                    </div>

                    {showCancelConfirm && (
                      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-800 flex flex-col items-center animate-in slide-in-from-top-2">
                        <div className="mb-3 font-semibold">
                          Discard changes?
                        </div>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
                            onClick={confirmCancelEdit}
                          >
                            Yes, discard
                          </button>
                          <button
                            type="button"
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                            onClick={() => setShowCancelConfirm(false)}
                          >
                            No, keep editing
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Mentor/Admin Profile
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="max-w-4xl w-full">
            <div
              ref={cardRef}
              className={`bg-white rounded-3xl shadow-2xl p-8 transition-all duration-500 ${
                highlight ? 'ring-4 ring-pink-200 scale-105' : ''
              }`}
            >
              {/* Header Section */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-pink-200 shadow-xl">
                    <img
                      src={
                        profilePic ||
                        'https://ui-avatars.com/api/?name=' +
                          encodeURIComponent(profile.name || 'User') +
                          '&size=160&background=pink&color=white'
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {profile.name}
                  </h2>
                  <p className="text-gray-600 mb-4 flex items-center justify-center md:justify-start gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {profile.email}
                  </p>
                  {profile.job_role && (
                    <span className="inline-block bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium">
                      {profile.job_role}
                    </span>
                  )}
                </div>
              </div>

              {/* Success/Error Messages */}
              {updateSuccess && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-800 font-medium">
                    {updateSuccess}
                  </span>
                </div>
              )}
              {updateError && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-red-800 font-medium">
                    {updateError}
                  </span>
                </div>
              )}

              {!editMode ? (
                <>
                  {/* Profile Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-700">Email</span>
                      </div>
                      <p className="text-gray-600">{profile.email}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-700">No. HP</span>
                      </div>
                      <p className="text-gray-600">{profile.phone_number || '-'}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-700">Tanggal Lahir</span>
                      </div>
                      <p className="text-gray-600">
                        {profile.date_of_birth
                          ? new Date(profile.date_of_birth).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : '-'}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-700">Alamat</span>
                      </div>
                      <p className="text-gray-600">{profile.address || '-'}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-700">Job Role</span>
                      </div>
                      <p className="text-gray-600">{profile.job_role || '-'}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-700">Experience</span>
                      </div>
                      <p className="text-gray-600">{profile.experience || 0} tahun</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828L11.828 10H15a1 1 0 110 2h-4a1 1 0 01-1-1V6a1 1 0 011-1h1.172l-2.586-2.586z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-700">LinkedIn</span>
                      </div>
                      <p className="text-gray-600">
                        {profile.linkedin ? (
                          <a
                            href={`https://linkedin.com/in/${profile.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {profile.linkedin}
                          </a>
                        ) : (
                          '-'
                        )}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828L11.828 10H15a1 1 0 110 2h-4a1 1 0 01-1-1V6a1 1 0 011-1h1.172l-2.586-2.586z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-700">Instagram</span>
                      </div>
                      <p className="text-gray-600">
                        {profile.instagram ? (
                          <a
                            href={`https://instagram.com/${profile.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 hover:underline"
                          >
                            {profile.instagram}
                          </a>
                        ) : (
                          '-'
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Bio Section */}
                  {profile.bio && (
                    <div className="mb-8">
                      <div className="font-semibold text-gray-700 mb-2">Bio</div>
                      <div className="text-gray-600 bg-gray-50 rounded-xl p-4">{profile.bio}</div>
                    </div>
                  )}

                  {/* Skills Section */}
                  {Array.isArray(profile.skill) && profile.skill.length > 0 && (
                    <div className="mb-8">
                      <div className="font-semibold text-gray-700 mb-2">Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {profile.skill.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contributions Section */}
                  {Array.isArray(profile.contributions) && profile.contributions.length > 0 && (
                    <div className="mb-8">
                      <div className="font-semibold text-gray-700 mb-2">Contributions</div>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {profile.contributions.map((contribution, index) => (
                          <li key={index}>{contribution}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Achievements Section */}
                  {Array.isArray(profile.achievements) && profile.achievements.length > 0 && (
                    <div className="mb-8">
                      <div className="font-semibold text-gray-700 mb-2">Achievements</div>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {profile.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">No. HP</label>
                      <input
                        type="text"
                        name="phone_number"
                        value={form.phone_number}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Tanggal Lahir</label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={form.date_of_birth}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Alamat</label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Job Role</label>
                      <input
                        type="text"
                        name="job_role"
                        value={form.job_role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">LinkedIn</label>
                      <input
                        type="text"
                        name="linkedin"
                        value={form.linkedin}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Instagram</label>
                      <input
                        type="text"
                        name="instagram"
                        value={form.instagram}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Skills <span className="text-xs text-gray-400">(comma separated)</span>
                    </label>
                    <input
                      type="text"
                      name="skill"
                      value={form.skill}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Experience (years)</label>
                      <input
                        type="number"
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                        min={0}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Contributions <span className="text-xs text-gray-400">(comma separated)</span>
                      </label>
                      <input
                        type="text"
                        name="contributions"
                        value={form.contributions}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Achievements <span className="text-xs text-gray-400">(comma separated)</span>
                    </label>
                    <input
                      type="text"
                      name="achievements"
                      value={form.achievements}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200"
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      disabled={updateLoading || !isFormChanged()}
                    >
                      {updateLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Menyimpan...
                        </div>
                      ) : (
                        'Simpan Perubahan'
                      )}
                    </button>
                    <button
                      type="button"
                      className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all duration-200"
                      onClick={handleCancelEdit}
                      disabled={updateLoading}
                    >
                      Batal
                    </button>
                  </div>

                  {showCancelConfirm && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-yellow-800 flex flex-col items-center">
                      <div className="mb-3 font-semibold">Discard changes?</div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
                          onClick={confirmCancelEdit}
                        >
                          Yes, discard
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                          onClick={() => setShowCancelConfirm(false)}
                        >
                          No, keep editing
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
