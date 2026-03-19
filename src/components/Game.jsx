import { useState, useCallback, useMemo } from "react";
import Grid from "./Grid";
import Compare from "./Compare";
import Explanation from "./Explanation";

export default function Game() {
  const [mode, setMode] = useState("human");

  // 🕹️ Centralized Move Dispatcher
  // Using useCallback to prevent unnecessary re-renders of the mobile controls
  const triggerMove = useCallback((key) => {
    const event = new KeyboardEvent("keydown", { 
      key,
      bubbles: true,
      cancelable: true 
    });
    window.dispatchEvent(event);
  }, []);

  const modes = useMemo(() => [
    { id: "human", label: "🎮 Human", color: "hover:text-blue-400" },
    { id: "minimax", label: "🤖 Minimax", color: "hover:text-purple-400" },
    { id: "alphabeta", label: "🚀 Alpha-Beta", color: "hover:text-emerald-400" },
    { id: "compare", label: "⚔️ Compare", color: "hover:text-red-400" },
  ], []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center py-10 px-4 selection:bg-yellow-400/30 select-none overflow-x-hidden">
      
      {/* 🌌 Atmospheric Background Blur */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 🌌 Header */}
      <header className="relative text-center mb-10 space-y-2">
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
          2048 <span className="text-yellow-500">AI</span>
        </h1>
        <p className="text-neutral-600 font-bold tracking-[0.3em] uppercase text-[10px] sm:text-xs">
          Neural Architecture Comparison
        </p>
      </header>

      {/* 🎮 Mode Selector */}
      <nav className="relative flex flex-wrap justify-center gap-1 p-1 bg-neutral-900/80 border border-white/5 mb-12 shadow-2xl rounded-2xl">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${
              mode === m.id
                ? "bg-white text-black shadow-xl scale-105"
                : `text-neutral-500 ${m.color}`
            }`}
          >
            {m.label}
          </button>
        ))}
      </nav>

      {/* 🧠 Main Content */}
      <main className="relative w-full max-w-7xl flex flex-col items-center">
        {mode === "compare" ? (
          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <Compare />
          </div>
        ) : (
          <div className="w-full flex flex-col xl:flex-row items-center xl:items-start justify-center gap-16 animate-in fade-in zoom-in-95 duration-500">
            
            {/* 🎯 Game Board Area */}
            <div className="flex flex-col items-center gap-8">
              <Grid forcedMode={mode} />

              {/* 📱 Mobile D-PAD */}
              <div className="grid grid-cols-3 gap-2 md:hidden">
                <div />
                <ControlBtn icon="向上" action={() => triggerMove("ArrowUp")} />
                <div />
                <ControlBtn icon="向左" action={() => triggerMove("ArrowLeft")} />
                <ControlBtn icon="向下" action={() => triggerMove("ArrowDown")} />
                <ControlBtn icon="向右" action={() => triggerMove("ArrowRight")} />
              </div>
            </div>

            {/* 📊 Side Panel */}
            <aside className="w-full max-w-md space-y-6">
              <Explanation mode={mode} />
              
              {/* Quick Stats / Info card */}
              <div className="p-6 rounded-[2rem] bg-neutral-900/30 border border-white/5">
                <h4 className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-4">Environment Status</h4>
                <div className="grid grid-cols-2 gap-4">
                  <StatusItem label="Latency" value="1.2ms" color="text-emerald-500" />
                  <StatusItem label="Precision" value="64-bit" color="text-blue-500" />
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <footer className="mt-20 py-10 border-t border-white/5 w-full flex flex-col items-center gap-2">
        <p className="opacity-20 text-[9px] font-black tracking-[0.5em] uppercase">
          Autonomous Gaming Engine v2.0
        </p>
      </footer>
    </div>
  );
}

// 🧱 Internal Sub-Components for Cleanliness
function ControlBtn({ icon, action }) {
  return (
    <button
      onClick={action}
      className="w-16 h-16 flex items-center justify-center bg-neutral-900 border border-white/10 rounded-2xl active:bg-yellow-500 active:text-black transition-all shadow-xl"
    >
      <span className="text-[10px] font-black uppercase tracking-tighter">{icon}</span>
    </button>
  );
}

function StatusItem({ label, value, color }) {
  return (
    <div>
      <p className="text-[8px] text-neutral-700 font-bold uppercase">{label}</p>
      <p className={`text-sm font-mono font-bold ${color}`}>{value}</p>
    </div>
  );
}