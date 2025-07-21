
import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';


const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex items-center justify-between w-full">
      {/* Logo & Brand */}
      <div className="flex items-center gap-2">
        <span className="font-extrabold text-2xl select-none">
          <span className="text-pink-600">Jagoan</span>
          <span className="text-gray-900"> Academy</span>
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 flex justify-center mx-8">
        <div className="relative w-full max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FiSearch size={20} />
          </span>
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 bg-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Menu */}
      <ul className="flex gap-8 items-center text-gray-800 font-medium">
        <li>
          <Link to="/" className="hover:text-pink-600 transition">Home</Link>
        </li>
        <li>
          <Link to="/courses" className="hover:text-pink-600 transition">Courses</Link>
        </li>
        <li>
          <Link to="/categories" className="hover:text-pink-600 transition">Categories</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-pink-600 transition">About</Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-pink-600 transition">Log in</Link>
        </li>
        <li>
          <Link
            to="/register"
            className="ml-2 px-5 py-2 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition"
          >
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar
