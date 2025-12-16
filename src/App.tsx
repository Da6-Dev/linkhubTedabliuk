import React, { useState, useEffect, Suspense, lazy } from "react";
import { UserProfile, SocialLink } from "./types/types";
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
const Mascot = lazy(() => import("./components/ui/Mascot"));
import { SunIcon, MoonIcon } from "./components/widgets/Icons";
import {
  BIO_OPTIONS,
  INITIAL_PROFILE,
  INITIAL_SOCIAL_LINKS,
  MAP_VERSIONS,
  WORLD_LOCATIONS,
  DISCORD_CONFIG,
} from "./data/profile";
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
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [socialLinks] = useState<SocialLink[]>(INITIAL_SOCIAL_LINKS);
  const [shareBtnText, setShareBtnText] = useState("Compartilhar");
  const [isSharing, setIsSharing] = useState(false);

  // Theme State
  const [darkMode, setDarkMode] = useState(false);

  // Random Bio Logic
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * BIO_OPTIONS.length);
    setProfile((prev) => ({ ...prev, bio: BIO_OPTIONS[randomIndex] }));
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Verifica se o navegador suporta View Transitions
    if (!document.startViewTransition) {
      setDarkMode(!darkMode);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    // Calcula a distância até o canto mais distante para o círculo cobrir tudo
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Inicia a transição
    const transition = document.startViewTransition(() => {
      setDarkMode(!darkMode);
    });

    // Anima o clip-path quando a transição estiver pronta
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      // Animação Simplificada:
      // Sempre anima a "nova" view crescendo sobre a antiga.
      // Isso garante que a animação funcione visualmente em ambas as direções (Dark->Light e Light->Dark)
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  const shareProfile = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const shareData = {
      title: profile.name,
      text: profile.bio,
      url: window.location.href,
    };

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareBtnText("Copiado!");
        setTimeout(() => setShareBtnText("Compartilhar"), 2000);
      } catch (err) {
        setShareBtnText("Erro ao copiar");
        setTimeout(() => setShareBtnText("Compartilhar"), 2000);
      }
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await copyToClipboard();
      }
    } catch (error: any) {
      await copyToClipboard();
    } finally {
      setIsSharing(false);
    }
  };

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
              <DownloadSection versions={MAP_VERSIONS} darkMode={darkMode} />
            </motion.div>

            {/* Guia de Mundos */}
            <motion.div variants={itemVariants}>
              <WorldGuide locations={WORLD_LOCATIONS} darkMode={darkMode} />
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
