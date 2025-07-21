
import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';


const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg px-8 py-4 flex items-center justify-between w-full sticky top-0 z-50">

      {/* Logo & Brand + Search Bar */}
      <div className="flex items-center gap-6 flex-1">
        <span className="font-extrabold text-2xl select-none">
          <span className="text-pink-600">Jagoan</span>
          <span className="text-gray-900"> Academy</span>
        </span>
        <div className="relative w-full max-w-[200px] ml-2">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FiSearch size={20} />
          </span>
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-8 pr-3 py-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-700 bg-white placeholder-gray-400 text-sm"
          />
        </div>
      </div>

      {/* Menu */}
      <ul className="flex gap-4 items-center text-gray-800 font-medium">
        <li>
          <a href="#home" className="hover:text-pink-600 transition">Home</a>
        </li>
        <li>
          <a href="#courses" className="hover:text-pink-600 transition">Courses</a>
        </li>
        <li>
          <a href="#about" className="hover:text-pink-600 transition">About</a>
        </li>
        <li>
          <a href="#faq" className="hover:text-pink-600 transition">FAQ</a>
        </li>
        <li>
          <Link
            to="/login"
            className="border-2 border-pink-600 rounded-lg px-5 py-2 font-semibold text-pink-600 hover:bg-pink-50 transition"
          >
            Log in
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition"
          >
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar
