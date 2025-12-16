import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UserProfile } from '../../types/types';

interface SEOProps {
  profile: UserProfile;
}

const SEO: React.FC<SEOProps> = ({ profile }) => {
  return (
    <Helmet>
      {/* Título e Descrição Básicos */}
      <title>{`${profile.name} - Links e Bio`}</title>
      <meta name="description" content={profile.bio} />
      
      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:title" content={`${profile.name} - Bio Oficial`} />
      <meta property="og:description" content={profile.bio} />
      <meta property="og:image" content={profile.avatarUrl} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={profile.name} />
      <meta name="twitter:description" content={profile.bio} />
      <meta name="twitter:image" content={profile.avatarUrl} />
      
      {/* Cor do Tema (Opcional, pega do CSS ou hardcoded) */}
      <meta name="theme-color" content="#2dd4bf" />
    </Helmet>
  );
};

export default SEO;