import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import { getAllFAQ, addFAQ, deleteFAQ, updateFAQ } from '../../utils/api/faqApi'
import {
  getAllPartners,
  addPartner,
  deletePartner,
  updatePartner,
} from '../../utils/api/partnerApi'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const Setting = () => {
  // Deteksi role
  const userRole = localStorage.getItem('role') || 'participant'
  const userEmail = localStorage.getItem('email') || ''

  // State untuk edit email
  const [email, setEmail] = useState(userEmail)
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailSuccess, setEmailSuccess] = useState(null)
  const [emailError, setEmailError] = useState(null)

  // State untuk edit password
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  // Simulasi API update email
  const handleUpdateEmail = async (e) => {
    e.preventDefault()
    setEmailLoading(true)
    setEmailSuccess(null)
    setEmailError(null)
    try {
      // Simulasi delay dan validasi
      await new Promise((res) => setTimeout(res, 800))
      if (!email.includes('@')) throw new Error('Email tidak valid')
      localStorage.setItem('email', email)
      setEmailSuccess('Email berhasil diupdate!')
      toast.success('Email berhasil diupdate!')
    } catch (err) {
      setEmailError(err.message)
      toast.error('Gagal update email!')
    } finally {
      setEmailLoading(false)
    }
  }

  // Simulasi API update password
  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setPasswordLoading(true)
    setPasswordSuccess(null)
    setPasswordError(null)
    try {
      // Simulasi validasi
      await new Promise((res) => setTimeout(res, 800))
      if (!oldPassword || !newPassword || !confirmPassword)
        throw new Error('Semua field wajib diisi')
      if (newPassword.length < 6)
        throw new Error('Password baru minimal 6 karakter')
      if (newPassword !== confirmPassword)
        throw new Error('Konfirmasi password tidak cocok')
      // Simulasi sukses
      setPasswordSuccess('Password berhasil diupdate!')
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      toast.success('Password berhasil diupdate!')
    } catch (err) {
      setPasswordError(err.message)
      toast.error('Gagal update password!')
    } finally {
      setPasswordLoading(false)
    }
  }

  if (userRole === 'participant') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <DashboardHeader />
          <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
            <div className="max-w-lg w-full">
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Pengaturan Akun
                </h1>
                <p className="text-gray-600">
                  Ubah email dan password akun Anda
                </p>
              </div>

              {/* Edit Email */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Edit Email
                </h2>
                <form onSubmit={handleUpdateEmail} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                      required
                    />
                  </div>
                  {emailError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
                      {emailError}
                    </div>
                  )}
                  {emailSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700 text-sm">
                      {emailSuccess}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={emailLoading}
                  >
                    {emailLoading ? 'Menyimpan...' : 'Simpan Email'}
                  </button>
                </form>
              </div>

              {/* Edit Password */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Edit Password
                </h2>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Lama
                    </label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Baru
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Konfirmasi Password Baru
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                      required
                    />
                  </div>
                  {passwordError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
                      {passwordError}
                    </div>
                  )}
                  {passwordSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700 text-sm">
                      {passwordSuccess}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? 'Menyimpan...' : 'Simpan Password'}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    )
  }

  // FAQ state
  const [faqs, setFaqs] = useState([])
  const [faqLoading, setFaqLoading] = useState(true)
  const [faqError, setFaqError] = useState(null)
  const [showAddFaq, setShowAddFaq] = useState(false)
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' })
  const [faqFormLoading, setFaqFormLoading] = useState(false)
  const [faqFormError, setFaqFormError] = useState(null)
  // FAQ edit state
  const [showEditFaq, setShowEditFaq] = useState(false)
  const [editFaq, setEditFaq] = useState(null)
  const [editFaqForm, setEditFaqForm] = useState({ question: '', answer: '' })
  const [editFaqLoading, setEditFaqLoading] = useState(false)
  const [editFaqError, setEditFaqError] = useState(null)
  // Partner state
  const [partners, setPartners] = useState([])
  const [partnerLoading, setPartnerLoading] = useState(true)
  const [partnerError, setPartnerError] = useState(null)
  const [showAddPartner, setShowAddPartner] = useState(false)
  const [partnerForm, setPartnerForm] = useState({ name: '', logo: '' })
  const [partnerFormLoading, setPartnerFormLoading] = useState(false)
  const [partnerFormError, setPartnerFormError] = useState(null)
  // Partner edit state
  const [showEditPartner, setShowEditPartner] = useState(false)
  const [editPartner, setEditPartner] = useState(null)
  const [editPartnerForm, setEditPartnerForm] = useState({ name: '', logo: '' })
  const [editPartnerLoading, setEditPartnerLoading] = useState(false)
  const [editPartnerError, setEditPartnerError] = useState(null)

  // Fetch FAQ
  useEffect(() => {
    fetchFaqs()
  }, [])
  const fetchFaqs = () => {
    setFaqLoading(true)
    setFaqError(null)
    getAllFAQ()
      .then(setFaqs)
      .catch((e) => {
        setFaqError(e.message)
        toast.error('Gagal memuat data FAQ!')
      })
      .finally(() => setFaqLoading(false))
  }
  // Fetch Partner
  useEffect(() => {
    fetchPartners()
  }, [])
  const fetchPartners = () => {
    setPartnerLoading(true)
    setPartnerError(null)
    getAllPartners()
      .then(setPartners)
      .catch((e) => {
        setPartnerError(e.message)
        toast.error('Gagal memuat data Partner!')
      })
      .finally(() => setPartnerLoading(false))
  }
  // Add FAQ
  const handleAddFaq = async (e) => {
    e.preventDefault()
    setFaqFormLoading(true)
    setFaqFormError(null)
    try {
      await addFAQ(faqForm)
      setShowAddFaq(false)
      setFaqForm({ question: '', answer: '' })
      fetchFaqs()
      toast.success('FAQ berhasil ditambahkan!')
    } catch (err) {
      setFaqFormError(err.message)
      toast.error('Gagal menambah FAQ!')
    } finally {
      setFaqFormLoading(false)
    }
  }
  // Delete FAQ
  const handleDeleteFaq = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this FAQ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) return
    try {
      await deleteFAQ(id)
      fetchFaqs()
      await Swal.fire({
        icon: 'success',
        title: 'FAQ deleted!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Failed to delete FAQ',
        text: err.message,
        confirmButtonColor: '#e11d48',
        customClass: { popup: 'rounded-xl' },
      })
    }
  }
  // Edit FAQ handlers
  const openEditFaq = (faq) => {
    setEditFaq(faq)
    setEditFaqForm({ question: faq.question, answer: faq.answer })
    setShowEditFaq(true)
    setEditFaqError(null)
  }
  const closeEditFaq = () => {
    setShowEditFaq(false)
    setEditFaq(null)
    setEditFaqError(null)
  }
  const handleEditFaq = async (e) => {
    e.preventDefault()
    setEditFaqLoading(true)
    setEditFaqError(null)
    try {
      await updateFAQ(editFaq.id, editFaqForm)
      setShowEditFaq(false)
      setEditFaq(null)
      fetchFaqs()
      toast.success('FAQ berhasil diupdate!')
    } catch (err) {
      setEditFaqError(err.message)
      toast.error('Gagal update FAQ!')
    } finally {
      setEditFaqLoading(false)
    }
  }
  // Add Partner
  const handleAddPartner = async (e) => {
    e.preventDefault()
    setPartnerFormLoading(true)
    setPartnerFormError(null)
    try {
      await addPartner(partnerForm)
      setShowAddPartner(false)
      setPartnerForm({ name: '', logo: '' })
      fetchPartners()
      toast.success('Partner berhasil ditambahkan!')
    } catch (err) {
      setPartnerFormError(err.message)
      toast.error('Gagal menambah Partner!')
    } finally {
      setPartnerFormLoading(false)
    }
  }
  // Delete Partner
  const handleDeletePartner = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Delete this Partner?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes',
      customClass: { popup: 'rounded-xl' },
    })
    if (!result.isConfirmed) return
    try {
      await deletePartner(id)
      fetchPartners()
      await Swal.fire({
        icon: 'success',
        title: 'Partner deleted!',
        showConfirmButton: false,
        timer: 1200,
        customClass: { popup: 'rounded-xl' },
        position: 'center',
      })
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Failed to delete Partner',
        text: err.message,
        confirmButtonColor: '#e11d48',
        customClass: { popup: 'rounded-xl' },
      })
    }
  }
  // Edit Partner handlers
  const openEditPartner = (partner) => {
    setEditPartner(partner)
    setEditPartnerForm({ name: partner.name, logo: partner.logo })
    setShowEditPartner(true)
    setEditPartnerError(null)
  }
  const closeEditPartner = () => {
    setShowEditPartner(false)
    setEditPartner(null)
    setEditPartnerError(null)
  }
  const handleEditPartner = async (e) => {
    e.preventDefault()
    setEditPartnerLoading(true)
    setEditPartnerError(null)
    try {
      await updatePartner(editPartner.id, editPartnerForm)
      setShowEditPartner(false)
      setEditPartner(null)
      fetchPartners()
      toast.success('Partner berhasil diupdate!')
    } catch (err) {
      setEditPartnerError(err.message)
      toast.error('Gagal update Partner!')
    } finally {
      setEditPartnerLoading(false)
    }
  }
  const getLogoUrl = (logo) => {
    if (!logo || logo === 'null' || logo === 'undefined')
      return 'https://via.placeholder.com/40x40?text=No+Logo'
    if (logo.startsWith('http')) return logo
    return `https://lms.alanwari.ponpes.id/storage/${logo}`
  }
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
          <div className="max-w-6xl w-full">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Settings
              </h1>
              <p className="text-gray-600">
                Manage FAQ and Partner data for the platform
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-4">
                  <button
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      tab === 'faq'
                        ? 'bg-pink-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setTab('faq')}
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      FAQ Management
                    </div>
                  </button>
                  <button
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      tab === 'partner'
                        ? 'bg-pink-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setTab('partner')}
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      Partner Management
                    </div>
                  </button>
                </div>
                {tab === 'faq' && (
                  <button
                    className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-lg"
                    onClick={() => setShowAddFaq(true)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add FAQ
                  </button>
                )}
                {tab === 'partner' && (
                  <button
                    className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center gap-2 shadow-lg"
                    onClick={() => setShowAddPartner(true)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Partner
                  </button>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {tab === 'faq' && (
                <div>
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-pink-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      FAQ List
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                            Question
                          </th>
                          <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                            Answer
                          </th>
                          <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {faqLoading ? (
                          <tr>
                            <td colSpan={3} className="py-8 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <svg
                                  className="animate-spin h-5 w-5 text-pink-600"
                                  fill="none"
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
                                Loading...
                              </div>
                            </td>
                          </tr>
                        ) : faqs.length === 0 ? (
                          <tr>
                            <td
                              colSpan={3}
                              className="py-8 text-center text-gray-500"
                            >
                              <div className="flex flex-col items-center gap-2">
                                <svg
                                  className="w-8 h-8 text-gray-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                No FAQ found. Start by adding your first FAQ.
                              </div>
                            </td>
                          </tr>
                        ) : (
                          faqs.map((faq) => (
                            <tr
                              key={faq.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-4 px-6 text-sm text-gray-900 max-w-xs truncate">
                                {faq.question}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-600 max-w-xs truncate">
                                {faq.answer}
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex gap-2">
                                  <button
                                    className="text-pink-600 hover:text-pink-700 p-2 rounded-lg hover:bg-pink-50 transition-colors"
                                    title="Edit FAQ"
                                    onClick={() => openEditFaq(faq)}
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                    title="Delete FAQ"
                                    onClick={() => handleDeleteFaq(faq.id)}
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {tab === 'partner' && (
                <div>
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-pink-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      Partner List
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                            Logo
                          </th>
                          <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                            Name
                          </th>
                          <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {partnerLoading ? (
                          <tr>
                            <td colSpan={3} className="py-8 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <svg
                                  className="animate-spin h-5 w-5 text-pink-600"
                                  fill="none"
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
                                Loading...
                              </div>
                            </td>
                          </tr>
                        ) : partners.length === 0 ? (
                          <tr>
                            <td
                              colSpan={3}
                              className="py-8 text-center text-gray-500"
                            >
                              <div className="flex flex-col items-center gap-2">
                                <svg
                                  className="w-8 h-8 text-gray-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                                No partners found. Start by adding your first
                                partner.
                              </div>
                            </td>
                          </tr>
                        ) : (
                          partners.map((partner) => (
                            <tr
                              key={partner.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="py-4 px-6">
                                <img
                                  src={getLogoUrl(partner.logo)}
                                  alt={partner.name}
                                  className="h-12 w-12 object-contain rounded-lg bg-white border shadow-sm"
                                  onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src =
                                      'https://via.placeholder.com/48x48?text=No+Logo'
                                  }}
                                />
                              </td>
                              <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                {partner.name}
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex gap-2">
                                  <button
                                    className="text-pink-600 hover:text-pink-700 p-2 rounded-lg hover:bg-pink-50 transition-colors"
                                    title="Edit Partner"
                                    onClick={() => openEditPartner(partner)}
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                    title="Delete Partner"
                                    onClick={() =>
                                      handleDeletePartner(partner.id)
                                    }
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modals */}
      {/* Add FAQ Modal */}
      {showAddFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
              onClick={() => setShowAddFaq(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-pink-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New FAQ
            </h2>
            <form onSubmit={handleAddFaq} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  placeholder="Enter question..."
                  value={faqForm.question}
                  onChange={(e) =>
                    setFaqForm((f) => ({ ...f, question: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  placeholder="Enter answer..."
                  value={faqForm.answer}
                  onChange={(e) =>
                    setFaqForm((f) => ({ ...f, answer: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors resize-none"
                  rows={4}
                  required
                />
              </div>
              {faqFormError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
                  {faqFormError}
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={faqFormLoading}
                >
                  {faqFormLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
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
                      Saving...
                    </>
                  ) : (
                    'Add FAQ'
                  )}
                </button>
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowAddFaq(false)}
                  disabled={faqFormLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {showEditFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
              onClick={closeEditFaq}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-pink-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit FAQ
            </h2>
            <form onSubmit={handleEditFaq} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  placeholder="Enter question..."
                  value={editFaqForm.question}
                  onChange={(e) =>
                    setEditFaqForm((f) => ({ ...f, question: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  placeholder="Enter answer..."
                  value={editFaqForm.answer}
                  onChange={(e) =>
                    setEditFaqForm((f) => ({ ...f, answer: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors resize-none"
                  rows={4}
                  required
                />
              </div>
              {editFaqError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
                  {editFaqError}
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={editFaqLoading}
                >
                  {editFaqLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
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
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={closeEditFaq}
                  disabled={editFaqLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Partner Modal */}
      {showAddPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
              onClick={() => setShowAddPartner(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-pink-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Partner
            </h2>
            <form onSubmit={handleAddPartner} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Name
                </label>
                <input
                  type="text"
                  placeholder="Enter partner name..."
                  value={partnerForm.name}
                  onChange={(e) =>
                    setPartnerForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo URL
                </label>
                <input
                  type="url"
                  placeholder="Enter logo URL..."
                  value={partnerForm.logo}
                  onChange={(e) =>
                    setPartnerForm((f) => ({ ...f, logo: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                  required
                />
              </div>
              {partnerFormError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
                  {partnerFormError}
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={partnerFormLoading}
                >
                  {partnerFormLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
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
                      Saving...
                    </>
                  ) : (
                    'Add Partner'
                  )}
                </button>
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowAddPartner(false)}
                  disabled={partnerFormLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Partner Modal */}
      {showEditPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
              onClick={closeEditPartner}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-pink-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Partner
            </h2>
            <form onSubmit={handleEditPartner} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Partner Name
                </label>
                <input
                  type="text"
                  placeholder="Enter partner name..."
                  value={editPartnerForm.name}
                  onChange={(e) =>
                    setEditPartnerForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo URL
                </label>
                <input
                  type="url"
                  placeholder="Enter logo URL..."
                  value={editPartnerForm.logo}
                  onChange={(e) =>
                    setEditPartnerForm((f) => ({ ...f, logo: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                  required
                />
              </div>
              {editPartnerError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm">
                  {editPartnerError}
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={editPartnerLoading}
                >
                  {editPartnerLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4"
                        fill="none"
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
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={closeEditPartner}
                  disabled={editPartnerLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}

export default Setting
