
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
        {/* Posicionada para apontar explicitamente para o canto superior direito */}
        <div className="absolute top-1 right-3 flex flex-col items-end animate-bounce duration-1000 z-[102]">
          <div className="text-white font-extrabold text-xs uppercase tracking-wide bg-slate-900 px-3 py-1.5 rounded-lg mb-1 shadow-lg border border-white/20">
            CLIQUE AQUI ↗
          </div>
          {/* Seta maior e com sombra forte para contraste */}
          <svg 
            width="56" 
            height="56" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-white drop-shadow-[0_4px_3px_rgba(0,0,0,0.8)] transform -rotate-[25deg] -mr-2"
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </div>

        {/* CARD DE AVISO (Fundo sólido e texto grande) */}
        <div className="absolute top-24 left-4 right-4 pointer-events-auto">
          <div className="bg-white border-l-8 border-teal-500 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.3)] p-5 animate-in fade-in slide-in-from-top-4 duration-700 ring-1 ring-black/5">
            <div className="flex flex-col gap-3">
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight mb-2">
                    Links Bloqueados?
                  </h3>
                  <p className="text-slate-800 text-base font-medium leading-snug">
                    O TikTok/Instagram impede downloads e acesso ao Discord.
                  </p>
                </div>
                
                {/* Botão Fechar Mais Visível */}
                <button 
                  onClick={() => setIsVisible(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-full transition-colors -mt-2 -mr-2"
                  aria-label="Fechar aviso"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Como resolver:</p>
                <ol className="list-decimal pl-5 space-y-2 text-base font-bold text-slate-900">
                  <li>Toque nos <span className="bg-slate-200 px-1.5 rounded">3 pontinhos</span> lá em cima.</li>
                  <li>Escolha <span className="text-teal-700 underline decoration-2 underline-offset-2">Abrir no Navegador</span>.</li>
                </ol>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InAppBrowserBanner;
