
import React from "react";





import HeroSection from "./pages/HeroSection";
import Mengapa from "./pages/Mengapa";

import Courses from "./pages/Courses";



import Pengalaman from "./pages/Pengalaman";
import Partner from "./pages/Partner";
import Testimonial from "./pages/testimonial";
import FAQ from "./pages/FAQ";




import Register from "./pages/Register";
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
                  <section id="about">
                    <Mengapa />
                  </section>
                  <section id="courses">
                    <Courses />
                  </section>
                  <Pengalaman />
                  <FAQ />
                  <Testimonial />
                  <Partner />
                </main>
              }
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
