import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="/logo192.png" alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-xl text-blue-600">Jagoan Academy</span>
      </div>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <li>
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
        </li>
        <li>
          <Link to="/courses" className="hover:text-blue-600">
            Courses
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="hover:text-blue-600">
            Jobs
          </Link>
        </li>
      </ul>
      <div className="flex gap-2">
        <Link
          to="/login"
          className="px-4 py-1 border border-blue-600 rounded text-blue-600 hover:bg-blue-50"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
