import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import DownloadSection from '../components/ui/DownloadSection';
import WorldGuide from '../components/ui/WorldGuide';
import { DownloadIcon } from '../components/widgets/Icons';

interface DownloadsProps {
  data: any;
  darkMode: boolean;
  variants: { container: Variants, item: Variants };
}

const Downloads: React.FC<DownloadsProps> = ({ data, darkMode, variants }) => {
  const { mapVersions, locations } = data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen pb-20">
      
      {/* === HERO SECTION (CAPA ESTILO JOGO) === */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        {/* Imagem de Fundo (Pega a primeira imagem do guia ou uma cor sólida se não tiver) */}
        <div className="absolute inset-0 bg-slate-900">
           {locations[0]?.imageUrl && (
             <img 
               src={locations[0].imageUrl} 
               alt="Capa do Mapa" 
               className="w-full h-full object-cover opacity-60 blur-sm scale-105"
             />
           )}
           {/* Gradiente para suavizar a transição para o conteúdo */}
           <div className={`absolute inset-0 bg-linear-to-b ${darkMode ? 'from-transparent via-slate-950/80 to-slate-950' : 'from-transparent via-slate-50/80 to-slate-50'}`} />
        </div>

        {/* Conteúdo do Header */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 mt-8">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="relative z-10"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 bg-black/30 backdrop-blur-md text-white text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Official Release
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl mb-4">
              TEDABLIUK <span className="text-teal-400">WORLD</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 font-medium max-w-xl mx-auto leading-relaxed drop-shadow-md">
              Explore construções épicas, farms automáticas e segredos escondidos. Disponível para todas as plataformas.
            </p>
          </motion.div>
        </div>

        {/* Botão de Voltar (Flutuante no topo esquerdo) */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 z-50 p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
      </div>

      {/* === CONTEÚDO PRINCIPAL (Subindo um pouco sobre a imagem) === */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-20">
        
        <motion.div
          variants={variants.container}
          initial="hidden"
          animate="visible"
          className={`
            rounded-[2.5rem] p-6 md:p-12 shadow-2xl border backdrop-blur-xl
            ${darkMode ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white/80 border-white/50'}
          `}
        >
          {/* Seção 1: Downloads (Abas) */}
          <div className="mb-16">
             <div className="flex items-center gap-3 mb-8">
                <div className={`p-3 rounded-2xl ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-700'}`}>
                  <DownloadIcon className="w-6 h-6" />
                </div>
                <div>
                   <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Escolha sua Versão</h2>
                   <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Clique abaixo para baixar</p>
                </div>
             </div>
             
             <motion.div variants={variants.item}>
                <DownloadSection versions={mapVersions} darkMode={darkMode} />
             </motion.div>
          </div>

          <hr className={`border-0 h-px mb-16 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />

          {/* Seção 2: Guia de Teleporte */}
          <div>
            <div className="text-center mb-10">
               <span className={`text-sm font-bold uppercase tracking-widest ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                 Exploração
               </span>
               <h2 className={`text-3xl md:text-4xl font-black mt-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                 Guia Turístico
               </h2>
               <p className={`mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                 Não se perca! Use os comandos abaixo para viajar rápido.
               </p>
            </div>

            <motion.div variants={variants.item}>
               <WorldGuide locations={locations} darkMode={darkMode} />
            </motion.div>
          </div>

        </motion.div>
      </div>

    </div>
  );
};

export default Downloads;