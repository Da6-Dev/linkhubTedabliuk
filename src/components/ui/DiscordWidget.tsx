
import React, { useEffect, useState } from 'react';
import { DiscordIcon } from '../widgets/Icons';

interface DiscordWidgetProps {
  serverId: string;
  inviteUrl?: string;
  customIconUrl?: string;
}

interface DiscordData {
  name: string;
  presence_count: number;
  instant_invite: string;
}

const DiscordWidget: React.FC<DiscordWidgetProps> = ({ serverId, inviteUrl, customIconUrl }) => {
  const [data, setData] = useState<DiscordData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real data from Discord API
    fetch(`https://discord.com/api/guilds/${serverId}/widget.json`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [serverId]);

  const finalLink = inviteUrl || data?.instant_invite || "https://discord.com/app";

  return (
    <a 
      href={finalLink}
      // REMOVIDO target="_blank" para evitar problemas no navegador do TikTok
      // Added active:scale-[0.98] and refined hover translation
      className="group block relative w-full transform transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:-translate-y-1.5 active:scale-[0.98] cursor-pointer"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-indigo-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
      
      {/* Main Container */}
      <div className="relative bg-[#5865F2] rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all border border-indigo-400/50">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://assets-global.website-files.com/6257adef93867e56f84d3092/636e0a6ca814282eca71ad1c_discord_icon_clyde_blurple_RGB.png')] bg-center bg-no-repeat bg-contain transform scale-150 translate-x-10 translate-y-2 group-hover:scale-[1.6] transition-transform duration-700"></div>
        
        <div className="relative p-4 flex items-center justify-between z-10">
          
          <div className="flex items-center space-x-4">
             {/* Discord Logo/Image Box - Added slight rotation on hover */}
             <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg text-white shrink-0 overflow-hidden transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
                {customIconUrl ? (
                  <img 
                    src={customIconUrl} 
                    alt="Server Icon" 
                    className="w-10 h-10 rounded-md object-cover bg-indigo-700"
                  />
                ) : (
                  <div className="p-1">
                    <DiscordIcon className="w-8 h-8" />
                  </div>
                )}
             </div>

             <div className="flex flex-col text-white">
                <span className="font-bold text-lg leading-tight line-clamp-1 group-hover:translate-x-1 transition-transform">
                  {data?.name || "Comunidade Discord"}
                </span>
                
                <div className="flex items-center space-x-1.5 mt-1">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
                  </span>
                  <span className="text-xs font-medium text-indigo-100 uppercase tracking-wide">
                    {loading ? "Carregando..." : `${data?.presence_count || 0} Online`}
                  </span>
                </div>
             </div>
          </div>

          <div className="bg-white text-[#5865F2] px-4 py-2 rounded-lg font-bold text-sm shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-white/20 whitespace-nowrap">
            Entrar
          </div>

        </div>
      </div>
    </a>
  );
};

export default DiscordWidget;
