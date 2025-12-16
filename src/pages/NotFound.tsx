import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-linear-to-b from-purple-500 to-indigo-600 mb-4">
          404
        </h1>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <h2
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-slate-900"
          }`}
        >
          Você caiu no Void!
        </h2>

        <p
          className={`max-w-md mx-auto text-lg ${
            darkMode ? "text-slate-400" : "text-slate-600"
          }`}
        >
          A página que você está procurando não existe ou foi explodida por um
          Creeper.
        </p>

        <Link
          to="/"
          className={`
            inline-block px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 hover:shadow-xl
            ${
              darkMode
                ? "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/50"
                : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-400/50"
            }
          `}
        >
          Voltar para o Spawn (Início)
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
