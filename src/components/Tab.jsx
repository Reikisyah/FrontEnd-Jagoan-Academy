import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  FaArrowLeft,
  FaUsers,
  FaFileAlt,
  FaCoins,
  FaTag,
  FaStar,
  FaTicketAlt,
} from 'react-icons/fa'

const sidebarTabs = [
  // Hapus section Courses di sini, mulai dari label: '', items: [{ label: 'Courses', ... }]
  // Sisakan hanya PLAN YOUR COURSE dan PUBLISH YOUR COURSE
  {
    label: 'PLAN YOUR COURSE',
    items: [
      {
        label: 'Intended Learners',
        icon: <FaUsers className="text-purple-200 w-5 h-5" />,
        path: '/plan-course/intended-learners',
      },
      {
        label: 'Curriculum',
        icon: <FaFileAlt className="text-purple-100 w-5 h-5" />,
        path: '/plan-course/curriculum',
      },
    ],
  },
  {
    label: 'PUBLISH YOUR COURSE',
    items: [
      {
        label: 'Course',
        icon: <FaFileAlt className="text-purple-100 w-5 h-5" />,
        path: '/plan-course/landing-page',
      },
      {
        label: 'Pricing',
        icon: <FaCoins className="text-orange-200 w-5 h-5" />,
        path: '/plan-course/pricing',
      },
      {
        label: 'Promotions',
        icon: <FaTag className="text-yellow-200 w-5 h-5" />,
        path: '/plan-course/promotions',
      },
      {
        label: 'Reviews',
        icon: <FaStar className="text-yellow-200 w-5 h-5" />,
        path: '/plan-course/reviews',
      },
      {
        label: 'Coupons',
        icon: <FaTicketAlt className="text-pink-200 w-5 h-5" />,
        path: '/plan-course/coupons',
      },
    ],
  },
]

const Tab = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="w-64 bg-gradient-to-b from-[#b8004c] to-[#e4006d] text-white flex flex-col py-8 px-6 min-h-screen shadow-lg">
      {/* Back button di paling atas */}
      <button
        className={`mb-8 flex items-center gap-3 px-4 py-2 rounded-lg text-base font-semibold bg-white/10 hover:bg-white/20 transition shadow ${location.pathname === '/dashboard/courses' ? 'bg-white text-pink-600 font-bold' : ''}`}
        onClick={() => navigate('/courses-dashboard')}
      >
        <FaArrowLeft className="w-5 h-5" />
        Back
      </button>
      {sidebarTabs.map((section) => (
        <div key={section.label} className={section.label ? 'mb-6' : 'mb-2'}>
          {section.label && (
            <div className="text-xs font-bold text-white/70 mb-2 uppercase tracking-widest">
              {section.label}
            </div>
          )}
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li
                  key={item.label}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-base font-semibold transition
                    ${isActive ? 'bg-white text-pink-600 shadow font-bold' : 'hover:bg-white/10 text-white'}`}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                  {item.label}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      <button className="mt-auto bg-pink-100 text-pink-600 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-200 transition shadow text-base">
        <span className="text-lg">🛫</span> Publish
      </button>
    </aside>
  )
}

export default Tab
