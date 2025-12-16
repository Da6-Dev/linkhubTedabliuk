import React, { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import DownloadSection from "../components/ui/DownloadSection";
import WorldGuide from "../components/ui/WorldGuide";
import { DownloadIcon } from "../components/widgets/Icons";
import { Helmet } from "react-helmet-async";

interface DownloadsProps {
  data: any;
  darkMode: boolean;
  variants: { container: Variants; item: Variants };
}

const Downloads: React.FC<DownloadsProps> = ({ data, darkMode, variants }) => {
  const { mapVersions, locations } = data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  <Helmet>
    <title>Downloads - Mundo Tedabliuk</title>
    <meta
      name="description"
      content="Baixe os mapas oficiais Java e Bedrock e veja as coordenadas das construções."
    />
    <meta property="og:title" content="Downloads - Mundo Tedabliuk" />
    <meta
      property="og:description"
      content="Baixe os mapas oficiais Java e Bedrock."
    />
    <meta
      property="og:image"
      content={locations[0]?.imageUrl || "link_da_sua_logo.png"}
    />
  </Helmet>;

  return (
    // Fundo da página ajustado para garantir contraste com o card
    <div
      className={`w-full min-h-screen pb-12 md:pb-20 transition-colors duration-500 ${
        darkMode ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      ;{/* === HERO SECTION === */}
      <div className="relative w-full min-h-[45vh] md:h-[50vh] overflow-hidden flex flex-col">
        {/* Camada 1: Imagem de Fundo */}
        <div className="absolute inset-0 bg-slate-900">
          {locations[0]?.imageUrl && (
            <img
              src={locations[0].imageUrl}
              alt="Capa do Mapa"
              className="w-full h-full object-cover scale-105"
            />
          )}

          {/* Camada 2: Overlay Escuro PERMANENTE (Para o texto branco ler bem em qualquer tema) */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Camada 3: Gradiente de Transição para a cor da página */}
          <div
            className={`absolute inset-0 bg-linear-to-b ${
              darkMode
                ? "from-transparent via-slate-950/60 to-slate-950"
                : "from-transparent via-slate-50/30 to-slate-50"
            }`}
          />
        </div>

        {/* Conteúdo do Header (Texto sempre Branco para manter estilo "Gamer") */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 pt-12 pb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <span className="inline-block px-3 py-1 rounded-full border border-white/40 bg-black/40 backdrop-blur-md text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3 md:mb-4 shadow-lg">
              Official Release
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-xl mb-3 md:mb-4 leading-tight">
              TEDABLIUK{" "}
              <span className="text-teal-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">
                WORLD
              </span>
            </h1>

            <p className="text-base md:text-xl text-slate-100 font-medium leading-relaxed drop-shadow-md px-2 max-w-lg mx-auto">
              Explore construções épicas, farms automáticas e segredos
              escondidos.
            </p>
          </motion.div>
        </div>

        {/* Botão de Voltar */}
        <Link
          to="/"
          className="absolute top-4 left-4 md:top-6 md:left-6 z-50 p-2.5 md:p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all active:scale-90 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
      </div>
      {/* === CONTEÚDO PRINCIPAL === */}
      <div className="relative z-20 max-w-5xl mx-auto px-3 md:px-4 -mt-8 md:-mt-20">
        <motion.div
          variants={variants.container}
          initial="hidden"
          animate="visible"
          className={`
            rounded-3xl md:rounded-[2.5rem] p-5 md:p-12 transition-all duration-500
            /* AQUI ESTÁ O FIX DE CONTRASTE: */
            ${
              darkMode
                ? "bg-slate-900/95 border border-slate-700 shadow-2xl shadow-black/50"
                : "bg-white border border-slate-200 shadow-2xl shadow-slate-300/60"
            }
          `}
        >
          {/* Seção 1: Downloads */}
          <div className="mb-10 md:mb-16">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div
                className={`p-2.5 md:p-3 rounded-2xl shadow-inner ${
                  darkMode
                    ? "bg-teal-500/10 text-teal-400"
                    : "bg-teal-50 text-teal-600"
                }`}
              >
                <DownloadIcon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h2
                  className={`text-xl md:text-2xl font-bold ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  Escolha sua Versão
                </h2>
                <p
                  className={`text-xs md:text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Clique para expandir e baixar
                </p>
              </div>
            </div>

            <motion.div variants={variants.item}>
              <DownloadSection versions={mapVersions} darkMode={darkMode} />
            </motion.div>
          </div>

          {/* Divisor com cor ajustada */}
          <hr
            className={`border-0 h-px mb-10 md:mb-16 ${
              darkMode ? "bg-slate-800" : "bg-slate-100"
            }`}
          />

          {/* Seção 2: Guia de Teleporte */}
          <div>
            <div className="text-center mb-8 md:mb-10">
              <span
                className={`text-xs font-bold uppercase tracking-widest ${
                  darkMode ? "text-yellow-400" : "text-yellow-600"
                }`}
              >
                Exploração
              </span>
              <h2
                className={`text-2xl md:text-4xl font-black mt-1 md:mt-2 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Guia Turístico
              </h2>
              <p
                className={`mt-2 text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Coordenadas para viagem rápida.
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
