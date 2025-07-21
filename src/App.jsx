
import React from "react";





import HeroSection from "./pages/HeroSection";
import Mengapa from "./pages/Mengapa";

import Courses from "./pages/Courses";



import Pengalaman from "./pages/Pengalaman";
import Partner from "./pages/Partner";
import Testimonial from "./pages/testimonial";
import FAQ from "./pages/FAQ";




import Register from "./pages/Register";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Hooks/Navbar";
import Footer from "./Hooks/Footer";






function App() {
  return (
    <>
      <Navbar />
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
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
