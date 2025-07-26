import React, { useState, useRef, useEffect } from 'react'
import { IoChevronDown } from 'react-icons/io5'

const ShareIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M18 8a3 3 0 0 0-2.24 1.01l-5.13-2.56A3.01 3.01 0 0 0 6 6a3 3 0 0 0 0 6c.47 0 .92-.11 1.32-.3l5.13 2.56a3.01 3.01 0 0 0 0 1.48l-5.13 2.56A3 3 0 1 0 6 18a3 3 0 0 0 2.63-1.51l5.13-2.56A3 3 0 1 0 18 8Zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM6 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
    />
  </svg>
)

const DotsIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="19" cy="12" r="2" fill="currentColor" />
  </svg>
)

// Tambah prop progress (0-1)
const NavbarCourse = ({ title = 'Judul Course', progress = 0 }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showProgressDropdown, setShowProgressDropdown] = useState(false)
  const menuRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setShowMenu(false)
      if (progressRef.current && !progressRef.current.contains(e.target))
        setShowProgressDropdown(false)
    }
    if (showMenu || showProgressDropdown)
      document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showMenu, showProgressDropdown])

  // Progress bar
  const radius = 14
  const circumference = 2 * Math.PI * radius
  const progressValue = Math.max(0, Math.min(progress, 1))
  const offset = circumference * (1 - progressValue)
  const percent = Math.round(progressValue * 100)

  return (
    <nav className="w-full bg-[#1c1d1f] text-white flex items-center px-6 py-2 shadow z-30 relative">
      {/* Logo dan judul */}
      <div className="flex items-center gap-6 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-xl tracking-tight text-pink-600">
            Jagoan
          </span>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Academy
          </span>
        </div>
        <span className="ml-6 font-bold text-base truncate whitespace-nowrap max-w-[400px]">
          {title}
        </span>
      </div>
      {/* Kanan: tombol dummy */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1 text-gray-300 hover:text-yellow-400 text-sm font-semibold px-2 py-1 rounded transition">
          <span className="text-lg">★</span> Leave a rating
        </button>
        <div className="flex items-center gap-2 text-gray-300 text-sm font-semibold">
          <div className="relative" ref={progressRef}>
            <button
              onClick={() => setShowProgressDropdown(!showProgressDropdown)}
              className="flex items-center gap-2 hover:text-white transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center relative">
                <svg
                  width="36"
                  height="36"
                  className="absolute top-0 left-0"
                  style={{ opacity: 0.15 }}
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    stroke="#fff"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
                <svg width="36" height="36" className="absolute top-0 left-0">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    stroke="#ec4899"
                    strokeWidth="3.5"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                      transition: 'stroke-dashoffset 0.5s',
                      strokeLinecap: 'round',
                    }}
                  />
                </svg>
                <span
                  className="absolute top-1/2 left-1/2 text-xs font-bold text-pink-600"
                  style={{ transform: 'translate(-50%,-50%)' }}
                >
                  {percent}%
                </span>
              </div>
              <span>Your progress</span>
              <IoChevronDown
                size={14}
                className={`ml-1 transition-transform duration-200 ${showProgressDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Progress Dropdown */}
            <div
              className={`absolute right-0 mt-2 w-64 bg-white text-gray-900 rounded-lg shadow-lg border py-3 z-50 transition-all duration-200 ease-in-out ${
                showProgressDropdown
                  ? 'opacity-100 transform translate-y-0 scale-100'
                  : 'opacity-0 transform -translate-y-2 scale-95 pointer-events-none'
              }`}
            >
              <div className="px-4 py-2 border-b border-gray-200">
                <div className="font-semibold text-sm">Course Progress</div>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Overall Progress
                  </span>
                  <span className="text-sm font-semibold">{percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round(progress * 30)} of 30 lectures completed
                </div>
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <button className="w-full text-left text-sm text-pink-600 hover:text-pink-700 font-semibold">
                  View course content
                </button>
              </div>
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1 border border-white/40 rounded px-3 py-1 text-sm font-semibold hover:bg-white/10 transition">
          <ShareIcon /> <span>Share</span>
        </button>
        <div className="relative" ref={menuRef}>
          <button
            className="w-9 h-9 flex items-center justify-center rounded border border-white/40 hover:bg-white/10 transition"
            onClick={() => setShowMenu((v) => !v)}
          >
            <DotsIcon />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-900 rounded-xl shadow-lg border py-2 z-50">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                <span>★</span> Favorite this course
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                <span>📁</span> Archive this course
              </button>
              <div className="border-t my-1" />
              <label className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <input type="checkbox" className="accent-pink-600" /> New
                announcement emails
              </label>
              <label className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <input type="checkbox" className="accent-pink-600" />{' '}
                Promotional emails
              </label>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavbarCourse
