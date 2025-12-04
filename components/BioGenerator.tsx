import React, { useState } from 'react';
import { generateBio } from '../services/geminiService';
import { SparklesIcon } from './Icons';
import { GeneratorStatus } from '../types';

interface BioGeneratorProps {
  onBioGenerated: (bio: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const BioGenerator: React.FC<BioGeneratorProps> = ({ onBioGenerated, isOpen, onClose }) => {
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('Divertido');
  const [status, setStatus] = useState<GeneratorStatus>(GeneratorStatus.IDLE);

  const handleGenerate = async () => {
    if (!keywords.trim()) return;
    
    setStatus(GeneratorStatus.LOADING);
    try {
      const bio = await generateBio(keywords, tone);
      onBioGenerated(bio);
      setStatus(GeneratorStatus.SUCCESS);
      setTimeout(() => {
        onClose();
        setStatus(GeneratorStatus.IDLE);
        setKeywords('');
      }, 500);
    } catch (e) {
      setStatus(GeneratorStatus.ERROR);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-100">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-400" />
        
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
              <SparklesIcon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Gerador de Bio IA</h2>
          </div>
          
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">
            Deixe o Gemini criar uma descrição incrível para o seu perfil. Diga sobre o que você posta.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Sobre você / Tópicos</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Ex: Minecraft, Redstone, PVP, Vlogs..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all placeholder-slate-400 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Estilo</label>
              <div className="grid grid-cols-3 gap-2">
                {['Divertido', 'Profissional', 'Épico'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`
                      px-3 py-2 rounded-xl text-sm font-bold transition-all
                      ${tone === t 
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'}
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={status === GeneratorStatus.LOADING || !keywords.trim()}
              className={`
                w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-teal-500/20
                flex items-center justify-center space-x-2
                transition-all duration-300 mt-2
                ${status === GeneratorStatus.LOADING 
                  ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 hover:scale-[1.02]'}
              `}
            >
              {status === GeneratorStatus.LOADING ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Criando Mágica...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5" />
                  <span>Gerar Bio</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioGenerator;