import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Features from "./Features";
import WhyChooseUs from "./WhyChooseUs";
import HowItWorks from "./HowItWorks";
import Statistics from "./Statistics";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";


const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <HeroSection />

      <Features />

      <WhyChooseUs />

      <HowItWorks />

      <Statistics />

      <About />

      <Contact />

      <Footer />
    </div>
  );
};

export default Home;