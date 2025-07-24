import React from 'react'

// Props: course (object), formatRupiah (function), onAddToCart (function)
const CardDetailCourse = ({ course, formatRupiah, onAddToCart }) => {
  if (!course) return null
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col items-center">
      <img
        src={
          course.thumbnail && course.thumbnail.startsWith('http')
            ? course.thumbnail
            : `https://lms.alanwari.ponpes.id/storage/${course.thumbnail}`
        }
        alt={course.title}
        className="rounded-lg object-cover w-full h-32 max-w-xs mb-4 bg-white"
      />
      <h2 className="text-xl font-bold text-gray-900 mb-1 text-left w-full">
        {course.title}
      </h2>
      <div className="text-gray-700 text-base mb-2 text-left w-full">
        {course.description}
      </div>
      <div className="flex items-center gap-1 mb-2 w-full text-left">
        <span className="text-yellow-500 font-semibold text-base">
          {course.rating}
        </span>
        <span className="text-yellow-400">★</span>
        <span className="text-gray-500 text-sm">
          ({course.total_reviews} ulasan)
        </span>
      </div>
      <div className="text-base text-gray-500 mb-1 w-full text-left">
        <span className="font-semibold">Author:</span> {course.created_by}
      </div>
      <div className="text-base text-gray-500 mb-2 w-full text-left">
        <span className="font-semibold">Kategori:</span> {course.category}
        {course.sub_category && <span> &bull; {course.sub_category}</span>}
      </div>
      <div className="text-pink-600 font-bold text-2xl mb-4 w-full text-left">
        {formatRupiah(course.price)}
      </div>
      <button
        className="w-full px-5 py-3 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition text-lg"
        onClick={onAddToCart || (() => alert('Ditambahkan ke keranjang!'))}
      >
        Tambah ke Keranjang
      </button>
    </div>
  )
}

export default CardDetailCourse
