import { supabase } from "../lib/supabase";

export const useAnalytics = () => {
  // 1. Dar Like no Perfil
  const addLike = async (profileId: string) => {
    // profileId geralmente é 1 se você só tem 1 linha na tabela
    const { error } = await supabase.rpc("increment_profile_like", {
      profile_id: Number(profileId) || 1,
    });
    if (error) console.error("Erro ao dar like:", error);
  };

  // 2. Contar Download
  const trackDownload = async (mapId: string) => {
    const { error } = await supabase.rpc("increment_download", {
      map_id: mapId,
    });
    if (error) console.error("Erro ao contar download:", error);
  };

  // 3. Contar Clique em Link Social
  const trackLinkClick = async (linkId: string) => {
    const { error } = await supabase.rpc("increment_link_click", {
      link_id: Number(linkId),
    });
    if (error) console.error("Erro ao contar clique:", error);
  };

  return { addLike, trackDownload, trackLinkClick };
};
