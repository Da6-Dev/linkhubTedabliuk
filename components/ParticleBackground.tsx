
import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  darkMode: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particleCount = window.innerWidth < 768 ? 30 : 60; // Menos partículas no mobile
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1, // Quadrados variados
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Define cor baseado no tema
      const color = darkMode ? '255, 255, 255' : '15, 23, 42';

      particles.forEach((p) => {
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        // Desenhando quadrado (estilo Minecraft)
        ctx.fillRect(p.x, p.y, p.size, p.size);

        // Movimento (subindo devagar)
        p.y -= p.speed;

        // Resetar se sair da tela
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-colors duration-700"
    />
  );
};

export default ParticleBackground;
