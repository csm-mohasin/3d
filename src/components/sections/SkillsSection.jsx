import React, { useEffect, useRef } from 'react';
import GlassCard from '../GlassCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, y: 80, scale: 0.94 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 1
          }
        }
      );

      gsap.to(orbitRef.current, {
        rotate: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section section-skills">
      <div className="section-heading">
        <h2>Skills</h2>
        <p>What I bring into this 3D canvas</p>
      </div>
      <GlassCard className="skills-card" ref={cardRef}>
        <div className="skills-layout">
          <div className="skills-copy">
            <h3 className="section-title">3D Interfaces & Motion Systems</h3>
            <p className="section-body">
              I architect performant, layered experiences with precise control
              over timing, easing, and depth. From scroll-based cinematic
              sequences to reactive camera systems, I design motion as a core
              product feature — not an afterthought.
            </p>
            <div className="skills-tags">
              <span>React Three Fiber</span>
              <span>GSAP + ScrollTrigger</span>
              <span>Lenis smooth scroll</span>
              <span>Custom shaders</span>
              <span>UX motion principles</span>
            </div>
          </div>
          <div className="skills-orbits">
            <div className="orbit orbit-outer" ref={orbitRef}>
              <div className="orbit-dot orbit-dot-primary">R3F</div>
              <div className="orbit-dot orbit-dot-secondary">GSAP</div>
              <div className="orbit-dot orbit-dot-tertiary">Lenis</div>
              <div className="orbit-center">
                <span>3D UI</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
};

export default SkillsSection;
