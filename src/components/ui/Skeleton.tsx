import React from "react";

interface SkeletonProps {
  className?: string;
  darkMode: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, darkMode }) => {
  return (
    <div
      className={`
        animate-pulse rounded-2xl
        ${darkMode ? "bg-slate-800" : "bg-slate-200"}
        ${className}
      `}
    />
  );
};

export const HomeSkeleton: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 flex-1 w-full max-w-6xl mx-auto p-4 md:p-0">
      {/* Esqueleto do Perfil (Esquerda) */}
      <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-start gap-4">
        {/* Avatar */}
        <Skeleton darkMode={darkMode} className="w-40 h-40 rounded-full" />
        {/* Nome e Bio */}
        <Skeleton darkMode={darkMode} className="w-3/4 h-10" />
        <Skeleton darkMode={darkMode} className="w-full h-24" />
        <Skeleton darkMode={darkMode} className="w-full h-14 rounded-xl" />
      </div>

      {/* Esqueleto dos Links (Direita) */}
      <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6 w-full">
        {/* Card de Download */}
        <Skeleton darkMode={darkMode} className="w-full h-48 rounded-4xl" />

        {/* Grid de Links */}
        <div className="grid grid-cols-2 gap-4">
          <Skeleton
            darkMode={darkMode}
            className="col-span-2 h-60 rounded-4xl"
          />
          <Skeleton
            darkMode={darkMode}
            className="col-span-1 h-40 rounded-4xl"
          />
          <Skeleton
            darkMode={darkMode}
            className="col-span-1 h-40 rounded-4xl"
          />
        </div>
      </div>
    </div>
  );
};
