import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logoWhite from './image/white.png';

const IntroSplash = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Initial setup
    gsap.set([logoRef.current, titleRef.current, subtitleRef.current], { opacity: 0 });
    gsap.set(titleRef.current, { y: 20 });
    gsap.set(subtitleRef.current, { y: 20 });

    // Logo phase
    tl.to(logoRef.current, { opacity: 1, duration: 1.2, ease: 'power2.out' })
      .to(logoRef.current, { opacity: 0, duration: 0.8, ease: 'power2.in' }, "+=1.5")
      
      // Text phase
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.2")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.4")
      
      // Hold text, then fade out text
      .to([titleRef.current, subtitleRef.current], { opacity: 0, y: -10, duration: 0.8, ease: 'power2.in' }, "+=2.5")
      
      // Fade out the whole container to be safe
      .to(containerRef.current, { opacity: 0, duration: 0.5 });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        pointerEvents: 'none', /* Prevent interaction block */
        color: '#ffffff'
      }}
    >
      {/* Logo container */}
      <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img 
          ref={logoRef} 
          src={logoWhite} 
          alt="Andrés Amuchástegui Logo" 
          style={{ width: '150px', height: 'auto', opacity: 0 }} 
        />
      </div>
      
      {/* Text container */}
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <h1 
          ref={titleRef} 
          style={{ 
            fontSize: 'clamp(2rem, 5vw, 4rem)', 
            margin: '0 0 10px 0', 
            fontWeight: '700',
            letterSpacing: '-1px'
          }}
        >
          Andrés Amuchástegui
        </h1>
        <h2 
          ref={subtitleRef} 
          style={{ 
            fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', 
            margin: 0, 
            fontWeight: '300', 
            color: '#a0b0d0' /* Soft blue-ish tint to match mountain theme */
          }}
        >
          Especialista en Web, Mobile &amp; AI
        </h2>
      </div>
    </div>
  );
};

export default IntroSplash;
