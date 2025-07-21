import React from 'react'

const partners = [
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  },
  {
    name: 'Oracle Logo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
  },
  {
    name: 'Amazon Web Services',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  },
  {
    name: 'IBM Logo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  },
  {
    name: 'Cisco Logo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
  },
  {
    name: 'Facebook',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
  },
  {
    name: 'Twitter',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg',
  },
  {
    name: 'LinkedIn',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
  },
  {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
  {
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    name: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
  },
]

const Partner = () => (
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

// Komponen auto scroll partner dua baris horizontal
function DoubleRowAutoScrollPartners({ partners }) {
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
                src={item.logo}
                alt={item.name}
                className="max-h-12 sm:max-h-14 lg:max-h-16 object-contain mx-auto partner-logo-img"
                style={{ minWidth: 50, minHeight: 30 }}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.style.display = 'inline-block'
                  e.target.src = ''
                  e.target.style.background = '#ccc'
                  e.target.alt = item.name
                }}
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
                src={item.logo}
                alt={item.name}
                className="max-h-12 sm:max-h-14 lg:max-h-16 object-contain mx-auto partner-logo-img"
                style={{ minWidth: 50, minHeight: 30 }}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.style.display = 'inline-block'
                  e.target.src = ''
                  e.target.style.background = '#ccc'
                  e.target.alt = item.name
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Partner
