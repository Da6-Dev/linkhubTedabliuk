import React from "react";
import { motion } from "framer-motion"; // <--- O SEGREDO
import { SocialLink } from "../../types/types";
import {
  InstagramIcon,
  TikTokIcon,
  YoutubeIcon,
  DiscordIcon,
  TwitterIcon,
  LinkIcon,
  CopyIcon,
  DownloadIcon,
} from "../widgets/Icons";

interface LinkCardProps {
  link: SocialLink;
  variant?: "list" | "square" | "featured";
  className?: string;
  darkMode?: boolean;
}

const getIcon = (type: SocialLink["icon"]) => {
  switch (type) {
    case "instagram":
      return <InstagramIcon className="w-6 h-6" />;
    case "tiktok":
      return <TikTokIcon className="w-6 h-6" />;
    case "youtube":
      return <YoutubeIcon className="w-6 h-6" />;
    case "discord":
      return <DiscordIcon className="w-6 h-6" />;
    case "twitter":
      return <TwitterIcon className="w-6 h-6" />;
    case "download":
      return <DownloadIcon className="w-6 h-6" />;
    default:
      return <LinkIcon className="w-6 h-6" />;
  }
};

const LinkCard: React.FC<LinkCardProps> = ({
  link,
  variant = "list",
  className = "",
  darkMode = false,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Cores dinâmicas baseadas no modo escuro
  const cardBg = darkMode
    ? "rgba(30, 41, 59, 0.6)"
    : "rgba(255, 255, 255, 0.7)";

  const borderColor = darkMode
    ? "rgba(51, 65, 85, 0.5)"
    : "rgba(255, 255, 255, 0.8)";

  // Estilos base
  const baseStyles = `
    group relative flex overflow-hidden backdrop-blur-md border
    cursor-pointer
  `;

  // Variantes de Layout
  const variantStyles = {
    list: `items-center justify-between w-full p-4 rounded-2xl`,
    square: `flex-col items-center justify-center p-6 text-center rounded-3xl aspect-square md:aspect-auto`,
    featured: `flex-col justify-between p-6 md:p-8 rounded-[2rem] h-full min-h-[180px]`,
  };

  // Configuração de cores do ícone
  const iconBgClass =
    variant === "featured"
      ? `bg-${link.colorClass} text-white shadow-xl shadow-${link.colorClass}/30`
      : darkMode
      ? "bg-slate-800 text-slate-200 group-hover:bg-slate-700"
      : "bg-white text-slate-700 shadow-sm group-hover:scale-110";

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={{ backgroundColor: cardBg, borderColor: borderColor }}
      // --- A MÁGICA DA FÍSICA ---
      whileHover={{
        y: -5,
        scale: 1.02,
        backgroundColor: darkMode
          ? "rgba(30, 41, 59, 0.9)"
          : "rgba(255, 255, 255, 0.95)",
        boxShadow: darkMode
          ? "0 20px 40px -10px rgba(0,0,0,0.5)"
          : "0 20px 40px -10px rgba(0,0,0,0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Brilho no Hover (Featured) */}
      {variant === "featured" && (
        <div
          className={`absolute -right-10 -top-10 w-40 h-40 bg-${link.colorClass} opacity-20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700`}
        />
      )}

      {/* Ícone */}
      <div
        className={`
        flex items-center justify-center rounded-2xl transition-all duration-300
        ${variant === "list" ? "p-3 mr-4" : "p-4 mb-4 text-3xl"}
        ${iconBgClass}
      `}
      >
        {getIcon(link.icon)}
      </div>

      {/* Textos */}
      <div
        className={`z-10 flex-1 ${variant === "list" ? "text-left" : "w-full"}`}
      >
        <h3
          className={`font-bold tracking-tight ${
            darkMode ? "text-slate-100" : "text-slate-900"
          } ${variant === "featured" ? "text-3xl" : "text-lg"}`}
        >
          {link.title}
        </h3>

        {link.cta && (
          <p
            className={`text-sm font-medium mt-1 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            } ${variant === "featured" ? "text-base opacity-90" : ""}`}
          >
            {link.cta}
          </p>
        )}
      </div>

      {/* Botão de Copiar (Discreto) */}
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.8 }}
        className={`
          z-20 p-2 rounded-full transition-colors
          ${
            variant === "list"
              ? "opacity-0 group-hover:opacity-100"
              : "absolute top-4 right-4 bg-black/5 dark:bg-white/10 opacity-0 group-hover:opacity-100"
          }
        `}
      >
        {copied ? (
          <span className="text-green-500 font-bold">✓</span>
        ) : (
          <CopyIcon
            className={`w-5 h-5 ${
              darkMode ? "text-slate-400" : "text-slate-400"
            }`}
          />
        )}
      </motion.button>
    </motion.a>
  );
};

export default LinkCard;
