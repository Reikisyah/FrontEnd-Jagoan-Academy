import React, { useEffect, useRef } from 'react'

const testimonials = [
  {
    text: 'Learning at Jagoan Academy has been a game-changer for my career. The courses are well-structured and the instructors are incredibly knowledgeable.',
    name: 'Sarah Johnson',
    role: 'Software Developer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    text: 'The hands-on projects and industry-relevant content have prepared me well for my career. The platform is user-friendly.',
    name: 'James Brown',
    role: 'Web Developer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    text: 'The flexible learning schedule makes it easy for me to balance work and education. Highly recommend!',
    name: 'Michael Chen',
    role: 'UX Designer',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
  },
  {
    text: 'I love the practical projects and real-world case studies. The instructors are always available to help.',
    name: 'David Kim',
    role: 'Data Scientist',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    text: 'Materi yang diajarkan sangat relevan dengan kebutuhan industri saat ini. Saya merasa lebih percaya diri setelah mengikuti kursus ini.',
    name: 'Ayu Lestari',
    role: 'Frontend Developer',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    text: 'Instruktur sangat responsif dan selalu membantu jika ada kesulitan. Platformnya juga mudah digunakan.',
    name: 'Rizky Pratama',
    role: 'Backend Developer',
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
  },
  {
    text: 'Saya suka dengan studi kasus yang diberikan, sangat aplikatif dan menambah wawasan baru.',
    name: 'Dewi Anggraini',
    role: 'Mobile Developer',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    text: 'Belajar di Jagoan Academy membuat saya lebih siap menghadapi dunia kerja. Materinya up-to-date dan mudah dipahami.',
    name: 'Andi Wijaya',
    role: 'Fullstack Developer',
    avatar: 'https://randomuser.me/api/portraits/men/77.jpg',
  },
  {
    text: 'Sistem pembelajaran sangat interaktif dan mudah diikuti. Saya sangat merekomendasikan!',
    name: 'Putri Maharani',
    role: 'QA Engineer',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
  },
  {
    text: 'Banyak latihan soal yang membantu saya memahami materi lebih dalam.',
    name: 'Budi Santoso',
    role: 'DevOps Engineer',
    avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
  {
    text: 'Mentor sangat ramah dan profesional. Saya jadi lebih semangat belajar.',
    name: 'Siti Aminah',
    role: 'UI Designer',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
  {
    text: 'Materi selalu update mengikuti perkembangan teknologi terbaru.',
    name: 'Agus Salim',
    role: 'Cloud Engineer',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    text: 'Berkat Jagoan Academy, saya berhasil mendapatkan pekerjaan impian saya.',
    name: 'Lina Marlina',
    role: 'Product Manager',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
  },
]

const Testimonial = () => {
  return (
    <section
      id="testimonial"
      className="w-full py-8 sm:py-12 lg:py-20 bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <span className="px-3 sm:px-4 py-1 rounded-full bg-pink-200 text-pink-700 font-semibold text-xs sm:text-sm mb-2 sm:mb-3">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-center text-gray-900 mb-2">
            What Our Students Say
          </h2>
          <p className="text-center text-gray-500 mb-6 sm:mb-8 max-w-2xl text-sm sm:text-base">
            Hear from our satisfied students about their learning experience
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 overflow-hidden relative"
          style={{ height: 600, position: 'relative' }}
        >
          <AutoScrollTestimonials testimonials={testimonials} />

          {/* Gradient overlay untuk efek fade atas dan bawah */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Gradient atas (gelap) */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent"></div>
            {/* Gradient bawah (gelap) */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AutoScrollTestimonials({ testimonials }) {
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  // Ambil hanya 6 testimonials pertama dan bagi menjadi kiri-kanan
  const limitedTestimonials = testimonials.slice(0, 6)
  const leftItems = limitedTestimonials.filter((_, i) => i % 2 === 0) // 3 item untuk kiri (index 0,2,4)
  const rightItems = limitedTestimonials.filter((_, i) => i % 2 === 1) // 3 item untuk kanan (index 1,3,5)
  // Duplikasi sangat banyak untuk memastikan tidak ada gap sama sekali
  const leftItemsWithDuplication = [
    ...leftItems,
    ...leftItems,
    ...leftItems,
    ...leftItems,
    ...leftItems,
    ...leftItems,
    ...leftItems,
    ...leftItems,
  ]
  const rightItemsWithDuplication = [
    ...rightItems,
    ...rightItems,
    ...rightItems,
    ...rightItems,
    ...rightItems,
    ...rightItems,
    ...rightItems,
    ...rightItems,
  ]

  useEffect(() => {
    const left = leftRef.current
    const right = rightRef.current
    let leftPos = 0
    let rightPos = 0
    let leftHeight = 0
    let rightHeight = 0

    const leftSpeed = 0.16 // Kecepatan asli
    const rightSpeed = 0.1 // Kecepatan asli

    let leftFrame, rightFrame

    const updateHeights = () => {
      leftHeight = left?.scrollHeight / 8 || 0 // Dibagi 8 karena ada 8x duplikasi
      rightHeight = right?.scrollHeight / 8 || 0 // Dibagi 8 karena ada 8x duplikasi
    }

    const animateLeft = () => {
      if (left && leftHeight > 0) {
        leftPos -= leftSpeed
        if (Math.abs(leftPos) >= leftHeight) leftPos = 0
        left.style.transform = `translate3d(0, ${leftPos}px, 0)`
      }
      leftFrame = requestAnimationFrame(animateLeft)
    }

    const animateRight = () => {
      if (right && rightHeight > 0) {
        rightPos -= rightSpeed
        if (Math.abs(rightPos) >= rightHeight) rightPos = 0
        right.style.transform = `translate3d(0, ${rightPos}px, 0)`
      }
      rightFrame = requestAnimationFrame(animateRight)
    }

    updateHeights()
    animateLeft()
    animateRight()

    window.addEventListener('resize', updateHeights)

    return () => {
      cancelAnimationFrame(leftFrame)
      cancelAnimationFrame(rightFrame)
      window.removeEventListener('resize', updateHeights)
    }
  }, [testimonials.length])

  return (
    <>
      {/* Kolom kiri (atau satu-satunya di mobile) */}
      <div
        ref={leftRef}
        className="flex flex-col gap-4 sm:gap-6 will-change-transform pointer-events-none"
        style={{
          height: '100%',
          transform: 'translateY(-50px)', // Start dari atas sedikit untuk menutupi gap
        }}
      >
        {leftItemsWithDuplication.map((item, idx) => (
          <TestimonialCard key={idx} {...item} />
        ))}
      </div>

      {/* Kolom kanan (muncul hanya di lg ke atas) */}
      <div
        ref={rightRef}
        className="hidden lg:flex flex-col gap-4 sm:gap-6 will-change-transform pointer-events-none"
        style={{
          height: '100%',
          transform: 'translateY(-50px)', // Start dari atas sedikit untuk menutupi gap
        }}
      >
        {rightItemsWithDuplication.map((item, idx) => (
          <TestimonialCard key={idx} {...item} />
        ))}
      </div>
    </>
  )
}

function TestimonialCard({ text, name, role, avatar }) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 lg:p-7 flex flex-col justify-between min-h-[160px] sm:min-h-[180px] transition hover:shadow-2xl">
      <p className="text-gray-800 text-sm sm:text-base mb-4 sm:mb-6">{text}</p>
      <div className="flex items-center gap-3 mt-auto">
        <img
          src={avatar}
          alt={name}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-200"
        />
        <div>
          <div className="font-semibold text-gray-900 text-xs sm:text-sm">
            {name}
          </div>
          <div className="text-gray-400 text-xs">{role}</div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
