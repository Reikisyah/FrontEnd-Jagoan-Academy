import React, { useState } from 'react'
import DashboardHeader from '../../../components/DashboardHeader'
import Tab from '../../../components/Tab'

const Pricing = () => {
  const [type, setType] = useState('paid')
  const [price, setPrice] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Harga course disimpan!')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Tab />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pengaturan Harga Course
            </h1>
            <p className="text-gray-500 mb-6">
              Atur apakah course ini gratis atau berbayar, dan tentukan harga
              jika berbayar.
            </p>
            <div className="mb-6">
              <label className="block font-semibold text-gray-700 mb-2">
                Tipe Harga
              </label>
              <div className="flex gap-4">
                <label
                  className={`flex items-center gap-2 border rounded-lg px-4 py-2 cursor-pointer transition ${type === 'free' ? 'border-pink-500 bg-pink-50' : 'border-gray-300 bg-white'}`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="free"
                    checked={type === 'free'}
                    onChange={() => setType('free')}
                    className="accent-pink-600"
                  />
                  Gratis
                </label>
                <label
                  className={`flex items-center gap-2 border rounded-lg px-4 py-2 cursor-pointer transition ${type === 'paid' ? 'border-pink-500 bg-pink-50' : 'border-gray-300 bg-white'}`}
                >
                  <input
                    type="radio"
                    name="type"
                    value="paid"
                    checked={type === 'paid'}
                    onChange={() => setType('paid')}
                    className="accent-pink-600"
                  />
                  Berbayar
                </label>
              </div>
            </div>
            {type === 'paid' && (
              <div className="mb-6">
                <label className="block font-semibold text-gray-700 mb-2">
                  Harga Course (Rp)
                </label>
                <input
                  type="number"
                  min="0"
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200"
                  placeholder="Masukkan harga course"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required={type === 'paid'}
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg text-lg shadow transition"
            >
              Simpan Harga
            </button>
          </form>
        </main>
      </div>
    </div>
  )
}

export default Pricing
