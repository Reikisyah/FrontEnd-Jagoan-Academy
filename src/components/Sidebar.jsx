import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FiGrid,
  FiBook,
  FiList,
  FiLayers,
  FiGlobe,
  FiUsers,
  FiMessageCircle,
  FiFolder,
  FiBarChart2,
  FiHelpCircle,
  FiUser,
  FiSettings,
} from 'react-icons/fi'

const Sidebar = () => {
  const location = useLocation()
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/')
  const activeClass =
    'bg-white text-pink-600 font-bold border-l-4 border-pink-500 shadow'
  const baseClass = 'flex items-center gap-3 rounded-lg px-4 py-2 transition'

  return (
    <aside className="w-64 bg-gradient-to-b from-[#b8004c] to-[#e4006d] text-white flex flex-col py-6 px-4 min-h-screen shadow-lg">
      <div className="font-bold text-2xl mb-8">LMS Platform</div>
      <nav className="flex-1 space-y-2 text-base">
        <Link
          to="/dashboard"
          className={`${baseClass} ${isActive('/dashboard') ? activeClass : 'hover:bg-white/10'}`}
        >
          <FiGrid className="w-5 h-5" /> Dashboard
        </Link>
        <Link
          to="/courses-dashboard"
          className={`${baseClass} ${isActive('/courses-dashboard') ? activeClass : 'hover:bg-white/10'}`}
        >
          <FiBook className="w-5 h-5" /> Courses
        </Link>
        <Link
          to="/categories"
          className={`${baseClass} ${isActive('/categories') ? activeClass : 'hover:bg-white/10'}`}
        >
          <FiList className="w-5 h-5" /> Categories
        </Link>
        <Link
          to="/subcategories"
          className={`${baseClass} ${isActive('/subcategories') ? activeClass : 'hover:bg-white/10'}`}
        >
          <FiLayers className="w-5 h-5" /> Subcategories
        </Link>
        <Link
          to="/languages"
          className={`${baseClass} ${isActive('/languages') ? activeClass : 'hover:bg-white/10'}`}
        >
          <FiGlobe className="w-5 h-5" /> Languages
        </Link>
        <Link
          to="/manage-users"
          className={`${baseClass} ${isActive('/manage-users') ? activeClass : 'hover:bg-white/10'}`}
        >
          <FiUsers className="w-5 h-5" /> Manage Users
        </Link>
        <Link
          to="/discussions"
          className={`${baseClass} ${isActive('/discussions') ? activeClass : 'hover:bg-white/10'}`}
        >
          <FiMessageCircle className="w-5 h-5" /> Discussions
        </Link>
        <Link
          to="/resources"
          className={`${baseClass} ${isActive('/resources') ? activeClass : 'hover:bg-white/10'}`}
        >
          <FiFolder className="w-5 h-5" /> Resources
        </Link>
        <Link
          to="/analytics"
          className={`${baseClass} ${isActive('/analytics') ? activeClass : 'hover:bg-white/10'}`}
        >
          <FiBarChart2 className="w-5 h-5" /> Analytics
        </Link>
        <Link
          to="/help-center"
          className={`${baseClass} ${isActive('/help-center') ? activeClass : 'hover:bg-white/10'}`}
        >
          <FiHelpCircle className="w-5 h-5" /> Help Center
        </Link>
        <Link
          to="/profile"
          className={`${baseClass} ${isActive('/profile') ? activeClass : 'hover:bg-white/10'}`}
        >
          <FiUser className="w-5 h-5" /> Profile
        </Link>
        <Link
          to="/settings"
          className={`${baseClass} ${isActive('/settings') ? activeClass : 'hover:bg-white/10'}`}
        >
          <FiSettings className="w-5 h-5" /> Settings
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
