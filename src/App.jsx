import React from 'react'

import HeroSection from './pages/Homepage/HeroSection'
import Mengapa from './pages/Homepage/Mengapa'
import Courses from './pages/Homepage/Courses'
import Pengalaman from './pages/Homepage/Pengalaman'
import Partner from './pages/Homepage/Partner'
import Testimonial from './pages/Homepage/Testimonial'
import FAQ from './pages/Homepage/FAQ'

import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard/Dashboard/DashboardAdmin' // atau DashboardStudent jika itu yang diinginkan
import Profile from './pages/Dashboard/Profile'
import Categories from './pages/Dashboard/Categories'
import CoursesDashboard from './pages/Dashboard/CourseAdmin/Courses'
import UserManagement from './pages/Dashboard/UserManagement'
import SubcategoriesMentor from './pages/Dashboard/SubcategoriesMentor'
import Setting from './pages/Dashboard/Setting'
import PlanCourse from './pages/Dashboard/PlanCourse/CourseLandingPage'
import AddCourse from './pages/Dashboard/CourseAdmin/AddCourse'
import CourseLandingPage from './pages/Dashboard/PlanCourse/CourseLandingPage'
import Pricing from './pages/Dashboard/PlanCourse/Pricing'
import Promotions from './pages/Dashboard/PlanCourse/Promotions'
import Coupons from './pages/Dashboard/PlanCourse/Coupons'
import Reviews from './pages/Dashboard/PlanCourse/Reviews'
import Curriculum from './pages/Dashboard/PlanCourse/Curriculum'
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
    '/dashboard/courses/add',
    '/plan-course',
    '/plan-course/curriculum',
    '/plan-course/landing-page',
    '/plan-course/pricing',
    '/plan-course/promotions',
    '/plan-course/coupons',
    '/plan-course/reviews',
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
              path="/dashboard/courses/add"
              element={
                <div className="flex min-h-screen bg-white">
                  <Sidebar />
                  <div className="flex-1 flex flex-col min-h-screen">
                    <AddCourse />
                  </div>
                </div>
              }
            />
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
            <Route path="/plan-course" element={<PlanCourse />} />
            <Route path="/plan-course/curriculum" element={<Curriculum />} />
            <Route
              path="/plan-course/landing-page"
              element={<CourseLandingPage />}
            />
            <Route path="/plan-course/pricing" element={<Pricing />} />
            <Route path="/plan-course/promotions" element={<Promotions />} />
            <Route path="/plan-course/coupons" element={<Coupons />} />
            <Route path="/plan-course/reviews" element={<Reviews />} />
          </Routes>
        </div>
        {!hide && <Footer />}
      </div>
    </>
  )
}

export default AppRoutes
