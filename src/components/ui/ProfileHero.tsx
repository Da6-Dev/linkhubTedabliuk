import React from "react";
import { motion } from "framer-motion";
import { UserProfile } from "../../types/types";
import { ShareIcon, CopyIcon } from "../widgets/Icons";

interface ProfileHeroProps {
  profile: UserProfile;
  darkMode: boolean;
  onShare: () => void;
  shareText: string;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({
  profile,
  darkMode,
  onShare,
  shareText,
}) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="md:sticky md:top-12 flex flex-col items-center md:items-start text-center md:text-left h-fit"
    >
      {/* Card de Fundo (Efeito Vidro) */}
      <div
        className={`
        relative w-full p-8 rounded-[2.5rem] overflow-hidden border
        ${
          darkMode
            ? "bg-slate-900/40 border-slate-700/50"
            : "bg-white/40 border-white/60"
        }
        backdrop-blur-xl shadow-2xl
      `}
      >
        {/* Glow de Fundo */}
        <div
          className={`absolute top-0 left-0 w-full h-32 bg-linear-to-b ${
            darkMode ? "from-teal-500/10" : "from-teal-400/20"
          } to-transparent`}
        />

        {/* Avatar Animado */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="relative inline-block mb-6"
        >
          <div
            className={`
            p-1.5 rounded-full border-2 
            ${
              darkMode
                ? "bg-slate-900 border-teal-500/50"
                : "bg-white border-teal-400/30"
            }
          `}
          >
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
            />
          </div>
          {/* Status Badge */}
          <div
            className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-slate-900 animate-pulse"
            title="Online Agora"
          />
        </motion.div>

        {/* Textos */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border ${
              darkMode
                ? "bg-teal-950/50 border-teal-800 text-teal-400"
                : "bg-teal-50 border-teal-200 text-teal-700"
            }`}
          >
            {profile.handle}
          </motion.div>

          <h1
            className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {profile.name}
          </h1>

          <p
            className={`text-lg leading-relaxed mb-8 opacity-90 font-medium ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {profile.bio}
          </p>
        </div>

        {/* Botão de Share (Largo) */}
        <motion.button
          onClick={onShare}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all
            ${
              shareText === "Copiado!"
                ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                : darkMode
                ? "bg-slate-800 text-white hover:bg-slate-700"
                : "bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20"
            }
          `}
        >
          {shareText === "Copiado!" ? (
            <CopyIcon className="w-5 h-5" />
          ) : (
            <ShareIcon className="w-5 h-5" />
          )}
          {shareText}
        </motion.button>
      </div>
    </motion.aside>
  );
};

export default ProfileHero;
