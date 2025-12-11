
import React from 'react';
import { SocialLink } from '../types';
import { InstagramIcon, TikTokIcon, YoutubeIcon, DiscordIcon, TwitterIcon, LinkIcon, CopyIcon, DownloadIcon } from './Icons';

interface LinkCardProps {
  link: SocialLink;
  variant?: 'list' | 'square' | 'featured';
  className?: string;
}

const getIcon = (type: SocialLink['icon']) => {
  switch (type) {
    case 'instagram': return <InstagramIcon className="w-6 h-6" />;
    case 'tiktok': return <TikTokIcon className="w-6 h-6" />;
    case 'youtube': return <YoutubeIcon className="w-6 h-6" />;
    case 'discord': return <DiscordIcon className="w-6 h-6" />;
    case 'twitter': return <TwitterIcon className="w-6 h-6" />;
    case 'download': return <DownloadIcon className="w-6 h-6" />;
    default: return <LinkIcon className="w-6 h-6" />;
  }
};

const LinkCard: React.FC<LinkCardProps> = ({ link, variant = 'list', className = '' }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Base styles shared by all variants
  // Updated for Premium Feel: Gradient background, crisp ring border, and deep animated shadow
  const baseStyles = `
    group relative flex overflow-hidden
    bg-gradient-to-br from-white via-white to-slate-50
    border border-slate-200/60
    transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
    hover:border-slate-300 hover:to-white
    hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1.5
    active:scale-[0.98] active:shadow-sm
    cursor-pointer
    ring-1 ring-black/5
  `;

  // Specific styles for variants
  const variantStyles = {
    list: `
      items-center justify-between w-full p-4 rounded-2xl
    `,
    square: `
      flex-col items-center justify-center p-6 text-center rounded-3xl
    `,
    featured: `
      flex-col justify-between p-6 md:p-8 rounded-3xl h-full min-h-[160px]
      bg-gradient-to-br from-white to-slate-100/50
    `
  };

  // Icon container styles
  // Added cleaner shadows and colors
  const iconContainerStyles = `
    flex items-center justify-center rounded-xl transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3
    ${variant === 'square' ? 'p-3.5 mb-4 bg-white shadow-sm ring-1 ring-slate-100 group-hover:shadow-md text-slate-700' : ''}
    ${variant === 'list' ? `p-3 bg-slate-50 text-slate-600 group-hover:bg-${link.colorClass} group-hover:text-white group-hover:shadow-lg group-hover:shadow-${link.colorClass}/30` : ''}
    ${variant === 'featured' ? `w-14 h-14 bg-${link.colorClass} text-white mb-auto shadow-xl shadow-${link.colorClass}/20` : ''}
  `;

  return (
    <a
      href={link.url}
      // REMOVIDO target="_blank" para evitar bugs no navegador do TikTok/Instagram
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {/* Background decoration for featured */}
      {variant === 'featured' && (
        <div className={`absolute top-0 right-0 w-40 h-40 bg-${link.colorClass} opacity-[0.03] rounded-bl-full -mr-10 -mt-10 transition-all duration-500 group-hover:scale-110 group-hover:opacity-10`} />
      )}

      {/* Icon */}
      <div className={iconContainerStyles}>
        {getIcon(link.icon)}
      </div>

      {/* Text Content */}
      <div className={`z-10 transition-transform duration-300 ${variant === 'list' ? 'flex-1 ml-4 text-left group-hover:translate-x-1' : 'w-full'}`}>
        <span className={`
          block transition-colors text-slate-800 group-hover:text-slate-900
          ${variant === 'featured' ? 'text-3xl font-extrabold tracking-tighter mt-4' : ''}
          ${variant === 'square' ? 'text-xl font-bold tracking-tight' : ''}
          ${variant === 'list' ? 'text-lg font-bold tracking-tight' : ''}
        `}>
          {link.title}
        </span>
        
        {/* CTA / Subtext */}
        {link.cta && (
          <span className={`
            block transition-colors group-hover:text-slate-600
            ${variant === 'featured' ? 'text-lg text-slate-500 font-medium mt-1 leading-snug' : ''}
            ${variant === 'square' ? 'text-xs text-slate-400 font-bold uppercase tracking-wider mt-1.5' : ''}
            ${variant === 'list' ? 'text-sm text-slate-500 font-medium mt-0.5' : ''}
          `}>
            {link.cta}
          </span>
        )}
        
        {variant === 'featured' && !link.cta && (
          <span className="text-sm text-slate-500 font-bold mt-2 flex items-center gap-1">
            Ver canal <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        )}
      </div>

      {/* Copy Button */}
      <button 
        onClick={handleCopy}
        className={`
          z-20 text-slate-300 hover:text-green-500 transition-all duration-300
          ${variant === 'list' ? 'p-2 opacity-0 group-hover:opacity-100 hover:scale-110' : 'absolute top-4 right-4 p-2 bg-white/60 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 hover:scale-110 shadow-sm'}
        `}
        title="Copiar Link"
      >
        {copied ? <span className="text-xs font-bold text-green-600 animate-pulse">✓</span> : <CopyIcon className="w-5 h-5" />}
      </button>
    </a>
  );
};

export default LinkCard;
