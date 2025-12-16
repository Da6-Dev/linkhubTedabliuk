import React from "react";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom"; // Importante para navegar
import ProfileHero from "../components/ui/ProfileHero";
import LinkCard from "../components/ui/LinkCard";
import YouTubeCard from "../components/ui/YouTubeCard";
import DiscordWidget from "../components/ui/DiscordWidget";
import { DownloadIcon } from "../components/widgets/Icons";

// Recebe os dados via props do App.tsx
interface HomeProps {
  data: any;
  darkMode: boolean;
  shareFunctions: any;
  variants: { container: Variants; item: Variants };
}

const Home: React.FC<HomeProps> = ({
  data,
  darkMode,
  shareFunctions,
  variants,
}) => {
  const { profile, socialLinks } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 flex-1 w-full max-w-6xl mx-auto p-4 md:p-0">
      {/* Lado Esquerdo: Perfil */}
      <div className="md:col-span-5 lg:col-span-4">
        <ProfileHero
          profile={profile}
          darkMode={darkMode}
          onShare={shareFunctions.shareProfile}
          shareText={shareFunctions.shareBtnText}
        />
      </div>

      {/* Lado Direito: Links */}
      <motion.section
        variants={variants.container}
        initial="hidden"
        animate="visible"
        className="md:col-span-7 lg:col-span-8 flex flex-col gap-6"
      >
        {/* === NOVIDADE: CARD PORTAL PARA DOWNLOADS === */}
        <motion.div variants={variants.item}>
          <Link to="/downloads" className="block group cursor-pointer">
            <div
              className={`
              relative overflow-hidden rounded-4xl p-8 border min-h-45 flex flex-col justify-center
              transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl
              ${
                darkMode
                  ? "bg-linear-to-br from-indigo-900 to-slate-900 border-indigo-500/50 shadow-indigo-900/20"
                  : "bg-white border-slate-200 shadow-xl shadow-slate-200/50"
              }
            `}
            >
              {/* Ícone de Fundo (Gigante e Sutil) */}
              <div
                className={`absolute -right-5 -top-7.5 rotate-12 transition-opacity duration-300 ${
                  darkMode
                    ? "opacity-10 text-indigo-400"
                    : "opacity-5 text-slate-900"
                }`}
              >
                <DownloadIcon className="w-72 h-72" />
              </div>

              {/* Conteúdo */}
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <span
                    className={`
                    inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border
                    ${
                      darkMode
                        ? "bg-indigo-500/20 border-indigo-400 text-indigo-300"
                        : "bg-indigo-100 border-indigo-200 text-indigo-700"
                    }
                  `}
                  >
                    Área de Membros
                  </span>
                  <h3
                    className={`text-4xl font-black tracking-tight mb-2 ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    Baixar Mapas
                  </h3>
                  <p
                    className={`font-medium text-lg ${
                      darkMode ? "text-indigo-200" : "text-slate-500"
                    }`}
                  >
                    Versões Java & Bedrock
                  </p>
                </div>

                {/* Botão de Seta (Círculo) */}
                <div
                  className={`
                  w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-2 group-hover:-rotate-45
                  ${
                    darkMode
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/40"
                      : "bg-slate-900 text-white shadow-xl"
                  }
                `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Bento Grid Social */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div variants={variants.item} className="col-span-2">
            {/* YouTube (Primeiro link) */}
            {socialLinks[0] && <YouTubeCard link={socialLinks[0]} />}
          </motion.div>

          {socialLinks[1] && (
            <motion.div variants={variants.item} className="col-span-1">
              <LinkCard
                link={socialLinks[1]}
                variant="square"
                darkMode={darkMode}
              />
            </motion.div>
          )}

          {socialLinks[2] && (
            <motion.div variants={variants.item} className="col-span-1">
              <LinkCard
                link={socialLinks[2]}
                variant="square"
                darkMode={darkMode}
              />
            </motion.div>
          )}
        </div>

        <motion.div variants={variants.item}>
          <DiscordWidget
            serverId={shareFunctions.discordConfig.serverId}
            inviteUrl={shareFunctions.discordConfig.inviteUrl}
            customIconUrl={profile.avatarUrl}
          />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
