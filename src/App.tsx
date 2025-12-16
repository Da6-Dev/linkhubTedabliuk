import React, { useState, useEffect } from "react";
import { UserProfile, SocialLink } from "./types/types";
import LinkCard from "./components/ui/LinkCard";
import DiscordWidget from "./components/ui/DiscordWidget";
import InAppBrowserBanner from "./components/ui/InAppBrowserBanner";
import ParticleBackground from "./components/ui/ParticleBackground";
import Mascot from "./components/ui/Mascot";
import {
  ShareIcon,
  DownloadIcon,
  CopyIcon,
  SunIcon,
  MoonIcon,
} from "./components/widgets/Icons";

import {
  BIO_OPTIONS,
  INITIAL_PROFILE,
  INITIAL_SOCIAL_LINKS,
  DOWNLOAD_LINKS,
  DISCORD_CONFIG,
} from "./data/profile";

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
      {/* Aviso Inteligente para TikTok/Instagram */}
      <InAppBrowserBanner />

      {/* MASCOTE ANIMADO */}
      {/* Usa o nick do Minecraft para puxar a skin */}
      <Mascot username="TeDabliukk" />

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

      {/* Main Container - Responsive Width */}
      <main className="relative z-10 w-full max-w-5xl animate-fade-in-up flex flex-col min-h-[85vh]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 flex-1">
          {/* ==================== LEFT COLUMN: PROFILE (Sticky on Desktop) ==================== */}
          <aside className="md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="md:sticky md:top-12 w-full flex flex-col items-center md:items-start">
              {/* Avatar */}
              <div className="relative group mb-8">
                <div className="absolute -inset-2 bg-linear-to-tr from-teal-300 to-cyan-300 rounded-full opacity-60 group-hover:opacity-100 transition duration-500 blur-md" />
                <div
                  className={`relative p-1.5 rounded-full ${
                    darkMode ? "bg-slate-900" : "bg-white"
                  }`}
                >
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className={`w-32 h-32 md:w-44 md:h-44 rounded-full object-cover shadow-sm ${
                      darkMode ? "bg-slate-800" : "bg-gray-100"
                    }`}
                  />
                </div>
                <div
                  className="absolute bottom-4 right-4 w-6 h-6 bg-teal-400 border-4 border-white rounded-full"
                  title="Online"
                />
              </div>

              {/* Name & Bio */}
              <h1
                className={`text-4xl md:text-5xl font-extrabold tracking-tighter mb-3 leading-tight ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {profile.name}
              </h1>

              <div className="mb-6">
                <span
                  className={`text-xs font-bold uppercase tracking-widest inline-block px-3 py-1.5 rounded-full border ${
                    darkMode
                      ? "bg-teal-900/30 text-teal-400 border-teal-800"
                      : "bg-teal-100/50 text-teal-700 border-teal-200/50"
                  }`}
                >
                  {profile.handle}
                </span>
              </div>

              <p
                className={`text-lg font-normal leading-relaxed max-w-xs md:max-w-full mb-8 opacity-90 ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {profile.bio}
              </p>

              {/* Share Button */}
              <div className="w-full max-w-xs md:max-w-full">
                <button
                  onClick={shareProfile}
                  className={`
                    w-full group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold tracking-wide shadow-xl transition-all duration-300 ease-out
                    ${
                      shareBtnText === "Copiado!"
                        ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white scale-105 shadow-emerald-500/25 ring-2 ring-emerald-300/50"
                        : darkMode
                        ? "bg-slate-800 text-white hover:bg-slate-700 hover:scale-[1.02] border border-slate-700 hover:border-slate-500"
                        : "bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white hover:bg-slate-800 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/30 active:scale-95 ring-1 ring-white/10"
                    }
                  `}
                >
                  {/* Glass shimmer effect */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {shareBtnText === "Copiado!" ? (
                    <CopyIcon className="w-5 h-5 relative z-10" />
                  ) : (
                    <ShareIcon className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  )}
                  <span className="relative z-10 text-base">
                    {shareBtnText}
                  </span>
                </button>
              </div>
            </div>
          </aside>

          {/* ==================== RIGHT COLUMN: LINKS & CONTENT ==================== */}
          <section className="md:col-span-7 lg:col-span-8 flex flex-col gap-8">
            {/* Social Bento Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* YouTube - Spans full width on mobile, 2 cols on desktop */}
              <div className="col-span-2">
                <LinkCard
                  link={socialLinks[0]}
                  variant="featured"
                  className="h-full min-h-180"
                  darkMode={darkMode}
                />
              </div>

              {/* Instagram & TikTok */}
              <div className="col-span-1">
                <LinkCard
                  link={socialLinks[1]}
                  variant="square"
                  className="h-full aspect-square md:aspect-auto md:h-48"
                  darkMode={darkMode}
                />
              </div>
              <div className="col-span-1">
                <LinkCard
                  link={socialLinks[2]}
                  variant="square"
                  className="h-full aspect-square md:aspect-auto md:h-48"
                  darkMode={darkMode}
                />
              </div>
            </div>

            {/* Downloads Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 px-1 opacity-90">
                <DownloadIcon
                  className={`w-5 h-5 ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                />
                <span
                  className={`text-sm font-bold uppercase tracking-widest ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Downloads Minecraft
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DOWNLOAD_LINKS.map((link) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    variant="list"
                    className="py-4! px-5!"
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </div>

            {/* Discord Widget */}
            <div>
              <DiscordWidget
                serverId={DISCORD_CONFIG.serverId}
                inviteUrl={DISCORD_CONFIG.inviteUrl}
                customIconUrl={profile.avatarUrl}
              />
            </div>
          </section>
        </div>

        {/* Footer - MOVIDO PARA FORA DO GRID PARA CENTRALIZAÇÃO GLOBAL */}
        <footer className="mt-16 text-center w-full">
          {/* Divisor centralizado */}
          <div
            className={`w-12 h-1 rounded-full mx-auto mb-6 transition-colors duration-500 ${
              darkMode ? "bg-slate-800" : "bg-slate-200"
            }`}
          ></div>

          <p
            className={`text-xs font-bold uppercase tracking-widest hover:text-slate-500 transition-colors cursor-default ${
              darkMode ? "text-slate-600" : "text-slate-400"
            }`}
          >
            © {new Date().getFullYear()} TeDabliukk
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
