import React from 'react'
import {
  FiBell,
  FiChevronDown,
  FiBook,
  FiClipboard,
  FiPieChart,
  FiUser,
  FiSettings,
  FiUsers,
  FiMessageCircle,
  FiFolder,
  FiBarChart2,
  FiHelpCircle,
  FiLayers,
  FiGlobe,
  FiList,
  FiGrid,
  FiSearch,
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function Dashboard({ hideNavbarFooter }) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (hideNavbarFooter) {
      const navbar = document.querySelector(
        'nav,header,.navbar,#navbar,[role="navigation"]',
      )
      const footer = document.querySelector('footer,.footer,#footer')
      if (navbar) navbar.style.display = 'none'
      if (footer) footer.style.display = 'none'
      return () => {
        if (navbar) navbar.style.display = ''
        if (footer) footer.style.display = ''
      }
    }
  }, [hideNavbarFooter])

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
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#b8004c] to-[#e4006d] text-white flex flex-col py-6 px-4 min-h-screen shadow-lg">
        <div className="font-bold text-2xl mb-8">LMS Platform</div>
        <nav className="flex-1 space-y-2 text-base">
          <a
            href="#"
            className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2 font-semibold"
          >
            <FiGrid className="w-5 h-5" /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-4 py-2"
          >
            <FiBook className="w-5 h-5" /> Courses
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-4 py-2"
          >
            <FiList className="w-5 h-5" /> Categories
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-4 py-2"
          >
            <FiLayers className="w-5 h-5" /> Subcategories
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-4 py-2"
          >
            <FiGlobe className="w-5 h-5" /> Languages
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-4 py-2"
          >
            <FiUsers className="w-5 h-5" /> Manage Users
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-4 py-2"
          >
            <FiMessageCircle className="w-5 h-5" /> Discussions
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-4 py-2"
          >
            <FiFolder className="w-5 h-5" /> Resources
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-4 py-2"
          >
            <FiBarChart2 className="w-5 h-5" /> Analytics
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-4 py-2"
          >
            <FiHelpCircle className="w-5 h-5" /> Help Center
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-4 py-2"
          >
            <FiUser className="w-5 h-5" /> Profile
          </a>
          <a
            href="#"
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-4 py-2"
          >
            <FiSettings className="w-5 h-5" /> Settings
          </a>
        </nav>
      </aside>
      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-10 py-6 bg-white border-b border-gray-100">
          <div className="flex items-center gap-4 w-1/2">
            <div className="relative w-full">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiSearch className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Search courses, users..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-full hover:bg-pink-100">
              <FiBell className="w-6 h-6 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>
            <div
              className="relative flex items-center gap-3 cursor-pointer group"
              ref={dropdownRef}
            >
              <span className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full border-2 border-pink-200 shadow-sm flex items-center justify-center bg-[#f3e8ff] text-purple-600 font-semibold text-lg">
                  RS
                </span>
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-gray-900 leading-tight">
                    Ryo Santoso
                  </span>
                  <span className="text-xs text-gray-500">
                    ryo.santoso@email.com
                  </span>
                </div>
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
        {/* Main Content */}
        <main className="flex-1 px-10 py-8 bg-gradient-to-br from-white via-pink-50 to-white">
          <div className="text-3xl font-bold mb-8">Welcome, Ryo Santoso!</div>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white rounded-2xl shadow-md p-7 flex flex-col gap-3">
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-pink-100 text-pink-600 rounded-xl p-3">
                  <FiBook className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    My Courses
                  </div>
                  <div className="text-3xl font-bold">3</div>
                </div>
              </div>
              <a href="#" className="text-sm text-pink-600 font-semibold">
                View all
              </a>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-7 flex flex-col gap-3">
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-pink-100 text-pink-600 rounded-xl p-3">
                  <FiClipboard className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    Assignments
                  </div>
                  <div className="text-3xl font-bold">2</div>
                </div>
              </div>
              <a href="#" className="text-sm text-pink-600 font-semibold">
                View all
              </a>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-7 flex flex-col gap-3">
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-purple-100 text-purple-600 rounded-xl p-3">
                  <FiPieChart className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">
                    Overall Progress
                  </div>
                  <div className="text-3xl font-bold">75%</div>
                </div>
              </div>
              <a href="#" className="text-sm text-pink-600 font-semibold">
                View details
              </a>
            </div>
          </div>
          {/* Recent Activity */}
          <div>
            <div className="font-semibold text-lg mb-4">Recent Activity</div>
            <div className="bg-white rounded-2xl shadow-md p-6 w-full">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4 border-b pb-4">
                  <div className="bg-pink-100 text-pink-600 rounded-full p-3">
                    <FiClipboard className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-pink-600 font-semibold">
                      New assignment added
                    </div>
                    <div className="text-sm text-gray-500">
                      Complete the React Hooks tutorial
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">2h ago</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 text-pink-600 rounded-full p-3">
                    <FiBook className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-pink-600 font-semibold">
                      Assignment submitted
                    </div>
                    <div className="text-sm text-gray-500">
                      JavaScript Fundamentals
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">1d ago</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
