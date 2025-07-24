import React, { useEffect, useState } from 'react'
import CardDetailCourse from './CardDetailCourse'
import DropdownSection from './DropdownSection'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from '../../../utils/api'

const DetailCourse = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_BASE_URL}/courses/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        })
        if (!res.ok) throw new Error('Gagal mengambil data course')
        const data = await res.json()
        setCourse(data.data)
      } catch (err) {
        if (err.message === 'Failed to fetch') {
          setError(
            'Gagal fetch: Pastikan URL API benar dan backend mengizinkan CORS.',
          )
        } else {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id])

  // Format harga ke Rupiah
  const formatRupiah = (value) => {
    if (!value) return '-'
    return 'Rp' + Number(value).toLocaleString('id-ID')
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Memuat detail course...</p>
      </div>
    )
  }
  if (error || !course) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-red-600">{error || 'Course tidak ditemukan.'}</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Top section: dark background with course info and sticky card */}
      <div className="relative bg-[#101626] pt-0 pb-0 px-2 sm:px-4 mt-1">
        <div
          className="flex flex-col lg:flex-row gap-8 items-start"
          style={{ overflow: 'visible' }}
        >
          {/* Main Info */}
          <div className="w-full lg:w-1/2 text-white flex flex-col justify-center z-10 pl-12 sm:pl-20 pt-14 ">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 leading-tight">
              {course.title}
            </h1>
            <div className="mb-5 text-xl sm:text-2xl">{course.description}</div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400 font-semibold text-xl sm:text-2xl">
                {course.rating}
              </span>
              <span className="text-yellow-400 text-xl sm:text-2xl">★</span>
              <span className="text-white text-lg sm:text-xl">
                ({course.total_reviews} ulasan)
              </span>
            </div>
            <div className="text-lg mb-2">
              <span className="font-semibold">Author:</span> {course.created_by}
            </div>
            <div className="text-lg mb-4">
              <span className="font-semibold">Kategori:</span> {course.category}
              {course.sub_category && (
                <span> &bull; {course.sub_category}</span>
              )}
            </div>
            <div className="text-white font-bold text-3xl sm:text-4xl mt-2">
              {formatRupiah(course.price)}
            </div>
          </div>
          {/* Sticky Card */}
          <div className="flex-shrink-0 flex items-start justify-end z-20 mt-8 lg:mt-0 pt-14">
            <div className="sticky-custom w-80 max-w-xs mr-8 ml-40">
              <CardDetailCourse course={course} formatRupiah={formatRupiah} />
            </div>
          </div>
        </div>
        {/* Overlap effect for sticky card */}
        <div
          className="absolute left-0 right-0 bottom-0 h-20 bg-white rounded-t-xl z-0"
          style={{ pointerEvents: 'none' }}
        ></div>
      </div>
      {/* Main Content below dark section */}

      <div className="w-full bg-white rounded-xl shadow p-8 -mt-28 relative z-10 pl-12 sm:pl-20 pr-12 sm:pr-20">
        {/* Yang akan Anda pelajari */}
        <div className="mt-0">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="font-bold text-lg mb-4 text-gray-900">
              Yang akan Anda pelajari
            </h2>
            <div className="flex flex-col md:flex-row text-sm gap-2 md:gap-x-40">
              <ul className="list-none space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-pink-600 font-bold">✓</span> NodeJS
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-pink-600 font-bold">✓</span> NodeJS
                  Standard Library
                </li>
              </ul>
              <ul className="list-none space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-pink-600 font-bold">✓</span> NodeJS
                  Dasar
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-pink-600 font-bold">✓</span> NodeJS
                  RESTful API
                </li>
              </ul>
            </div>
          </div>

          {/* Telusuri topik terkait */}
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-2 text-gray-900">
              Telusuri topik terkait
            </h2>
            <div className="flex gap-2 flex-wrap">
              <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-sm font-medium">
                Node.Js
              </button>
              <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-sm font-medium">
                Pengembangan Web
              </button>
              <button className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-sm font-medium">
                Pengembangan
              </button>
            </div>
          </div>

          {/* Konten kursus (Dropdown) */}
          <div>
            <h2 className="font-bold text-lg mb-2 text-gray-900">
              Konten kursus
            </h2>
            <div className="flex justify-between items-center mb-2">
              <div className="text-base text-gray-700">
                11 bagian &bull; 311 pelajaran &bull; 33j 40m total durasi
              </div>
              <button className="text-purple-600 font-semibold text-base hover:underline focus:outline-none">
                Perluas semua bagian
              </button>
            </div>
            <div className="border border-gray-200 rounded overflow-hidden bg-white">
              {[
                { title: 'HTML Dasar', lessons: 40, duration: '3j 42m' },
                { title: 'HTML Form', lessons: 35, duration: '2j 5m' },
                { title: 'CSS Dasar', lessons: 38, duration: '3j 30m' },
                { title: 'CSS Layout', lessons: 22, duration: '3j 3m' },
                { title: 'JavaScript Dasar', lessons: 60, duration: '8j 4m' },
                {
                  title: 'JavaScript Object Oriented Programming',
                  lessons: 28,
                  duration: '2j 50m',
                },
                {
                  title: 'JavaScript Standard Library',
                  lessons: 20,
                  duration: '2j 55m',
                },
                {
                  title: 'JavaScript Modules',
                  lessons: 17,
                  duration: '1j 28m',
                },
              ].map((section, idx) => (
                <DropdownSection key={idx} section={section} />
              ))}
            </div>
          </div>
          {/* Persyaratan untuk mengikuti kursus ini */}
          <div className="mt-8">
            <h2 className="font-bold text-lg mb-2 text-gray-900">
              Persyaratan
            </h2>
            <ul className="list-disc pl-6 text-gray-800 text-base mb-6">
              <li>Mampu Mengoperasikan Komputer</li>
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="font-bold text-lg mb-2 text-gray-900">Deskripsi</h2>
            <div className="text-gray-800 text-base mb-2">
              Selamat datang di course HTML, CSS dan JavaScript dari Pemula
              sampai Mahir. Disini kita akan belajar Web dasar dari HTML, CSS
              dan JavaScript dari tingkat dasar sampai tingkat mahir, disertai
              dengan studi kasus. Akan banyak materi yang akan dibahas di course
              ini seperti :
            </div>
            <ul className="list-disc pl-6 text-gray-800 text-base mb-2">
              <li>
                HTML Dasar, disini kita akan belajar tentang dasar-dasar web
                menggunakan HTML. Bagaimana membuat web menggunakan HTML
              </li>
              <li>
                HTML Form, disini kita akan belajar bagaimana membuat Form
                menggunakan HTML. Form adalah salah satu bagian untuk
                berinteraksi dengan pengguna web
              </li>
              <li>
                CSS Dasar, disini kita akan belajar tentang CSS, untuk
                menambahkan gaya dan tampilan ke halaman HTML agar lebih menarik
              </li>
              <li>
                CSS Layout, disini kita akan belajar tentang cara melakukan tata
                letak posisi element-element HTML menggunakan CSS
              </li>
              <li>
                Pemrograman JavaScript Dasar, disini kita akan belajar tentang
                dasar-dasar pemrograman JavaScript. Ini adalah materi awal yang
                wajib dikuasai
              </li>
              <li>
                Pemrograman JavaScript Object Oriented Programming, disini kita
                akan belajar pemrograman berorientasi objek di JavaScript, salah
                satu paradigma paling populer saat ini
              </li>
              <li>
                Pemrograman JavaScript Modules, disini kita akan belajar cara
                membuat aplikasi javascript yang modular, sehingga mudah
                digunakan
              </li>
              <li>
                Pemrograman JavaScript Document Object Model, disini kita akan
                belajar bagaimana interaksi antara javascript dan html dan juga
                css, sehingga bisa membuat halaman web lebih kaya akan interaksi
              </li>
              <li>
                Pemrograman JavaScript Async, disini kita akan belajar bagaimana
                asynchronous programming di javascript, seperti mengambil data
                dari server, dan lain-lain
              </li>
              <li>
                Pemrograman JavaScript Web API, kita akan bahas banyak web api
                yang tersedia di javascript
              </li>
              <li>
                Studi Kasus Menggunakan JavaScript, dan course ini akan
                dilengkapi banyak studi kasus
              </li>
            </ul>
            <div className="text-gray-800 text-base mb-2">
              Materi akan selalu di update secara berkala, dan ketika materi di
              update, harga course pun akan diupdate dengan harga baru. Jadi
              pastikan untuk secepatnya membeli course ini, makin cepat, makin
              murah harga pembelian course ini.
              <br />
              Course ini juga didukung dengan group private group DISCORD
              sehingga kita bisa berdiskusi sesama member ketika terjadi masalah
              di course ini.
              <br />
              Fokus pemrograman JavaScript ini akan mengarah ke frontend,
              sedangkan untuk materi javascript backend akan dibuat dalam course
              terpisah dengan tema NodeJS.
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-bold text-lg mb-2 text-gray-900">
              Untuk siapa kursus ini:
            </h2>
            <ul className="list-disc pl-6 text-gray-800 text-base">
              <li>Programmer Pemula yang Ingin Belajar HTML</li>
              <li>Programmer Pemula yang Ingin Belajar CSS</li>
              <li>
                Programmer Pemula yang Ingin Belajar Pemrograman JavaScript
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailCourse
