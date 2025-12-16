import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InAppBrowserBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Detecta navegadores "ruins" (In-App Browsers)
    const userAgent = navigator.userAgent || navigator.vendor;
    const isInApp = /Instagram|TikTok|LinkedIn|Snapchat/i.test(userAgent);
    
    // Só mostra se for in-app e se o usuário ainda não fechou antes
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
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          
          {/* 1. FUNDO ESCURO (Backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* 2. O CARD FLUTUANTE */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm bg-slate-900/90 border border-teal-500/30 rounded-4xl p-6 shadow-[0_0_50px_rgba(20,184,166,0.2)] overflow-hidden"
          >
            {/* Efeitos de Luz de Fundo */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />

            {/* Ícone de Alerta Animado */}
            <div className="flex justify-center mb-6">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="relative"
              >
                <div className="w-20 h-20 bg-linear-to-tr from-teal-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                {/* Ondas de alerta */}
                <div className="absolute inset-0 border-2 border-teal-500/50 rounded-full animate-ping" />
              </motion.div>
            </div>

            {/* Texto */}
            <div className="text-center space-y-3 relative z-10">
              <h2 className="text-2xl font-black text-white">
                Navegador Limitado!
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Você está usando o navegador do TikTok/Insta. 
                <br />
                <span className="text-teal-400 font-bold">Downloads e Mapas podem falhar.</span>
              </p>
            </div>

            {/* Instrução Visual */}
            <div className="mt-6 bg-black/40 rounded-xl p-4 border border-white/5 relative z-10">
              <div className="flex items-center gap-3 text-sm text-slate-300 mb-3">
                <span className="w-6 h-6 flex items-center justify-center bg-slate-700 rounded-full text-xs font-bold shrink-0">1</span>
                <span>Clique nos <span className="font-bold text-white">3 pontinhos</span> (•••)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-6 h-6 flex items-center justify-center bg-slate-700 rounded-full text-xs font-bold shrink-0">2</span>
                <span>Escolha <span className="font-bold text-white">Abrir no Chrome/Safari</span></span>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="mt-6 flex flex-col gap-3 relative z-10">
              
              {/* Botão Copiar Link (Alternativa Inteligente) */}
              <button
                onClick={handleCopyLink}
                className={`
                  w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                  ${copied 
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                    : 'bg-white text-slate-900 hover:bg-slate-200 shadow-lg'}
                `}
              >
                {copied ? (
                  <>Copiado! ✓</>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Copiar Link
                  </>
                )}
              </button>

              {/* Botão Fechar (Discreto) */}
              <button
                onClick={handleClose}
                className="w-full py-3 text-slate-400 text-sm font-medium hover:text-white transition-colors"
              >
                Continuar assim mesmo (risco de erro)
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InAppBrowserBanner;