import React from 'react'
import { FiClipboard, FiPieChart } from 'react-icons/fi'
import Sidebar from '../../../components/Sidebar'
import DashboardHeader from '../../../components/DashboardHeader'

export default function Dashboard({ hideNavbarFooter }) {
  React.useEffect(() => {
    if (hideNavbarFooter) {
      // Jangan sembunyikan semua <header>, hanya .navbar, #navbar, atau [role="navigation"]
      const navbar = document.querySelector(
        '.navbar,#navbar,[role="navigation"]',
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

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Dashboard Header */}
        <DashboardHeader />
        {/* Main Content */}
        <main className="flex-1 px-10 py-8 bg-gradient-to-br from-white via-pink-50 to-white">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white rounded-2xl shadow-md p-7 flex flex-col gap-3">
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-pink-100 text-pink-600 rounded-xl p-3">
                  {/* <FiBook className="w-7 h-7" /> */}
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
                    {/* <FiBook className="w-6 h-6" /> */}
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
