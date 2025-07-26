import React from 'react'

import HeroSection from './pages/Homepage/HeroSection'
import Mengapa from './pages/Homepage/Mengapa'
import Courses from './pages/Homepage/Course/Courses'
import Pengalaman from './pages/Homepage/Pengalaman'
import Partner from './pages/Homepage/Partner'
import Testimonial from './pages/Homepage/Testimonial'
import FAQ from './pages/Homepage/FAQ'

import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import DashboardAdmin from './pages/Dashboard/Dashboard/DashboardAdmin'
import DashboardMentor from './pages/Dashboard/Dashboard/DashboardMentor'
import DashboardStudent from './pages/Dashboard/Dashboard/DasboardStudent'
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
import DetailCourse from './pages/Homepage/Course/DetailCourse'
import IntendedLearners from './pages/Dashboard/PlanCourse/IntendedLearners'
import Language from './pages/Dashboard/Language'
import HelpCenter from './pages/Dashboard/HelpCenter'
import Discussions from './pages/Dashboard/Discussions'
import Resources from './pages/Dashboard/Resources'
import Analytics from './pages/Dashboard/Analytics'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import CourseStudent from './pages/Dashboard/CourseStudent/Course'
import StartCourse from './pages/Dashboard/CourseStudent/StartCourse'

// Komponen Dashboard yang dinamis berdasarkan role
function DashboardComponent({ hideNavbarFooter }) {
  // Ambil role dari localStorage
  const userRole = localStorage.getItem('role') || 'admin'

  console.log('🔍 [DashboardComponent] Role dari localStorage:', userRole)

  // Tampilkan dashboard berdasarkan role
  if (userRole === 'participant') {
    console.log('🎯 [DashboardComponent] Menampilkan DashboardStudent')
    return <DashboardStudent hideNavbarFooter={hideNavbarFooter} />
  } else if (userRole === 'mentor') {
    console.log('🎯 [DashboardComponent] Menampilkan DashboardMentor')
    return <DashboardMentor hideNavbarFooter={hideNavbarFooter} />
  } else {
    console.log('🎯 [DashboardComponent] Menampilkan DashboardAdmin')
    return <DashboardAdmin hideNavbarFooter={hideNavbarFooter} />
  }
}

function AppRoutes() {
  const location = useLocation()
  // Path yang tidak ingin menampilkan Navbar/Footer
  const hideNavFooter = [
    '/dashboard',
    '/dashboard-mentor',
    '/dashboard-student',
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
    '/plan-course/intended-learners',
    '/student/courses',
    '/student/course', // untuk prefix
  ]
  const hide = hideNavFooter.some(
    (p) => location.pathname === p || location.pathname.startsWith(p + '/'),
  )
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
            <Route path="/course/:id" element={<DetailCourse />} />
            <Route
              path="/dashboard"
              element={<DashboardComponent hideNavbarFooter={true} />}
            />
            <Route
              path="/dashboard-mentor"
              element={<DashboardMentor hideNavbarFooter={true} />}
            />
            <Route
              path="/dashboard-student"
              element={<DashboardStudent hideNavbarFooter={true} />}
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
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<DetailCourse />} />
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
            <Route path="/languages" element={<Language />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/help-center" element={<HelpCenter />} />
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
            <Route
              path="/plan-course/intended-learners"
              element={<IntendedLearners />}
            />
            <Route path="/student/courses" element={<CourseStudent />} />
            <Route path="/student/course/:id" element={<StartCourse />} />
          </Routes>
        </div>
        {!hide && <Footer />}
      </div>
    </>
  )
}

export default AppRoutes
