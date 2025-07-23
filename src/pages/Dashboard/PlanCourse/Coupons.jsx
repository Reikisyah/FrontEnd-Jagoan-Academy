import React, { useState } from 'react'
import DashboardHeader from '../../../components/DashboardHeader'
import Tab from '../../../components/Tab'

const Coupons = () => {
  const [form, setForm] = useState({
    code: '',
    discountType: 'percent',
    discountValue: '10',
    maxRedemptions: '1',
    status: 'SCHEDULED',
    startDate: '',
    endDate: '',
  })
  const [showForm, setShowForm] = useState(true)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Coupon saved!')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Tab />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Coupons</h1>
            {showForm && (
              <form onSubmit={handleSubmit} className="mb-6">
                <button
                  type="button"
                  className="mb-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-semibold mb-1">Code</label>
                    <input
                      type="text"
                      name="code"
                      className="border rounded-lg px-4 py-2 w-full"
                      value={form.code}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Discount Value
                    </label>
                    <input
                      type="number"
                      name="discountValue"
                      className="border rounded-lg px-4 py-2 w-full"
                      value={form.discountValue}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Discount Type
                    </label>
                    <select
                      name="discountType"
                      className="border rounded-lg px-4 py-2 w-full"
                      value={form.discountType}
                      onChange={handleChange}
                    >
                      <option value="percent">Percent (%)</option>
                      <option value="amount">Amount (Rp)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Status</label>
                    <input
                      type="text"
                      name="status"
                      className="border rounded-lg px-4 py-2 w-full bg-gray-100"
                      value={form.status}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Max Redemptions
                    </label>
                    <input
                      type="number"
                      name="maxRedemptions"
                      className="border rounded-lg px-4 py-2 w-full"
                      value={form.maxRedemptions}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      className="border rounded-lg px-4 py-2 w-full"
                      value={form.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      className="border rounded-lg px-4 py-2 w-full"
                      value={form.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg text-lg shadow transition"
                >
                  Save Coupon
                </button>
              </form>
            )}
            <div className="text-gray-400 text-sm">No coupons found.</div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Coupons
