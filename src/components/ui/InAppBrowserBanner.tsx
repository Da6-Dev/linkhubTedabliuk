import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InAppBrowserBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Regex para detectar TikTok, Instagram, Facebook e WebViews genéricas
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isInApp = /Instagram|TikTok|Musical_ly|LinkedIn|Snapchat|FBAN|FBAV|FB_IAB/i.test(userAgent);
    
    // Para testar no PC, descomente a linha abaixo:
    // setIsVisible(true);
    
    if (isInApp) {
      setIsVisible(true);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          
          {/* 1. FUNDO ESCURO (Bloqueia tudo) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            onClick={handleClose}
          />

          {/* 2. SETA GIGANTE APONTANDO PARA OS 3 PONTINHOS REAIS */}
          {/* Fica fixa no topo direito da tela, onde geralmente estão os botões do app */}
          <motion.div
            initial={{ opacity: 0, y: 50, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute top-2 right-4 md:top-4 md:right-8 z-10000 pointer-events-none flex flex-col items-end"
          >
            <span className="text-white font-black text-xl mb-2 drop-shadow-md bg-red-600 px-3 py-1 rounded-full -rotate-6">
              CLIQUE AQUI!
            </span>
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 100 100" 
              fill="none" 
              className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            >
              {/* Seta curva apontando para cima/direita */}
              <path 
                d="M20 80 Q 50 20 90 10" 
                stroke="currentColor" 
                strokeWidth="8" 
                strokeLinecap="round" 
                markerEnd="url(#arrowhead)"
              />
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                </marker>
              </defs>
            </svg>
          </motion.div>

          {/* 3. CARD CENTRAL */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-sm bg-slate-900 border-2 border-red-500/50 rounded-[2.5rem] p-6 shadow-2xl overflow-hidden flex flex-col items-center text-center"
          >
            {/* Ícone de Alerta Piscando */}
            <div className="mb-4">
               <motion.div 
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ repeat: Infinity, duration: 1 }}
                 className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                 </svg>
               </motion.div>
            </div>

            <h2 className="text-3xl font-black text-white leading-none mb-2">
              DOWNLOAD <br/> BLOQUEADO!
            </h2>
            
            <p className="text-slate-300 text-lg font-medium leading-tight mb-6">
              O TikTok/Instagram não deixa baixar arquivos.
            </p>

            {/* Ilustração Visual do que fazer */}
            <div className="w-full bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-6">
               <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold text-white text-xl">1</div>
                  <div className="text-left text-white font-bold text-lg leading-tight">
                    Clique nos <span className="text-amber-400">3 pontinhos</span> lá em cima ↗
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold text-white text-xl">2</div>
                  <div className="text-left text-white font-bold text-lg leading-tight">
                    Escolha <br/> <span className="text-green-400">Abrir no Navegador</span>
                  </div>
               </div>
            </div>

            {/* Botão de Copiar (Plano B) */}
            <p className="text-slate-400 text-sm mb-2 font-bold uppercase tracking-widest">
              Ou copie e cole no Chrome
            </p>
            
            <motion.button
              onClick={handleCopyLink}
              whileTap={{ scale: 0.95 }}
              className={`
                w-full py-4 rounded-xl font-black text-xl flex items-center justify-center gap-2 transition-all shadow-lg
                ${copied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white text-slate-900 hover:scale-105'}
              `}
            >
              {copied ? (
                <>LINK COPIADO! ✓</>
              ) : (
                <>COPIAR LINK</>
              )}
            </motion.button>

            <button onClick={handleClose} className="mt-4 text-slate-500 underline text-sm py-2">
              Tentar baixar mesmo assim (não recomendado)
            </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InAppBrowserBanner;