
import React, { useEffect, useState } from 'react';

const InAppBrowserBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Permite testar o banner no PC colocando ?debug_banner=true na URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug_banner') === 'true') {
      setIsVisible(true);
      return;
    }

    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

    // Lógica de detecção (Revertida para a que funcionava)
    // Detecta TikTok, Instagram, Facebook e WebViews de Android
    const isTikTok = /TikTok|Musical_ly|Bytedance/i.test(ua);
    const isInstagram = /Instagram/i.test(ua);
    const isFacebook = /FBAN|FBAV|FB_IAB/i.test(ua);
    const isAndroidWebView = /Android/i.test(ua) && /wv/i.test(ua);

    if (isTikTok || isInstagram || isFacebook || isAndroidWebView) {
      // Delay pequeno para garantir que a interface do app carregou
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-screen pointer-events-none font-sans">
      {/* Container Principal */}
      <div className="max-w-md mx-auto relative h-full">
        
        {/* SETA ANIMADA E TEXTO FLUTUANTE */}
        {/* Posicionado no canto superior direito absoluto, apontando para os 3 pontinhos */}
        <div className="absolute top-2 right-2 flex flex-col items-end animate-bounce duration-1000 z-[102]">
          <div className="text-white font-bold text-[10px] uppercase tracking-wide bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg mb-1 border border-white/20 shadow-sm">
            Toque aqui ↗
          </div>
          {/* Seta SVG desenhada para apontar para o canto superior direito */}
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-white drop-shadow-md rotate-12"
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" /> {/* Linha diagonal apontando pra cima/direita */}
            <path d="M7 7h10v10" /> {/* Cabeça da seta */}
          </svg>
        </div>

        {/* CARD DE AVISO (Visual Limpo/Glassmorphism) */}
        <div className="absolute top-16 left-4 right-4 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-start gap-4">
              
              {/* Ícone Informativo (não alarmante) */}
              <div className="bg-teal-100 p-2.5 rounded-full shrink-0 text-teal-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-sm mb-1">
                  Melhore sua experiência
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">
                  O navegador deste aplicativo pode bloquear downloads e o Discord.
                </p>
                
                <div className="bg-slate-50 rounded-lg p-2 text-xs text-slate-600 border border-slate-100">
                  <p className="mb-1">Para corrigir:</p>
                  <ol className="list-decimal pl-4 space-y-1 font-medium">
                    <li>Toque nos <strong className="text-slate-800">3 pontinhos</strong> (canto superior).</li>
                    <li>Escolha <strong className="text-teal-600">Abrir no Navegador</strong>.</li>
                  </ol>
                </div>
              </div>

              {/* Botão Fechar discreto */}
              <button 
                onClick={() => setIsVisible(false)}
                className="text-slate-400 hover:text-slate-600 p-1 -mt-1 -mr-1"
                aria-label="Fechar"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InAppBrowserBanner;
