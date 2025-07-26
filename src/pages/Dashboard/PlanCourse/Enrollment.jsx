import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import DashboardHeader from '../../../components/DashboardHeader'
import { FiEye, FiCheck, FiTrash2, FiDownload } from 'react-icons/fi'

import { useEffect } from 'react'
import { getAllEnrollments, approveEnrollment } from '../../../utils/api/enrollmentApi'

const Enrollment = () => {
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEnrollments = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getAllEnrollments()
        setEnrollments(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchEnrollments()
  }, [])

  const handleApprove = async (id) => {
    try {
      console.log('Approving enrollment:', id)
      const approveResult = await approveEnrollment(id)
      console.log('Approve result:', approveResult)
      
      // Fetch ulang data dari API untuk memastikan status terbaru
      const data = await getAllEnrollments()
      console.log('Refreshed enrollments after approve:', data)
      setEnrollments(data)
    } catch (err) {
      console.error('Error approving enrollment:', err)
      setError(err.message)
    }
  }
  const handleDelete = (id) => {
    setEnrollments((prev) => prev.filter((e) => e.id !== id))
  }

  const getStatusBadge = (status) => {
    const baseClass = 'px-3 py-1 rounded-full text-xs font-semibold'
    if (status === 'approved') {
      return `${baseClass} bg-green-100 text-green-800`
    }
    return `${baseClass} bg-yellow-100 text-yellow-800`
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Enrollment Approval
              </h1>
              <p className="text-gray-600">
                Manage course enrollment requests from participants
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Enrollments
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {enrollments.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiEye className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {enrollments.filter((e) => e.status === 'pending').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <FiEye className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Approved
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {
                        enrollments.filter((e) => e.status === 'approved')
                          .length
                      }
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FiCheck className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Enrollment Requests
                </h2>
              </div>

              {enrollments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiEye className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No enrollments found
                  </h3>
                  <p className="text-gray-500">
                    There are no pending enrollment requests at the moment.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Participant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Proof
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {enrollments.map((enroll) => (
                        <tr
                          key={enroll.id}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {enroll.course}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {enroll.participant_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(
                                enroll.enrollment_date,
                              ).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={getStatusBadge(enroll.status)}>
                              {enroll.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {enroll.proof_of_payments ? (
                              <a
                                href={`/${enroll.proof_of_payments}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700 font-medium"
                              >
                                <FiDownload className="w-4 h-4" />
                                View Proof
                              </a>
                            ) : (
                              <span className="text-sm text-gray-400">
                                No proof
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {enroll.status !== 'approved' && (
                                <button
                                  onClick={() => handleApprove(enroll.id)}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors duration-200"
                                >
                                  <FiCheck className="w-4 h-4" />
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(enroll.id)}
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
                              >
                                <FiTrash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Enrollment
