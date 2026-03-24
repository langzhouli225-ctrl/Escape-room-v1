import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";

interface EntranceProps {
  onStart: (name: string) => void;
}

export function Entrance({ onStart }: EntranceProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [instructionText, setInstructionText] = useState("");
  
  const [typingFinished, setTypingFinished] = useState(false);
  
  const fullInstruction = `Entering the Privacy Detective Office ...
You must solve three privacy cases to unlock the title of "Privacy Detective"
Inspect the evidence carefully. 
Unlock each case to move forward.`;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("An investigator needs a name. Please enter your English name.");
      return;
    }
    setError("");
    setStarted(true);
  };

  useEffect(() => {
    if (started) {
      let i = 0;
      const interval = setInterval(() => {
        setInstructionText(fullInstruction.slice(0, i));
        i++;
        if (i > fullInstruction.length) {
          clearInterval(interval);
          setTypingFinished(true);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [started, fullInstruction]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl backdrop-blur-sm"
      >
        {!started ? (
          <div className="space-y-8">
            <div className="space-y-2 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <Search className="h-8 w-8 text-zinc-400" />
              </div>
              <h1 className="font-serif text-3xl tracking-widest text-zinc-100 uppercase">
                Privacy Detective
              </h1>
              <p className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
                Case File Initiation
              </p>
            </div>

            <form onSubmit={handleStart} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  Investigator Name (English)
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-zinc-700 bg-transparent py-2 font-mono text-lg text-zinc-100 outline-none transition-colors focus:border-cyan-600"
                  placeholder="e.g. John Doe"
                  autoComplete="off"
                  spellCheck="false"
                />
                {error && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="font-mono text-xs text-red-500"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <button
                type="submit"
                className="group relative w-full overflow-hidden border border-zinc-700 bg-zinc-900 py-3 font-mono text-sm tracking-widest text-zinc-300 transition-all hover:border-cyan-600 hover:text-cyan-400 uppercase"
              >
                <div className="absolute inset-0 bg-cyan-900/20 translate-y-full transition-transform group-hover:translate-y-0" />
                <span className="relative">Start Investigation</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="min-h-[200px] flex flex-col items-center justify-center space-y-8">
            <p className="whitespace-pre-line font-mono text-sm leading-relaxed text-cyan-400/90 shadow-cyan-500/20 drop-shadow-md text-center">
              {instructionText}
              {!typingFinished && <span className="animate-pulse">_</span>}
            </p>
            {typingFinished && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => onStart(name.trim())}
                className="group relative overflow-hidden border border-cyan-700 bg-cyan-950/50 px-8 py-2 font-mono text-sm tracking-widest text-cyan-300 transition-all hover:border-cyan-400 hover:text-cyan-100 uppercase"
              >
                <div className="absolute inset-0 bg-cyan-900/40 translate-y-full transition-transform group-hover:translate-y-0" />
                <span className="relative">ENTER</span>
              </motion.button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
