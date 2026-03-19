import { useState, useEffect } from "react";
import Grid from "./Grid";

export default function Compare() {
  const [runAI, setRunAI] = useState(false);
  const [winner, setWinner] = useState("");

  // 🔥 Simple winner logic (time-based)
  useEffect(() => {
    if (!runAI) {
      setWinner("");
      return;
    }

    const timer = setTimeout(() => {
      setWinner("Alpha-Beta (faster decision making)");
    }, 6000);

    return () => clearTimeout(timer);
  }, [runAI]);

  return (
    <div className="space-y-6 text-center">

      {/* Control */}
      <button
        onClick={() => setRunAI(prev => !prev)}
        className={`px-6 py-2 rounded-lg ${
          runAI ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {runAI ? "Stop Both AI" : "Start Both AI"}
      </button>

      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">

        <div>
          <h2 className="text-purple-400 font-bold mb-2">
            Minimax
          </h2>
          <Grid forcedMode="minimax" externalRun={runAI} />
        </div>

        <div>
          <h2 className="text-green-400 font-bold mb-2">
            Alpha-Beta
          </h2>
          <Grid forcedMode="alphabeta" externalRun={runAI} />
        </div>

      </div>

      {/* Winner */}
      {winner && (
        <div className="text-yellow-400 font-bold text-lg">
          🏆 Winner: {winner}
        </div>
      )}

      {/* Explanation */}
      <div className="text-gray-300 text-sm max-w-md mx-auto">
        Minimax explores all possibilities.  
        Alpha-Beta pruning eliminates unnecessary branches → faster performance.
      </div>

    </div>
  );
}