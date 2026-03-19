import { useState, useEffect, useCallback, useRef } from "react";
import Tile from "./Tile";
import AIInsights from "./AIInsights";
import {
  moveLeft, moveRight, moveUp, moveDown,
  addRandomTile, isDifferent, canMove
} from "../utils/gameLogic";

import { minimax } from "../ai/minimax";
import { alphaBeta } from "../ai/alphabeta";

export default function Grid({ forcedMode, externalRun }) {
  // --- STATE ---
  const [grid, setGrid] = useState(() => addRandomTile(addRandomTile(Array(4).fill(0).map(() => Array(4).fill(0)))));
  const [score, setScore] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [mode, setMode] = useState(forcedMode || "human");
  const [aiRunning, setAiRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [aiStats, setAiStats] = useState({ move: "", evalScore: 0, nodes: 0 });

  // 🎥 Replay System State
  const [replayBuffer, setReplayBuffer] = useState([]);
  const [isReplaying, setIsReplaying] = useState(false);

  // --- AUDIO REFS ---
  const moveSound = useRef(null);
  const mergeSound = useRef(null);

  // Initialize Audio & Mobile Unlock
  useEffect(() => {
    moveSound.current = new Audio("/sounds/move.mp3");
    mergeSound.current = new Audio("/sounds/merge.mp3");
    moveSound.current.volume = 0.3;
    mergeSound.current.volume = 0.4;

    const unlock = () => {
      [moveSound, mergeSound].forEach(s => {
        s.current?.play().then(() => {
          s.current.pause();
          s.current.currentTime = 0;
        }).catch(() => {});
      });
      window.removeEventListener("click", unlock);
    };
    window.addEventListener("click", unlock);
    return () => window.removeEventListener("click", unlock);
  }, []);

  const getSum = (g) => g.flat().reduce((a, b) => a + b, 0);

  // --- ACTIONS ---
  const startGame = useCallback(() => {
    let g = Array(4).fill(0).map(() => Array(4).fill(0));
    g = addRandomTile(addRandomTile(g));
    setGrid(g);
    setScore(0);
    setMoveCount(0);
    setGameOver(false);
    setAiRunning(false);
    setIsReplaying(false);
    setReplayBuffer([g]);
    setAiStats({ move: "", evalScore: 0, nodes: 0 });
  }, []);

  const handleMove = useCallback((prev, newGrid) => {
    if (!isDifferent(prev, newGrid)) return prev;

    moveSound.current?.play().catch(() => {});

    const prevSum = getSum(prev);
    const updated = addRandomTile(newGrid);
    const newSum = getSum(updated);

    if (newSum > prevSum) mergeSound.current?.play().catch(() => {});

    setScore(newSum);
    setMoveCount(m => m + 1);
    setReplayBuffer(curr => [...curr, updated]);

    if (!canMove(updated)) {
      setGameOver(true);
      setAiRunning(false);
    }
    return updated;
  }, []);

  // Sync Props
  useEffect(() => { setMode(forcedMode || "human"); }, [forcedMode]);
  useEffect(() => { if (externalRun !== undefined) setAiRunning(externalRun); }, [externalRun]);

  // 🎮 Keyboard Loop
  useEffect(() => {
    if (mode !== "human" || isReplaying || gameOver) return;
    const handleKey = (e) => {
      setGrid(prev => {
        let next = prev;
        if (e.key === "ArrowLeft") next = moveLeft(prev);
        if (e.key === "ArrowRight") next = moveRight(prev);
        if (e.key === "ArrowUp") next = moveUp(prev);
        if (e.key === "ArrowDown") next = moveDown(prev);
        return handleMove(prev, next);
      });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mode, handleMove, isReplaying, gameOver]);

  // 🤖 AI Loop
  useEffect(() => {
    if (!aiRunning || mode === "human" || gameOver || isReplaying) return;
    const interval = setInterval(() => {
      setGrid(prev => {
        const best = mode === "minimax" 
          ? minimax(prev, 3, true) 
          : alphaBeta(prev, 3, -Infinity, Infinity, true);

        if (!best?.move) return prev;
        setAiStats({ move: best.move.toUpperCase(), evalScore: Math.floor(best.score), nodes: best.nodes || 0 });
        
        const moveMap = { left: moveLeft, right: moveRight, up: moveUp, down: moveDown };
        return handleMove(prev, moveMap[best.move](prev));
      });
    }, 150);
    return () => clearInterval(interval);
  }, [aiRunning, mode, gameOver, handleMove, isReplaying]);

  // 🎥 Replay Execution
  const playReplay = () => {
    if (replayBuffer.length < 2 || isReplaying) return;
    setIsReplaying(true);
    setAiRunning(false);
    let i = 0;
    const interval = setInterval(() => {
      setGrid(replayBuffer[i]);
      i++;
      if (i >= replayBuffer.length) {
        clearInterval(interval);
        setIsReplaying(false);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-[500px]">
      
      {/* HUD */}
      <div className="flex justify-between w-full px-4 items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{mode}</h2>
          <p className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">
            {isReplaying ? "🎞️ Playback Mode" : "Live Simulation"}
          </p>
        </div>
        <div className="bg-neutral-900 border border-white/5 px-6 py-2 rounded-2xl text-center">
          <p className="text-[9px] text-neutral-500 font-bold uppercase">Score</p>
          <p className="text-xl font-black text-yellow-400">{score}</p>
        </div>
      </div>

      {/* THE GRID */}
      <div className={`relative p-4 bg-neutral-900 rounded-[2.5rem] shadow-2xl border border-white/5 transition-all duration-500 ${isReplaying ? 'ring-4 ring-blue-500/30' : ''}`}>
        <div className="grid grid-cols-4 gap-3 p-2 aspect-square w-[85vw] max-w-[420px] bg-neutral-800 rounded-3xl">
          {grid.map((row, i) =>
            row.map((cell, j) => <Tile key={`${i}-${j}`} value={cell} />)
          )}
        </div>

        {gameOver && !isReplaying && (
          <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center animate-in zoom-in">
            <h2 className="text-4xl font-black text-white mb-4 italic">TERMINATED</h2>
            <button onClick={startGame} className="bg-white text-black font-semibold py-3 px-8 rounded-xl hover:bg-yellow-400 transition-colors">REBOOT</button>
          </div>
        )}
      </div>

      {/* AI INSIGHTS */}
      {mode !== "human" && (
        <AIInsights stats={aiStats} isAlphaBeta={mode === "alphabeta" || mode === "alphaBeta"} />
      )}

      {/* FOOTER CONTROLS */}
      <div className="flex w-full gap-3 px-2">
        {mode !== "human" && !gameOver && (
          <button
            onClick={() => setAiRunning(!aiRunning)}
            disabled={isReplaying}
            className={`flex-1 py-4 rounded-2xl font-semibold text-sm tracking-normal transition-all ${
              aiRunning ? "bg-red-500/20 text-red-400 border border-red-500/50" : "bg-emerald-500 text-neutral-950"
            }`}
          >
            {aiRunning ? "STOP PROCESS" : "START AI"}
          </button>
        )}
        <button
          onClick={playReplay}
          disabled={isReplaying || replayBuffer.length < 2}
          className="flex-1 bg-blue-600 disabled:opacity-20 text-white font-semibold py-4 rounded-2xl text-sm tracking-normal transition-all"
        >
          {isReplaying ? "WATCHING..." : "REPLAY"}
        </button>
        <button onClick={startGame} className="p-4 bg-neutral-800 rounded-2xl text-white border border-white/5 text-sm">🔄</button>
      </div>

    </div>
  );
}