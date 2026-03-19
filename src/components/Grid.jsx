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

  // 🔥 INITIAL GRID
  const createGrid = () =>
    Array(4).fill(0).map(() => Array(4).fill(0));

  const [grid, setGrid] = useState(() =>
    addRandomTile(addRandomTile(createGrid()))
  );

  const [score, setScore] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [mode, setMode] = useState(forcedMode || "human");

  const [aiRunning, setAiRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [aiStats, setAiStats] = useState({
    move: "",
    evalScore: 0,
    nodes: 0
  });

  // 🎥 Replay
  const [replay, setReplay] = useState([]);
  const [isReplaying, setIsReplaying] = useState(false);

  // 🔊 SOUND (safe)
  const moveSound = useRef(new Audio("/src/assets/sounds/move.mp3"));
  const mergeSound = useRef(new Audio("/src/assets/sounds/merge.mp3"));

  const getSum = (g) => g.flat().reduce((a, b) => a + b, 0);

  // 🔁 Sync mode
  useEffect(() => {
    setMode(forcedMode || "human");
  }, [forcedMode]);

  // 🔁 Sync AI (compare mode)
  useEffect(() => {
    if (externalRun !== undefined) {
      setAiRunning(externalRun);
    }
  }, [externalRun]);

  // 🔁 Init sound
  useEffect(() => {
    moveSound.current.volume = 0.4;
    mergeSound.current.volume = 0.5;
  }, []);

  // 🔄 RESET
  const startGame = useCallback(() => {
    let g = createGrid();
    g = addRandomTile(addRandomTile(g));

    setGrid(g);
    setScore(0);
    setMoveCount(0);
    setGameOver(false);
    setAiRunning(false);
    setReplay([]);
    setAiStats({ move: "", evalScore: 0, nodes: 0 });
  }, []);

  useEffect(() => startGame(), [startGame]);

  // 🔥 MOVE HANDLER
  const handleMove = useCallback((prev, newGrid) => {
    if (!isDifferent(prev, newGrid)) return prev;

    moveSound.current.currentTime = 0;
    moveSound.current.play().catch(() => {});

    const prevSum = getSum(prev);
    const updated = addRandomTile(newGrid);
    const newSum = getSum(updated);

    // 🎵 merge sound only when actual merge
    if (newSum > prevSum) {
      mergeSound.current.currentTime = 0;
      mergeSound.current.play().catch(() => {});
    }

    setScore(newSum);
    setMoveCount(m => m + 1);

    // 🎥 store replay
    setReplay(prev => [...prev, updated]);

    if (!canMove(updated)) {
      setGameOver(true);
      setAiRunning(false);
    }

    return updated;
  }, []);

  // 🎮 HUMAN CONTROLS
  useEffect(() => {
    if (mode !== "human") return;

    const handleKey = (e) => {
      if (isReplaying) return;

      setGrid(prev => {
        let newGrid = prev;

        if (e.key === "ArrowLeft") newGrid = moveLeft(prev);
        if (e.key === "ArrowRight") newGrid = moveRight(prev);
        if (e.key === "ArrowUp") newGrid = moveUp(prev);
        if (e.key === "ArrowDown") newGrid = moveDown(prev);

        return handleMove(prev, newGrid);
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mode, handleMove, isReplaying]);

  // 🤖 AI LOOP
  useEffect(() => {
    if (!aiRunning || mode === "human" || gameOver || isReplaying) return;

    const interval = setInterval(() => {
      setGrid(prev => {

        if (!canMove(prev)) {
          setGameOver(true);
          setAiRunning(false);
          return prev;
        }

        const best =
          mode === "minimax"
            ? minimax(prev, 3, true)
            : alphaBeta(prev, 3, -Infinity, Infinity, true);

        if (!best?.move) return prev;

        setAiStats({
          move: best.move.toUpperCase(),
          evalScore: Math.floor(best.score),
          nodes: best.nodes
        });

        const moveMap = {
          left: moveLeft,
          right: moveRight,
          up: moveUp,
          down: moveDown
        };

        return handleMove(prev, moveMap[best.move](prev));
      });
    }, 200);

    return () => clearInterval(interval);
  }, [aiRunning, mode, gameOver, handleMove, isReplaying]);

  // 🎥 REPLAY SYSTEM
  const playReplay = () => {
    if (!replay.length) return;

    setIsReplaying(true);
    setAiRunning(false);

    let i = 0;
    const interval = setInterval(() => {
      setGrid(replay[i]);
      i++;

      if (i >= replay.length) {
        clearInterval(interval);
        setIsReplaying(false);
      }
    }, 150);
  };

  return (
    <div className="flex flex-col gap-6 items-center">

      {/* SCORE */}
      <div className="bg-white/10 px-6 py-2 rounded-xl">
        Score: <span className="text-yellow-400">{score}</span>
      </div>

      {/* AI CONTROLS */}
      {mode !== "human" && externalRun === undefined && (
        <button
          onClick={() => setAiRunning(prev => !prev)}
          className={`px-4 py-2 rounded-lg ${
            aiRunning ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {aiRunning ? "Stop AI" : "Start AI"}
        </button>
      )}

      {/* 🎮 GRID */}
      <div className="grid grid-cols-4 gap-2 p-3 w-[90vw] max-w-[420px] bg-white/10 rounded-xl">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <Tile key={`${i}-${j}`} value={cell} />
          ))
        )}
      </div>

      {/* 🧠 AI INSIGHTS */}
      {mode !== "human" && (
        <AIInsights stats={aiStats} />
      )}

      {/* 🎥 REPLAY */}
      <button
        onClick={playReplay}
        className="bg-blue-500 px-4 py-2 rounded-lg"
      >
        Replay
      </button>

      {/* GAME OVER */}
      {gameOver && (
        <div className="text-red-500 font-bold">
          💀 Game Over
        </div>
      )}

      {/* RESET */}
      <button
        onClick={startGame}
        className="bg-yellow-400 text-black px-4 py-2 rounded-lg"
      >
        Restart
      </button>

    </div>
  );
}