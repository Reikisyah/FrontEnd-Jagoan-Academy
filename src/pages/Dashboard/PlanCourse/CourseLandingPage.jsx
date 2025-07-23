import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardHeader from '../../../components/DashboardHeader'
import Tab from '../../../components/Tab'

const languages = ['Indonesia', 'English', 'Jepang']
const levels = ['Beginner', 'Intermediate', 'Advanced']
const categories = ['Bisnis', 'Programming', 'Design', 'Marketing']
const subcategories = ['Subkategori 1', 'Subkategori 2', 'Subkategori 3']

const PlanCourse = () => {
  const location = useLocation()
  let course = location.state?.course
  if (!course) {
    const saved = localStorage.getItem('lastCourse')
    if (saved) course = JSON.parse(saved)
  }

  // State untuk form
  const [title, setTitle] = useState(course?.title || '')
  const [description, setDescription] = useState(course?.description || '')
  const [language, setLanguage] = useState('')
  const [level, setLevel] = useState('')
  const [category, setCategory] = useState(course?.category || '')
  const [subcategory, setSubcategory] = useState(course?.sub_category || '')
  const [topic, setTopic] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState(null)

  // Handler upload thumbnail
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    setThumbnail(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setThumbnailPreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setThumbnailPreview(null)
    }
  }

  // Dummy handler simpan
  const handleSubmit = (e) => {
    e.preventDefault()
    // Simpan perubahan (bisa dihubungkan ke API)
    alert('Perubahan disimpan!')
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-pink-700 mb-4">
          No Course Data
        </h1>
        <p className="text-gray-500">
          Please add a course first or navigate from the dashboard.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Tab />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-10">
          <h1 className="text-3xl font-bold text-pink-600 mb-2">
            Course Landing Page
          </h1>
          <p className="mb-8 text-gray-600">
            Halaman ini adalah tampilan utama kursus Anda. Pastikan untuk
            mengisi semua detail dengan jelas dan menarik agar kursus Anda
            diminati banyak peserta.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informasi Kursus */}
            <section className="bg-white rounded-xl shadow p-6 mb-2">
              <h2 className="text-lg font-bold text-pink-500 mb-4">
                Informasi Kursus
              </h2>
              <div className="mb-4">
                <label className="block font-semibold text-pink-700 mb-1">
                  Judul Kursus <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Judul harus menarik dan informatif."
                />
                <div className="text-xs text-gray-400 mt-1">
                  Judul harus menarik dan informatif.
                </div>
              </div>
              <div>
                <label className="block font-semibold text-pink-700 mb-1">
                  Deskripsi Kursus
                </label>
                {/* Toolbar dummy */}
                <div className="flex gap-2 mb-1">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-pink-500"
                  >
                    <b>B</b>
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-pink-500"
                  >
                    <i>I</i>
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-pink-500"
                  >
                    U
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-pink-500"
                  >
                    •
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-pink-500"
                  >
                    1.
                  </button>
                </div>
                <textarea
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tuliskan deskripsi kursus Anda di sini"
                />
                <div className="text-xs text-gray-400 mt-1">
                  Deskripsi tidak dibatasi panjangnya. Tulis sejelas dan
                  selengkap mungkin.
                </div>
              </div>
            </section>
            {/* Kategori & Bahasa */}
            <section className="bg-white rounded-xl shadow p-6 mb-2">
              <h2 className="text-lg font-bold text-pink-500 mb-4">
                Kategori & Bahasa
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-semibold text-pink-700 mb-1">
                    Bahasa <span className="text-pink-500">*</span>
                  </label>
                  <select
                    className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                  >
                    <option value="">-- Pilih Bahasa --</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-pink-700 mb-1">
                    Level <span className="text-pink-500">*</span>
                  </label>
                  <select
                    className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    required
                  >
                    <option value="">-- Pilih Level --</option>
                    {levels.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-pink-700 mb-1">
                    Kategori <span className="text-pink-500">*</span>
                  </label>
                  <select
                    className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-pink-700 mb-1">
                    Subkategori <span className="text-pink-500">*</span>
                  </label>
                  <select
                    className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    required
                  >
                    <option value="">-- Pilih Subkategori --</option>
                    {subcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
            {/* Informasi Pembelajaran */}
            <section className="bg-white rounded-xl shadow p-6 mb-2">
              <h2 className="text-lg font-bold text-pink-500 mb-4">
                Informasi Pembelajaran
              </h2>
              <div className="mb-4">
                <label className="block font-semibold text-pink-700 mb-1">
                  Topik Utama yang Diajarkan
                </label>
                <input
                  type="text"
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Contoh: Landscape Photography"
                />
                <div className="text-xs text-gray-400 mt-1">
                  Tuliskan topik utama yang akan dipelajari peserta.
                </div>
              </div>
              <div>
                <label className="block font-semibold text-pink-700 mb-1">
                  Gambar Thumbnail <span className="text-pink-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <label className="border-2 border-dashed border-gray-300 rounded-lg w-48 h-32 flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:border-pink-400">
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <>
                        <span className="text-3xl text-gray-300 mb-2">+</span>
                        <span className="text-xs text-gray-400 text-center">
                          Unggah Thumbnail
                          <br />
                          Klik di sini atau drag file
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailChange}
                      required
                    />
                  </label>
                  <div className="text-xs text-gray-400">
                    Ukuran minimal 750×422 piksel, jpg, jpeg, gif atau png.
                    Tidak boleh ada teks pada gambar. Maksimal 5MB.
                  </div>
                </div>
              </div>
            </section>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-2 rounded-lg shadow transition"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default PlanCourse
