
export interface SocialStats {
  followers: string | null;
}

// Usamos um proxy CORS para contornar a restrição de 'Same-Origin' do navegador.
// O allorigins é um serviço público. Em produção profissional, recomenda-se ter seu próprio proxy.
const PROXY_BASE = 'https://api.allorigins.win/get?url=';

const fetchWithProxy = async (url: string): Promise<string> => {
  try {
    // Adiciona timestamp para evitar cache
    const targetUrl = encodeURIComponent(`${url}?t=${Date.now()}`);
    const response = await fetch(`${PROXY_BASE}${targetUrl}`);
    const data = await response.json();
    
    if (!data.contents) throw new Error('No content');
    return data.contents;
  } catch (error) {
    console.warn(`Falha ao buscar via proxy: ${url}`, error);
    return '';
  }
};

const formatNumber = (numStr: string): string => {
  if (!numStr) return '';
  // Remove textos extras e mantém números e K/M
  return numStr.replace(/[^0-9.,KMkm]/g, '').toUpperCase();
};

export const scrapeInstagram = async (username: string): Promise<string | null> => {
  try {
    const html = await fetchWithProxy(`https://www.instagram.com/${username}/`);
    
    // Procura pela meta tag og:description que geralmente tem o formato "10K Followers, 500 Following..."
    const metaMatch = html.match(/<meta property="og:description" content="([^"]+)"/i);
    if (metaMatch && metaMatch[1]) {
      const content = metaMatch[1];
      // Extrai o número antes da palavra Followers/Seguidores
      const statsMatch = content.match(/^([0-9.,KMkm]+)\s+(?:Followers|Seguidores)/i);
      if (statsMatch && statsMatch[1]) {
        return `${statsMatch[1]} Seguidores`;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const scrapeTikTok = async (username: string): Promise<string | null> => {
  try {
    // TikTok é mais difícil pois renderiza muito via JS, mas as vezes o HTML inicial tem dados
    // Tenta pegar da tag meta description
    const html = await fetchWithProxy(`https://www.tiktok.com/@${username}`);
    
    // Padrão comum em meta description do TikTok: "davi (@user) on TikTok | 1.2M Likes. 120K Followers."
    const followerMatch = html.match(/([0-9.,KM]+)\s+Followers/i);
    if (followerMatch && followerMatch[1]) {
      return `${followerMatch[1]} Seguidores`;
    }
    
    return null;
  } catch (e) {
    return null;
  }
};

export const scrapeYoutube = async (channelHandle: string): Promise<string | null> => {
  try {
    const html = await fetchWithProxy(`https://www.youtube.com/${channelHandle}`);
    
    // YouTube também é difícil, mas as vezes vaza no meta description ou scripts iniciais
    // Padrão possível: "TeDabliukk. 2.45K subscribers."
    const subMatch = html.match(/([0-9.,KM]+)\s+subscribers/i);
    
    if (subMatch && subMatch[1]) {
      return `${subMatch[1]} Inscritos`;
    }
    
    return null;
  } catch (e) {
    return null;
  }
};
