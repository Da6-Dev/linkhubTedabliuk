import React, { useState } from "react";
import { MapVersion } from "../../types/types";
import { DownloadIcon } from "../widgets/Icons";

interface DownloadSectionProps {
  versions: MapVersion[];
  darkMode: boolean;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({
  versions,
  darkMode,
}) => {
  // Estado para controlar a aba ativa (Padrão: primeira versão da lista, geralmente Bedrock)
  const [activeTabId, setActiveTabId] = useState(versions[0]?.id);

  // Encontra a versão ativa baseada no ID
  const activeVersion =
    versions.find((v) => v.id === activeTabId) || versions[0];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Título da Seção */}
      <div className="flex items-center gap-2 px-1 opacity-90">
        <div
          className={`p-1.5 rounded-lg ${
            darkMode
              ? "bg-teal-500/20 text-teal-400"
              : "bg-teal-100 text-teal-600"
          }`}
        >
          <DownloadIcon className="w-4 h-4" />
        </div>
        <span
          className={`text-sm font-bold uppercase tracking-widest ${
            darkMode ? "text-slate-300" : "text-slate-600"
          }`}
        >
          Central de Downloads
        </span>
      </div>

      {/* Container Principal com Efeito Glass */}
      <div
        className={`
        relative overflow-hidden rounded-3xl border transition-all duration-500
        ${
          darkMode
            ? "bg-slate-900/40 border-slate-700/50 backdrop-blur-md"
            : "bg-white/60 border-white/50 backdrop-blur-md shadow-xl shadow-teal-900/5"
        }
      `}
      >
        {/* === TAB SWITCHER (Navegação Superior) === */}
        <div className="flex p-1.5 m-2 rounded-2xl bg-black/5 dark:bg-white/5 relative">
          {/* Fundo deslizante da aba ativa (Animação visual) */}
          <div
            className={`absolute top-1.5 bottom-1.5 rounded-xl shadow-sm transition-all duration-300 ease-out`}
            style={{
              left: `${
                versions.findIndex((v) => v.id === activeTabId) *
                  (100 / versions.length) +
                1
              }%`,
              width: `${96 / versions.length}%`,
              background: darkMode ? "#1e293b" : "white",
            }}
          />

          {versions.map((version) => (
            <button
              key={version.id}
              onClick={() => setActiveTabId(version.id)}
              className={`
                relative z-10 flex-1 py-2.5 text-sm font-extrabold tracking-wide transition-colors duration-300 rounded-xl
                ${
                  activeTabId === version.id
                    ? darkMode
                      ? "text-teal-400"
                      : "text-teal-600"
                    : darkMode
                    ? "text-slate-500 hover:text-slate-300"
                    : "text-slate-400 hover:text-slate-600"
                }
              `}
            >
              {version.title.split(" ")[1]}{" "}
              {/* Pega só "Bedrock" ou "Java" do título */}
            </button>
          ))}
        </div>

        {/* === CONTEÚDO DA ABA (Links) === */}
        <div className="p-6 pt-2">
          {/* Cabeçalho da Versão */}
          <div className="text-center mb-6 animate-fade-in-up">
            <h3
              className={`text-2xl font-black mb-1 ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              {activeVersion.title}
            </h3>
            <p
              className={`text-xs font-medium uppercase tracking-wider ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {activeVersion.description}
            </p>
          </div>

          {/* Grid de Mirrors (Links) */}
          <div className="flex flex-col gap-3">
            {activeVersion.mirrors.map((mirror, index) => (
              <a
                key={index}
                href={mirror.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 active:scale-[0.98]
                  ${
                    darkMode
                      ? "bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-teal-500/50"
                      : "bg-white hover:bg-teal-50 border-slate-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-500/10"
                  }
                `}
              >
                {/* Ícone e Nome */}
                <div className="flex items-center gap-3">
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                    ${
                      darkMode
                        ? "bg-slate-900 text-teal-400"
                        : "bg-teal-100 text-teal-700"
                    }
                  `}
                  >
                    {index + 1}
                  </div>
                  <div className="flex flex-col text-left">
                    <span
                      className={`font-bold ${
                        darkMode ? "text-slate-200" : "text-slate-700"
                      }`}
                    >
                      {mirror.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-teal-500 opacity-80">
                      Download Seguro
                    </span>
                  </div>
                </div>

                {/* Seta / Ícone de Download */}
                <DownloadIcon
                  className={`w-5 h-5 transition-transform group-hover:-translate-y-1 ${
                    darkMode
                      ? "text-slate-500 group-hover:text-teal-400"
                      : "text-slate-400 group-hover:text-teal-600"
                  }`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
