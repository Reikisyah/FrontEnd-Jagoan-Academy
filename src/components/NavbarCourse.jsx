import React, { useState, useRef, useEffect } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import {
  FiShare2,
  FiMoreVertical,
  FiStar,
  FiArchive,
  FiBell,
  FiMail,
} from 'react-icons/fi'

const NavbarCourse = ({ title = 'Judul Course', progress = 0 }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showProgressDropdown, setShowProgressDropdown] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isArchived, setIsArchived] = useState(false)
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

  // Progress bar dengan animasi yang lebih smooth
  const radius = 16
  const circumference = 2 * Math.PI * radius
  const progressValue = Math.max(0, Math.min(progress, 1))
  const offset = circumference * (1 - progressValue)
  const percent = Math.round(progressValue * 100)

  return (
    <nav className="w-full bg-gradient-to-r from-[#1c1d1f] to-[#2d2f31] text-white flex items-center px-6 py-3 shadow-lg z-30 relative border-b border-gray-700">
      {/* Logo dan judul dengan animasi */}
      <div className="flex items-center gap-6 flex-1 min-w-0">
        <div className="flex items-center gap-2 group cursor-pointer transition-transform duration-200 hover:scale-105">
          <span className="font-extrabold text-xl tracking-tight text-pink-500 group-hover:text-pink-400 transition-colors">
            Jagoan
          </span>
          <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-gray-200 transition-colors">
            Academy
          </span>
        </div>
        <div className="ml-6 flex items-center gap-3">
          <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
          <span className="font-bold text-base truncate whitespace-nowrap max-w-[400px] text-gray-100">
            {title}
          </span>
        </div>
      </div>

      {/* Kanan: tombol dengan hover effects yang lebih baik */}
      <div className="flex items-center gap-3">
        {/* Rating button dengan animasi */}
        <button className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 text-sm font-semibold px-3 py-2 rounded-lg transition-all duration-200 hover:bg-yellow-400/10 hover:scale-105 group">
          <span className="text-lg group-hover:rotate-12 transition-transform duration-200">
            ★
          </span>
          <span>Leave a rating</span>
        </button>

        {/* Progress indicator dengan animasi yang lebih smooth */}
        <div className="flex items-center gap-3 text-gray-300 text-sm font-semibold">
          <div className="relative" ref={progressRef}>
            <button
              onClick={() => setShowProgressDropdown(!showProgressDropdown)}
              className="flex items-center gap-3 hover:text-white transition-all duration-200 hover:scale-105 group"
            >
              <div className="w-12 h-12 rounded-full border-2 border-gray-600 flex items-center justify-center relative group-hover:border-pink-500 transition-colors duration-200">
                <svg
                  width="44"
                  height="44"
                  className="absolute top-0 left-0 transform -rotate-90"
                  style={{ opacity: 0.2 }}
                >
                  <circle
                    cx="22"
                    cy="22"
                    r="16"
                    stroke="#fff"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <svg
                  width="44"
                  height="44"
                  className="absolute top-0 left-0 transform -rotate-90"
                >
                  <circle
                    cx="22"
                    cy="22"
                    r="16"
                    stroke="#ec4899"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                      transition:
                        'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      strokeLinecap: 'round',
                    }}
                  />
                </svg>
                <span
                  className="absolute top-1/2 left-1/2 text-xs font-bold text-pink-500"
                  style={{ transform: 'translate(-50%,-50%)' }}
                >
                  {percent}%
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Your progress</span>
                <span className="text-sm font-semibold">
                  {percent}% Complete
                </span>
              </div>
              <IoChevronDown
                size={16}
                className={`ml-1 transition-all duration-200 ${showProgressDropdown ? 'rotate-180 text-pink-500' : 'text-gray-400'}`}
              />
            </button>

            {/* Progress Dropdown dengan animasi yang lebih smooth */}
            <div
              className={`absolute right-0 mt-3 w-72 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 py-4 z-50 transition-all duration-300 ease-out ${
                showProgressDropdown
                  ? 'opacity-100 transform translate-y-0 scale-100'
                  : 'opacity-0 transform -translate-y-4 scale-95 pointer-events-none'
              }`}
            >
              <div className="px-5 py-3 border-b border-gray-100">
                <div className="font-bold text-sm text-gray-900">
                  Course Progress
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Track your learning journey
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600 font-medium">
                    Overall Progress
                  </span>
                  <span className="text-sm font-bold text-pink-600">
                    {percent}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-pink-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    {Math.round(progress * 30)} of 30 lectures completed
                  </span>
                  <span className="font-medium">
                    {30 - Math.round(progress * 30)} remaining
                  </span>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-gray-100">
                <button className="w-full text-left text-sm text-pink-600 hover:text-pink-700 font-semibold transition-colors duration-200 flex items-center gap-2">
                  <span>View course content</span>
                  <IoChevronDown size={12} className="rotate-[-90deg]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Share button dengan icon yang lebih modern */}
        <button className="flex items-center gap-2 border border-gray-600 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 hover:scale-105 group">
          <FiShare2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
          <span>Share</span>
        </button>

        {/* Menu dropdown dengan animasi yang lebih baik */}
        <div className="relative" ref={menuRef}>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 hover:scale-105 group"
            onClick={() => setShowMenu((v) => !v)}
          >
            <FiMoreVertical className="w-5 h-5 group-hover:text-pink-400 transition-colors duration-200" />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-3 w-64 bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-200 group"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <FiStar
                  className={`w-4 h-4 ${isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'} group-hover:text-yellow-500 transition-colors duration-200`}
                />
                <span
                  className={isFavorite ? 'text-yellow-600 font-medium' : ''}
                >
                  {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </span>
              </button>
              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-200 group"
                onClick={() => setIsArchived(!isArchived)}
              >
                <FiArchive
                  className={`w-4 h-4 ${isArchived ? 'text-blue-500' : 'text-gray-400'} group-hover:text-blue-500 transition-colors duration-200`}
                />
                <span className={isArchived ? 'text-blue-600 font-medium' : ''}>
                  {isArchived ? 'Remove from archive' : 'Archive this course'}
                </span>
              </button>
              <div className="border-t border-gray-100 my-2" />
              <div className="px-4 py-2">
                <div className="text-xs text-gray-500 font-medium mb-2">
                  Notifications
                </div>
                <label className="flex items-center gap-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-200 group">
                  <FiBell className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors duration-200" />
                  <input
                    type="checkbox"
                    className="accent-pink-600 rounded"
                    defaultChecked
                  />
                  <span className="text-sm">New announcement emails</span>
                </label>
                <label className="flex items-center gap-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-200 group">
                  <FiMail className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors duration-200" />
                  <input type="checkbox" className="accent-pink-600 rounded" />
                  <span className="text-sm">Promotional emails</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavbarCourse
