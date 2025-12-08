
import React, { useState, useEffect } from 'react';
import { UserProfile, SocialLink } from './types';
import LinkCard from './components/LinkCard';
import DiscordWidget from './components/DiscordWidget';
import { ShareIcon, DownloadIcon, CopyIcon } from './components/Icons';

// Bio Options for Rotation
const BIO_OPTIONS = [
  "Criando conteúdo para redes sociais, TikTok, YouTube e muito mais! 🎥",
  "Minecraft, Vlogs e diversão garantida! 🎮✨",
  "Se inscreva no canal e me siga nas redes vizinhas! 🚀",
  "Transformando ideias em vídeos épicos. Vem conferir! 🔥"
];

// Data Configuration for @TeDabliukk
const INITIAL_PROFILE: UserProfile = {
  name: "@TeDabliukk",
  handle: "Criador de Conteúdo",
  bio: BIO_OPTIONS[0], // Will be updated by useEffect
  avatarUrl: "https://i.ibb.co/SDDy2fB6/Design-sem-nome-6.png", 
};

// Separating links by category for the grid layout
const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  { 
    id: '3', 
    title: 'YouTube', 
    url: 'https://www.youtube.com/@TeDabliukk', 
    icon: 'youtube', 
    colorClass: 'red-600',
    cta: 'Vídeos épicos e Tutoriais! 🎬'
  },
  { 
    id: '1', 
    title: 'Instagram', 
    url: 'https://www.instagram.com/davi_psss/', 
    icon: 'instagram', 
    colorClass: 'pink-600',
    cta: 'Bastidores e fotos 📸'
  },
  { 
    id: '2', 
    title: 'TikTok', 
    url: 'https://www.tiktok.com/@tedabliu.kk', 
    icon: 'tiktok', 
    colorClass: 'black',
    cta: 'Vídeos Curtos! 🤣'
  },
];

const DOWNLOAD_LINKS: SocialLink[] = [
  { 
    id: '4', 
    title: 'Baixar Mundo (Bedrock)', 
    url: 'https://drive.google.com/file/d/1gJu1o0ZlwIfN2z6NbQc2fYwJd3yWc_jD/view?usp=sharing', 
    icon: 'download', 
    colorClass: 'emerald-600',
    cta: 'Para Celular/Console'
  },
  { 
    id: '5', 
    title: 'Baixar Mundo (Java)', 
    url: 'https://drive.google.com/file/d/1PJ6VMg4SPUI1s8emKCJU7c2z4b8G3LBD/view?usp=drive_link', 
    icon: 'download', 
    colorClass: 'indigo-600',
    cta: 'Versão para PC'
  },
];

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [socialLinks] = useState<SocialLink[]>(INITIAL_SOCIAL_LINKS);
  const [shareBtnText, setShareBtnText] = useState("Compartilhar");
  const [isSharing, setIsSharing] = useState(false);

  // Random Bio Logic
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * BIO_OPTIONS.length);
    setProfile(prev => ({ ...prev, bio: BIO_OPTIONS[randomIndex] }));
  }, []);

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
    <div className="min-h-screen relative flex justify-center pt-8 pb-12 px-4 md:px-8 overflow-x-hidden">
      
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 right-0 h-96 bg-gradient-to-b from-teal-50/80 via-white/80 to-transparent z-0 pointer-events-none" />
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-[100px] z-0 pointer-events-none" />

      {/* Main Container - Responsive Width */}
      <main className="relative z-10 w-full max-w-5xl animate-fade-in-up">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* ==================== LEFT COLUMN: PROFILE (Sticky on Desktop) ==================== */}
          <aside className="md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="md:sticky md:top-12 w-full flex flex-col items-center md:items-start">
              
              {/* Avatar */}
              <div className="relative group mb-8">
                <div className="absolute -inset-2 bg-gradient-to-tr from-teal-300 to-cyan-300 rounded-full opacity-60 group-hover:opacity-100 transition duration-500 blur-md" />
                <div className="relative p-1.5 bg-white rounded-full">
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.name} 
                    className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover shadow-sm bg-gray-100"
                  />
                </div>
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-teal-400 border-4 border-white rounded-full" title="Online" />
              </div>
              
              {/* Name & Bio - TYPOGRAPHY UPDATE */}
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter mb-3 leading-tight">
                {profile.name}
              </h1>
              
              <div className="mb-6">
                <span className="text-teal-700 text-xs font-bold uppercase tracking-widest inline-block bg-teal-100/50 px-3 py-1.5 rounded-full border border-teal-200/50">
                  {profile.handle}
                </span>
              </div>

              <p className="text-slate-600 text-lg font-normal leading-relaxed max-w-xs md:max-w-full mb-8 opacity-90">
                {profile.bio}
              </p>

              {/* Share Button */}
              <div className="w-full max-w-xs md:max-w-full">
                <button 
                  onClick={shareProfile}
                  className={`
                    w-full group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold tracking-wide shadow-xl transition-all duration-300 ease-out
                    ${shareBtnText === 'Copiado!' 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 scale-105 shadow-emerald-500/25 ring-2 ring-emerald-300/50' 
                      : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:bg-slate-800 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/30 active:scale-95 ring-1 ring-white/10'}
                  `}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {shareBtnText === 'Copiado!' ? (
                    <CopyIcon className="w-5 h-5 relative z-10" /> 
                  ) : (
                    <ShareIcon className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  )}
                  <span className="relative z-10 text-base">{shareBtnText}</span>
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
                <LinkCard link={socialLinks[0]} variant="featured" className="h-full min-h-[180px]" />
              </div>

              {/* Instagram & TikTok */}
              <div className="col-span-1">
                <LinkCard link={socialLinks[1]} variant="square" className="h-full aspect-square md:aspect-auto md:h-48" />
              </div>
              <div className="col-span-1">
                <LinkCard link={socialLinks[2]} variant="square" className="h-full aspect-square md:aspect-auto md:h-48" />
              </div>
            </div>

            {/* Downloads Section */}
            <div>
               <div className="flex items-center gap-2 mb-4 px-1 opacity-90">
                 <DownloadIcon className="w-5 h-5 text-slate-500" />
                 <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Downloads Minecraft</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {DOWNLOAD_LINKS.map(link => (
                   <LinkCard key={link.id} link={link} variant="list" className="!py-4 !px-5" />
                 ))}
              </div>
            </div>

            {/* Discord Widget */}
            <div>
              <DiscordWidget 
                serverId="1334855536700686388" 
                inviteUrl="https://discord.gg/W9MmqNgEBP" 
                customIconUrl={profile.avatarUrl}
              />
            </div>

            {/* Mobile-Only Footer (Hidden on Desktop to avoid duplication or awkward placement) */}
            <footer className="mt-8 text-center md:text-left pb-8 md:pb-0">
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto md:mx-0 mb-6"></div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-500 transition-colors cursor-default">
                © {new Date().getFullYear()} TeDabliukk
              </p>
            </footer>

          </section>

        </div>
      </main>
    </div>
  );
};

export default App;
