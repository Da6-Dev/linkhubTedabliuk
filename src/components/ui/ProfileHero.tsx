import React from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/types';
import { ShareIcon, CopyIcon } from '../widgets/Icons';
import LikeButton from './LikeButton';

interface ProfileHeroProps {
  profile: UserProfile;
  darkMode: boolean;
  onShare: () => void;
  shareText: string;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ profile, darkMode, onShare, shareText }) => {
  
  // LÓGICA DE TAMANHO DE FONTE (Drasticamente reduzida para não quebrar)
  const getNameStyles = (name: string) => {
    const len = name.length;
    
    // Nomes Curtos (até 12 letras) -> Ex: "Davi"
    // Antes era 6xl (Gigante), agora é 4xl (Grande e Seguro)
    if (len <= 12) return "text-3xl md:text-3xl"; 

    // Nomes Médios (até 20 letras) -> Ex: "Davi TeDabliukk"
    // Reduzido para garantir linha única
    if (len <= 20) return "text-2xl md:text-2xl";

    // Nomes Longos (> 20 letras) -> Ex: "Canal TeDabliukk Oficial YT"
    // Bem menor para caber tudo sem quebrar
    return "text-lg md:text-xl font-bold";
  };

  return (
    <motion.aside 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="md:sticky md:top-12 flex flex-col items-center md:items-start text-center md:text-left h-fit w-full"
    >
      {/* Card de Fundo */}
      <div className={`
        relative w-full p-5 md:p-6 rounded-4xl overflow-hidden border transition-colors duration-500
        ${darkMode 
          ? 'bg-slate-900/60 border-slate-700/50 shadow-slate-900/20' 
          : 'bg-white/60 border-white/60 shadow-slate-200/50'}
        backdrop-blur-xl shadow-2xl flex flex-col
      `}>
        <div className={`absolute top-0 left-0 w-full h-24 bg-linear-to-b ${darkMode ? 'from-teal-500/10' : 'from-teal-400/20'} to-transparent pointer-events-none`} />

        {/* --- HEADER DO PERFIL --- */}
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 mb-4 w-full">
          
          {/* Avatar (Fixo) */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative shrink-0"
          >
            <div className={`p-1 rounded-full border-2 ${darkMode ? 'bg-slate-900 border-teal-500/50' : 'bg-white border-teal-400/30'}`}>
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-slate-900 animate-pulse" title="Online Agora" />
          </motion.div>

          {/* Textos (min-w-0 é CRUCIAL para o texto respeitar o container) */}
          <div className="flex flex-col items-center md:items-start pt-1 flex-1 min-w-0 w-full">
             <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-1.5 border ${darkMode ? 'bg-teal-950/50 border-teal-800 text-teal-400' : 'bg-teal-50 border-teal-200 text-teal-700'}`}
            >
              {profile.handle}
            </motion.div>
            
            {/* Título: Linha Única Forçada no Desktop */}
            <h1 
              className={`
                ${getNameStyles(profile.name)} 
                font-black tracking-tight w-full
                md:whitespace-nowrap /* Desktop: Uma linha só */
                text-center md:text-left
                ${darkMode ? 'text-white' : 'text-slate-900'}
              `}
            >
              {profile.name}
            </h1>
          </div>
        </div>

        {/* Bio */}
        <div className="relative z-10 mb-6 w-full">
           <p className={`text-sm md:text-base leading-relaxed font-medium md:text-left ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {profile.bio}
          </p>
        </div>

        {/* --- BARRA DE AÇÕES --- */}
        <div className="relative z-10 flex items-stretch gap-2 mt-auto w-full">
          <motion.button 
            onClick={onShare}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              flex-1 py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all overflow-hidden
              ${shareText === 'Copiado!'
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                : (darkMode ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10')}
            `}
          >
            {shareText === 'Copiado!' ? <CopyIcon className="w-4 h-4 shrink-0" /> : <ShareIcon className="w-4 h-4 shrink-0" />}
            <span className="text-sm truncate">{shareText}</span>
          </motion.button>

          <div className={`shrink-0 flex items-center justify-center p-1 rounded-xl border ${darkMode ? 'bg-slate-950/30 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
             <LikeButton initialLikes={profile.likes || 0} darkMode={darkMode} />
          </div>
        </div>

      </div>
    </motion.aside>
  );
};

export default ProfileHero;