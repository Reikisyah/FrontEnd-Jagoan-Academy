import React from 'react'
import { FiSearch, FiChevronDown, FiBell } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const DashboardHeader = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef(null)
  const navigate = useNavigate()

  // Ambil nama dan email dari localStorage (atau fallback)
  const userName = localStorage.getItem('name') || 'User'
  const userEmail = localStorage.getItem('email') || 'user@email.com'
  // Inisial untuk avatar
  const userInitials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      {/* Hapus Search Bar */}
      {/* <div className="flex items-center w-1/3 min-w-[250px]">
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FiSearch className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search courses, users..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200 text-sm"
          />
        </div>
      </div> */}
      <div />
      {/* Right Side: Notification & User */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <div className="relative">
          <FiBell className="w-6 h-6 text-gray-400" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></span>
        </div>
        {/* User Dropdown */}
        <div
          className="relative flex items-center gap-3 cursor-pointer group"
          ref={dropdownRef}
        >
          <span className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full border-2 border-pink-200 shadow-sm flex items-center justify-center bg-[#f3e8ff] text-purple-600 font-semibold text-base">
              {userInitials}
            </span>
            <span className="font-semibold text-gray-900 text-sm">
              {userName}
            </span>
            <FiChevronDown
              className={`w-5 h-5 text-gray-400 group-hover:text-pink-600 transition ${dropdownOpen ? 'rotate-180' : ''}`}
              onClick={() => setDropdownOpen((open) => !open)}
              style={{ cursor: 'pointer' }}
            />
          </span>
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-12 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-50 animate-fade-in">
              <button
                className="w-full text-left px-5 py-3 text-gray-700 hover:bg-pink-50 rounded-t-xl"
                onClick={() => {
                  setDropdownOpen(false)
                  navigate('/')
                }}
              >
                Home
              </button>
              <button
                className="w-full text-left px-5 py-3 text-gray-700 hover:bg-pink-50 rounded-b-xl"
                onClick={() => {
                  setDropdownOpen(false)
                  navigate('/login')
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
