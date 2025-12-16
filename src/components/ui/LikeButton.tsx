import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion'; // <--- Adicionamos Variants
import { useAnalytics } from '../../hooks/useAnalytics';

interface LikeButtonProps {
  initialLikes?: number;
  darkMode: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes = 0, darkMode }) => {
  const { addLike } = useAnalytics();
  
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const alreadyLiked = localStorage.getItem('linkhub_liked_profile');
    if (alreadyLiked === 'true') setHasLiked(true);
  }, []);

  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);

  const handleLike = () => {
    if (hasLiked) return;
    localStorage.setItem('linkhub_liked_profile', 'true');
    setLikes(prev => prev + 1);
    setHasLiked(true);
    setShowHeart(true);
    addLike('1');
    setTimeout(() => setShowHeart(false), 1500);
  };

  // CORREÇÃO AQUI: Tipagem explícita :Variants
  const heartVariants: Variants = {
    idle: { 
      scale: [1, 1.15, 1], 
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } 
    },
    hover: { 
      scale: [1, 1.3, 1], 
      transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" } 
    },
    liked: { scale: 1 }
  };

  return (
    <div className="relative h-full group">
      {/* Efeito de Borda Gradiente */}
      {!hasLiked && (
        <div className={`absolute -inset-0.5 rounded-2xl bg-linear-to-r from-rose-400 via-pink-500 to-rose-400 opacity-0 group-hover:opacity-70 blur-sm transition-all duration-500 animate-gradient-xy`} />
      )}

      <motion.button
        onClick={handleLike}
        disabled={hasLiked}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileTap={hasLiked ? {} : { scale: 0.95 }}
        className={`
          relative h-full flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 border overflow-hidden
          ${hasLiked 
            ? 'bg-rose-600 border-rose-500 text-white shadow-[0_0_25px_rgba(225,29,72,0.6)] scale-[1.02]' 
            : (darkMode 
                ? 'bg-slate-900/80 border-slate-700 text-rose-400 hover:text-rose-300 group-hover:border-transparent' 
                : 'bg-white/80 border-slate-200 text-rose-500 hover:text-rose-600 group-hover:border-transparent shadow-sm')
            }
        `}
      >
        {/* Fundo que "enche" no hover */}
        {!hasLiked && (
          <div className={`absolute inset-0 bg-rose-500/10 dark:bg-rose-500/20 w-0 group-hover:w-full transition-all duration-500 ease-out rounded-2xl`} />
        )}

        {/* Ícone de Coração Animado */}
        <motion.div
          variants={heartVariants}
          animate={hasLiked ? "liked" : (isHovered ? "hover" : "idle")}
          className="relative z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${hasLiked ? 'fill-white' : 'fill-current'}`} viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </motion.div>
        
        {/* Contador */}
        <span className="relative z-10 min-w-[1ch] text-center font-mono text-lg">
          {likes}
        </span>
      </motion.button>

      {/* POPUP +1 LIKE */}
      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: -70, scale: 1.1 }}
            exit={{ opacity: 0, y: -90, scale: 0.8 }}
            transition={{ duration: 1.2, type: "spring" }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap"
          >
            <div className={`flex items-center gap-1 px-4 py-2 rounded-full shadow-xl border backdrop-blur-md font-black text-lg ${darkMode ? 'bg-slate-800/90 border-rose-500/30 text-rose-400' : 'bg-white/90 border-rose-200 text-rose-500'}`}>
              <span>+1</span>
              <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20"
                 animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </motion.svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LikeButton;