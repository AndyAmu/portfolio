import React, { useEffect, useRef } from 'react';

const LETTERS = '01/#$%&@[]{}<>!=?+-';

const LetterGlitch = ({
  glitchSpeed = 50,
  centerVignette = true,
  outerVignette = false,
  smooth = true,
}) => {
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    const drawFrame = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.fillStyle = smooth ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.28)';
      ctx.fillRect(0, 0, width, height);

      const density = Math.max(20, Math.floor((width * height) / 9000));
      for (let i = 0; i < density; i += 1) {
        const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
        const x = Math.random() * width;
        const y = Math.random() * height;
        const hue = 160 + Math.random() * 120;
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.7)`;
        ctx.font = '16px Menlo, Consolas, monospace';
        ctx.fillText(letter, x, y);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    drawFrame();
    intervalRef.current = setInterval(drawFrame, Math.max(glitchSpeed, 16));

    return () => {
      window.removeEventListener('resize', resize);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [glitchSpeed, smooth]);

  return (
    <div className="letter-glitch-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="letter-glitch-canvas" />
      
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <defs>
          <mask id="mask-l1">
            <rect width="100" height="100" fill="white" />
            <path d="M0,65 L15,55 L25,65 L45,50 L60,65 L80,45 L100,60 L100,100 L0,100 Z" fill="black" />
          </mask>
          <mask id="mask-l2">
            <rect width="100" height="100" fill="white" />
            <path d="M0,75 Q20,65 40,80 T80,65 L100,75 L100,100 L0,100 Z" fill="black" />
          </mask>
          <mask id="mask-l3">
            <rect width="100" height="100" fill="white" />
            <path d="M0,90 Q30,75 50,95 T100,85 L100,100 L0,100 Z" fill="black" />
          </mask>
        </defs>
        
        {/* Sky: Solid black down to the Patagonian peaks */}
        <path d="M0,60 L10,55 L15,60 L25,25 L28,30 L35,5 L40,20 L45,15 L50,45 L65,30 L75,50 L85,35 L100,55 L100,0 L0,0 Z" fill="#000000" />
        
        {/* Layer 1 (Back): Sharp Patagonian Peaks */}
        <path d="M0,60 L10,55 L15,60 L25,25 L28,30 L35,5 L40,20 L45,15 L50,45 L65,30 L75,50 L85,35 L100,55 L100,100 L0,100 Z" fill="rgba(100, 130, 180, 0.35)" mask="url(#mask-l1)" />
        
        {/* Snow Caps for Layer 1 Peaks */}
        <path d="M20.7,40 L25,25 L28,30 L26,35 L23,34 Z M31.1,19 L35,5 L40,20 L45,15 L47,27 L42,22 L38,25 L34,22 Z M57,38 L65,30 L71,42 L68,36 L64,40 L61,37 Z M80.3,42 L85,35 L91,43 L88,38 L84,41 Z" fill="rgba(255, 255, 255, 0.85)" />

        {/* Layer 2: Rocky Foothills */}
        <path d="M0,65 L15,55 L25,65 L45,50 L60,65 L80,45 L100,60 L100,100 L0,100 Z" fill="rgba(60, 90, 150, 0.45)" mask="url(#mask-l2)" />
        
        {/* Layer 3: Rolling Hills */}
        <path d="M0,75 Q20,65 40,80 T80,65 L100,75 L100,100 L0,100 Z" fill="rgba(30, 50, 100, 0.6)" mask="url(#mask-l3)" />
        
        {/* Layer 4 (Front): Foreground */}
        <path d="M0,90 Q30,75 50,95 T100,85 L100,100 L0,100 Z" fill="rgba(10, 15, 30, 0.85)" />
      </svg>
      {centerVignette && <div className="letter-glitch-vignette center" />}
      {outerVignette && <div className="letter-glitch-vignette outer" />}
    </div>
  );
};

export default LetterGlitch;
