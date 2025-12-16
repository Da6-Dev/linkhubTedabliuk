import React, { useState } from "react";
import { WorldLocation } from "../../types/types";
import { CopyIcon, SparklesIcon } from "../widgets/Icons";

interface WorldGuideProps {
  locations: WorldLocation[];
  darkMode: boolean;
}

const WorldGuide: React.FC<WorldGuideProps> = ({ locations, darkMode }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCommand = (id: string, command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full mt-12 mb-8">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between px-2 mb-6">
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg ${
              darkMode
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            <SparklesIcon className="w-4 h-4" />
          </div>
          <span
            className={`text-sm font-bold uppercase tracking-widest ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            Locais Importantes
          </span>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-md ${
            darkMode
              ? "bg-slate-800 text-slate-400"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {locations.length} Pontos
        </span>
      </div>

      {/* Grid de Cards Modernos */}
      <div className="grid grid-cols-1 gap-6">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className={`
              group relative overflow-hidden rounded-2rem border-4 transition-all duration-500
              ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-white shadow-2xl shadow-slate-200"
              }
            `}
          >
            {/* IMAGEM DE FUNDO COM GRADIENTE */}
            <div className="relative h-64 w-full overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
              <img
                src={loc.imageUrl}
                alt={loc.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Badge "Local" */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10">
                  📍 {loc.name}
                </span>
              </div>
            </div>

            {/* CONTEÚDO SOBREPOSTO */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col gap-3">
              <p className="text-slate-300 text-sm font-medium leading-relaxed line-clamp-2 drop-shadow-md">
                {loc.description}
              </p>

              {/* Botão de Ação "Glass" */}
              <button
                onClick={() => copyCommand(loc.id, loc.coordinateCommand)}
                className={`
                  w-full flex items-center justify-between px-5 py-4 rounded-xl font-bold text-sm transition-all duration-300
                  ${
                    copiedId === loc.id
                      ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                      : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 active:scale-95"
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  {copiedId === loc.id
                    ? "Coordenadas Copiadas!"
                    : "Copiar Teleporte"}
                </span>

                {copiedId === loc.id ? (
                  <span className="bg-white/20 p-1 rounded-full">✓</span>
                ) : (
                  <CopyIcon className="w-4 h-4 opacity-70" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldGuide;
