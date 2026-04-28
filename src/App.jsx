// src/App.jsx
import { useState, useEffect } from "react";
import "./i18n/index.js";
import BootScreen    from "./components/BootScreen";
import MatrixRain    from "./components/Canvas/MatrixRain";
import Cursor        from "./components/Cursor";
import Navbar        from "./components/Navbar";
import Hero          from "./components/Hero";
import About         from "./components/About";
import Experience    from "./components/Experience";
import Skills        from "./components/Skills";
import Projects      from "./components/Projects";
import Education     from "./components/Education";
import Contact       from "./components/Contact";
import Footer        from "./components/Footer";

export default function App() {
  const [booted, setBooted] = useState(false);

  // Pre-check session so boot screen doesn't flash
  useEffect(() => {
    if (sessionStorage.getItem("boot-shown")) setBooted(true);
  }, []);

  return (
    <>
      {/* Cursor */}
      <Cursor />

      {/* Matrix rain canvas (behind everything) */}
      <MatrixRain />

      {/* Radial glow layer */}
      <div className="bg-radial-glow" aria-hidden="true" />

      {/* Boot screen */}
      {!booted && (
        <BootScreen onComplete={() => setBooted(true)} />
      )}

      {/* Main site — rendered behind boot screen */}
      <div
        style={{
          opacity: booted ? 1 : 0,
          transition: "opacity 0.5s ease 0.1s",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
