import { useState } from "react";
import Grid from "./Grid";

export default function Compare() {
  const [runAI, setRunAI] = useState(false);

  return (
    <div className="flex flex-col items-center gap-10 py-10 min-h-screen bg-neutral-950 text-white animate-in fade-in duration-700">
      
      {/* 🚀 Hero Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
          ALGORITHM SHOWDOWN
        </h1>
        <p className="text-neutral-500 text-xs font-bold uppercase tracking-[0.4em]">
          Brute Force vs. Optimized Pruning
        </p>
      </div>

      {/* 🕹️ Master Control */}
      <button
        onClick={() => setRunAI(prev => !prev)}
        className={`group relative px-12 py-4 rounded-2xl font-black tracking-widest transition-all duration-300 ${
          runAI 
            ? "bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20" 
            : "bg-white text-black hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        }`}
      >
        <span className="relative z-10">
          {runAI ? "TERMINATE SIMULATION" : "INITIALIZE COMPARISON"}
        </span>
      </button>

      {/* ⚔️ The Arena */}
      <div className="flex flex-col xl:flex-row gap-12 justify-center items-start w-full px-4">
        
        {/* Left Side: Minimax */}
        <div className="flex flex-col items-center gap-4 w-full max-w-[450px]">
          <div className="flex items-center gap-3 self-start px-4">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <h2 className="text-sm font-black text-purple-400 uppercase tracking-widest">Minimax (Standard)</h2>
          </div>
          <div className="p-1 rounded-[2.5rem] bg-gradient-to-b from-purple-500/20 to-transparent">
            <Grid forcedMode="minimax" externalRun={runAI} />
          </div>
          <p className="text-[10px] text-neutral-600 max-w-[300px] text-center italic">
            "Scans every possible future. Thorough but computationally expensive."
          </p>
        </div>

        {/* VS Divider (Desktop Only) */}
        <div className="hidden xl:flex items-center justify-center h-[500px]">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-neutral-800 to-transparent relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-950 px-2 py-4 text-neutral-700 font-black text-xs">VS</span>
          </div>
        </div>

        {/* Right Side: Alpha-Beta */}
        <div className="flex flex-col items-center gap-4 w-full max-w-[450px]">
          <div className="flex items-center gap-3 self-start px-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm font-black text-emerald-400 uppercase tracking-widest">Alpha-Beta (Optimized)</h2>
          </div>
          <div className="p-1 rounded-[2.5rem] bg-gradient-to-b from-emerald-500/20 to-transparent">
            <Grid forcedMode="alphabeta" externalRun={runAI} />
          </div>
          <p className="text-[10px] text-neutral-600 max-w-[300px] text-center italic">
            "Eliminates bad branches instantly. Dramatically faster decision speeds."
          </p>
        </div>

      </div>

      {/* 📝 Tech Specs Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 border-t border-white/5 w-full max-w-5xl mt-10">
        <div className="space-y-2">
          <h4 className="text-white font-bold text-xs uppercase">Search Depth</h4>
          <p className="text-neutral-500 text-xs leading-relaxed">Both algorithms are locked at <span className="text-white">Depth 3</span> to ensure a fair hardware comparison.</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-white font-bold text-xs uppercase">Heuristic Profile</h4>
          <p className="text-neutral-500 text-xs leading-relaxed">Using <span className="text-white">Snake-Weighting</span> and <span className="text-white">Monotonicity</span> for decision scoring.</p>
        </div>
        <div className="space-y-2">
          <h4 className="text-white font-bold text-xs uppercase">Optimization</h4>
          <p className="text-neutral-500 text-xs leading-relaxed">Alpha-Beta prunes nodes where <span className="text-emerald-400 font-mono">β ≤ α</span>, reducing computation by up to 80%.</p>
        </div>
      </div>

    </div>
  );
}