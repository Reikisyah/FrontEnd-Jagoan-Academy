import React from 'react'
import {
  FiClipboard,
  FiPieChart,
  FiBook,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiCheckCircle,
} from 'react-icons/fi'
import Sidebar from '../../../components/Sidebar'
import DashboardHeader from '../../../components/DashboardHeader'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts'
import { Link } from 'react-router-dom'

export default function Dashboard({ hideNavbarFooter }) {
  // Debug: log role dari localStorage
  const userRole = localStorage.getItem('role')
  console.log('🔍 [DashboardAdmin] Role dari localStorage:', userRole)

  // Dummy user & data
  const user = { name: 'Admin' }
  const summary = [
    {
      title: 'My Courses',
      value: 3,
      icon: <FiBook className="w-7 h-7" />, // Tambah icon
      color: 'bg-pink-100 text-pink-600',
      href: '/courses-dashboard', // Disamakan dengan sidebar
      isLink: true,
    },
    {
      title: 'Assignments',
      value: 2,
      icon: <FiClipboard className="w-7 h-7" />, // Tambah icon
      color: 'bg-blue-100 text-blue-600',
      href: '#',
      isLink: false,
    },
    {
      title: 'Overall Progress',
      value: '75%',
      icon: <FiPieChart className="w-7 h-7" />, // Tambah icon
      color: 'bg-purple-100 text-purple-600',
      href: '#',
      isLink: false,
    },
  ]
  const stats = [
    {
      title: 'Total Users',
      value: 1247,
      icon: <FiUsers className="w-5 h-5" />,
      color: 'bg-pink-100 text-pink-600',
    },
    {
      title: 'Revenue',
      value: 'Rp45.230.000',
      icon: <FiDollarSign className="w-5 h-5" />,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Active Students',
      value: 312,
      icon: <FiTrendingUp className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Completion Rate',
      value: '94.2%',
      icon: <FiCheckCircle className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-600',
    },
  ]
  const activities = [
    {
      icon: <FiClipboard className="w-6 h-6" />, // Icon
      title: 'New assignment added',
      desc: 'Complete the React Hooks tutorial',
      time: '2h ago',
      status: 'New',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: <FiBook className="w-6 h-6" />,
      title: 'Assignment submitted',
      desc: 'JavaScript Fundamentals',
      time: '1d ago',
      status: 'Submitted',
      color: 'bg-blue-100 text-blue-600',
    },
  ]
  // Dummy chart data
  const chartData = [
    { month: 'Jan', users: 200, revenue: 5000 },
    { month: 'Feb', users: 350, revenue: 8000 },
    { month: 'Mar', users: 500, revenue: 12000 },
    { month: 'Apr', users: 700, revenue: 18000 },
    { month: 'May', users: 900, revenue: 22000 },
    { month: 'Jun', users: 1100, revenue: 30000 },
    { month: 'Jul', users: 1247, revenue: 45230 },
  ]

  React.useEffect(() => {
    if (hideNavbarFooter) {
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Dashboard Header */}
        <DashboardHeader />
        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mb-2">
              Selamat datang,{' '}
              <span className="font-semibold text-pink-600">{user.name}</span>!
              Kelola dan pantau aktivitas platform Anda di sini.
            </p>
          </div>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {summary.map((item, idx) => (
              <div
                key={item.title}
                className={`bg-white rounded-2xl shadow-md p-7 flex flex-col gap-3 transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg group`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div
                    className={`${item.color} rounded-xl p-3 transition-all group-hover:scale-110`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium">
                      {item.title}
                    </div>
                    <div className="text-3xl font-bold">{item.value}</div>
                  </div>
                </div>
                {item.isLink ? (
                  <Link
                    to={item.href}
                    className="text-sm text-pink-600 font-semibold hover:underline focus:underline transition-colors"
                  >
                    View all
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="text-sm text-pink-600 font-semibold hover:underline focus:underline transition-colors"
                  >
                    View all
                  </a>
                )}
              </div>
            ))}
          </div>
          {/* Statistik Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, idx) => (
              <div
                key={stat.title}
                className="bg-white rounded-xl shadow p-5 flex items-center gap-4"
              >
                <div className={`${stat.color} rounded-lg p-3`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {stat.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Grafik */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* User Growth Line Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-semibold text-gray-900 mb-4">
                User Growth (Monthly)
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#ec4899"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Revenue Bar Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-semibold text-gray-900 mb-4">
                Revenue (Monthly)
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Recent Activity */}
          <div>
            <div className="font-semibold text-lg mb-4">Recent Activity</div>
            <div className="bg-white rounded-2xl shadow-md p-6 w-full">
              {activities.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  No recent activity.
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {activities.map((act, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0`}
                    >
                      <div className={`${act.color} rounded-full p-3`}>
                        {act.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-pink-600 font-semibold flex items-center gap-2">
                          {act.title}
                          <span
                            className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${act.status === 'New' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
                          >
                            {act.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">{act.desc}</div>
                      </div>
                      <div className="text-sm text-gray-400 whitespace-nowrap">
                        {act.time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
