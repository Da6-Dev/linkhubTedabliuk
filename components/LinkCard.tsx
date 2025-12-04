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
  const baseStyles = `
    group relative flex overflow-hidden
    bg-white border border-slate-200 
    transition-all duration-300 ease-out
    hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1
    active:scale-[0.98]
    cursor-pointer
  `;

  // Specific styles for variants
  const variantStyles = {
    list: `
      items-center justify-between w-full p-4 rounded-2xl
    `,
    square: `
      flex-col items-center justify-center p-6 text-center rounded-3xl aspect-square
    `,
    featured: `
      flex-col justify-between p-6 rounded-3xl h-full min-h-[160px]
      bg-gradient-to-br from-white to-slate-50
    `
  };

  // Icon container styles
  const iconContainerStyles = `
    flex items-center justify-center rounded-xl transition-colors duration-300
    ${variant === 'square' ? 'p-3 mb-3 bg-slate-50 group-hover:bg-slate-100 text-slate-700' : ''}
    ${variant === 'list' ? `p-2.5 bg-slate-50 text-slate-600 group-hover:bg-${link.colorClass} group-hover:text-white` : ''}
    ${variant === 'featured' ? `w-12 h-12 bg-${link.colorClass} text-white mb-auto shadow-lg shadow-${link.colorClass}/30` : ''}
  `;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {/* Background decoration for featured */}
      {variant === 'featured' && (
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${link.colorClass} opacity-[0.03] rounded-bl-full -mr-8 -mt-8 transition-opacity group-hover:opacity-10`} />
      )}

      {/* Icon */}
      <div className={iconContainerStyles}>
        {getIcon(link.icon)}
      </div>

      {/* Text Content */}
      <div className={`z-10 ${variant === 'list' ? 'flex-1 ml-4 text-left' : 'w-full'}`}>
        <span className={`
          font-bold text-slate-800 group-hover:text-slate-900 block
          ${variant === 'featured' ? 'text-2xl mt-4' : 'text-lg'}
        `}>
          {link.title}
        </span>
        
        {/* Followers / Subtext */}
        {link.followers && (
          <span className={`
            block text-slate-500 font-medium
            ${variant === 'featured' ? 'text-base mt-1' : 'text-xs mt-0.5'}
          `}>
            {link.followers}
          </span>
        )}
        
        {variant === 'featured' && !link.followers && (
          <span className="text-sm text-slate-500 font-medium mt-1 flex items-center gap-1">
            Ver canal <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        )}
      </div>

      {/* Copy Button */}
      <button 
        onClick={handleCopy}
        className={`
          z-20 text-slate-300 hover:text-green-500 transition-colors
          ${variant === 'list' ? 'p-2 opacity-0 group-hover:opacity-100' : 'absolute top-3 right-3 p-2 bg-white/50 backdrop-blur rounded-full opacity-0 group-hover:opacity-100'}
        `}
        title="Copiar Link"
      >
        {copied ? <span className="text-xs font-bold text-green-600">✓</span> : <CopyIcon className="w-4 h-4" />}
      </button>
    </a>
  );
};

export default LinkCard;