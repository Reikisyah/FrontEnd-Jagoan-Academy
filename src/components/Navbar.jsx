import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const dropdownRef = useRef(null)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  // Dummy course data for search suggestions
  const dummyCourses = [
    'Membangun Aplikasi Absensi dengan Framework Laravel 12',
    'Belajar React.js dari Dasar hingga Mahir',
    'Kursus JavaScript Modern untuk Pemula',
    'Pengembangan Web dengan HTML, CSS, dan JavaScript',
    'Database Design dan SQL untuk Developer',
    'Mobile App Development dengan Flutter',
    'Machine Learning untuk Pemula',
    'UI/UX Design Fundamentals',
    'DevOps dan Deployment',
    'Cybersecurity Basics',
  ]

  useEffect(() => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false)
      }
    }
    if (dropdownOpen || showSearchSuggestions) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen, showSearchSuggestions])

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.length > 0) {
      // Filter suggestions based on search term
      const filtered = dummyCourses
        .filter((course) => course.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5)
      setSearchSuggestions(filtered)
      setShowSearchSuggestions(true)
    } else {
      setSearchSuggestions([])
      setShowSearchSuggestions(false)
    }
  }

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(
        `/student/courses?search=${encodeURIComponent(searchTerm.trim())}`,
      )
      setSearchTerm('')
      setShowSearchSuggestions(false)
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion)
    navigate(`/student/courses?search=${encodeURIComponent(suggestion)}`)
    setShowSearchSuggestions(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    setDropdownOpen(false)
    setIsLoggedIn(false)
    navigate('/login')
  }

  const userName = localStorage.getItem('name') || 'User'
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <nav className="bg-white shadow-md shadow-pink-100 px-4 sm:px-6 lg:px-8 py-4 w-full sticky top-0 z-50">
      <div className="flex items-center justify-between gap-2">
        {/* Logo & Search Bar */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link
            to="/"
            className="font-extrabold text-xl sm:text-2xl select-none focus:outline-none"
          >
            <span className="text-pink-600">Jagoan</span>
            <span className="text-gray-900"> Academy</span>
          </Link>
          {/* Search Bar - Selalu di kanan logo */}
          <div
            className="relative w-[180px] sm:w-[220px] md:w-[260px]"
            ref={searchRef}
          >
            <form onSubmit={handleSearchSubmit}>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiSearch size={20} />
              </span>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() =>
                  searchTerm.length > 0 && setShowSearchSuggestions(true)
                }
                className="w-full pl-8 pr-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 bg-white placeholder-gray-400 text-sm transition"
              />
            </form>

            {/* Search Suggestions */}
            {showSearchSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                  >
                    <FiSearch className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{suggestion}</span>
                  </button>
                ))}
                <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 border-t border-gray-100">
                  Press Enter to search for "{searchTerm}"
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-7 items-center text-gray-800 font-medium">
          <li>
            <a
              href="#home"
              className="hover:text-pink-600 transition relative group"
            >
              <span className="pb-1">Home</span>
              <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a
              href="#courses"
              className="hover:text-pink-600 transition relative group"
            >
              <span className="pb-1">Courses</span>
              <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-pink-600 transition relative group"
            >
              <span className="pb-1">About</span>
              <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="hover:text-pink-600 transition relative group"
            >
              <span className="pb-1">FAQ</span>
              <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <li className="relative" ref={dropdownRef}>
              <button
                aria-label="Profile menu"
                className="flex items-center gap-2 p-0 bg-transparent border-none shadow-none focus:outline-none"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <span className="w-8 h-8 rounded-full bg-[#dc2a9b] flex items-center justify-center text-white font-semibold text-base">
                  {userInitials}
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-fade-in">
                  <button
                    className="w-full text-left px-5 py-3 text-gray-700 hover:bg-pink-50 rounded-t-xl"
                    onClick={() => {
                      setDropdownOpen(false)
                      navigate('/dashboard')
                    }}
                  >
                    Dashboard
                  </button>
                  <button
                    className="w-full text-left px-5 py-3 text-gray-700 hover:bg-pink-50 rounded-b-xl"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
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
          <div className="md:hidden relative w-full mt-4 mb-4" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiSearch size={20} />
              </span>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() =>
                  searchTerm.length > 0 && setShowSearchSuggestions(true)
                }
                className="w-full pl-8 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 bg-white placeholder-gray-400"
              />
            </form>

            {/* Mobile Search Suggestions */}
            {showSearchSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                  >
                    <FiSearch className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{suggestion}</span>
                  </button>
                ))}
                <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 border-t border-gray-100">
                  Press Enter to search for "{searchTerm}"
                </div>
              </div>
            )}
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
            {!isLoggedIn ? (
              <>
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
              </>
            ) : (
              <li className="relative" ref={dropdownRef}>
                <button
                  aria-label="Profile menu"
                  className="flex items-center gap-2 p-0 bg-transparent border-none shadow-none focus:outline-none w-full justify-center"
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <span className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center text-white font-semibold text-base">
                    {userInitials}
                  </span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-fade-in">
                    <button
                      className="w-full text-left px-5 py-3 text-gray-700 hover:bg-pink-50 rounded-t-xl"
                      onClick={() => {
                        setDropdownOpen(false)
                        navigate('/dashboard')
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      className="w-full text-left px-5 py-3 text-gray-700 hover:bg-pink-50 rounded-b-xl"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
