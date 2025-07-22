import React, { useState, useEffect } from 'react'
import { getAllPartners } from '../utils/api'

const Partner = () => {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true)
        const data = await getAllPartners()
        setPartners(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching partners:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPartners()
  }, [])

  if (loading) {
    return (
      <section id="partner" className="w-full py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data partner...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="partner" className="w-full py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="partner" className="w-full py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4 sm:mb-6">
          Partner Kami
        </h2>
        <p className="text-center text-gray-500 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4 sm:px-0">
          Berikut adalah beberapa mitra yang mendukung program pembelajaran kami
        </p>
        <DoubleRowAutoScrollPartners partners={partners} />
      </div>
    </section>
  )
}

// Komponen auto scroll partner dua baris horizontal
function DoubleRowAutoScrollPartners({ partners }) {
  // Jika partners kosong, return null
  if (!partners || partners.length === 0) {
    return null
  }

  // Bagi dua baris
  const mid = Math.ceil(partners.length / 2)
  const topRow = partners.slice(0, mid)
  const bottomRow = partners.slice(mid)
  const topRef = React.useRef(null)
  const bottomRef = React.useRef(null)

  // Fungsi untuk menduplikasi array hingga cukup panjang (minimal 12 logo per baris)
  function getFilledItems(row) {
    let items = []
    // Duplikat agar panjang minimal 2x scrollWidth supaya seamless
    const minCount = Math.max(24, row.length * 6)
    while (items.length < minCount) {
      items = items.concat(row)
    }
    // Duplikat sekali lagi agar looping benar-benar seamless
    return [...items, ...items]
  }

  // Inisialisasi state agar logo langsung muncul pada render awal
  const [topItems, setTopItems] = React.useState(() => getFilledItems(topRow))
  const [bottomItems, setBottomItems] = React.useState(() =>
    getFilledItems(bottomRow),
  )

  // Update isi logo saat ukuran window berubah
  React.useEffect(() => {
    setTopItems(getFilledItems(topRow))
    setBottomItems(getFilledItems(bottomRow))
    const handleResize = () => {
      setTopItems(getFilledItems(topRow))
      setBottomItems(getFilledItems(bottomRow))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line
  }, [partners.length])

  React.useEffect(() => {
    const top = topRef.current
    const bottom = bottomRef.current
    let topPos = 0
    let bottomPos = 0
    let topFrame, bottomFrame
    let isPause = false
    let bottomStart = 0

    // Ambil lebar satu logo + gap (dari elemen pertama)
    function getStep(ref) {
      if (!ref || !ref.children || ref.children.length < 2) return 120
      const first = ref.children[0]
      const second = ref.children[1]
      const rect1 = first.getBoundingClientRect()
      const rect2 = second.getBoundingClientRect()
      return Math.abs(rect2.left - rect1.left)
    }

    if (top) top.style.transition = 'transform 0.4s linear'
    if (bottom) bottom.style.transition = 'transform 0.4s linear'

    function animate() {
      if (!top || !bottom) return
      const speed = 0.5
      topPos -= speed
      if (bottomStart === 0) {
        bottomStart = -bottom.scrollWidth / 2
        bottomPos = bottomStart
      }
      bottomPos += speed
      // Looping
      if (Math.abs(topPos) >= top.scrollWidth / 2) {
        topPos = 0
      }
      if (bottomPos >= 0) {
        bottomPos = bottomStart
      }
      top.style.transform = `translateX(${topPos}px)`
      bottom.style.transform = `translateX(${bottomPos}px)`
      topFrame = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      if (topFrame) cancelAnimationFrame(topFrame)
      if (bottomFrame) cancelAnimationFrame(bottomFrame)
    }
  }, [topItems, bottomItems])

  return (
    <>
      <style>{`
        .partner-logo-img {
          filter: grayscale(1);
          transition: filter 0.3s;
        }
        .partner-logo-img:hover {
          filter: grayscale(0);
        }
      `}</style>
      <div className="space-y-4 sm:space-y-6">
        {/* Baris atas scroll ke kiri */}
        <div className="overflow-hidden w-full">
          <div
            ref={topRef}
            className="flex gap-x-16 sm:gap-x-24 lg:gap-x-32 will-change-transform py-2 sm:py-3 min-w-full"
          >
            {topItems.map((item, idx) => (
              <img
                key={idx}
                src={item.logo.startsWith('http') ? item.logo : `https://lms.alanwari.ponpes.id/storage/${item.logo}`}
                alt={item.name}
                className="h-16 sm:h-20 lg:h-24 w-32 sm:w-40 lg:w-48 object-cover mx-auto partner-logo-img bg-white rounded-lg p-2"
              />
            ))}
          </div>
        </div>
        {/* Baris bawah scroll ke kanan */}
        <div className="overflow-hidden w-full">
          <div
            ref={bottomRef}
            className="flex gap-x-16 sm:gap-x-24 lg:gap-x-32 will-change-transform py-2 sm:py-3 min-w-full"
          >
            {bottomItems.map((item, idx) => (
              <img
                key={idx}
                src={item.logo.startsWith('http') ? item.logo : `https://lms.alanwari.ponpes.id/storage/${item.logo}`}
                alt={item.name}
                className="h-16 sm:h-20 lg:h-24 w-32 sm:w-40 lg:w-48 object-cover mx-auto partner-logo-img bg-white rounded-lg p-2"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Partner
