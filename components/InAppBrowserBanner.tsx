
import React, { useEffect, useState } from 'react';

const InAppBrowserBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica User Agent para TikTok, Instagram, Facebook
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isInApp = /TikTok|Instagram|FBAN|FBAV/i.test(ua);

    if (isInApp) {
      // Pequeno delay para não assustar assim que abre
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[60] px-4 pt-2 pointer-events-none">
      <div className="max-w-md mx-auto relative">
        
        {/* Seta animada apontando para os 3 pontinhos (Canto Superior Direito) */}
        <div className="absolute -top-1 right-2 flex flex-col items-end animate-bounce duration-1000">
          <div className="text-white font-bold text-xs mb-1 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">
            Toque aqui ↗
          </div>
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-white drop-shadow-lg transform rotate-[-20deg]"
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </div>

        {/* Card de Aviso */}
        <div className="mt-12 pointer-events-auto bg-white/95 backdrop-blur-md border-l-4 border-yellow-400 rounded-xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-4 duration-500 ring-1 ring-black/5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
                <span className="text-xl">⚠️</span> Links Bloqueados?
              </h3>
              <p className="text-slate-600 text-sm mt-1 leading-relaxed font-medium">
                O TikTok bloqueia downloads e o Discord.
              </p>
              <p className="text-slate-800 text-sm mt-2 font-bold">
                Para resolver:
                <br/>
                1. Toque nos <span className="text-lg leading-none">⋮</span> ou <span className="bg-slate-200 px-1 rounded text-xs">...</span> lá em cima.
                <br/>
                2. Escolha <span className="text-teal-600">"Abrir no Navegador"</span>.
              </p>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InAppBrowserBanner;
