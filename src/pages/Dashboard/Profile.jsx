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
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <div className="flex justify-center items-center flex-1">
            <div className="bg-white rounded-xl shadow-lg px-8 py-6 text-lg text-pink-600 font-semibold flex items-center gap-2">
              <svg
                className="animate-spin h-6 w-6 text-pink-500"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Loading profile...
            </div>
          </div>
        </div>
      </div>
    )
  if (error)
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <div className="flex justify-center items-center flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center w-full max-w-md animate-pulse">
              <div className="w-32 h-32 rounded-full bg-gray-200 mb-6" />
              <div className="h-7 w-40 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-32 bg-gray-100 rounded mb-4" />
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-32 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
              <div className="w-full mb-6">
                <div className="h-4 w-24 bg-gray-200 rounded mb-1" />
                <div className="h-4 w-40 bg-gray-100 rounded" />
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-1" />
                    <div className="h-4 w-32 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-1" />
                    <div className="h-4 w-32 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
              <div className="h-10 w-32 bg-gray-200 rounded" />
              <div className="text-red-500 mt-6">{error}</div>
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

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="max-w-3xl w-full py-10 px-4">
            <div
              ref={cardRef}
              className={`bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center transition-all duration-500 ${highlight ? 'ring-4 ring-pink-200' : ''}`}
            >
              <div className="mb-6">
                <img
                  src={
                    profilePic ||
                    'https://ui-avatars.com/api/?name=' +
                      encodeURIComponent(profile.name || 'User')
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-pink-200 shadow"
                />
              </div>
              <h2 className="text-2xl font-bold text-pink-600 mb-1">
                {profile.name}
              </h2>
              <p className="text-gray-500 mb-4">{profile.email}</p>
              {updateSuccess && (
                <div className="text-green-600 mb-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2 font-semibold">
                  {updateSuccess}
                </div>
              )}
              {updateError && (
                <div className="text-red-500 mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2 font-semibold">
                  {updateError}
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
