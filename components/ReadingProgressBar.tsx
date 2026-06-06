'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress((currentScrollY / scrollHeight) * 100);
      } else {
        setProgress(0);
      }
    };
    
    window.addEventListener('scroll', updateScroll);
    updateScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '4px',
        backgroundColor: '#58a6ff',
        zIndex: 1000,
        transition: 'width 0.1s ease-out',
        boxShadow: '0 0 10px rgba(88, 166, 255, 0.5)'
      }} 
    />
  );
}
