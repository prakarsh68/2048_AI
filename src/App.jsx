import Game from "./components/Game";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">

      {/* 🌌 Animated Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[140px] rounded-full top-[-200px] left-[-200px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-yellow-400/10 blur-[140px] rounded-full bottom-[-150px] right-[-150px] animate-pulse" />
      </div>

      <Game />

    </div>
  );
}

export default App;