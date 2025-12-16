import React from "react";
import { motion } from "framer-motion";
import { SocialLink } from "../../types/types";
import { YoutubeIcon, PlaySolidIcon } from "../widgets/Icons"; // Certifique-se de ter o PlaySolidIcon (opcional, veja passo 1)

interface YouTubeCardProps {
  link: SocialLink;
}

const YouTubeCard: React.FC<YouTubeCardProps> = ({ link }) => {
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full h-full min-h-55 rounded-4xl overflow-hidden isolate"
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* 1. Fundo Gradiente Vibrante */}
      <div className="absolute inset-0 bg-linear-to-br from-[#ff0000] via-[#ff3300] to-[#ff7700] z-0" />

      {/* 2. Textura de Fundo (Padrão de Play) - Opcional para dar profundidade */}
      <div className="absolute inset-0 opacity-10 z-0 overflow-hidden pointer-events-none">
        <PlaySolidIcon className="absolute -top-10 -left-10 w-40 h-40 text-white/30 rotate-12" />
        <PlaySolidIcon className="absolute bottom-10 right-10 w-32 h-32 text-white/30 -rotate-12" />
        <PlaySolidIcon className="absolute top-1/2 left-1/2 w-60 h-60 text-white/20 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* 3. Efeito de Brilho no Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-t from-black/20 to-transparent transition-opacity duration-500 z-10" />

      {/* 4. Conteúdo Principal */}
      <div className="relative z-20 flex flex-col h-full justify-between p-8">
        {/* Ícone Principal e Botão de "Inscreva-se" */}
        <div className="flex justify-between items-start">
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="bg-white/20 p-4 rounded-2xl backdrop-blur-md shadow-lg"
          >
            <YoutubeIcon className="w-12 h-12 text-white drop-shadow-md" />
          </motion.div>

          {/* Badge de "Botão" */}
          <div className="bg-white text-[#ff0000] text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-md group-hover:scale-105 transition-transform">
            Inscreva-se
          </div>
        </div>

        {/* Textos */}
        <div className="mt-auto">
          <h3 className="text-white text-4xl font-black tracking-tight drop-shadow-lg mb-2">
            {link.title}
          </h3>
          {link.cta && (
            <p className="text-white/90 text-lg font-bold leading-tight max-w-[80%]">
              {link.cta}
            </p>
          )}
        </div>
      </div>

      {/* Ícone de Play Gigante que aparece no Hover */}
      <PlaySolidIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-white opacity-0 group-hover:opacity-20 transition-all duration-500 scale-50 group-hover:scale-100 rotate-45 group-hover:rotate-0 z-10" />
    </motion.a>
  );
};

export default YouTubeCard;
