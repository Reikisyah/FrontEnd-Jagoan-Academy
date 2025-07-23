import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import {
  getAllFAQ,
  addFAQ,
  deleteFAQ,
  updateFAQ,
  getAllPartners,
  addPartner,
  deletePartner,
  updatePartner,
} from '../../utils/api'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Setting = () => {
  const [tab, setTab] = useState('faq')
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
    try {
      await deleteFAQ(id)
      fetchFaqs()
      toast.success('FAQ berhasil dihapus!')
    } catch (err) {
      toast.error('Gagal menghapus FAQ!')
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
    try {
      await deletePartner(id)
      fetchPartners()
      toast.success('Partner berhasil dihapus!')
    } catch (err) {
      toast.error('Gagal menghapus Partner!')
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
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 flex flex-col items-center justify-start py-10 px-4">
          <div className="max-w-5xl w-full">
            <h1 className="text-2xl font-bold text-pink-700 mb-6">Settings</h1>
            <div className="flex items-center justify-between mb-6 mt-6">
              <div className="flex gap-4">
                <button
                  className={`px-4 py-2 rounded-t-lg font-semibold ${tab === 'faq' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-pink-700'}`}
                  onClick={() => setTab('faq')}
                >
                  FAQ
                </button>
                <button
                  className={`px-4 py-2 rounded-t-lg font-semibold ${tab === 'partner' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-pink-700'}`}
                  onClick={() => setTab('partner')}
                >
                  Partner
                </button>
              </div>
              {tab === 'faq' && (
                <button
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700"
                  onClick={() => setShowAddFaq(true)}
                >
                  + Add FAQ
                </button>
              )}
              {tab === 'partner' && (
                <button
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-700"
                  onClick={() => setShowAddPartner(true)}
                >
                  + Add Partner
                </button>
              )}
            </div>
            {tab === 'faq' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-pink-100 rounded-xl bg-white">
                    <thead>
                      <tr className="bg-pink-600 text-white">
                        <th className="py-2 px-4 text-left">Question</th>
                        <th className="py-2 px-4 text-left">Answer</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {faqLoading ? (
                        <tr>
                          <td colSpan={3} className="py-8 text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : faqs.length === 0 ? (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-8 text-center text-gray-500"
                          >
                            No FAQ found.
                          </td>
                        </tr>
                      ) : (
                        faqs.map((faq) => (
                          <tr
                            key={faq.id}
                            className="border-b hover:bg-pink-50"
                          >
                            <td className="py-2 px-4">{faq.question}</td>
                            <td className="py-2 px-4">{faq.answer}</td>
                            <td className="py-2 px-4 flex gap-2">
                              <button
                                className="text-pink-500 hover:text-pink-700 p-2"
                                title="Edit"
                                onClick={() => openEditFaq(faq)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700 p-2"
                                title="Delete"
                                onClick={() => handleDeleteFaq(faq.id)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Modal Add FAQ */}
                {showAddFaq && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                      <button
                        className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                        onClick={() => setShowAddFaq(false)}
                      >
                        ×
                      </button>
                      <h2 className="text-lg font-bold mb-4 text-pink-700">
                        Add FAQ
                      </h2>
                      <form
                        onSubmit={handleAddFaq}
                        className="flex flex-col gap-4"
                      >
                        <input
                          type="text"
                          placeholder="Question"
                          value={faqForm.question}
                          onChange={(e) =>
                            setFaqForm((f) => ({
                              ...f,
                              question: e.target.value,
                            }))
                          }
                          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                          required
                        />
                        <textarea
                          placeholder="Answer"
                          value={faqForm.answer}
                          onChange={(e) =>
                            setFaqForm((f) => ({
                              ...f,
                              answer: e.target.value,
                            }))
                          }
                          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                          required
                        />
                        {faqFormError && (
                          <div className="text-red-500 text-sm">
                            {faqFormError}
                          </div>
                        )}
                        <div className="flex gap-3 mt-2">
                          <button
                            type="submit"
                            className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={faqFormLoading}
                          >
                            {faqFormLoading ? 'Saving...' : 'Add'}
                          </button>
                          <button
                            type="button"
                            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
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
                {/* Modal Edit FAQ */}
                {showEditFaq && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                      <button
                        className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                        onClick={closeEditFaq}
                      >
                        ×
                      </button>
                      <h2 className="text-lg font-bold mb-4 text-pink-700">
                        Edit FAQ
                      </h2>
                      <form
                        onSubmit={handleEditFaq}
                        className="flex flex-col gap-4"
                      >
                        <input
                          type="text"
                          placeholder="Question"
                          value={editFaqForm.question}
                          onChange={(e) =>
                            setEditFaqForm((f) => ({
                              ...f,
                              question: e.target.value,
                            }))
                          }
                          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                          required
                        />
                        <textarea
                          placeholder="Answer"
                          value={editFaqForm.answer}
                          onChange={(e) =>
                            setEditFaqForm((f) => ({
                              ...f,
                              answer: e.target.value,
                            }))
                          }
                          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                          required
                        />
                        {editFaqError && (
                          <div className="text-red-500 text-sm">
                            {editFaqError}
                          </div>
                        )}
                        <div className="flex gap-3 mt-2">
                          <button
                            type="submit"
                            className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={editFaqLoading}
                          >
                            {editFaqLoading ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            type="button"
                            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
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
              </div>
            )}
            {tab === 'partner' && (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-pink-100 rounded-xl bg-white">
                    <thead>
                      <tr className="bg-pink-600 text-white">
                        <th className="py-2 px-4 text-left">Logo</th>
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partnerLoading ? (
                        <tr>
                          <td colSpan={3} className="py-8 text-center">
                            Loading...
                          </td>
                        </tr>
                      ) : partners.length === 0 ? (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-8 text-center text-gray-500"
                          >
                            No partner found.
                          </td>
                        </tr>
                      ) : (
                        partners.map((partner) => (
                          <tr
                            key={partner.id}
                            className="border-b hover:bg-pink-50"
                          >
                            <td className="py-2 px-4">
                              <img
                                src={getLogoUrl(partner.logo)}
                                alt={partner.name}
                                className="h-10 w-10 object-contain rounded bg-white border"
                                onError={(e) => {
                                  e.target.onerror = null
                                  e.target.src =
                                    'https://via.placeholder.com/40x40?text=No+Logo'
                                }}
                              />
                            </td>
                            <td className="py-2 px-4">{partner.name}</td>
                            <td className="py-2 px-4 flex gap-2">
                              <button
                                className="text-pink-500 hover:text-pink-700 p-2"
                                title="Edit"
                                onClick={() => openEditPartner(partner)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700 p-2"
                                title="Delete"
                                onClick={() => handleDeletePartner(partner.id)}
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Modal Add Partner */}
                {showAddPartner && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                      <button
                        className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                        onClick={() => setShowAddPartner(false)}
                      >
                        ×
                      </button>
                      <h2 className="text-lg font-bold mb-4 text-pink-700">
                        Add Partner
                      </h2>
                      <form
                        onSubmit={handleAddPartner}
                        className="flex flex-col gap-4"
                      >
                        <input
                          type="text"
                          placeholder="Name"
                          value={partnerForm.name}
                          onChange={(e) =>
                            setPartnerForm((f) => ({
                              ...f,
                              name: e.target.value,
                            }))
                          }
                          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Logo URL"
                          value={partnerForm.logo}
                          onChange={(e) =>
                            setPartnerForm((f) => ({
                              ...f,
                              logo: e.target.value,
                            }))
                          }
                          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                          required
                        />
                        {partnerFormError && (
                          <div className="text-red-500 text-sm">
                            {partnerFormError}
                          </div>
                        )}
                        <div className="flex gap-3 mt-2">
                          <button
                            type="submit"
                            className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={partnerFormLoading}
                          >
                            {partnerFormLoading ? 'Saving...' : 'Add'}
                          </button>
                          <button
                            type="button"
                            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
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
                {/* Modal Edit Partner */}
                {showEditPartner && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
                      <button
                        className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                        onClick={closeEditPartner}
                      >
                        ×
                      </button>
                      <h2 className="text-lg font-bold mb-4 text-pink-700">
                        Edit Partner
                      </h2>
                      <form
                        onSubmit={handleEditPartner}
                        className="flex flex-col gap-4"
                      >
                        <input
                          type="text"
                          placeholder="Name"
                          value={editPartnerForm.name}
                          onChange={(e) =>
                            setEditPartnerForm((f) => ({
                              ...f,
                              name: e.target.value,
                            }))
                          }
                          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Logo URL"
                          value={editPartnerForm.logo}
                          onChange={(e) =>
                            setEditPartnerForm((f) => ({
                              ...f,
                              logo: e.target.value,
                            }))
                          }
                          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200"
                          required
                        />
                        {editPartnerError && (
                          <div className="text-red-500 text-sm">
                            {editPartnerError}
                          </div>
                        )}
                        <div className="flex gap-3 mt-2">
                          <button
                            type="submit"
                            className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={editPartnerLoading}
                          >
                            {editPartnerLoading ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            type="button"
                            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
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
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Setting
