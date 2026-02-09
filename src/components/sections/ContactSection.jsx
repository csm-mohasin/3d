import React, { useEffect, useRef } from 'react';
import GlassCard from '../GlassCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

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
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section section-contact"
    >
      <GlassCard className="contact-card" ref={cardRef}>
        <h3 className="section-title">Let’s build something cinematic</h3>
        <p className="section-body">
          I’m available for select collaborations, prototypes, and product work
          where motion, depth, and craft matter.
        </p>
        <div className="contact-actions">
          <a
            href="mailto:you@example.com"
            className="primary-button"
          >
            Email me
          </a>
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noreferrer"
            className="ghost-button"
          >
            View GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noreferrer"
            className="ghost-button"
          >
            LinkedIn
          </a>
        </div>
        <p className="contact-note">
          This portfolio is 100% static, powered by React, Three.js, GSAP,
          ScrollTrigger, and Lenis — optimized for GitHub Pages.
        </p>
      </GlassCard>
    </section>
  );
};

export default ContactSection;
