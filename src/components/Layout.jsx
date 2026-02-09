import React from 'react';
import Navbar from './Navbar';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

const Layout = ({ device }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Your Name</span>
        <span className="footer-muted">
          Built with React, React Three Fiber, GSAP & Lenis
        </span>
      </footer>
    </div>
  );
};

export default Layout;
