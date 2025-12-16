import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  UserProfile,
  SocialLink,
  MapVersion,
  WorldLocation,
} from "../types/types";
// Importamos os dados estáticos apenas como backup inicial (opcional)
import {
  INITIAL_PROFILE,
  INITIAL_SOCIAL_LINKS,
  MAP_VERSIONS,
  WORLD_LOCATIONS,
} from "../data/profile";

export const useData = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [socialLinks, setSocialLinks] =
    useState<SocialLink[]>(INITIAL_SOCIAL_LINKS);
  const [mapVersions, setMapVersions] = useState<MapVersion[]>(MAP_VERSIONS);
  const [locations, setLocations] = useState<WorldLocation[]>(WORLD_LOCATIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Perfil
        const { data: profileData } = await supabase
          .from("profile")
          .select("*")
          .single();
        if (profileData) {
          setProfile({
            name: profileData.name,
            handle: profileData.handle,
            bio: profileData.bio,
            avatarUrl: profileData.avatar_url,
            likes: profileData.likes_count || 0
          });
        }

        // 2. Links (Ordenados)
        const { data: linksData } = await supabase
          .from("social_links")
          .select("*")
          .order("sort_order", { ascending: true });
        if (linksData) {
          setSocialLinks(
            linksData.map((l: any) => ({
              id: l.id.toString(),
              title: l.title,
              url: l.url,
              icon: l.icon,
              colorClass: l.color_class,
              cta: l.cta,
            }))
          );
        }

        // 3. Mapas
        const { data: mapsData } = await supabase
          .from("map_versions")
          .select("*");
        if (mapsData) setMapVersions(mapsData);

        // 4. Locais
        const { data: locsData } = await supabase
          .from("world_locations")
          .select("*");
        if (locsData) {
          setLocations(
            locsData.map((l: any) => ({
              id: l.id.toString(),
              name: l.name,
              description: l.description,
              imageUrl: l.image_url,
              coordinateCommand: l.coordinate_command,
            }))
          );
        }
      } catch (error) {
        console.error("Erro ao buscar dados do Supabase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { profile, socialLinks, mapVersions, locations, loading };
};
