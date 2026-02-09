import React, { useEffect, useRef } from 'react';
import GlassCard from '../GlassCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 80, scale: 0.92 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section section-about">
      <div className="section-heading">
        <h2>About</h2>
        <p>Who I am in this digital space</p>
      </div>
      <GlassCard className="about-card" ref={cardRef}>
        <h3 className="section-title">Designer + Engineer</h3>
        <p className="section-body">
          I specialise in cinematic, interactive experiences that blur the line
          between interface and film. With a background in both design and
          engineering, I bridge product thinking, motion language, and technical
          execution.
        </p>
        <p className="section-body">
          From prototyping volumetric UIs to optimizing WebGL renders for
          mobile devices, I build experiences that feel tactile, responsive, and
          precise — echoing Apple’s attention to spacing, hierarchy, and
          motion.
        </p>
        <div className="about-grid">
          <div>
            <span className="label">Focus</span>
            <p>Interactive 3D, motion systems, and developer tooling.</p>
          </div>
          <div>
            <span className="label">Workflow</span>
            <p>React, Three.js, TypeScript, Figma, and design systems.</p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
};

export default AboutSection;
