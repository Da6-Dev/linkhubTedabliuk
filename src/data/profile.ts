import { UserProfile, SocialLink, MapVersion, WorldLocation } from '../types/types';

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
  likes: 0 
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

// Configuração do Discord (Extra: para organizar tudo mesmo)
export const DISCORD_CONFIG = {
  serverId: "1334855536700686388",
  inviteUrl: "https://discord.gg/W9MmqNgEBP"
};

export const MAP_VERSIONS: MapVersion[] = [
  {
    id: 'bedrock',
    title: 'Mundo Bedrock (Celular/Console)',
    description: '.mcworld - Instalação automática',
    mirrors: [
      { name: 'Opção 1 (Google Drive)', url: 'SEU_LINK_DRIVE_AQUI' },
      { name: 'Opção 2 (MediaFire)', url: 'SEU_LINK_MEDIAFIRE_AQUI' }, // Crie conta no MediaFire (grátis)
      { name: 'Opção 3 (Mega)', url: 'SEU_LINK_MEGA_AQUI' },
    ]
  },
  {
    id: 'java',
    title: 'Mundo Java (PC)',
    description: '.zip - Extrair na pasta saves',
    mirrors: [
      { name: 'Opção 1 (Google Drive)', url: 'SEU_LINK_DRIVE_AQUI' },
      { name: 'Opção 2 (MediaFire)', url: 'SEU_LINK_MEDIAFIRE_AQUI' },
    ]
  }
];

// === DADOS DO GUIA DE CONSTRUÇÕES ===
export const WORLD_LOCATIONS: WorldLocation[] = [
  {
    id: '1',
    name: 'Mansão Moderna',
    description: 'A casa principal onde comecei a série. Tem piscina e redstone.',
    imageUrl: 'https://i.ibb.co/vzwdZC0/exemplo-casa.jpg', // Troque por prints reais do seu mapa
    coordinateCommand: '/tp @s 120 70 -350'
  },
  {
    id: '2',
    name: 'Farm de Ferro',
    description: 'Fica no subsolo, perto da vila dos villagers.',
    imageUrl: 'https://i.ibb.co/vzwdZC0/exemplo-farm.jpg',
    coordinateCommand: '/tp @s 500 12 100'
  },
  {
    id: '3',
    name: 'Arena PvP',
    description: 'Área isolada para batalhas com mobs ou amigos.',
    imageUrl: 'https://i.ibb.co/vzwdZC0/exemplo-arena.jpg',
    coordinateCommand: '/tp @s -1000 64 500'
  }
];