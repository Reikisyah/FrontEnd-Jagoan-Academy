import React from 'react'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import {
  FaUsers,
  FaBookOpen,
  FaGraduationCap,
  FaChartLine,
  FaEye,
  FaClock,
  FaStar,
  FaTrophy,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
} from 'react-icons/fa'

const Analytics = () => {
  // Dummy data for analytics
  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      change: '+12.5%',
      changeType: 'up',
      icon: FaUsers,
      color: 'pink',
    },
    {
      title: 'Active Courses',
      value: '24',
      change: '+8.3%',
      changeType: 'up',
      icon: FaBookOpen,
      color: 'blue',
    },
    {
      title: 'Completion Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'up',
      icon: FaGraduationCap,
      color: 'green',
    },
    {
      title: 'Total Revenue',
      value: '$45,230',
      change: '+18.7%',
      changeType: 'up',
      icon: FaChartLine,
      color: 'purple',
    },
  ]

  const recentActivity = [
    {
      type: 'enrollment',
      message: 'Sarah Johnson enrolled in "Advanced React Development"',
      time: '2 hours ago',
      icon: FaUsers,
      color: 'green',
    },
    {
      type: 'completion',
      message: 'Mike Chen completed "JavaScript Fundamentals"',
      time: '4 hours ago',
      icon: FaGraduationCap,
      color: 'blue',
    },
    {
      type: 'review',
      message: 'Emma Davis left a 5-star review for "Web Design Basics"',
      time: '6 hours ago',
      icon: FaStar,
      color: 'yellow',
    },
    {
      type: 'course',
      message: 'New course "Python for Beginners" was published',
      time: '1 day ago',
      icon: FaBookOpen,
      color: 'purple',
    },
  ]

  const topCourses = [
    {
      name: 'Advanced React Development',
      students: 156,
      rating: 4.8,
      revenue: '$12,450',
    },
    {
      name: 'JavaScript Fundamentals',
      students: 234,
      rating: 4.9,
      revenue: '$18,720',
    },
    {
      name: 'Web Design Basics',
      students: 189,
      rating: 4.7,
      revenue: '$15,120',
    },
    {
      name: 'Python for Beginners',
      students: 98,
      rating: 4.6,
      revenue: '$7,840',
    },
  ]

  const getChangeIcon = (type) => {
    switch (type) {
      case 'up':
        return <FaArrowUp className="text-green-500" />
      case 'down':
        return <FaArrowDown className="text-red-500" />
      default:
        return <FaMinus className="text-gray-500" />
    }
  }

  const getChangeColor = (type) => {
    switch (type) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getActivityColor = (color) => {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-600'
      case 'blue':
        return 'bg-blue-100 text-blue-600'
      case 'yellow':
        return 'bg-yellow-100 text-yellow-600'
      case 'purple':
        return 'bg-purple-100 text-purple-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="flex-1 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600">
                  Monitor your course performance and student engagement metrics
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Last 90 days</option>
                  <option>This year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    {getChangeIcon(stat.changeType)}
                    <span
                      className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts and Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Engagement Overview */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Engagement Overview
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-pink-100 text-pink-700 rounded-lg">
                    Students
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                    Courses
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                    Revenue
                  </button>
                </div>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FaChartLine className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Chart visualization would go here
                  </p>
                  <p className="text-sm text-gray-400">
                    Showing student growth over time
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-lg ${getActivityColor(activity.color)}`}
                    >
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-medium">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-pink-600 hover:text-pink-700 text-sm font-medium">
                View all activity
              </button>
            </div>
          </div>

          {/* Top Performing Courses */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Top Performing Courses
              </h2>
              <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                View all courses
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Course Name
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Students
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Rating
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Revenue
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topCourses.map((course, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {course.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            #{index + 1} in performance
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <FaUsers className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{course.students}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-green-600">
                          {course.revenue}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-100">
                  <FaEye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">2.4K</h3>
                <p className="text-gray-600 text-sm">Page Views</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-green-100">
                  <FaClock className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">8.5hr</h3>
                <p className="text-gray-600 text-sm">Avg. Study Time</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-yellow-100">
                  <FaStar className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">4.7</h3>
                <p className="text-gray-600 text-sm">Avg. Rating</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-purple-100">
                  <FaTrophy className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">156</h3>
                <p className="text-gray-600 text-sm">Certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
