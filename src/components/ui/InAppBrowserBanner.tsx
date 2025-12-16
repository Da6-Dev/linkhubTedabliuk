import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Ícone de seta limpo e profissional (Arrow Up Right)
const ArrowUpRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" />
  </svg>
);

const InAppBrowserBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isInApp = /Instagram|TikTok|Musical_ly|LinkedIn|Snapchat|FBAN|FBAV|FB_IAB/i.test(userAgent);
    const isTestMode = window.location.search.includes('test=1');

    if (isInApp || isTestMode) {
      setIsVisible(true);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href.split('?')[0]);
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
          
          {/* Fundo Escuro (Fade simples) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* SETA FIXA E LIMPA (Sem animação de pulsar) */}
          {/* Fica parada no topo direito, apontando para o canto */}
          <div className="fixed top-12 right-4 z-10000 pointer-events-none flex flex-col items-end">
            <div className="bg-white text-black font-black text-sm uppercase tracking-wider px-3 py-1.5 rounded mb-1 shadow-lg">
              Clique nos 3 Pontos
            </div>
            {/* Ícone gigante e limpo */}
            <ArrowUpRightIcon className="w-24 h-24 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Card Central (Entrada rápida e sólida) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }} // Animação mais seca e rápida
            className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center z-9999"
          >
            
            <div className="mb-4">
               <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center border-2 border-red-500/50">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                 </svg>
               </div>
            </div>

            <h2 className="text-2xl font-black text-white mb-2 uppercase italic">
              Navegador Bloqueado
            </h2>
            
            <p className="text-slate-400 text-sm mb-6">
              O TikTok/Insta não permite baixar arquivos. Você precisa abrir no Chrome ou Safari.
            </p>

            <div className="w-full bg-slate-800 rounded-xl p-4 mb-4 text-left border border-slate-700">
               <p className="text-white font-bold text-sm mb-2">Como resolver:</p>
               <ol className="list-decimal list-inside text-slate-300 text-sm space-y-2">
                 <li>Toque nos <span className="text-white font-bold">3 pontinhos</span> (↗) lá em cima.</li>
                 <li>Escolha <span className="text-green-400 font-bold">Abrir no Navegador</span>.</li>
               </ol>
            </div>

            <div className="w-full relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 px-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Ou use este botão
                </div>
                <motion.button
                  onClick={handleCopyLink}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full py-3.5 rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-lg border-2
                    ${copied 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'bg-white border-white text-slate-900 hover:bg-slate-200'}
                  `}
                >
                  {copied ? "LINK COPIADO! ✓" : "COPIAR LINK"}
                </motion.button>
            </div>

            <button onClick={handleClose} className="mt-5 text-slate-600 text-xs py-2 hover:text-slate-400 transition-colors">
              Ignorar aviso
            </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InAppBrowserBanner;