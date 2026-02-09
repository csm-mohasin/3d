import React, { createContext, useContext, useState } from 'react';

const ScrollContext = createContext(null);

export const ScrollProvider = ({ children }) => {
  const [scrollState, setScrollState] = useState({
    progress: 0,
    velocity: 0,
    isScrolling: false
  });

  return (
    <ScrollContext.Provider
      value={{
        scroll: scrollState,
        setScroll: setScrollState
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error('useScrollContext must be used within ScrollProvider');
  }
  return ctx;
};
