import { useState } from "react";
import Grid from "./Grid";
import Compare from "./Compare";
import Explanation from "./Explanation";

export default function Game() {
  const [mode, setMode] = useState("human");

  const modes = [
    { id: "human", label: "🎮 Human", color: "hover:bg-blue-500" },
    { id: "minimax", label: "🤖 Minimax", color: "hover:bg-purple-500" },
    { id: "alphabeta", label: "🚀 Alpha-Beta", color: "hover:bg-emerald-500" },
    { id: "compare", label: "⚔️ Compare", color: "hover:bg-red-500" },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center py-10 px-4 selection:bg-yellow-400/30">
      
      {/* Header Section */}
      <header className="text-center mb-10 space-y-2">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
          2048 AI BATTLE
        </h1>
        <p className="text-neutral-500 font-medium tracking-widest uppercase text-xs sm:text-sm">
          Man vs Machine vs Algorithm
        </p>
      </header>

      {/* Navigation Tab System */}
      <nav className="flex flex-wrap gap-2 p-1.5 bg-neutral-800/50 backdrop-blur-md rounded-2xl border border-white/5 mb-12 shadow-2xl">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl font-bold transition-all duration-200 ease-out transform active:scale-95 ${
              mode === m.id
                ? "bg-yellow-400 text-neutral-900 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                : `text-neutral-400 ${m.color} hover:text-white`
            }`}
          >
            {m.label}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl flex flex-col items-center">
        {mode === "compare" ? (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Compare />
          </div>
        ) : (
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex-shrink-0">
              <Grid forcedMode={mode} />
            </div>
            <div className="max-w-md">
              <Explanation mode={mode} />
            </div>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="mt-20 opacity-30 text-[10px] tracking-[0.2em] uppercase">
        Built with React & AI Optimization
      </footer>
    </div>
  );
}