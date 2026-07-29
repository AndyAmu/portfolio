import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GSAPText = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    if (/<[a-z][\s\S]*>/i.test(text)) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    } else {
      gsap.to(containerRef.current.querySelectorAll('.gsap-word'), {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.out',
        startAt: { opacity: 0, y: 10 }
      });
    }
  }, [text]);

  if (/<[a-z][\s\S]*>/i.test(text)) {
    return (
      <div 
        ref={containerRef} 
        style={{ opacity: 0 }} 
        dangerouslySetInnerHTML={{ __html: text }} 
      />
    );
  }

  // Animación palabra por palabra si es texto plano
  const words = text.split(' ');

  return (
    <div ref={containerRef} style={{ display: 'inline-block' }}>
      {words.map((word, index) => (
        <span
          key={index}
          className="gsap-word"
          style={{ display: 'inline-block', opacity: 0, marginRight: '0.25em' }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default GSAPText;
