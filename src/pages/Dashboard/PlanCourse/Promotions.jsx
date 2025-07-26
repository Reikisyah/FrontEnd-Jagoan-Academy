import React, { useState } from 'react'
import DashboardHeader from '../../../components/DashboardHeader'
import Tab from '../../../components/Tab'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const Promotions = () => {
  const [refLink] = useState(
    'http://localhost:3000/course/2c8610d3-1acd-4db8-8ae5-ca6ddcdc7a4e?ref=yourcode',
  )
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    navigator.clipboard.writeText(refLink)
    setCopied(true)
    await Swal.fire({
      icon: 'success',
      title: 'Referral link copied!',
      showConfirmButton: false,
      timer: 1200,
      customClass: { popup: 'rounded-xl' },
      position: 'center',
    })
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Tab />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Promotions
            </h1>
            <div className="bg-purple-100 border border-purple-200 text-purple-800 rounded-lg px-4 py-3 mb-6 text-sm">
              <b>
                We have updated the coupon system, and there is more to come.
              </b>{' '}
              Announcing new free coupon limits and bulk coupon creation.{' '}
              <a href="#" className="underline text-purple-700">
                Learn more
              </a>
            </div>
            <div className="mb-6 border rounded-lg p-4">
              <div className="font-semibold mb-2">Refer students</div>
              <div className="text-gray-500 text-sm mb-2">
                Any time a student uses this link, we will credit you with the
                sale.{' '}
                <a href="#" className="underline">
                  Learn more
                </a>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 w-full text-sm bg-gray-50"
                  value={refLink}
                  readOnly
                />
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg font-semibold text-white ${copied ? 'bg-purple-400' : 'bg-purple-500 hover:bg-purple-600'} transition`}
                  onClick={handleCopy}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <div className="mb-6">
              <div className="font-semibold mb-2">Coupons</div>
              <div className="bg-gray-100 text-gray-500 rounded-lg px-4 py-3">
                You cannot create coupons for a free course
              </div>
            </div>
            <div className="mb-6">
              <div className="font-semibold mb-2">Active/Scheduled coupons</div>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 w-full text-sm mb-2"
                placeholder="Search coupon code"
                disabled
              />
              <div className="text-gray-400 text-sm">No coupon found</div>
            </div>
            <div>
              <div className="font-semibold mb-2">Expired coupons</div>
              <div className="text-gray-400 text-sm">No coupon found</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Promotions
