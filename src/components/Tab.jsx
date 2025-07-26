import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  FaArrowLeft,
  FaUsers,
  FaFileAlt,
  FaCoins,
  FaTag,
  FaStar,
  FaTicketAlt,
  FaRocket,
} from 'react-icons/fa'

const sidebarTabs = [
  {
    label: 'PLAN YOUR COURSE',
    items: [
      {
        label: 'Intended Learners',
        icon: <FaUsers className="w-5 h-5" />,
        path: '/plan-course/intended-learners',
        description: 'Define your target audience',
      },
      {
        label: 'Curriculum',
        icon: <FaFileAlt className="w-5 h-5" />,
        path: '/plan-course/curriculum',
        description: 'Structure your course content',
      },
    ],
  },
  {
    label: 'PUBLISH YOUR COURSE',
    items: [
      {
        label: 'Course',
        icon: <FaFileAlt className="w-5 h-5" />,
        path: '/plan-course/landing-page',
        description: 'Course information & details',
      },
      {
        label: 'Pricing',
        icon: <FaCoins className="w-5 h-5" />,
        path: '/plan-course/pricing',
        description: 'Set your course price',
      },
      {
        label: 'Promotions',
        icon: <FaTag className="w-5 h-5" />,
        path: '/plan-course/promotions',
        description: 'Create promotional campaigns',
      },
      {
        label: 'Reviews',
        icon: <FaStar className="w-5 h-5" />,
        path: '/plan-course/reviews',
        description: 'Manage course reviews',
      },
      {
        label: 'Coupons',
        icon: <FaTicketAlt className="w-5 h-5" />,
        path: '/plan-course/coupons',
        description: 'Generate discount coupons',
      },
    ],
  },
]

const Tab = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState(null)

  return (
    <aside className="w-64 bg-gradient-to-b from-[#b8004c] via-[#d4005a] to-[#e4006d] text-white flex flex-col min-h-screen shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10 flex flex-col h-full py-6 px-4">
        {/* Back button dengan animasi */}
        <button
          className="mb-8 flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-105 group shadow-lg"
          onClick={() => navigate('/courses-dashboard')}
        >
          <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Courses</span>
        </button>

        {/* Navigation sections */}
        <div className="flex-1 space-y-6">
          {sidebarTabs.map((section, sectionIndex) => (
            <div key={section.label} className="space-y-3">
              {/* Section header */}
              <div className="px-2">
                <div className="text-xs font-bold text-white/80 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-white/30 rounded-full"></div>
                  {section.label}
                </div>
              </div>

              {/* Section items */}
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => {
                  const isActive = location.pathname === item.path
                  const isHovered =
                    hoveredItem === `${sectionIndex}-${itemIndex}`

                  return (
                    <li key={item.label}>
                      <button
                        className={`w-full flex items-start gap-3 px-4 py-3 rounded-xl cursor-pointer text-left transition-all duration-200 group ${
                          isActive
                            ? 'bg-white text-pink-600 shadow-lg scale-105'
                            : 'hover:bg-white/10 text-white hover:scale-105'
                        }`}
                        onClick={() => navigate(item.path)}
                        onMouseEnter={() =>
                          setHoveredItem(`${sectionIndex}-${itemIndex}`)
                        }
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {/* Icon dengan animasi */}
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            isActive
                              ? 'bg-pink-100 text-pink-600'
                              : 'bg-white/10 text-white group-hover:bg-white/20'
                          } ${isHovered ? 'scale-110' : ''}`}
                        >
                          {item.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div
                            className={`font-semibold text-sm transition-colors duration-200 ${
                              isActive ? 'text-pink-600' : 'text-white'
                            }`}
                          >
                            {item.label}
                          </div>
                          <div
                            className={`text-xs mt-1 transition-all duration-200 ${
                              isActive
                                ? 'text-pink-500'
                                : 'text-white/60 group-hover:text-white/80'
                            } ${isHovered ? 'opacity-100' : 'opacity-70'}`}
                          >
                            {item.description}
                          </div>
                        </div>

                        {/* Active indicator */}
                        {isActive && (
                          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Publish button dengan animasi */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-lg group">
            <FaRocket className="w-5 h-5 group-hover:animate-bounce" />
            <span>Publish Course</span>
          </button>

          {/* Progress indicator */}
          <div className="mt-4 px-2">
            <div className="flex items-center justify-between text-xs text-white/60 mb-2">
              <span>Course Progress</span>
              <span>60% Complete</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-pink-400 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: '60%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Tab
