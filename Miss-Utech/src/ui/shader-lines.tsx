import React, { useEffect, useRef } from 'react';
// CORRECTED: Changed "../../lib/utils" to "../lib/utils"
import { cn } from '../lib/utils';

interface ShaderLinesProps {
  className?: string;
}

export const ShaderLines: React.FC<ShaderLinesProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const lines = 15;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 + (i / lines) * 0.1})`;
        
        const y = (canvas.height / lines) * i + Math.sin(time + i) * 50;
        ctx.moveTo(0, y);
        
        for (let x = 0; x < canvas.width; x += 10) {
          const curve = Math.sin(x * 0.001 + time + i) * 50;
          ctx.lineTo(x, y + curve);
        }
        
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
    />
  );
};
