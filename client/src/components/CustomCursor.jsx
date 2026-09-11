import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [coords, setCoords] = useState({ x: -100, y: -100 });

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        setIsTouchDevice(true);
      }
    };
    checkTouch();

    if (isTouchDevice) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCoords({ x: mouseX, y: mouseY });

      // Check if target or parent is interactive
      const target = e.target;
      const isInteractive = target.closest('button, a, input, select, textarea, .interactive-card, [data-cursor="hover"]');
      setIsHovered(!!isInteractive);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Smooth lerp loop for outer ring
    let animationFrameId;
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Inner Dot */}
      <div
        ref={dotRef}
        style={{
          transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`
        }}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#FFF449] transition-transform duration-75 ease-out shadow-[0_0_10px_#FFF449] ${
          isClicked ? 'scale-150' : 'scale-100'
        }`}
      />

      {/* Outer Glowing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 w-10 h-10 rounded-full border-2 border-[#B2D959]/70 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(178,217,89,0.3)] ${
          isHovered
            ? 'scale-150 bg-[#7EC151]/15 border-[#FFF449] shadow-[0_0_25px_rgba(255,244,73,0.5)]'
            : 'scale-100 bg-transparent'
        } ${isClicked ? 'scale-90 bg-[#FFF449]/30' : ''}`}
      />
    </div>
  );
}
