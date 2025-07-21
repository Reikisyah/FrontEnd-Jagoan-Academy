
import React from "react";


import { BrowserRouter } from "react-router-dom";
import HeroSection from "./pages/HeroSection";
import Navbar from "./Hooks/Navbar";



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <HeroSection />
    </BrowserRouter>
  );
}

export default App;
