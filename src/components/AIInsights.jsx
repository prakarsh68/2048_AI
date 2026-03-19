export default function AIInsights({ stats }) {
  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur w-[90vw] max-w-[420px]">

      <h3 className="text-xs uppercase text-neutral-400 mb-2">
        AI Reasoning
      </h3>

      <div className="flex justify-between text-sm">
        <span className="text-neutral-400">Move</span>
        <span className="text-yellow-400 font-bold">
          {stats.move || "-"}
        </span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-neutral-400">Eval Score</span>
        <span className="text-green-400 font-bold">
          {stats.evalScore}
        </span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-neutral-400">Nodes</span>
        <span className="text-purple-400 font-bold">
          {stats.nodes}
        </span>
      </div>

    </div>
  );
}