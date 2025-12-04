
export interface SocialStats {
  followers: string | null;
}

// Alternativa de Proxy mais estável (CodeTabs) que retorna HTML bruto
const PROXY_BASE = 'https://api.codetabs.com/v1/proxy?quest=';

const fetchWithProxy = async (url: string): Promise<string> => {
  try {
    const targetUrl = `${PROXY_BASE}${encodeURIComponent(url)}`;
    
    // Adicionamos um timeout para não deixar a requisição pendurada para sempre
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos de limite

    const response = await fetch(targetUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // CodeTabs retorna o corpo direto
    return await response.text();
  } catch (error) {
    // Falha silenciosa para não poluir o console do usuário
    // console.warn(`Scraping falhou para: ${url}`, error);
    return '';
  }
};

export const scrapeInstagram = async (username: string): Promise<string | null> => {
  try {
    const html = await fetchWithProxy(`https://www.instagram.com/${username}/`);
    if (!html) return null;
    
    // Regex ajustado para pegar descrições comuns do Instagram
    const metaMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
    if (metaMatch && metaMatch[1]) {
      const content = metaMatch[1];
      // Ex: "10K Followers, 500 Following..."
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
    const html = await fetchWithProxy(`https://www.tiktok.com/@${username}`);
    if (!html) return null;

    // TikTok pode variar, mas tentamos pegar padrões numéricos associados a Followers
    // Padrão comum em meta description
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
    if (!html) return null;
    
    // YouTube
    const subMatch = html.match(/([0-9.,KM]+)\s+subscribers/i);
    
    if (subMatch && subMatch[1]) {
      return `${subMatch[1]} Inscritos`;
    }
    
    return null;
  } catch (e) {
    return null;
  }
};
