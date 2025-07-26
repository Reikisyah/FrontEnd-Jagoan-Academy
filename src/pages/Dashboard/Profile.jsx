import React, { useEffect, useState, useRef } from 'react'
import { getMe, updateProfileMentor } from '../../utils/api/authApi'
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
      const formData = {
        name: data.name || '',
        email: data.email || '',
        phone_number: data.phone_number || '',
        date_of_birth: data.date_of_birth
          ? data.date_of_birth.slice(0, 10)
          : '',
        address: data.address || '',
        linkedin: data.linkedin || '',
        instagram: data.instagram || '',
        skill: Array.isArray(data.skill) ? data.skill.join(', ') : '',
        job_role: data.job_role || '',
        bio: data.bio || '',
        experience: data.experience || '',
        contributions: Array.isArray(data.contributions)
          ? data.contributions.join(', ')
          : '',
        achievements: Array.isArray(data.achievements)
          ? data.achievements.join(', ')
          : '',
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUpdateLoading(true)
    setUpdateError(null)
    setUpdateSuccess(null)
    try {
      const token = localStorage.getItem('token')
      const payload = {
        ...form,
        skill: form.skill
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        contributions: form.contributions
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        achievements: form.achievements
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        experience: Number(form.experience),
      }
      await updateProfileMentor(payload, token)
      setUpdateSuccess('Profile updated successfully!')
      setEditMode(false)
      fetchProfile()
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
                {/* Profile Picture Skeleton */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-gray-200 mb-4"></div>
                  <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-32 bg-gray-100 rounded"></div>
                </div>

                {/* Info Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i}>
                      <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 w-32 bg-gray-100 rounded"></div>
                    </div>
                  ))}
                </div>

                {/* Bio Skeleton */}
                <div className="mb-6">
                  <div className="h-4 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-100 rounded"></div>
                </div>

                {/* Skills & Experience Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {[...Array(2)].map((_, i) => (
                    <div key={i}>
                      <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                      <div className="space-y-2">
                        <div className="h-3 w-32 bg-gray-100 rounded"></div>
                        <div className="h-3 w-28 bg-gray-100 rounded"></div>
                        <div className="h-3 w-36 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Button Skeleton */}
                <div className="h-10 w-32 bg-gray-200 rounded"></div>
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
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full">
              <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
                <img
                  src={
                    profilePic ||
                    'https://ui-avatars.com/api/?name=' +
                      encodeURIComponent(profile.name || 'User')
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-lg mb-4"
                />
                {updateSuccess && (
                  <div className="mb-4 bg-green-50 border border-green-200 rounded-xl p-3 text-green-800 text-center w-full">
                    {updateSuccess}
                  </div>
                )}
                {updateError && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 text-red-800 text-center w-full">
                    {updateError}
                  </div>
                )}
                {!editMode ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {profile.name}
                    </h2>
                    <p className="text-gray-600 mb-4 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {profile.email}
                    </p>
                    <button
                      className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition mt-2"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile
                    </button>
                  </>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-4 mt-4"
                  >
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Nama
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                        required
                      />
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button
                        type="submit"
                        className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={updateLoading}
                      >
                        {updateLoading ? 'Menyimpan...' : 'Simpan'}
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                        onClick={() => setEditMode(false)}
                        disabled={updateLoading}
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="max-w-4xl w-full">
            <div
              ref={cardRef}
              className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-500 ${highlight ? 'ring-4 ring-pink-200 scale-105' : ''}`}
            >
              {/* Header Section */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className="relative">
                  <img
                    src={
                      profilePic ||
                      'https://ui-avatars.com/api/?name=' +
                        encodeURIComponent(profile.name || 'User')
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
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
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {profile.email}
                  </p>
                  {profile.job_role && (
                    <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
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
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="font-semibold text-gray-700">
                        Phone Number
                      </div>
                      <div className="text-gray-600">
                        {profile.phone_number || '-'}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">
                        Date of Birth
                      </div>
                      <div className="text-gray-600">
                        {profile.date_of_birth
                          ? new Date(profile.date_of_birth).toLocaleDateString()
                          : '-'}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">Address</div>
                      <div className="text-gray-600">
                        {profile.address || '-'}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">
                        Job Role
                      </div>
                      <div className="text-gray-600">
                        {profile.job_role || '-'}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">
                        LinkedIn
                      </div>
                      <div className="text-gray-600">
                        {profile.linkedin ? (
                          <a
                            href={`https://linkedin.com/in/${profile.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-500 hover:underline"
                          >
                            {profile.linkedin}
                          </a>
                        ) : (
                          '-'
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700">
                        Instagram
                      </div>
                      <div className="text-gray-600">
                        {profile.instagram ? (
                          <a
                            href={`https://instagram.com/${profile.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-500 hover:underline"
                          >
                            {profile.instagram}
                          </a>
                        ) : (
                          '-'
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full mb-6">
                    <div className="font-semibold text-gray-700 mb-1">Bio</div>
                    <div className="text-gray-600">{profile.bio || '-'}</div>
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">
                        Skill
                      </div>
                      <ul className="list-disc list-inside text-gray-600">
                        {Array.isArray(profile.skill) &&
                        profile.skill.length > 0 ? (
                          profile.skill.map((s, i) => <li key={i}>{s}</li>)
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">
                        Experience
                      </div>
                      <div className="text-gray-600">
                        {profile.experience || 0} tahun
                      </div>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">
                        Contributions
                      </div>
                      <ul className="list-disc list-inside text-gray-600">
                        {Array.isArray(profile.contributions) &&
                        profile.contributions.length > 0 ? (
                          profile.contributions.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">
                        Achievements
                      </div>
                      <ul className="list-disc list-inside text-gray-600">
                        {Array.isArray(profile.achievements) &&
                        profile.achievements.length > 0 ? (
                          profile.achievements.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <button
                    className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-2xl mx-auto flex flex-col gap-4 mt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone_number"
                        value={form.phone_number}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="date_of_birth"
                        value={form.date_of_birth}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Job Role
                      </label>
                      <input
                        type="text"
                        name="job_role"
                        value={form.job_role}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        name="linkedin"
                        value={form.linkedin}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Instagram
                      </label>
                      <input
                        type="text"
                        name="instagram"
                        value={form.instagram}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Skill{' '}
                      <span className="text-xs text-gray-400">
                        (comma separated)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="skill"
                      value={form.skill}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Experience (years)
                      </label>
                      <input
                        type="number"
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                        min={0}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1">
                        Contributions{' '}
                        <span className="text-xs text-gray-400">
                          (comma separated)
                        </span>
                      </label>
                      <input
                        type="text"
                        name="contributions"
                        value={form.contributions}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Achievements{' '}
                      <span className="text-xs text-gray-400">
                        (comma separated)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="achievements"
                      value={form.achievements}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      type="submit"
                      className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={updateLoading || !isFormChanged()}
                    >
                      {updateLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                      onClick={handleCancelEdit}
                      disabled={updateLoading}
                    >
                      Cancel
                    </button>
                  </div>
                  {showCancelConfirm && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-yellow-800 flex flex-col items-center">
                      <div className="mb-2 font-semibold">Discard changes?</div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="bg-pink-600 text-white px-4 py-1 rounded-lg font-semibold hover:bg-pink-700 transition"
                          onClick={confirmCancelEdit}
                        >
                          Yes, discard
                        </button>
                        <button
                          type="button"
                          className="px-4 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
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
