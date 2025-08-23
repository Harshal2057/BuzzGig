import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Marquee from "react-fast-marquee";
import { assets } from "./assets/assets.js";
import WhatweDo from "./components/WhatweDo";
import WhatAreWe from "./components/WhatAreWe";
import TextScreen from "./components/TextScreen.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const skills = [
    "Web Development",
    "UI/UX Design",
    "SEO Optimization",
    "Content Writing",
    "Graphic Design",
    "Video Editing",
  ];

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-blue-75">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Marquee strip (between Hero & WhatweDo) */}
      <div
        className="absolute z-30 -mt-14 rotate-[2deg] w-full"
        style={{
          backgroundColor: "#CAFA08",
          padding: "12px 0",
          overflow: "visible",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Marquee speed={90} pauseOnHover={true} gradient={false}>
          {skills.map((skill, index) => (
            <span
              key={index}
              className="text-3xl"
              style={{
                marginRight: "20px",
                color: "#24251E",
                fontSize: window.innerWidth < 640 ? "44px" : "60px",
                fontFamily: "'Anton', sans-serif",
                fontWeight: "semibold",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              {skill}
              <img src={assets.bullet} alt="bullet" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Other Sections */}
      <WhatweDo />
      <WhatAreWe />
      <TextScreen />
      <Footer />
    </main>
  );
}

export default App;
