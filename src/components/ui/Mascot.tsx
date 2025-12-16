
import React, { useState, useEffect, useRef } from 'react';

interface MascotProps {
  username: string; // Nick do Minecraft
}

const PHRASES = [
  "Não esquece de seguir! 👇",
  "Entra no Discord! 👾",
  "Baixa meus mapas! 🗺️",
  "Opa, tudo bão? 🤠",
  "Clica nos links! ✨",
  "Vem ver o vídeo novo! 🎥"
];

const Mascot: React.FC<MascotProps> = ({ username }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bubbleText, setBubbleText] = useState(PHRASES[0]);
  const [isVisible, setIsVisible] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<any>(null);

  // Aparecer suavemente após carregar
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Inicializar o Viewer 3D
  useEffect(() => {
    if (!canvasRef.current || !window.skinview3d) return;

    try {
      const skinview3d = window.skinview3d;
      
      // Cria o visualizador
      const viewer = new skinview3d.SkinViewer({
        canvas: canvasRef.current,
        width: 150, // Tamanho interno de renderização
        height: 240,
        skin: `https://mineskin.eu/skin/${username}`,
        alpha: true, // Fundo transparente
      });

      // Configurações iniciais
      viewer.camera.position.x = 20; // Leve ângulo
      viewer.camera.position.y = 10;
      viewer.camera.position.z = 40;
      viewer.zoom = 0.9;
      
      // Animação inicial: Idle (Respirando)
      viewer.animation = new skinview3d.IdleAnimation();
      viewer.animation.speed = 0.8;

      // Habilitar controles do mouse (rotação)
      viewer.controls.enableZoom = false;
      viewer.controls.enableRotate = true;
      viewer.controls.enablePan = false;

      viewerRef.current = viewer;

      return () => {
        viewer.dispose();
      };
    } catch (error) {
      console.error("Erro ao carregar skinview3d", error);
    }
  }, [username]);

  // Trocar frase aleatoriamente a cada X segundos ou quando interagir
  const changePhrase = () => {
    const random = Math.floor(Math.random() * PHRASES.length);
    setBubbleText(PHRASES[random]);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    changePhrase();
    // Muda animação para "Andando" quando passa o mouse
    if (viewerRef.current && (window as any).skinview3d) {
      viewerRef.current.animation = new (window as any).skinview3d.WalkingAnimation();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Volta para animação Idle
    if (viewerRef.current && (window as any).skinview3d) {
      viewerRef.current.animation = new (window as any).skinview3d.IdleAnimation();
    }
  };

  return (
    <div className={`fixed bottom-0 right-8 z-40 hidden md:flex flex-col items-end pointer-events-none transition-transform duration-700 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      
      {/* Balão de Fala (Aparece no Hover ou Click) */}
      <div 
        className={`
          mb-0 mr-8 bg-white text-slate-900 px-4 py-2 rounded-2xl rounded-br-none shadow-xl border-2 border-slate-900
          transform transition-all duration-300 origin-bottom-right z-50
          ${isHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-8'}
        `}
      >
        <p className="font-bold text-sm whitespace-nowrap">{bubbleText}</p>
      </div>

      {/* Canvas 3D */}
      <div 
        className="relative pointer-events-auto cursor-grab active:cursor-grabbing"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={changePhrase}
        title="Arraste para girar!"
      >
        <canvas 
          ref={canvasRef} 
          className="w-150 h-240 drop-shadow-2xl filter"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Sombra no pé simulada (caso o 3D não tenha sombra projetada no chão) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/20 blur-md rounded-full pointer-events-none" />
      </div>
    </div>
  );
};

export default Mascot;
