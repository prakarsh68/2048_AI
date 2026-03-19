export default function Tile({ value }) {
  const styles = {
    0: "bg-white/5",
    2: "bg-neutral-200 text-black",
    4: "bg-neutral-300 text-black",
    8: "bg-yellow-400 text-black",
    16: "bg-yellow-500",
    32: "bg-orange-400",
    64: "bg-orange-500",
    128: "bg-yellow-300 scale-105 shadow-lg",
    256: "bg-yellow-400 scale-105 shadow-lg",
    512: "bg-yellow-500 scale-110 shadow-xl",
    1024: "bg-yellow-600 scale-110 shadow-xl",
    2048: "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white scale-125 shadow-2xl animate-pulse"
  };

  return (
    <div
      className={`aspect-square flex items-center justify-center rounded-xl font-bold text-lg sm:text-2xl transition-all duration-300 ${styles[value]}`}
    >
      {value || ""}
    </div>
  );
}