
import React, { useEffect, useState } from 'react';
import { DownloadIcon, DiscordIcon } from '../widgets/Icons';

const InAppBrowserBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [, setOsType] = useState<'ios' | 'android' | 'other'>('other');

  useEffect(() => {
    // Debug mode
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug_banner') === 'true') {
      setIsVisible(true);
      return;
    }

    const ua = navigator.userAgent || navigator.vendor || window.opera;
    
    // Detect OS for specific instructions
    if (/iPad|iPhone|iPod/.test(ua)) setOsType('ios');
    else if (/android/i.test(ua)) setOsType('android');

    // Detection Logic
    const isTikTok = /TikTok|Musical_ly|Bytedance/i.test(ua);
    const isInstagram = /Instagram/i.test(ua);
    const isFacebook = /FBAN|FBAV|FB_IAB/i.test(ua);
    
    // Android WebView check (generic)
    const isAndroidWebView = /Android/i.test(ua) && /wv/i.test(ua);

    if (isTikTok || isInstagram || isFacebook || isAndroidWebView) {
      setTimeout(() => setIsVisible(true), 300);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-9999 flex flex-col font-sans">
      
      {/* 1. Background Blur Layer */}
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl z-0">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px]"></div>
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col px-6 py-8">
        
        {/* --- SETA INDICATIVA (PERSONALIZADA) --- */}
        <div className="absolute top-4 right-6 flex flex-col items-center animate-bounce duration-1500 z-50">
          
          {/* Seta Girada em 60 Graus */}
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#2dd4bf" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="rotate-60 drop-shadow-[0_0_15px_rgba(45,212,191,0.6)]"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>

          {/* Texto Abaixo da Seta */}
          <div className="mt-2 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-bold border border-teal-500/30 shadow-xl tracking-wide whitespace-nowrap">
            Toque aqui ↗
          </div>

        </div>

        {/* --- CONTEÚDO CENTRAL --- */}
        <div className="flex-1 flex flex-col items-center justify-center text-center mt-12 space-y-8">
          
          {/* Icon Circle */}
          <div className="relative">
             <div className="absolute inset-0 bg-teal-400 blur-2xl opacity-20 rounded-full animate-pulse"></div>
             <div className="w-20 h-20 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center shadow-2xl relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                  <path d="M2 12h20"/>
                </svg>
             </div>
             {/* Badge de Alerta */}
             <div className="absolute -top-2 -right-2 bg-yellow-500 text-slate-900 text-xs font-black px-2 py-0.5 rounded shadow-lg border border-slate-900 z-20">
               !
             </div>
          </div>

          {/* Titles */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Abra no Navegador
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-280 mx-auto">
              Para fazer downloads e acessar o Discord, você precisa sair do modo restrito.
            </p>
          </div>

          {/* Instructions Card */}
          <div className="w-full max-w-sm bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 text-left shadow-xl">
             <div className="flex flex-col gap-4">
               
               {/* Step 1 */}
               <div className="flex items-center gap-4">
                 <div className="shrink-0 w-10 h-10 rounded-full bg-slate-700/80 flex items-center justify-center border border-slate-600 font-bold text-slate-300">
                   1
                 </div>
                 <div>
                   <p className="text-white font-medium text-base">
                     Encontre as opções no canto superior direito
                   </p>
                 </div>
               </div>

               <div className="w-0.5 h-6 bg-slate-700 ml-5"></div>

               {/* Step 2 */}
               <div className="flex items-center gap-4">
                 <div className="shrink-0 w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.4)] text-slate-900 font-bold">
                   2
                 </div>
                 <div>
                   <p className="text-white font-medium text-base">
                     Selecione <br/>
                     <span className="text-teal-400 font-bold text-lg">Abrir no Navegador</span>
                   </p>
                 </div>
               </div>

             </div>
          </div>

          {/* Preview do que está perdendo (Botões Bloqueados Visualmente) */}
          <div className="w-full max-w-sm opacity-50 grayscale pointer-events-none scale-95 mt-4">
             <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">Conteúdo Bloqueado</div>
             <div className="flex gap-2">
                <div className="flex-1 bg-slate-800 p-3 rounded-lg border border-slate-700 flex items-center justify-center gap-2">
                  <DownloadIcon className="w-4 h-4" /> <span className="text-xs font-bold">Mapas</span>
                </div>
                <div className="flex-1 bg-slate-800 p-3 rounded-lg border border-slate-700 flex items-center justify-center gap-2">
                  <DiscordIcon className="w-4 h-4" /> <span className="text-xs font-bold">Discord</span>
                </div>
             </div>
          </div>

        </div>

        {/* Footer Link */}
        <div className="mt-auto pt-6 pb-2 text-center">
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-500 text-sm hover:text-white transition-colors underline decoration-slate-700 underline-offset-4"
          >
            Tentar navegar assim mesmo
          </button>
        </div>

      </div>
    </div>
  );
};

export default InAppBrowserBanner;
