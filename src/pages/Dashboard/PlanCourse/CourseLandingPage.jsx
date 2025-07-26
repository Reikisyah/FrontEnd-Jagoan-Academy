import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardHeader from '../../../components/DashboardHeader'
import Tab from '../../../components/Tab'
import { getChaptersByCourseId } from '../../../utils/api/chapterApi'
import { updateCourse } from '../../../utils/api/courseApi'
import { getAllCategories } from '../../../utils/api/categoryApi'
import { getAllSubcategories } from '../../../utils/api/subCategoryApi'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const languages = ['Indonesia', 'English', 'Jepang']
const levels = ['Beginner', 'Intermediate', 'Advanced']
// Hapus array statis categories dan subcategories
// const categories = [...]
// const subcategories = [...]

const tabList = [
  { key: 'info', label: 'Informasi Kursus', tooltip: 'Course Info' },
  {
    key: 'category',
    label: 'Kategori & Bahasa',
    tooltip: 'Category & Language',
  },
  { key: 'learning', label: 'Pembelajaran', tooltip: 'Learning Info' },
  { key: 'chapters', label: 'Chapters', tooltip: 'Chapters & Sub-Chapters' },
]

// Helper untuk thumbnail dari backend
const getImageUrl = (url) => {
  if (
    !url ||
    typeof url !== 'string' ||
    url.trim() === '' ||
    url === 'null' ||
    url === 'undefined'
  )
    return null
  if (url.startsWith('http')) return url
  return `https://lms.alanwari.ponpes.id/storage/${url}`
}

const PlanCourse = () => {
  const location = useLocation()
  let course = location.state?.course
  if (!course) {
    const saved = localStorage.getItem('lastCourse')
    if (saved) course = JSON.parse(saved)
  }

  // Ambil data form dari localStorage jika ada
  let savedForm = null
  if (course?.id) {
    const saved = localStorage.getItem(`landingPageForm_${course.id}`)
    if (saved) savedForm = JSON.parse(saved)
  }

  // State untuk form, gunakan savedForm jika ada
  const [title, setTitle] = useState(savedForm?.title || course?.title || '')
  const [description, setDescription] = useState(
    savedForm?.description || course?.description || '',
  )
  const [language, setLanguage] = useState(savedForm?.language || '')
  const [level, setLevel] = useState(savedForm?.level || '')
  const [category, setCategory] = useState(
    savedForm?.category || course?.category || '',
  )
  const [subcategory, setSubcategory] = useState(
    savedForm?.subcategory || course?.sub_category || '',
  )
  const [topic, setTopic] = useState(savedForm?.topic || '')
  const [thumbnailPreview, setThumbnailPreview] = useState(
    savedForm?.thumbnailPreview || course?.thumbnail || null,
  )
  const [thumbnail, setThumbnail] = useState(null)
  const [activeTab, setActiveTab] = useState('info')
  const [price, setPrice] = useState(savedForm?.price || course?.price || '')
  // Validasi real-time
  const [touched, setTouched] = useState({})
  const [tabTransition, setTabTransition] = useState(false)

  // Sync state dengan localStorage setiap kali course.id berubah
  useEffect(() => {
    if (course?.id) {
      const saved = localStorage.getItem(`landingPageForm_${course.id}`)
      if (saved) {
        const savedForm = JSON.parse(saved)
        setTitle(savedForm.title || course.title || '')
        setDescription(savedForm.description || course.description || '')
        setLanguage(savedForm.language || '')
        setLevel(savedForm.level || '')
        setCategory(savedForm.category || course.category || '')
        setSubcategory(savedForm.subcategory || course.sub_category || '')
        setTopic(savedForm.topic || '')
        setThumbnailPreview(
          savedForm.thumbnailPreview || course.thumbnail || null,
        )
        setPrice(savedForm.price || course.price || '')
      }
    }
    // eslint-disable-next-line
  }, [course?.id])

  // Simpan ke localStorage setiap ada perubahan
  useEffect(() => {
    const formData = {
      title,
      description,
      language,
      level,
      category,
      subcategory,
      topic,
      thumbnailPreview,
      price,
    }
    if (course?.id) {
      localStorage.setItem(
        `landingPageForm_${course.id}`,
        JSON.stringify(formData),
      )
    }
  }, [
    title,
    description,
    language,
    level,
    category,
    subcategory,
    topic,
    thumbnailPreview,
    price,
    course?.id,
  ])

  // State untuk chapters
  const [chapters, setChapters] = useState(location.state?.chapters || [])
  const [loadingChapters, setLoadingChapters] = useState(false)
  const [errorChapters, setErrorChapters] = useState(null)

  useEffect(() => {
    // Jika chapters belum ada dan course ada, fetch dari API
    if ((!chapters || chapters.length === 0) && course?.id) {
      setLoadingChapters(true)
      getChaptersByCourseId(course.id)
        .then((data) => setChapters(data))
        .catch((err) => setErrorChapters(err.message))
        .finally(() => setLoadingChapters(false))
    }
    // eslint-disable-next-line
  }, [course])

  // Fetch kategori & subkategori dari backend
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data || []))
    getAllSubcategories().then((data) => setSubcategories(data || []))
  }, [])

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

  // Pastikan handleSubmit async
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!thumbnail && !thumbnailPreview) {
      await Swal.fire({
        icon: 'warning',
        title: 'Thumbnail wajib diunggah!',
        confirmButtonColor: '#e11d48',
        confirmButtonText: 'OK',
        customClass: { popup: 'rounded-xl' },
      })
      return
    }
    try {
      if (course?.id) {
        // Siapkan payload
        let payload
        let isFormData = false
        if (thumbnail) {
          // Jika ada file thumbnail baru, gunakan FormData
          payload = new FormData()
          payload.append('title', title)
          payload.append('description', description)
          payload.append('language', language)
          payload.append('level', level)
          payload.append('category', category)
          payload.append('sub_category', subcategory)
          payload.append('topic', topic)
          payload.append('price', price)
          payload.append('thumbnail', thumbnail)
          isFormData = true
        } else {
          // Jika tidak ada file baru, kirim JSON
          payload = {
            title,
            description,
            language,
            level,
            category,
            sub_category: subcategory,
            topic,
            price,
          }
        }
        await updateCourse(course.id, payload)
        localStorage.removeItem(`landingPageForm_${course.id}`)
        await Swal.fire({
          icon: 'success',
          title: 'Perubahan disimpan!',
          showConfirmButton: false,
          timer: 1500,
          customClass: { popup: 'rounded-xl' },
          position: 'center',
        })
      }
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal menyimpan perubahan',
        text: err.message,
        confirmButtonColor: '#e11d48',
        customClass: { popup: 'rounded-xl' },
      })
    }
  }

  const handleTabChange = (key) => {
    setTabTransition(true)
    setTimeout(() => {
      setActiveTab(key)
      setTabTransition(false)
    }, 180) // durasi animasi fade out
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

  // Step progress
  const stepIndex = tabList.findIndex((t) => t.key === activeTab) + 1

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Tab />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 max-w-4xl mx-auto px-4 md:px-8 py-10">
          {/* Step Progress */}
          <div className="flex items-center gap-2 mb-2">
            {tabList.map((tab, idx) => (
              <div key={tab.key} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm transition-all duration-200 ${activeTab === tab.key ? 'bg-pink-600 scale-110 shadow-lg' : 'bg-pink-200'}`}
                >
                  {idx + 1}
                </div>
                {idx < tabList.length - 1 && (
                  <div className="w-8 h-1 bg-pink-200 mx-1 rounded" />
                )}
              </div>
            ))}
            <span className="ml-4 text-xs text-gray-400">
              Step {stepIndex} of {tabList.length}
            </span>
          </div>
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-pink-200">
            {tabList.map((tab) => (
              <button
                key={tab.key}
                className={`px-4 py-2 font-semibold border-b-2 transition-all duration-200 relative group ${
                  activeTab === tab.key
                    ? 'border-pink-600 text-pink-700 bg-pink-50 font-bold scale-105 shadow-sm'
                    : 'border-transparent text-gray-500 hover:text-pink-600'
                }`}
                onClick={() => handleTabChange(tab.key)}
                type="button"
                tabIndex={0}
                aria-label={tab.tooltip}
              >
                {tab.label}
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                  {tab.tooltip}
                </span>
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            {/* Tab Content with fade animation */}
            <div
              className={`transition-all duration-300 ease-in-out ${tabTransition ? 'opacity-0 translate-x-4 pointer-events-none' : 'opacity-100 translate-x-0'}`}
              style={{ minHeight: 200 }}
            >
              {activeTab === 'info' && (
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
                      className={`border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200 ${touched.title && !title ? 'border-red-400 bg-red-50' : ''}`}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, title: true }))}
                      required
                      placeholder="Judul harus menarik dan informatif."
                    />
                    {!title && touched.title && (
                      <div className="text-xs text-red-500 mt-1">
                        Title is required
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      Judul harus menarik dan informatif.
                    </div>
                  </div>
                  {/* Tambah input harga */}
                  <div className="mb-4">
                    <label className="block font-semibold text-pink-700 mb-1">
                      Harga (Rp) <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      className={`border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200 ${touched.price && !price ? 'border-red-400 bg-red-50' : ''}`}
                      value={price ? Number(price).toLocaleString('id-ID') : ''}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '')
                        setPrice(raw)
                      }}
                      onBlur={() => setTouched((t) => ({ ...t, price: true }))}
                      required
                      placeholder="Masukkan harga, contoh: 150000"
                    />
                    {!price && touched.price && (
                      <div className="text-xs text-red-500 mt-1">
                        Price is required
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">
                      Hanya angka, tanpa titik/koma. Contoh: 150000
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
              )}
              {activeTab === 'category' && (
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
                        className={`border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200 ${touched.language && !language ? 'border-red-400 bg-red-50' : ''}`}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, language: true }))
                        }
                        required
                      >
                        <option value="">-- Pilih Bahasa --</option>
                        {languages.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                      {!language && touched.language && (
                        <div className="text-xs text-red-500 mt-1">
                          Language is required
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block font-semibold text-pink-700 mb-1">
                        Level <span className="text-pink-500">*</span>
                      </label>
                      <select
                        className={`border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200 ${touched.level && !level ? 'border-red-400 bg-red-50' : ''}`}
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, level: true }))
                        }
                        required
                      >
                        <option value="">-- Pilih Level --</option>
                        {levels.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                      {!level && touched.level && (
                        <div className="text-xs text-red-500 mt-1">
                          Level is required
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-pink-700 mb-1">
                        Kategori <span className="text-pink-500">*</span>
                      </label>
                      <select
                        className={`border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200 ${touched.category && !category ? 'border-red-400 bg-red-50' : ''}`}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, category: true }))
                        }
                        required
                      >
                        <option value="">-- Pilih Kategori --</option>
                        {categories.map((cat) => (
                          <option key={cat.id || cat.name} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      {!category && touched.category && (
                        <div className="text-xs text-red-500 mt-1">
                          Category is required
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block font-semibold text-pink-700 mb-1">
                        Subkategori <span className="text-pink-500">*</span>
                      </label>
                      <select
                        className={`border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-pink-200 ${touched.subcategory && !subcategory ? 'border-red-400 bg-red-50' : ''}`}
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, subcategory: true }))
                        }
                        required
                      >
                        <option value="">-- Pilih Subkategori --</option>
                        {subcategories.map((sub) => (
                          <option key={sub.id || sub.name} value={sub.name}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                      {!subcategory && touched.subcategory && (
                        <div className="text-xs text-red-500 mt-1">
                          Subcategory is required
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}
              {activeTab === 'learning' && (
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
                            src={getImageUrl(thumbnailPreview)}
                            alt="Thumbnail Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <>
                            <span className="text-3xl text-gray-300 mb-2">
                              +
                            </span>
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
                        />
                      </label>
                      <div className="text-xs text-gray-400">
                        Ukuran minimal 750×422 piksel, jpg, jpeg, gif atau png.
                        Tidak boleh ada teks pada gambar. Maksimal 5MB.
                      </div>
                    </div>
                  </div>
                </section>
              )}
              {activeTab === 'chapters' && (
                <section className="bg-white rounded-xl shadow p-6 mb-2">
                  <h2 className="text-lg font-bold text-pink-500 mb-4">
                    Daftar Chapter & Sub-Chapter
                  </h2>
                  {loadingChapters ? (
                    <div className="text-center text-pink-600 my-4">
                      Memuat chapter...
                    </div>
                  ) : errorChapters ? (
                    <div className="text-center text-red-500 my-4">
                      {errorChapters}
                    </div>
                  ) : chapters.length > 0 ? (
                    <ol className="list-decimal ml-6">
                      {chapters.map((chapter, idx) => (
                        <li key={chapter.id} className="mb-2">
                          <div className="font-semibold text-pink-700">
                            {chapter.title || `Chapter ${idx + 1}`}
                          </div>
                          {chapter.sub_chapters &&
                          chapter.sub_chapters.length > 0 ? (
                            <ul className="list-disc ml-6 mt-1">
                              {chapter.sub_chapters.map((sub, sidx) => (
                                <li key={sub.id} className="text-gray-700">
                                  <span className="font-medium">
                                    {sub.title || `Sub-Chapter ${sidx + 1}`}
                                  </span>
                                  {sub.content_link && (
                                    <>
                                      {': '}
                                      <a
                                        href={sub.content_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline text-xs ml-1"
                                      >
                                        {sub.content_link}
                                      </a>
                                    </>
                                  )}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="text-gray-400 text-xs ml-2">
                              No sub-chapters yet.
                            </div>
                          )}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className="text-gray-400 text-xs ml-2">
                      No chapters yet. Please add chapters and sub-chapters in
                      the <b>Curriculum</b> section first.
                    </div>
                  )}
                </section>
              )}
            </div>
            {/* Sticky Save Button */}
            <div className="sticky bottom-0 left-0 w-full bg-white/80 py-4 flex justify-end z-20 border-t border-pink-100 shadow-inner">
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
