import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Variants } from "framer-motion";

// Componentes Globais
import InAppBrowserBanner from "./components/ui/InAppBrowserBanner";
import { SunIcon, MoonIcon } from "./components/widgets/Icons";

// Páginas
import Home from "./pages/Home";
import Downloads from "./pages/Downloads";

// Dados
import { useData } from "./hooks/useData";
import { DISCORD_CONFIG } from "./data/profile";

// Animações Globais
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
  // 1. Hook Central de Dados
  const { profile, socialLinks, mapVersions, locations, loading } = useData();

  // 2. Estados Globais
  const [darkMode, setDarkMode] = useState(true);
  const [shareBtnText, setShareBtnText] = useState("Compartilhar");
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = document.documentElement.classList.contains("dark");

    // Fallback para navegadores que não suportam View Transitions
    if (!document.startViewTransition) {
      setDarkMode(!isDark);
      document.documentElement.classList.toggle("dark");
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setDarkMode(!isDark);
      document.documentElement.classList.toggle("dark");
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      // CORREÇÃO: Sempre anima o "Novo" tema expandindo
      // Isso funciona tanto para Dark->Light quanto Light->Dark
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 400, // Reduzido de 500 para 400 (mais rápido parece mais fluido)
          easing: "cubic-bezier(0.25, 1, 0.5, 1)", // Curva mais rápida no início
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  const shareProfile = async () => {
    if (isSharing) return;
    setIsSharing(true);
    try {
      await navigator.clipboard.writeText(window.location.origin); // Copia só o dominio base
      setShareBtnText("Copiado!");
      setTimeout(() => setShareBtnText("Compartilhar"), 2000);
    } catch (err) {
      console.error("Falha ao copiar", err);
    } finally {
      setIsSharing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-teal-500">
        <div className="animate-spin h-8 w-8 border-4 border-teal-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  // Agrupando dados para passar para as páginas
  const appData = { profile, socialLinks, mapVersions, locations };
  const shareFunctions = {
    shareProfile,
    shareBtnText,
    discordConfig: DISCORD_CONFIG,
  };

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen transition-colors duration-500 ${
          darkMode ? "bg-slate-950" : "bg-slate-50"
        }`}
      >
        {/* Background Particles (Fixo) */}
        {/* Adicione o ParticleBackground aqui se quiser que ele persista entre paginas */}

        <InAppBrowserBanner />

        {/* Botão de Tema (Fixo no topo direito) */}
        <button
          onClick={toggleTheme}
          aria-label="Alternar Tema"
          className={`
            fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg backdrop-blur-md border transition-all
            ${
              darkMode
                ? "bg-slate-800/80 text-yellow-400 border-slate-700"
                : "bg-white/80 text-slate-600 border-white"
            }
          `}
        >
          {darkMode ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </button>

        {/* --- ROTEAMENTO --- */}
        <main className="relative z-10 w-full min-h-[85vh] py-8 px-4 md:py-12">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  data={appData}
                  darkMode={darkMode}
                  shareFunctions={shareFunctions}
                  variants={{
                    container: containerVariants,
                    item: itemVariants,
                  }}
                />
              }
            />
            <Route
              path="/downloads"
              element={
                <Downloads
                  data={appData}
                  darkMode={darkMode}
                  variants={{
                    container: containerVariants,
                    item: itemVariants,
                  }}
                />
              }
            />
          </Routes>
        </main>

        {/* Footer Global */}
        <footer className="mt-12 text-center pb-8 opacity-60">
          <p
            className={`text-xs font-bold uppercase tracking-widest ${
              darkMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            © {new Date().getFullYear()} TeDabliukk • Feito com 💜
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
