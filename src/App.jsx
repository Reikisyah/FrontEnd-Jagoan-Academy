import React from 'react'

import HeroSection from './pages/HeroSection'
import Mengapa from './pages/Mengapa'

import Courses from './pages/Courses'

import Pengalaman from './pages/Pengalaman'
import Partner from './pages/Partner'
import Testimonial from './pages/Testimonial'
import FAQ from './pages/FAQ'

import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Categories from './pages/Categories'
import CoursesDashboard from './pages/CoursesDashboard'
import UserManagement from './pages/UserManagement'
import SubcategoriesMentor from './pages/SubcategoriesMentor'
import Setting from './pages/Setting'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'

function AppRoutes() {
  const location = useLocation()
  // Path yang tidak ingin menampilkan Navbar/Footer
  const hideNavFooter = [
    '/dashboard',
    '/profile',
    '/categories',
    '/subcategories',
    '/languages',
    '/user-management',
    '/discussions',
    '/resources',
    '/analytics',
    '/help-center',
    '/settings',
    '/courses-dashboard',
  ]
  const hide = hideNavFooter.includes(location.pathname)
  return (
    <>
      {!hide && <Navbar />}
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <section id="home">
                    <HeroSection />
                  </section>
                  <div className="w-full h-12 bg-gradient-to-b from-gray-100 to-white"></div>
                  <section id="about">
                    <Mengapa />
                  </section>
                  <div className="w-full h-12 bg-gradient-to-b from-gray-100 to-white"></div>
                  <section id="courses">
                    <Courses />
                  </section>
                  <div className="w-full h-12 bg-gradient-to-b from-gray-100 to-white"></div>
                  <Pengalaman />
                  <div className="w-full h-12 bg-gradient-to-b from-gray-100 to-white"></div>
                  <FAQ />
                  <div className="w-full h-12 bg-gradient-to-b from-gray-100 to-white"></div>
                  <Testimonial />
                  <div className="w-full h-12 bg-gradient-to-b from-gray-100 to-white"></div>
                  <Partner />
                </main>
              }
            />
            <Route
              path="/dashboard"
              element={<Dashboard hideNavbarFooter={true} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/courses-dashboard" element={<CoursesDashboard />} />
            <Route
              path="/user-management"
              element={
                <div className="flex min-h-screen bg-white">
                  <Sidebar />
                  <div className="flex-1 flex flex-col min-h-screen">
                    <UserManagement />
                  </div>
                </div>
              }
            />
            <Route
              path="/courses"
              element={<div className="p-10">Courses Page (Coming Soon)</div>}
            />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/subcategories"
              element={
                <div className="flex min-h-screen bg-white">
                  <Sidebar />
                  <div className="flex-1 flex flex-col min-h-screen">
                    <SubcategoriesMentor />
                  </div>
                </div>
              }
            />
            <Route
              path="/languages"
              element={<div className="p-10">Languages Page (Coming Soon)</div>}
            />
            <Route
              path="/discussions"
              element={
                <div className="p-10">Discussions Page (Coming Soon)</div>
              }
            />
            <Route
              path="/resources"
              element={<div className="p-10">Resources Page (Coming Soon)</div>}
            />
            <Route
              path="/analytics"
              element={<div className="p-10">Analytics Page (Coming Soon)</div>}
            />
            <Route
              path="/help-center"
              element={
                <div className="p-10">Help Center Page (Coming Soon)</div>
              }
            />
            <Route path="/settings" element={<Setting />} />
          </Routes>
        </div>
        {!hide && <Footer />}
      </div>
    </>
  )
}

export default AppRoutes
