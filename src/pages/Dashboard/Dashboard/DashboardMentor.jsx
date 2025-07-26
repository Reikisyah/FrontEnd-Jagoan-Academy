import React from 'react'
import {
  FiBook,
  FiUsers,
  FiTrendingUp,
  FiCheckCircle,
  FiClipboard,
  FiPieChart,
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

export default function DashboardMentor({ hideNavbarFooter }) {
  // Debug: log role dari localStorage
  const userRole = localStorage.getItem('role')
  console.log('🔍 [DashboardMentor] Role dari localStorage:', userRole)

  // Dummy user & data untuk mentor
  const user = { name: 'Mentor' }

  // Summary cards yang lebih sederhana untuk mentor
  const summary = [
    {
      title: 'My Courses',
      value: 5,
      icon: <FiBook className="w-7 h-7" />,
      color: 'bg-pink-100 text-pink-600',
      href: '/courses-dashboard',
      isLink: true,
    },
    {
      title: 'Total Students',
      value: 127,
      icon: <FiUsers className="w-7 h-7" />,
      color: 'bg-blue-100 text-blue-600',
      href: '#',
      isLink: false,
    },
    {
      title: 'Course Progress',
      value: '82%',
      icon: <FiPieChart className="w-7 h-7" />,
      color: 'bg-purple-100 text-purple-600',
      href: '#',
      isLink: false,
    },
  ]

  // Statistik yang lebih fokus pada mentor
  const stats = [
    {
      title: 'Active Students',
      value: 89,
      icon: <FiUsers className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Course Rating',
      value: '4.8/5.0',
      icon: <FiCheckCircle className="w-5 h-5" />,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Completion Rate',
      value: '78.5%',
      icon: <FiTrendingUp className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Assignments',
      value: 12,
      icon: <FiClipboard className="w-5 h-5" />,
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  // Data chart yang lebih sederhana
  const chartData = [
    { month: 'Jan', students: 45, rating: 4.2 },
    { month: 'Feb', students: 52, rating: 4.4 },
    { month: 'Mar', students: 61, rating: 4.5 },
    { month: 'Apr', students: 68, rating: 4.6 },
    { month: 'May', students: 75, rating: 4.7 },
    { month: 'Jun', students: 82, rating: 4.8 },
    { month: 'Jul', students: 89, rating: 4.8 },
  ]

  // Recent activity yang lebih fokus pada mentor
  const activities = [
    {
      icon: <FiBook className="w-6 h-6" />,
      title: 'New course published',
      desc: 'React Advanced Patterns',
      time: '2h ago',
      status: 'Published',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: 'New student enrolled',
      desc: 'JavaScript Fundamentals course',
      time: '1d ago',
      status: 'New',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <FiClipboard className="w-6 h-6" />,
      title: 'Assignment submitted',
      desc: 'React Hooks Tutorial',
      time: '2d ago',
      status: 'Submitted',
      color: 'bg-purple-100 text-purple-600',
    },
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
              Mentor Dashboard
            </h1>
            <p className="text-gray-600 mb-2">
              Selamat datang,{' '}
              <span className="font-semibold text-pink-600">{user.name}</span>!
              Pantau progress kursus dan siswa Anda di sini.
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
            {/* Student Growth Line Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-semibold text-gray-900 mb-4">
                Student Growth (Monthly)
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
                    dataKey="students"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Course Rating Bar Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-semibold text-gray-900 mb-4">
                Course Rating (Monthly)
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
                  <Bar dataKey="rating" fill="#10b981" radius={[8, 8, 0, 0]} />
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
                            className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                              act.status === 'New'
                                ? 'bg-green-100 text-green-700'
                                : act.status === 'Published'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-purple-100 text-purple-700'
                            }`}
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
