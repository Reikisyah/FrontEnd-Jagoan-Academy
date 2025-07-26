import React, { useState } from 'react'
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
  const [hoveredItem, setHoveredItem] = useState(null)

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  const activeClass =
    'bg-white text-pink-600 font-semibold border-l-4 border-pink-500 shadow-md'
  const baseClass =
    'flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 group'

  // Ambil role dari localStorage/sessionStorage
  const role =
    localStorage.getItem('role') || sessionStorage.getItem('role') || ''
  const isMentor = role === 'mentor'
  const isParticipant = role === 'participant'

  return (
    <aside className="w-64 bg-gradient-to-b from-[#b8004c] via-[#d4005a] to-[#e4006d] text-white flex flex-col min-h-screen shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header - hanya teks */}
        <div className="p-6 border-b border-white/10">
          <div className="font-bold text-2xl tracking-tight">
            <span className="text-white">Jagoan</span>
            <span className="text-pink-200"> Academy</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to="/dashboard"
            className={`${baseClass} ${isActive('/dashboard') ? activeClass : 'hover:bg-white/10 hover:scale-105'}`}
            onMouseEnter={() => setHoveredItem('dashboard')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              className={`w-5 h-5 transition-all duration-200 ${isActive('/dashboard') ? 'text-pink-600' : 'text-white'} ${hoveredItem === 'dashboard' ? 'scale-110' : ''}`}
            >
              <FiGrid />
            </div>
            <span className="font-medium">Dashboard</span>
            {isActive('/dashboard') && (
              <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            )}
          </Link>

          <Link
            to={isParticipant ? '/student/courses' : '/courses-dashboard'}
            className={`${baseClass} ${isActive(isParticipant ? '/student/courses' : '/courses-dashboard') ? activeClass : 'hover:bg-white/10 hover:scale-105'}`}
            onMouseEnter={() => setHoveredItem('courses')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              className={`w-5 h-5 transition-all duration-200 ${isActive(isParticipant ? '/student/courses' : '/courses-dashboard') ? 'text-pink-600' : 'text-white'} ${hoveredItem === 'courses' ? 'scale-110' : ''}`}
            >
              <FiBook />
            </div>
            <span className="font-medium">Courses</span>
            {isActive(
              isParticipant ? '/student/courses' : '/courses-dashboard',
            ) && (
              <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            )}
          </Link>

          {/* Categories & Subcategories (admin only) */}
          {!isMentor && !isParticipant && (
            <>
              <Link
                to="/categories"
                className={`${baseClass} ${isActive('/categories') ? activeClass : 'hover:bg-white/10 hover:scale-105'}`}
                onMouseEnter={() => setHoveredItem('categories')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  className={`w-5 h-5 transition-all duration-200 ${isActive('/categories') ? 'text-pink-600' : 'text-white'} ${hoveredItem === 'categories' ? 'scale-110' : ''}`}
                >
                  <FiList />
                </div>
                <span className="font-medium">Categories</span>
                {isActive('/categories') && (
                  <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                )}
              </Link>
              <Link
                to="/subcategories"
                className={`${baseClass} ${isActive('/subcategories') ? activeClass : 'hover:bg-white/10 hover:scale-105'}`}
                onMouseEnter={() => setHoveredItem('subcategories')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  className={`w-5 h-5 transition-all duration-200 ${isActive('/subcategories') ? 'text-pink-600' : 'text-white'} ${hoveredItem === 'subcategories' ? 'scale-110' : ''}`}
                >
                  <FiLayers />
                </div>
                <span className="font-medium">Subcategories</span>
                {isActive('/subcategories') && (
                  <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                )}
              </Link>
            </>
          )}

          {/* Languages selalu tampil */}
          <Link
            to="/languages"
            className={`${baseClass} ${isActive('/languages') ? activeClass : 'hover:bg-white/10 hover:scale-105'}`}
            onMouseEnter={() => setHoveredItem('languages')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              className={`w-5 h-5 transition-all duration-200 ${isActive('/languages') ? 'text-pink-600' : 'text-white'} ${hoveredItem === 'languages' ? 'scale-110' : ''}`}
            >
              <FiGlobe />
            </div>
            <span className="font-medium">Languages</span>
            {isActive('/languages') && (
              <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            )}
          </Link>

          {/* Only show the rest if not participant */}
          {!isParticipant && (
            <>
              {/* Hide these for mentor */}
              {!isMentor && (
                <>
                  <Link
                    to="/user-management"
                    className={`${baseClass} ${isActive('/user-management') ? activeClass : 'hover:bg-white/10 hover:scale-105'}`}
                    onMouseEnter={() => setHoveredItem('users')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div
                      className={`w-5 h-5 transition-all duration-200 ${isActive('/user-management') ? 'text-pink-600' : 'text-white'} ${hoveredItem === 'users' ? 'scale-110' : ''}`}
                    >
                      <FiUsers />
                    </div>
                    <span className="font-medium">Manage Users</span>
                    {isActive('/user-management') && (
                      <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                  <Link
                    to="/discussions"
                    className={`${baseClass} ${isActive('/discussions') ? activeClass : 'hover:bg-white/10 hover:scale-105'}`}
                    onMouseEnter={() => setHoveredItem('discussions')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div
                      className={`w-5 h-5 transition-all duration-200 ${isActive('/discussions') ? 'text-pink-600' : 'text-white'} ${hoveredItem === 'discussions' ? 'scale-110' : ''}`}
                    >
                      <FiMessageCircle />
                    </div>
                    <span className="font-medium">Discussions</span>
                    {isActive('/discussions') && (
                      <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                  <Link
                    to="/resources"
                    className={`${baseClass} ${isActive('/resources') ? activeClass : 'hover:bg-white/10 hover:scale-105'}`}
                    onMouseEnter={() => setHoveredItem('resources')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div
                      className={`w-5 h-5 transition-all duration-200 ${isActive('/resources') ? 'text-pink-600' : 'text-white'} ${hoveredItem === 'resources' ? 'scale-110' : ''}`}
                    >
                      <FiFolder />
                    </div>
                    <span className="font-medium">Resources</span>
                    {isActive('/resources') && (
                      <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                  <Link
                    to="/analytics"
                    className={`${baseClass} ${isActive('/analytics') ? activeClass : 'hover:bg-white/10 hover:scale-105'}`}
                    onMouseEnter={() => setHoveredItem('analytics')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div
                      className={`w-5 h-5 transition-all duration-200 ${isActive('/analytics') ? 'text-pink-600' : 'text-white'} ${hoveredItem === 'analytics' ? 'scale-110' : ''}`}
                    >
                      <FiBarChart2 />
                    </div>
                    <span className="font-medium">Analytics</span>
                    {isActive('/analytics') && (
                      <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                </>
              )}
              <Link
                to="/help-center"
                className={`${baseClass} ${isActive('/help-center') ? activeClass : 'hover:bg-white/10 hover:scale-105'}`}
                onMouseEnter={() => setHoveredItem('help')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  className={`w-5 h-5 transition-all duration-200 ${isActive('/help-center') ? 'text-pink-600' : 'text-white'} ${hoveredItem === 'help' ? 'scale-110' : ''}`}
                >
                  <FiHelpCircle />
                </div>
                <span className="font-medium">Help Center</span>
                {isActive('/help-center') && (
                  <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                )}
              </Link>
            </>
          )}

          <Link
            to="/profile"
            className={`${baseClass} ${isActive('/profile') ? activeClass : 'hover:bg-white/10 hover:scale-105'}`}
            onMouseEnter={() => setHoveredItem('profile')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              className={`w-5 h-5 transition-all duration-200 ${isActive('/profile') ? 'text-pink-600' : 'text-white'} ${hoveredItem === 'profile' ? 'scale-110' : ''}`}
            >
              <FiUser />
            </div>
            <span className="font-medium">Profile</span>
            {isActive('/profile') && (
              <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            )}
          </Link>

          <Link
            to="/settings"
            className={`${baseClass} ${isActive('/settings') ? activeClass : 'hover:bg-white/10 hover:scale-105'}`}
            onMouseEnter={() => setHoveredItem('settings')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div
              className={`w-5 h-5 transition-all duration-200 ${isActive('/settings') ? 'text-pink-600' : 'text-white'} ${hoveredItem === 'settings' ? 'scale-110' : ''}`}
            >
              <FiSettings />
            </div>
            <span className="font-medium">Settings</span>
            {isActive('/settings') && (
              <div className="ml-auto w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            )}
          </Link>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
