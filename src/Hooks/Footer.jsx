import React from 'react'
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
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
            <a href="#" className="hover:text-white" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white" aria-label="Github">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-white" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-white" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
        {/* Jelajahi */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-white font-semibold mb-3">JELAJAHI</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-400">
                Semua Kursus
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Testimoni
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
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
              <a href="#" className="hover:text-blue-400">
                Web Development
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Data Science
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                UI/UX Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
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
              <a href="#" className="hover:text-blue-400">
                Hubungi Kami
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Pusat Bantuan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Syarat & Ketentuan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">
                Kebijakan Privasi
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 text-center text-gray-500 text-sm">
        &copy; 2025 Jagoan Academy. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer