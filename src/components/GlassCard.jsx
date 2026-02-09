import React from 'react';

const GlassCard = ({ children, className = '' }) => (
  <article className={`glass-card ${className}`}>
    <div className="glass-card-inner">{children}</div>
  </article>
);

export default GlassCard;
