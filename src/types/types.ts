export interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: 'instagram' | 'tiktok' | 'youtube' | 'discord' | 'twitter' | 'download' | 'generic';
  colorClass: string;
  cta?: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  likes: number;
}

// === NOVOS TIPOS ===
export interface DownloadMirror {
  name: string; // Ex: "Google Drive", "MediaFire"
  url: string;
}

export interface MapVersion {
  id: string;
  title: string; // Ex: "Versão Bedrock (MCPE)"
  description: string;
  mirrors: DownloadMirror[]; // Lista de links alternativos
}

export interface WorldLocation {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  coordinateCommand: string; // Ex: "/tp @s 100 64 -200"
}