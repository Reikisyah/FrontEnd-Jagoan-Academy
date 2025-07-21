import React, { useState, useEffect } from 'react'
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101828] text-gray-300 pt-12 pb-6 px-4 md:px-16 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10 border-b border-gray-700 pb-8">
        {/* Brand & Desc */}
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-white font-extrabold text-2xl mb-2">
            Jagoan Academy
          </h2>
          <p className="text-gray-400 mb-4">
            Tingkatkan skill Anda ke level berikutnya.
          </p>
          <div className="flex gap-4 text-xl mt-2">
            <a href="#" className="hover:text-pink-400" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-400" aria-label="Github">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-pink-400" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-pink-400" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
        {/* Jelajahi */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-white font-semibold mb-3">JELAJAHI</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-pink-400">
                Semua Kursus
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                Testimoni
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        {/* Kategori */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-white font-semibold mb-3">KATEGORI</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-pink-400">
                Web Development
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                Data Science
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                UI/UX Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                Marketing
              </a>
            </li>
          </ul>
        </div>
        {/* Dukungan */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-white font-semibold mb-3">DUKUNGAN</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-pink-400">
                Hubungi Kami
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                Pusat Bantuan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                Syarat & Ketentuan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400">
                Kebijakan Privasi
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 text-center text-gray-500 text-sm">
        &copy; 2025 Jagoan Academy. All rights reserved.
      </div>
      {/* Scroll Up Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 focus:outline-none
          ${showScroll ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <span className="flex items-center justify-center w-14 h-14 rounded-full bg-white border-4 border-pink-500 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#f472b6" className="w-7 h-7">
            <circle cx="12" cy="12" r="9" stroke="#f472b6" strokeWidth="2.5" fill="none" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V8M12 8l-4 4M12 8l4 4" />
          </svg>
        </span>
      </button>
    </footer>
  )
}

export default Footer