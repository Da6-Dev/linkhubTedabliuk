
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

    // Verifica User Agent
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Log para ajudar a debugar se necessário
    console.log("User Agent detectado:", ua);

    // Regras de Detecção Expandidas:
    // 1. TikTok/Bytedance explícito
    // 2. Instagram/Facebook
    // 3. Android WebView (comum em todos os apps que abrem links internos no Android)
    const isTikTok = /TikTok|Musical_ly|Bytedance/i.test(ua);
    const isInstagram = /Instagram/i.test(ua);
    const isFacebook = /FBAN|FBAV|FB_IAB/i.test(ua);
    const isAndroidWebView = /Android/i.test(ua) && /wv/i.test(ua);

    if (isTikTok || isInstagram || isFacebook || isAndroidWebView) {
      // Pequeno delay para garantir que a renderização inicial não quebre a animação
      setTimeout(() => setIsVisible(true), 800);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[100] px-4 pt-2 pointer-events-none font-sans">
      <div className="max-w-md mx-auto relative">
        
        {/* Seta animada apontando para os 3 pontinhos (Canto Superior Direito) */}
        {/* Aumentei o z-index e o contraste */}
        <div className="absolute -top-1 right-2 flex flex-col items-end animate-bounce duration-1000 z-[101]">
          <div className="text-white font-extrabold text-xs mb-1 bg-red-600 px-3 py-1 rounded-full shadow-lg border border-white/20">
            CLIQUE AQUI ↗
          </div>
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] transform rotate-[-20deg]"
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
        <div className="mt-14 pointer-events-auto bg-white border-l-8 border-red-500 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-5 animate-in fade-in slide-in-from-top-4 duration-500 ring-1 ring-black/10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-black text-slate-900 text-base uppercase tracking-wider flex items-center gap-2 mb-2">
                <span className="text-2xl">🚫</span> Links não abrem?
              </h3>
              
              <p className="text-slate-800 text-sm font-bold leading-relaxed border-b border-slate-100 pb-2 mb-2">
                O TikTok bloqueia downloads e o Discord!
              </p>

              <div className="text-slate-700 text-sm space-y-1">
                <p>Para resolver agora:</p>
                <ol className="list-decimal pl-4 font-bold text-slate-900 space-y-1">
                  <li>Toque nos <span className="bg-slate-200 px-1.5 py-0.5 rounded text-xs border border-slate-300">3 pontinhos</span> ali em cima.</li>
                  <li>Selecione <span className="text-blue-600 underline decoration-2 underline-offset-2">Abrir no Navegador</span>.</li>
                </ol>
              </div>
            </div>
            
            {/* Botão de Fechar */}
            <button 
              onClick={() => setIsVisible(false)}
              className="text-slate-300 hover:text-slate-500 p-2 -mr-2 -mt-2 transition-colors"
              aria-label="Fechar aviso"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InAppBrowserBanner;
