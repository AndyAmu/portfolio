import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { safeSetHTML } from '../utils/sanitizeHtml';

const HTML_TAG_REGEX = /<[a-z][\s\S]*>/i;

const GSAPText = ({ text }) => {
  const containerRef = useRef(null);
  const hasHtml = HTML_TAG_REGEX.test(text || '');

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasHtml) {
      safeSetHTML(node, text);
      if (prefersReducedMotion) {
        gsap.set(node, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          node,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
        );
      }
      return;
    }

    const words = node.querySelectorAll('.gsap-word');
    if (prefersReducedMotion) {
      gsap.set(words, { opacity: 1, y: 0 });
    } else {
      gsap.fromTo(
        words,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.02, ease: 'power2.out' }
      );
    }
  }, [text, hasHtml]);

  if (hasHtml) {
    return <div ref={containerRef} className="bot-rich-text" />;
  }

  const words = String(text || '').split(' ');

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
