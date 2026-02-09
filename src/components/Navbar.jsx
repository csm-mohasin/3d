import React from 'react';

const Navbar = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="navbar">
      <div className="navbar-left" onClick={() => scrollTo('hero')}>
        <div className="navbar-dot" />
        <span className="navbar-brand">Cinematic Dev</span>
      </div>
      <nav className="navbar-nav">
        <button onClick={() => scrollTo('about')}>About</button>
        <button onClick={() => scrollTo('skills')}>Skills</button>
        <button onClick={() => scrollTo('projects')}>Projects</button>
        <button onClick={() => scrollTo('contact')}>Contact</button>
      </nav>
    </header>
  );
};

export default Navbar;
