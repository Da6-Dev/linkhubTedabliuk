import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SocialLink } from '../../types/types';
import { 
  InstagramIcon, 
  TikTokIcon, 
  YoutubeIcon, 
  DiscordIcon, 
  TwitterIcon, 
  LinkIcon, 
  CopyIcon, 
  DownloadIcon 
} from '../widgets/Icons';

interface LinkCardProps {
  link: SocialLink;
  variant?: 'list' | 'square' | 'featured';
  className?: string;
  darkMode?: boolean;
}

// Helper para escolher o ícone certo
const getIcon = (type: SocialLink['icon']) => {
  switch (type) {
    case 'instagram': return <InstagramIcon className="w-6 h-6" />;
    case 'tiktok': return <TikTokIcon className="w-6 h-6" />;
    case 'youtube': return <YoutubeIcon className="w-6 h-6" />;
    case 'discord': return <DiscordIcon className="w-6 h-6" />;
    case 'twitter': return <TwitterIcon className="w-6 h-6" />;
    case 'download': return <DownloadIcon className="w-6 h-6" />;
    default: return <LinkIcon className="w-6 h-6" />;
  }
};

const LinkCard: React.FC<LinkCardProps> = ({ link, variant = 'list', className = '', darkMode = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita abrir o link ao clicar no botão de copiar
    e.stopPropagation();
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Cores dinâmicas para o ícone (baseado na rede social ou padrão)
  const getIconColorClass = () => {
    if (link.colorClass.includes('pink')) return 'bg-pink-500 text-white shadow-pink-500/30';
    if (link.colorClass.includes('red')) return 'bg-red-500 text-white shadow-red-500/30';
    if (link.colorClass.includes('black')) return darkMode ? 'bg-white text-black' : 'bg-black text-white shadow-slate-900/30';
    if (link.colorClass.includes('indigo')) return 'bg-indigo-500 text-white shadow-indigo-500/30';
    return darkMode ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-600';
  };

  // Estilos Base do Card (Glassmorphism)
  const cardStyles = `
    group relative overflow-hidden backdrop-blur-md border transition-all duration-300
    ${darkMode 
      ? 'bg-slate-900/60 border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600' 
      : 'bg-white/70 border-white/60 hover:bg-white hover:border-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50'}
  `;

  // Estilos Específicos por Variante
  const variantStyles = {
    list: `flex items-center justify-between w-full p-3 rounded-2xl`,
    square: `flex flex-col items-center justify-center text-center p-6 h-full min-h-[160px] rounded-3xl`,
    featured: `flex flex-col justify-between p-6 rounded-[2rem] h-full`
  };

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardStyles} ${variantStyles[variant]} ${className}`}
      
      // === FÍSICA DE MOLA (HOVER) ===
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Brilho de Fundo (Glow) no Hover */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* --- CONTEÚDO PARA VARIANTE 'SQUARE' (Insta/TikTok) --- */}
      {variant === 'square' && (
        <>
          <motion.div 
            className={`p-4 rounded-2xl shadow-lg mb-4 text-2xl ${getIconColorClass()}`}
            whileHover={{ rotate: [0, -10, 10, 0] }} // Dancinha do ícone
          >
            {getIcon(link.icon)}
          </motion.div>
          
          <h3 className={`font-bold text-lg mb-1 ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
            {link.title}
          </h3>
          
          {link.cta && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
              {link.cta}
            </span>
          )}
        </>
      )}

      {/* --- CONTEÚDO PARA VARIANTE 'LIST' (Padrão) --- */}
      {variant === 'list' && (
        <>
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl shadow-md ${getIconColorClass()}`}>
              {getIcon(link.icon)}
            </div>
            <div className="flex flex-col text-left">
              <span className={`font-bold ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                {link.title}
              </span>
              {link.cta && (
                <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {link.cta}
                </span>
              )}
            </div>
          </div>
        </>
      )}

      {/* Botão de Copiar (Flutuante) */}
      <motion.button
        onClick={handleCopy}
        className={`
          absolute top-3 right-3 p-2 rounded-full transition-all
          ${copied 
            ? 'bg-green-500 text-white scale-100 opacity-100' 
            : (darkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-400 hover:text-slate-700') + ' opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {copied ? (
          <span className="text-xs font-bold">✓</span>
        ) : (
          <CopyIcon className="w-4 h-4" />
        )}
      </motion.button>

    </motion.a>
  );
};

export default LinkCard;