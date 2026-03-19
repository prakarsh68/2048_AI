import { memo } from "react";

const Tile = memo(({ value }) => {
  // 🎨 Style Mapping
  const getStyles = (val) => {
    const base = "aspect-square flex items-center justify-center rounded-2xl font-black transition-all duration-300 shadow-sm ";
    
    const colors = {
      0: "bg-neutral-800/40 border border-white/5",
      2: "bg-[#eee4da] text-[#776e65]",
      4: "bg-[#ede0c8] text-[#776e65]",
      8: "bg-[#f2b179] text-white",
      16: "bg-[#f59563] text-white",
      32: "bg-[#f67c5f] text-white",
      64: "bg-[#f65e3b] text-white",
      128: "bg-[#edcf72] text-white scale-105 shadow-[0_0_15px_rgba(237,207,114,0.4)]",
      256: "bg-[#edcc61] text-white scale-105 shadow-[0_0_20px_rgba(237,204,97,0.5)]",
      512: "bg-[#edc850] text-white scale-110 shadow-[0_0_25px_rgba(237,200,80,0.6)]",
      1024: "bg-[#edc53f] text-white scale-110 shadow-[0_0_30px_rgba(237,197,63,0.7)]",
      2048: "bg-gradient-to-br from-yellow-400 to-amber-600 text-white scale-115 shadow-[0_0_40px_rgba(251,191,36,0.8)] animate-pulse",
    };

    // Fallback for values > 2048
    const specificStyle = colors[val] || "bg-neutral-900 text-white border-2 border-yellow-500 scale-125";
    
    return base + specificStyle;
  };

  // 📏 Dynamic Font Sizing
  const getFontSize = (val) => {
    if (val < 100) return "text-2xl sm:text-3xl";
    if (val < 1000) return "text-xl sm:text-2xl";
    return "text-lg sm:text-xl";
  };

  return (
    <div 
      className={getStyles(value)}
      // Optional: Add a key or data attribute for CSS entrance animations
      key={value} 
    >
      <span className={`${getFontSize(value)} transition-transform duration-100`}>
        {value !== 0 ? value : ""}
      </span>
    </div>
  );
});

export default Tile;