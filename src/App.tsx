import React, { useState, useEffect, Suspense, lazy } from "react";
import LinkCard from "./components/ui/LinkCard";
import DiscordWidget from "./components/ui/DiscordWidget";
import InAppBrowserBanner from "./components/ui/InAppBrowserBanner";
import ParticleBackground from "./components/ui/ParticleBackground";
import SEO from "./components/ui/SEO";
import DownloadSection from "./components/ui/DownloadSection";
import WorldGuide from "./components/ui/WorldGuide";
import ProfileHero from "./components/ui/ProfileHero";
import { motion, Variants } from "framer-motion";
import YouTubeCard from "./components/ui/YouTubeCard";
import { useData } from "./hooks/useData";
import { DISCORD_CONFIG } from './data/profile';
const Mascot = lazy(() => import("./components/ui/Mascot"));
import { SunIcon, MoonIcon } from "./components/widgets/Icons";
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const App: React.FC = () => {
  // 1. Hook que traz os dados do Banco de Dados
  const { profile, socialLinks, mapVersions, locations, loading } = useData();

  // 2. Estados de Interface (UI)
  const [darkMode, setDarkMode] = useState(true);
  const [shareBtnText, setShareBtnText] = useState("Compartilhar");
  const [isSharing, setIsSharing] = useState(false); // <--- Adicionamos isso que faltava

  // 3. Efeito de Inicialização (Tema e View Transitions)
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setDarkMode(!darkMode);
      document.documentElement.classList.toggle("dark");
      return;
    }
    document.startViewTransition(() => {
      setDarkMode(!darkMode);
      document.documentElement.classList.toggle("dark");
    });
  };

  // 4. Função de Compartilhar
  const shareProfile = async () => {
    if (isSharing) return;
    setIsSharing(true);

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareBtnText("Copiado!");
      setTimeout(() => setShareBtnText("Compartilhar"), 2000);
    } catch (err) {
      console.error("Falha ao copiar", err);
    } finally {
      setIsSharing(false);
    }
  };

  // 5. Se estiver carregando, mostra algo simples (opcional)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-teal-500">
        <div className="animate-spin h-8 w-8 border-4 border-teal-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative flex justify-center pt-8 pb-12 px-4 md:px-8 overflow-x-hidden ${
        darkMode
          ? "bg-slate-950 text-white selection:bg-teal-900 selection:text-white"
          : "bg-slate-50 text-slate-900 selection:bg-teal-300 selection:text-teal-900"
      }`}
    >
      <SEO profile={profile} />
      {/* Aviso Inteligente para TikTok/Instagram */}
      <InAppBrowserBanner />

      {/* MASCOTE ANIMADO */}
      {/* Usa o nick do Minecraft para puxar a skin */}
      <Suspense fallback={null}>
        <Mascot username="TeDabliukk" />
      </Suspense>

      {/* THEME TOGGLE BUTTON */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 z-90 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border ${
          darkMode
            ? "bg-slate-800 border-slate-700 text-yellow-400"
            : "bg-white border-slate-200 text-slate-600 hover:text-orange-500"
        }`}
        aria-label="Alternar Tema"
      >
        {darkMode ? (
          <SunIcon className="w-6 h-6" />
        ) : (
          <MoonIcon className="w-6 h-6" />
        )}
      </button>

      {/* Animated Particle Background */}
      <ParticleBackground darkMode={darkMode} />

      {/* Decorative Background Elements (Gradient Glows) */}
      <div
        className={`fixed top-0 left-0 right-0 h-96 bg-linear-to-b ${
          darkMode
            ? "from-teal-900/20 via-slate-900/0"
            : "from-teal-50/80 via-white/80"
        } to-transparent z-0 pointer-events-none transition-colors duration-700`}
      />
      <div
        className={`fixed -top-40 left-1/2 -translate-x-1/2 w-600 h-600 ${
          darkMode ? "bg-teal-500/10" : "bg-teal-200/20"
        } rounded-full blur-[100px] z-0 pointer-events-none transition-colors duration-700`}
      />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-6xl animate-fade-in-up flex flex-col min-h-[85vh]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 flex-1">
          {/* ESQUERDA: Perfil Hero (Agora em componente separado) */}
          <div className="md:col-span-5 lg:col-span-4">
            <ProfileHero
              profile={profile}
              darkMode={darkMode}
              onShare={shareProfile}
              shareText={shareBtnText}
            />
          </div>

          {/* DIREITA: Conteúdo com Stagger Animation */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="md:col-span-7 lg:col-span-8 flex flex-col gap-6"
          >
            {/* Bento Grid Social */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="col-span-2">
                <YouTubeCard link={socialLinks[0]} />
              </motion.div>
              <motion.div variants={itemVariants} className="col-span-1">
                <LinkCard
                  link={socialLinks[1]}
                  variant="square"
                  darkMode={darkMode}
                />
              </motion.div>
              <motion.div variants={itemVariants} className="col-span-1">
                <LinkCard
                  link={socialLinks[2]}
                  variant="square"
                  darkMode={darkMode}
                />
              </motion.div>
            </div>

            {/* Downloads Modernos */}
            <motion.div variants={itemVariants}>
              <DownloadSection versions={mapVersions} darkMode={darkMode} />
            </motion.div>

            {/* Guia de Mundos */}
            <motion.div variants={itemVariants}>
              <WorldGuide locations={locations} darkMode={darkMode} />
            </motion.div>

            {/* Discord */}
            <motion.div variants={itemVariants}>
              <DiscordWidget
                serverId={DISCORD_CONFIG.serverId}
                inviteUrl={DISCORD_CONFIG.inviteUrl}
                customIconUrl={profile.avatarUrl}
              />
            </motion.div>
          </motion.section>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center pb-8 opacity-60">
          <p
            className={`text-xs font-bold uppercase tracking-widest ${
              darkMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            © {new Date().getFullYear()} TeDabliukk • Feito com 💜
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
