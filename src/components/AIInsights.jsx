export default function AIInsights({ stats, isAlphaBeta }) {
  // Logic to determine "Thinking Intensity" based on node count
  const intensity = Math.min((stats.nodes / 2000) * 100, 100);

  return (
    <div className="w-full max-w-[420px] bg-neutral-900/80 border border-white/5 p-5 rounded-2xl backdrop-blur-md shadow-2xl animate-in slide-in-from-bottom-2">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
          {isAlphaBeta ? "Alpha-Beta Pruning" : "Minimax Brute Force"}
        </span>
        <div className="flex items-center gap-2">
           <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAlphaBeta ? 'bg-emerald-400' : 'bg-purple-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isAlphaBeta ? 'bg-emerald-500' : 'bg-purple-500'}`}></span>
          </span>
          <span className="text-[10px] font-bold text-neutral-400 uppercase">Processing</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* BEST MOVE BOX */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
          <p className="text-[9px] text-neutral-500 uppercase font-bold mb-1">Optimal Move</p>
          <p className={`text-2xl font-black ${stats.move ? 'text-white' : 'text-neutral-700'}`}>
            {stats.move || "WAIT"}
          </p>
        </div>

        {/* NODES BOX */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
          <p className="text-[9px] text-neutral-500 uppercase font-bold mb-1">Nodes Explored</p>
          <p className="text-2xl font-black text-blue-400">
            {stats.nodes.toLocaleString()}
          </p>
        </div>
      </div>

      {/* SEARCH INTENSITY BAR */}
      <div className="mt-4">
        <div className="flex justify-between text-[9px] font-bold text-neutral-500 uppercase mb-1">
          <span>Search Depth Efficiency</span>
          <span className={isAlphaBeta ? 'text-emerald-400' : 'text-purple-400'}>
            {isAlphaBeta ? 'Pruning Active' : 'Exhaustive'}
          </span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${isAlphaBeta ? 'bg-emerald-500' : 'bg-purple-500'}`}
            style={{ width: `${intensity}%` }}
          />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
        <span className="text-[10px] text-neutral-500 font-bold uppercase">Heuristic Eval</span>
        <span className="text-sm font-mono font-bold text-emerald-400">
          {stats.evalScore > 0 ? "+" : ""}{stats.evalScore}
        </span>
      </div>
    </div>
  );
}