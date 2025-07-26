import React, { useState, useEffect } from 'react'
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true)
      } else {
        setShowScroll(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isStartCoursePage =
    typeof window !== 'undefined' &&
    window.location.pathname.includes('/student/course')

  return (
    <footer className="bg-[#101828] text-gray-300 pt-8 sm:pt-10 lg:pt-12 pb-6 px-4 sm:px-6 lg:px-8 xl:px-16 mt-8 sm:mt-12 lg:mt-16 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 border-b border-gray-700 pb-6 sm:pb-8">
          {/* Brand & Desc */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-white font-extrabold text-xl sm:text-2xl mb-2">
              Jagoan Academy
            </h2>
            <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
              Tingkatkan skill Anda ke level berikutnya.
            </p>
            <div className="flex gap-3 sm:gap-4 text-lg sm:text-xl mt-2">
              <a
                href="#"
                className="hover:text-pink-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="hover:text-pink-400 transition-colors duration-200"
                aria-label="Github"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className="hover:text-pink-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="hover:text-pink-400 transition-colors duration-200"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
          {/* Jelajahi */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base uppercase tracking-wide">
              JELAJAHI
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors duration-200 block py-1"
                >
                  Semua Kursus
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors duration-200 block py-1"
                >
                  Testimoni
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors duration-200 block py-1"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          {/* Kategori */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base uppercase tracking-wide">
              KATEGORI
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors duration-200 block py-1"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors duration-200 block py-1"
                >
                  Data Science
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors duration-200 block py-1"
                >
                  UI/UX Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors duration-200 block py-1"
                >
                  Marketing
                </a>
              </li>
            </ul>
          </div>
          {/* Dukungan */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base uppercase tracking-wide">
              DUKUNGAN
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors duration-200 block py-1"
                >
                  Hubungi Kami
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors duration-200 block py-1"
                >
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors duration-200 block py-1"
                >
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-pink-400 transition-colors duration-200 block py-1"
                >
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-500 text-xs sm:text-sm">
          &copy; 2025 Jagoan Academy. All rights reserved.
        </div>
      </div>
      {/* Scroll Up Button */}
      {!isStartCoursePage && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 transition-all duration-500 focus:outline-none hover:scale-110
            ${showScroll ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
          aria-label="Scroll to top"
        >
          <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-4 border-pink-500 shadow-lg hover:shadow-xl transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="#f472b6"
              className="w-6 h-6 sm:w-7 sm:h-7"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="#f472b6"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V8M12 8l-4 4M12 8l4 4"
              />
            </svg>
          </span>
        </button>
      )}
    </footer>
  )
}

export default Footer
