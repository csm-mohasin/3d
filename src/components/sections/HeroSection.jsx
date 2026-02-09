import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const chipsRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, subtitleRef.current, chipsRef.current],
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15
        }
      );

      gsap.to(titleRef.current, {
        yPercent: -10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to(subtitleRef.current, {
        yPercent: -18,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to(chipsRef.current, {
        yPercent: -25,
        opacity: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="section section-hero">
      <div className="hero-content">
        <p className="hero-kicker">CINEMATIC EXPERIENCE • REACT / THREE.JS</p>
        <h1 ref={titleRef} className="hero-title">
          Crafting immersive
          <span className="hero-gradient"> 3D interfaces</span>
          <br />
          for the next generation web.
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          I design and engineer responsive, premium-quality experiences with
          Apple-level motion, depth, and detail using React, Three.js, and
          modern animation tooling.
        </p>

        <div ref={chipsRef} className="hero-chips">
          <span className="hero-chip">React Three Fiber</span>
          <span className="hero-chip">GSAP Scroll Orchestration</span>
          <span className="hero-chip">Lenis Smooth Scrolling</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
