import { useState, useEffect } from "react";
import { Entrance } from "./components/Entrance";
import { Room1 } from "./components/Room1";
import { Room2 } from "./components/Room2";
import { Room3 } from "./components/Room3";
import { Completion } from "./components/Completion";
import { DustOverlay } from "./components/DustOverlay";
import { logToSupabase, updateSupabase } from "./lib/supabase";

type GameState = "entrance" | "room1" | "room2" | "room3" | "completion";

export default function App() {
  const [gameState, setGameState] = useState<GameState>("entrance");
  const [playerName, setPlayerName] = useState("");
  const [sessionId, setSessionId] = useState("");

  const handleStart = (name: string) => {
    setPlayerName(name);
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);
    
    logToSupabase("privacy_game_sessions", {
      session_id: newSessionId,
      player_name: name,
      created_at: new Date().toISOString(),
      status: "started"
    });
    
    setGameState("room1");
  };

  const handleRoom1Complete = (attempts: string[]) => {
    updateSupabase("privacy_game_sessions", sessionId, {
      room1_attempts: attempts.join(","),
      room1_completed: true,
      status: "room1_cleared"
    });
    setGameState("room2");
  };

  const handleRoom2Complete = (attempts: string[]) => {
    updateSupabase("privacy_game_sessions", sessionId, {
      room2_attempts: attempts.join(","),
      room2_completed: true,
      status: "room2_cleared"
    });
    setGameState("room3");
  };

  const handleRoom3Complete = (attempts: string[]) => {
    updateSupabase("privacy_game_sessions", sessionId, {
      room3_attempts: attempts.join(","),
      room3_completed: true,
      status: "completed"
    });
    setGameState("completion");
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-zinc-300 selection:bg-cyan-900/50 selection:text-cyan-100">
      <DustOverlay />
      
      <main className="relative z-10">
        {gameState === "entrance" && <Entrance onStart={handleStart} />}
        {gameState === "room1" && <Room1 onComplete={handleRoom1Complete} />}
        {gameState === "room2" && <Room2 onComplete={handleRoom2Complete} />}
        {gameState === "room3" && <Room3 onComplete={handleRoom3Complete} />}
        {gameState === "completion" && <Completion name={playerName} />}
      </main>
    </div>
  );
}
