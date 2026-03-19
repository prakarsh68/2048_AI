export default function Explanation({ mode }) {
  const getContent = () => {
    switch (mode) {
      case "human":
        return {
          title: "Manual Control (Human Mode)",
          description:
            "This is the classic gameplay mode where decisions are made entirely by the player. It relies on pattern recognition, planning, and strategic tile placement.",
          details: [
            "Use arrow keys (↑ ↓ ← →) to control tile movement.",
            "Tiles merge when identical values collide (2 + 2 = 4).",
            "New tiles (2 or 4) spawn randomly after each move.",
            "Game ends when no moves are possible.",
            "Primary goal: Reach the 2048 tile (or beyond)."
          ],
          working: [
            "Observe grid structure",
            "Plan moves ahead (2–3 steps)",
            "Maintain tile hierarchy",
            "Avoid breaking structure"
          ],
          analogy:
            "Think of it like organizing books on a shelf — once you disturb the order, it's hard to fix."
        };

      case "minimax":
        return {
          title: "Minimax Algorithm",
          description:
            "Minimax is a recursive AI algorithm that explores all possible future moves to choose the optimal one. It assumes the worst-case scenario for every decision, making it highly reliable.",
          details: [
            "Builds a complete game tree of possible states.",
            "Alternates between AI (Maximizer) and Environment (Minimizer).",
            "Evaluates each board using heuristic scoring.",
            "Search depth typically ranges from 3–5 levels.",
            "Selects move with best worst-case outcome."
          ],
          working: [
            "Generate all possible moves",
            "Simulate random tile placements",
            "Evaluate each board state",
            "Backpropagate best score",
            "Choose optimal move"
          ],
          complexity: "O(b^d)",
          analogy:
            "Like playing chess and thinking: 'If I do this, what’s the worst that can happen next?'"
        };

      case "alphabeta":
        return {
          title: "Alpha-Beta Pruning",
          description:
            "Alpha-Beta Pruning enhances Minimax by eliminating unnecessary branches in the decision tree. It improves performance without affecting the final decision.",
          details: [
            "Skips evaluating moves that won't affect outcome.",
            "Uses Alpha (best max) and Beta (best min) bounds.",
            "Prunes branches when Alpha ≥ Beta.",
            "Allows deeper search within same time.",
            "Maintains exact same result as Minimax."
          ],
          working: [
            "Track best scores (α and β)",
            "Compare during traversal",
            "Prune irrelevant branches",
            "Focus only on impactful paths",
            "Return optimal decision faster"
          ],
          complexity: "O(b^(d/2))",
          analogy:
            "Like skipping boring scenes in a movie because you already know they won’t affect the ending."
        };

      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <div className="w-full max-w-xl bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5 hover:shadow-yellow-500/10 transition">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-400/10 rounded-lg animate-pulse">
            🧠
          </div>
          <h2 className="text-xl font-bold text-white">
            {content.title}
          </h2>
        </div>

        {/* Complexity Badge */}
        {content.complexity && (
          <span className="text-[10px] px-2 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded">
            {content.complexity}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-neutral-300 text-sm leading-relaxed">
        {content.description}
      </p>

      {/* Core Details */}
      <ul className="space-y-2">
        {content.details.map((detail, i) => (
          <li key={i} className="flex gap-2 text-xs text-neutral-400">
            <span className="text-yellow-500">▹</span>
            {detail}
          </li>
        ))}
      </ul>

      {/* Working Flow */}
      {content.working && (
        <div className="pt-3">
          <p className="text-[10px] uppercase text-neutral-500 mb-2 font-bold">
            How It Works
          </p>
          <div className="flex flex-wrap gap-2">
            {content.working.map((step, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-white/5 text-[10px] rounded border border-white/10"
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Heuristics */}
      {mode !== "human" && (
        <div className="pt-3">
          <p className="text-[10px] uppercase text-neutral-500 mb-2 font-bold">
            Evaluation Heuristics
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Monotonicity",
              "Smoothness",
              "Empty Cells",
              "Max Tile Corner"
            ].map((h) => (
              <div
                key={h}
                className="p-2 bg-white/5 rounded border border-white/10 text-[10px]"
              >
                {h}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analogy */}
      {content.analogy && (
        <div className="pt-3 text-[10px] text-neutral-500 italic border-t border-white/5">
          💡 {content.analogy}
        </div>
      )}

      {/* Footer */}
      {mode !== "human" && (
        <div className="text-[9px] text-center text-neutral-600 pt-2">
          AI evaluates thousands of states per second to make optimal decisions.
        </div>
      )}
    </div>
  );
}