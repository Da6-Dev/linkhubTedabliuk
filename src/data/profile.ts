import { UserProfile, SocialLink } from '../types/types';

// Opções de Bio para Rotação
export const BIO_OPTIONS = [
  "Criando conteúdo para redes sociais, TikTok, YouTube e muito mais! 🎥",
  "Minecraft, Vlogs e diversão garantida! 🎮✨",
  "Se inscreva no canal e me siga nas redes vizinhas! 🚀",
  "Transformando ideias em vídeos épicos. Vem conferir! 🔥"
];

// Dados do Perfil
export const INITIAL_PROFILE: UserProfile = {
  name: "@TeDabliukk",
  handle: "Criador de Conteúdo",
  bio: BIO_OPTIONS[0], 
  avatarUrl: "https://i.ibb.co/SDDy2fB6/Design-sem-nome-6.png", 
};

// Links Sociais
export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
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

// Links de Download
export const DOWNLOAD_LINKS: SocialLink[] = [
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

// Configuração do Discord (Extra: para organizar tudo mesmo)
export const DISCORD_CONFIG = {
  serverId: "1334855536700686388",
  inviteUrl: "https://discord.gg/W9MmqNgEBP"
};