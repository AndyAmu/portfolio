import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

const easeToCss = (ease) => {
  if (!ease) return 'ease-out';
  if (ease.toLowerCase().startsWith('back')) {
    // Rough cubic-bezier approximation of a back.inOut ease
    return 'cubic-bezier(0.68, -0.6, 0.32, 1.6)';
  }
  return ease;
};

const ScrollFloat = ({
  children,
  animationDuration = 1,
  ease = 'ease-out',
  scrollStart = 'center bottom+=50%', // kept for API shape, unused
  scrollEnd = 'bottom bottom-=40%',   // kept for API shape, unused
  stagger = 0.03,
}) => {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const items = useMemo(() => {
    const flat = Children.toArray(children);
    return flat.flatMap((child) => {
      if (typeof child === 'string') {
        return child.split('');
      }
      return [child];
    });
  }, [children]);

  useEffect(() => {
    if (!containerRef.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          setVisible(true);
          hasAnimatedRef.current = true;
          observer.disconnect();
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const timing = easeToCss(ease);
  const duration = `${animationDuration}s`;
  const delay = stagger;

  return (
    <span className="scroll-float" ref={containerRef} aria-hidden="true">
      {items.map((item, idx) => {
        const content =
          typeof item === 'string'
            ? item === ' ' ? '\u00A0' : item
            : cloneElement(item, { style: { ...(item.props?.style || {}), display: 'inline-block' } });

        return (
          <span
            key={`float-${idx}`}
            className={`scroll-float__letter${visible ? ' is-visible' : ''}`}
            style={{
              transitionDuration: duration,
              transitionDelay: `${idx * delay}s`,
              transitionTimingFunction: timing,
            }}
          >
            {content}
          </span>
        );
      })}
    </span>
  );
};

export default ScrollFloat;
