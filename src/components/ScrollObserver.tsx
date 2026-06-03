'use client'

import { useEffect } from 'react'

export default function ScrollObserver() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    
    // Initial hidden state for elements below viewport
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal-hidden');
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => { 
            entry.target.classList.remove('reveal-hidden'); 
            entry.target.classList.add('visible'); 
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => { 
      if (el.classList.contains('reveal-hidden')) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
