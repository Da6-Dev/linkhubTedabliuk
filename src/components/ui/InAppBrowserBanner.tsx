import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InAppBrowserBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Lista de códigos que identificam navegadores internos (WebView)
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Expressão regular turbinada para pegar TikTok, Insta, Facebook, LinkedIn, etc.
    const isInApp = /Instagram|TikTok|Musical_ly|LinkedIn|Snapchat|FBAN|FBAV|FB_IAB/i.test(userAgent);
    
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
        <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-lg"
          />

          {/* Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm bg-slate-900 border border-teal-500/50 rounded-4xl p-6 shadow-2xl overflow-hidden"
          >
            {/* Efeitos visuais */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
               {/* Ícone Atenção */}
               <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mb-4 border border-amber-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
               </div>

               <h2 className="text-2xl font-black text-white mb-2">Atenção!</h2>
               <p className="text-slate-300 text-sm leading-relaxed mb-6">
                 Você está no navegador do TikTok/Insta.
                 <br />
                 <span className="text-red-400 font-bold">Downloads podem falhar aqui.</span>
               </p>

               {/* Passos */}
               <div className="w-full bg-slate-800/50 rounded-xl p-4 text-left space-y-3 border border-white/5 mb-6">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="w-6 h-6 flex items-center justify-center bg-teal-900 text-teal-400 rounded-full text-xs font-bold shrink-0">1</span>
                    <span>Clique nos <span className="text-white font-bold">3 pontinhos</span> (•••)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="w-6 h-6 flex items-center justify-center bg-teal-900 text-teal-400 rounded-full text-xs font-bold shrink-0">2</span>
                    <span>Escolha <span className="text-white font-bold">Abrir no Navegador</span></span>
                  </div>
               </div>

               {/* Botões */}
               <button
                onClick={handleCopyLink}
                className={`
                  w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mb-3
                  ${copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-slate-900 hover:bg-slate-200'}
                `}
              >
                {copied ? "Link Copiado!" : "Copiar Link e Abrir no Chrome"}
              </button>
              
              <button onClick={handleClose} className="text-slate-500 text-xs font-medium py-2">
                Dispensar aviso
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InAppBrowserBanner;