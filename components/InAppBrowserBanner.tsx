
import React, { useEffect, useState } from 'react';
import { DownloadIcon, DiscordIcon } from './Icons';

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

    // Lógica de detecção
    const isTikTok = /TikTok|Musical_ly|Bytedance/i.test(ua);
    const isInstagram = /Instagram/i.test(ua);
    const isFacebook = /FBAN|FBAV|FB_IAB/i.test(ua);
    const isAndroidWebView = /Android/i.test(ua) && /wv/i.test(ua);

    if (isTikTok || isInstagram || isFacebook || isAndroidWebView) {
      // Delay pequeno para garantir que a interface do app carregou
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/98 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center font-sans overflow-hidden">
      
      {/* Background Grid Pattern (Decorativo) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* SETA GIGANTE ANIMADA - Apontando para o menu nativo */}
      <div className="absolute top-2 right-4 flex flex-col items-end animate-bounce duration-1000 z-[1000]">
        <div className="bg-white text-slate-900 font-black text-xs px-4 py-2 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] mb-2 uppercase tracking-wider border-2 border-teal-400">
          1. Toque aqui ↗
        </div>
        <svg 
          width="64" 
          height="64" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="rotate-[30deg] drop-shadow-[0_4px_10px_rgba(0,0,0,1)] text-teal-400"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </div>

      <div className="relative z-10 max-w-md w-full animate-in zoom-in duration-300 flex flex-col items-center">
        
        {/* Ícone de Alerta */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="w-24 h-24 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-2 border-slate-700 flex items-center justify-center shadow-2xl relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md border border-slate-900">
              ERRO
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight tracking-tight">
          Navegador Bloqueado
        </h1>
        <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8 max-w-xs mx-auto">
          O TikTok/Instagram impede downloads e acesso ao Discord.
        </p>

        {/* Instruções Visuais */}
        <div className="w-full bg-slate-900/80 rounded-2xl p-6 border border-slate-700/50 shadow-2xl mb-8 text-left backdrop-blur-sm">
          <h3 className="text-teal-400 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            Solução Obrigatória:
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 group">
              <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-slate-800 text-white font-bold border border-slate-600 group-hover:border-teal-500 transition-colors">1</span>
              <p className="text-slate-200 font-bold text-sm">Toque nos <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-600 text-white">3 pontinhos</span> ou ícone acima.</p>
            </div>
            <div className="flex items-center gap-4 group">
              <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-teal-500 text-slate-900 font-bold shadow-[0_0_15px_rgba(20,184,166,0.5)]">2</span>
              <p className="text-white font-bold text-sm">Escolha <span className="text-teal-400 underline decoration-2 underline-offset-4 decoration-teal-500/50">Abrir no Navegador</span>.</p>
            </div>
          </div>
        </div>

        {/* Simulação de Botões Bloqueados */}
        <div className="w-full space-y-3 opacity-60 grayscale pointer-events-none select-none relative scale-95">
          {/* Faixa de Bloqueio */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
             <div className="bg-red-600 text-white font-black text-sm px-6 py-2 rounded shadow-2xl border-2 border-white/20 rotate-[-8deg] tracking-widest">
               BLOQUEADO 🔒
             </div>
          </div>
          
          {/* Botão Fake 1 */}
          <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-slate-700 rounded-lg"><DownloadIcon className="w-5 h-5 text-slate-500" /></div>
               <span className="font-bold text-slate-400">Baixar Mapa (Bedrock)</span>
            </div>
          </div>
           {/* Botão Fake 2 */}
           <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-slate-700 rounded-lg"><DiscordIcon className="w-5 h-5 text-slate-500" /></div>
               <span className="font-bold text-slate-400">Entrar no Discord</span>
            </div>
          </div>
        </div>

        {/* Botão de saída de emergência (Discreto) */}
        <button 
          onClick={() => setIsVisible(false)} 
          className="mt-8 text-[10px] font-medium text-slate-700 uppercase tracking-widest hover:text-slate-500 transition-colors"
        >
          Continuar mesmo assim (Pode falhar)
        </button>

      </div>
    </div>
  );
};

export default InAppBrowserBanner;
