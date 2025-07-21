import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-lg px-4 sm:px-6 lg:px-8 py-4 w-full sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="font-extrabold text-xl sm:text-2xl select-none">
            <span className="text-pink-600">Jagoan</span>
            <span className="text-gray-900"> Academy</span>
          </span>

          {/* Search Bar - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:block relative w-full max-w-[200px] ml-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiSearch size={20} />
            </span>
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-8 pr-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 bg-white placeholder-gray-400 text-sm"
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-4 items-center text-gray-800 font-medium">
          <li>
            <a href="#home" className="hover:text-pink-600 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#courses" className="hover:text-pink-600 transition">
              Courses
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-pink-600 transition">
              About
            </a>
          </li>
          <li>
            <a href="#faq" className="hover:text-pink-600 transition">
              FAQ
            </a>
          </li>
          <li>
            <Link
              to="/login"
              className="border-2 border-pink-600 rounded-lg px-3 sm:px-5 py-2 font-semibold text-pink-600 hover:bg-pink-50 transition text-sm sm:text-base"
            >
              Log in
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="px-5 py-2 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition"
            >
              Sign up
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-pink-600 hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
          {/* Mobile Search Bar */}
          <div className="md:hidden relative w-full mt-4 mb-4">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiSearch size={20} />
            </span>
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-8 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 bg-white placeholder-gray-400"
            />
          </div>

          {/* Mobile Menu Items */}
          <ul className="flex flex-col gap-3 text-gray-800 font-medium">
            <li>
              <a
                href="#home"
                className="block py-2 hover:text-pink-600 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#courses"
                className="block py-2 hover:text-pink-600 transition"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block py-2 hover:text-pink-600 transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="block py-2 hover:text-pink-600 transition"
              >
                FAQ
              </a>
            </li>
            <li className="pt-2">
              <Link
                to="/login"
                className="block text-center border-2 border-pink-600 rounded-lg px-4 py-2 font-semibold text-pink-600 hover:bg-pink-50 transition"
              >
                Log in
              </Link>
            </li>
            <li className="pt-2">
              <Link
                to="/register"
                className="block text-center px-4 py-2 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
