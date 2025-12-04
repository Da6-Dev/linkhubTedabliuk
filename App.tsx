import React, { useState, useEffect } from 'react';
import { UserProfile, SocialLink } from './types';
import LinkCard from './components/LinkCard';
import DiscordWidget from './components/DiscordWidget';
import { ShareIcon, HeartIcon, DownloadIcon, CopyIcon } from './components/Icons';

// Data Configuration for @TeDabliukk
const INITIAL_PROFILE: UserProfile = {
  name: "@TeDabliukk",
  handle: "Criador de Conteúdo",
  bio: "Criando conteúdo para redes sociais, TikTok, YouTube e muito mais! 🎥",
  avatarUrl: "https://i.ibb.co/SDDy2fB6/Design-sem-nome-6.png", 
};

// Separating links by category for the grid layout
const SOCIAL_LINKS: SocialLink[] = [
  { id: '3', title: 'YouTube', url: 'https://www.youtube.com/@TeDabliukk', icon: 'youtube', colorClass: 'red-600' },
  { id: '1', title: 'Instagram', url: 'https://www.instagram.com/davi_psss/', icon: 'instagram', colorClass: 'pink-600' },
  { id: '2', title: 'TikTok', url: 'https://www.tiktok.com/@tedabliu.kk', icon: 'tiktok', colorClass: 'black' },
];

const DOWNLOAD_LINKS: SocialLink[] = [
  { 
    id: '4', 
    title: 'Baixar Mundo (Bedrock)', 
    url: 'https://drive.google.com/file/d/1gJu1o0ZlwIfN2z6NbQc2fYwJd3yWc_jD/view?usp=sharing', 
    icon: 'download', 
    colorClass: 'emerald-600' // Green for Bedrock
  },
  { 
    id: '5', 
    title: 'Baixar Mundo (Java)', 
    url: 'https://drive.google.com/file/d/1PJ6VMg4SPUI1s8emKCJU7c2z4b8G3LBD/view?usp=drive_link', 
    icon: 'download', 
    colorClass: 'indigo-600' // Blue/Indigo for Java
  },
];

const App: React.FC = () => {
  const [profile] = useState<UserProfile>(INITIAL_PROFILE);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [shareBtnText, setShareBtnText] = useState("Compartilhar");
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const savedLike = localStorage.getItem('profile_liked');
    if (savedLike === 'true') {
      setHasLiked(true);
      setLikes(prev => prev + 1);
    }
  }, []);

  const handleLike = () => {
    if (hasLiked) return;
    setHasLiked(true);
    setLikes(prev => prev + 1);
    localStorage.setItem('profile_liked', 'true');
  };

  const shareProfile = async () => {
    if (isSharing) return;
    setIsSharing(true);

    const shareData = {
      title: profile.name,
      text: profile.bio,
      url: window.location.href,
    };

    // Função auxiliar para copiar
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
      // Tenta compartilhamento nativo primeiro (Mobile)
      if (navigator.share) {
        await navigator.share(shareData);
        // Se der certo, não faz nada
      } else {
        // Se não suportar (Desktop), vai pro clipboard
        await copyToClipboard();
      }
    } catch (error: any) {
      // Se o usuário cancelar ou der erro no share nativo, faz fallback pro copy
      if (error.name !== 'AbortError') {
         await copyToClipboard();
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center pt-12 pb-12 px-4 md:px-8">
      
      {/* Decorative Gradient Blur */}
      <div className="fixed top-0 left-0 right-0 h-96 bg-gradient-to-b from-teal-50/80 via-white/80 to-transparent z-0 pointer-events-none" />
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-[100px] z-0 pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-[500px] flex flex-col items-center animate-fade-in-up">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-8 w-full">
          {/* Avatar */}
          <div className="relative group mb-5">
            <div className="absolute -inset-2 bg-gradient-to-tr from-teal-300 to-cyan-300 rounded-full opacity-60 group-hover:opacity-100 transition duration-500 blur-md" />
            <div className="relative p-1.5 bg-white rounded-full">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-28 h-28 rounded-full object-cover shadow-sm bg-gray-100"
              />
            </div>
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-teal-400 border-4 border-white rounded-full" title="Online" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            {profile.name}
          </h1>
          <span className="text-teal-600 text-sm font-bold uppercase tracking-widest mb-4">
            {profile.handle}
          </span>

          <p className="text-slate-500 font-medium max-w-xs leading-relaxed mb-6">
            {profile.bio}
          </p>

          {/* Action Pills */}
          <div className="flex items-center gap-3 mb-8">
             <button 
              onClick={handleLike}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 shadow-sm
                ${hasLiked 
                  ? 'bg-rose-50 border-rose-200 text-rose-500' 
                  : 'bg-white border-slate-200 text-slate-600 hover:scale-105 hover:border-rose-200 hover:text-rose-500'}
              `}
            >
              <HeartIcon className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
              <span className="font-bold text-sm">{likes}</span>
            </button>
            
            <button 
              onClick={shareProfile}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full border shadow-md transition-all duration-300
                ${shareBtnText === 'Copiado!' 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800 hover:scale-105'}
              `}
            >
              {shareBtnText === 'Copiado!' ? <CopyIcon className="w-4 h-4" /> : <ShareIcon className="w-4 h-4" />}
              <span className="font-bold text-sm">{shareBtnText}</span>
            </button>
          </div>

        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="w-full grid grid-cols-2 gap-3 mb-8">
          
          {/* Feature: YouTube (Full Width or Big Card) */}
          <div className="col-span-2">
            <LinkCard link={SOCIAL_LINKS[0]} variant="featured" />
          </div>

          {/* Square: Instagram */}
          <div className="col-span-1">
            <LinkCard link={SOCIAL_LINKS[1]} variant="square" />
          </div>

          {/* Square: TikTok */}
          <div className="col-span-1">
            <LinkCard link={SOCIAL_LINKS[2]} variant="square" />
          </div>

        </div>

        {/* Downloads Section */}
        <div className="w-full mb-8">
           <div className="flex items-center gap-2 mb-4 px-1 opacity-80">
             <DownloadIcon className="w-4 h-4 text-slate-400" />
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Downloads Minecraft</span>
          </div>
          <div className="flex flex-col gap-3">
             {DOWNLOAD_LINKS.map(link => (
               <LinkCard key={link.id} link={link} variant="list" className="!py-3 !px-4" />
             ))}
          </div>
        </div>

        {/* Discord Widget */}
        <div className="w-full">
          <DiscordWidget 
            serverId="1334855536700686388" 
            inviteUrl="https://discord.gg/tedabliukk" 
            customIconUrl={profile.avatarUrl}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center pb-8">
          <div className="w-8 h-1 bg-slate-200 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
            © {new Date().getFullYear()} TeDabliukk
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;