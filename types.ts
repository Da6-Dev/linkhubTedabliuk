export interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: 'instagram' | 'tiktok' | 'youtube' | 'discord' | 'twitter' | 'download' | 'generic';
  colorClass: string;
  followers?: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
}

export enum GeneratorStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}