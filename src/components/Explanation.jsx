export default function Explanation({ mode }) {
  const getContent = () => {
    switch (mode) {
      case "human":
        return {
          title: "Manual Control",
          description:
            "In this mode, the player directly controls the game using arrow keys. The objective is to combine tiles with the same values to form higher-value tiles, ultimately aiming to reach 2048 or beyond.",
          details: [
            "Control: Use arrow keys (↑ ↓ ← →) to move tiles.",
            "Merging Rule: Tiles with the same number combine into one (e.g., 2 + 2 = 4).",
            "Game Over: When no moves are possible.",
            "Goal: Reach the 2048 tile (or higher for extended play).",
            "Strategy 1: Keep your largest tile fixed in a corner.",
            "Strategy 2: Build monotonic rows (descending order).",
            "Strategy 3: Avoid random movements — think ahead!"
          ]
        };

      case "minimax":
        return {
          title: "Minimax Algorithm",
          description:
            "Minimax is a recursive decision-making algorithm used in AI and game theory. It explores all possible moves and simulates future states to choose the optimal move. In 2048, the AI assumes the worst possible tile spawn after every move.",
          details: [
            "Core Idea: Maximize score while minimizing risk.",
            "Game Tree: Each move creates branches of possible future states.",
            "Depth Search: Typically explores 3–5 moves ahead.",
            "Maximizer: The AI selects the move with the highest evaluation score.",
            "Minimizer: Simulates worst-case tile placement (random 2 or 4).",
            "Time Complexity: O(b^d), where b = branching factor, d = depth.",
            "Limitation: Can be slow for large depth due to exponential growth.",
            "Use Case: Ideal for turn-based and deterministic decision systems."
          ]
        };

      case "alphabeta":
        return {
          title: "Alpha-Beta Pruning",
          description:
            "Alpha-Beta Pruning is an optimization over Minimax that reduces the number of nodes evaluated in the search tree. It skips branches that cannot influence the final decision, making the algorithm significantly faster while producing the same optimal result.",
          details: [
            "Optimization: Improves Minimax efficiency without changing results.",
            "Alpha Value: Best score achievable by the maximizer so far.",
            "Beta Value: Best score achievable by the minimizer so far.",
            "Pruning Condition: Stop exploring when α ≥ β.",
            "Performance Boost: Reduces node evaluations by 50–80%.",
            "Depth Advantage: Allows deeper searches within same time.",
            "Best Case Complexity: O(b^(d/2)) — much faster than Minimax.",
            "Used In: Chess engines, AI games, decision systems."
          ]
        };

      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <div className="w-full max-w-xl bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5 transition-all duration-300 hover:shadow-yellow-500/10">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-yellow-400/10 rounded-lg animate-pulse">
          <span className="text-xl">🧠</span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          {content.title}
        </h2>
      </div>

      {/* Description */}
      <p className="text-neutral-300 text-sm leading-relaxed">
        {content.description}
      </p>

      {/* Details */}
      <ul className="grid grid-cols-1 gap-2">
        {content.details.map((detail, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-xs text-neutral-400 hover:text-neutral-200 transition"
          >
            <span className="text-yellow-500 mt-1">▹</span>
            {detail}
          </li>
        ))}
      </ul>

      {/* Heuristic Section */}
      {mode !== "human" && (
        <div className="pt-4 mt-4 border-t border-white/5">
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-bold">
            Evaluation Heuristics
          </p>

          <div className="grid grid-cols-2 gap-2">
            {[
              {
                name: "Monotonicity",
                desc: "Encourages ordered tiles (high → low)"
              },
              {
                name: "Smoothness",
                desc: "Penalizes large differences between neighbors"
              },
              {
                name: "Empty Cells",
                desc: "More empty space = more flexibility"
              },
              {
                name: "Max Tile Corner",
                desc: "Keeps highest tile fixed in a corner"
              }
            ].map((h) => (
              <div
                key={h.name}
                className="p-2 bg-white/5 rounded-lg border border-white/5 text-[10px] text-neutral-400"
              >
                <p className="font-semibold text-neutral-300">{h.name}</p>
                <p className="text-[9px] opacity-70">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extra Footer for Project */}
      {mode !== "human" && (
        <div className="pt-3 text-[9px] text-neutral-600 italic text-center">
          This AI evaluates thousands of possible states in milliseconds to make optimal decisions.
        </div>
      )}
    </div>
  );
}