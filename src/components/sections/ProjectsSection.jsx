import React, { useEffect, useRef } from 'react';
import GlassCard from '../GlassCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    title: 'Visionary Dashboard',
    meta: 'Cinematic analytics • React Three Fiber + GSAP',
    description:
      'A volumetric analytics surface with depth-based parallax, where charts float in Z-space and respond to scroll, hover, and real-time data.',
    role: 'Concept, design, and development',
    year: '2024'
  },
  {
    title: 'Spatial Storytelling Site',
    meta: 'Narrative microsite • WebGL narrative scroll',
    description:
      'Scroll-driven cinematic story where each chapter reveals a new scene, using camera rails, fog, and layered typography.',
    role: 'Front-end architecture & motion system',
    year: '2023'
  },
  {
    title: 'Interactive Playgrounds',
    meta: 'Component lab • Design systems in motion',
    description:
      'A library of motion-ready components and 3D patterns, tuned for accessibility, responsiveness, and maintainability.',
    role: 'System design & implementation',
    year: '2023'
  }
];

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 80, scale: 0.92 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 1
            },
            delay: index * 0.06
          }
        );

        gsap.to(card, {
          zIndex: 10 + index,
          scale: 1.03,
          y: -16,
          boxShadow:
            '0 30px 80px rgba(15,23,42,0.75), 0 0 0 1px rgba(148,163,184,0.4)',
          scrollTrigger: {
            trigger: card,
            start: 'top center',
            end: 'bottom center',
            scrub: 1
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section section-projects"
    >
      <div className="section-heading">
        <h2>Projects</h2>
        <p>Cinematic surfaces I’ve built</p>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((project, i) => (
          <GlassCard
            key={project.title}
            className="project-card"
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="project-header">
              <h3>{project.title}</h3>
              <span className="project-meta">{project.meta}</span>
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-footer">
              <span>{project.role}</span>
              <span className="project-year">{project.year}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
