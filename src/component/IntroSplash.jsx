import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import logoWhite from './image/white.png';

const INTRO_SESSION_KEY = 'andres_portfolio_intro_seen_v1';

const IntroSplash = ({ onComplete }) => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const completedRef = useRef(false);

  const finishIntro = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      // Ignore storage access restrictions
    }
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Skip splash if already shown in this session or user prefers reduced motion
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(INTRO_SESSION_KEY) === '1';
    } catch {
      alreadySeen = false;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (alreadySeen || prefersReducedMotion) {
      finishIntro();
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const tl = gsap.timeline({
      onComplete: finishIntro,
    });

    gsap.set([logoRef.current, titleRef.current, subtitleRef.current], { opacity: 0 });
    gsap.set([titleRef.current, subtitleRef.current], { y: 14 });

    // Snappy ~1.8s splash keeping the mountain + logo + name sequence without blocking LCP
    tl.to(logoRef.current, { opacity: 1, duration: 0.45, ease: 'power2.out' })
      .to(logoRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '+=0.3')
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, '-=0.1')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, '-=0.2')
      .to([titleRef.current, subtitleRef.current], { opacity: 0, y: -8, duration: 0.25, ease: 'power2.in' }, '+=0.25')
      .to(containerRef.current, { opacity: 0, duration: 0.2 });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      tl.kill();
    };
  }, [finishIntro]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        color: '#ffffff',
      }}
    >
      <div style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
        <img
          ref={logoRef}
          src={logoWhite}
          alt="Logo de Andrés Amuchástegui"
          width={140}
          height={168}
          style={{ width: '140px', height: 'auto', opacity: 0 }}
        />
      </div>

      <div style={{ position: 'absolute', textAlign: 'center', padding: '0 20px', pointerEvents: 'none' }}>
        <p
          ref={titleRef}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.8rem)',
            margin: '0 0 10px 0',
            fontWeight: '700',
            letterSpacing: '-1px',
          }}
        >
          Andrés Amuchástegui
        </p>
        <p
          ref={subtitleRef}
          style={{
            fontSize: 'clamp(1rem, 2.4vw, 1.65rem)',
            margin: 0,
            fontWeight: '300',
            color: '#a0b0d0',
          }}
        >
          Especialista en Web, Mobile &amp; AI
        </p>
      </div>

      <button
        type="button"
        onClick={finishIntro}
        aria-label="Saltar presentación"
        style={{
          position: 'absolute',
          bottom: '28px',
          right: '28px',
          background: 'rgba(26, 26, 28, 0.78)',
          color: '#d4d4d8',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '999px',
          padding: '8px 16px',
          fontSize: '0.82rem',
          cursor: 'pointer',
        }}
      >
        Saltar →
      </button>
    </div>
  );
};

export default IntroSplash;
