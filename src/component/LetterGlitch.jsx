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
      {centerVignette && <div className="letter-glitch-vignette center" />}
      {outerVignette && <div className="letter-glitch-vignette outer" />}
    </div>
  );
};

export default LetterGlitch;
