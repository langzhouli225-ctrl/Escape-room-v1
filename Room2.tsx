import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

interface Room2Props {
  onComplete: (attempts: string[]) => void;
}

const combinations = [
  {
    id: "A",
    title: "Combination A",
    details: ["China", "Physician", "Attended event"],
    feedback: "This combination is too broad to identify a specific individual."
  },
  {
    id: "B",
    title: "Combination B",
    details: ["Chengdu", "Gastroenterology", "Deputy Director", "Spoke at provincial IBD forum in Oct 2025"],
    feedback: "Correct. Even without names or contact details a person can become identifiable when several details about their location, specialty, role, and professional activity are combined."
  },
  {
    id: "C",
    title: "Combination C",
    details: ["Vegetarian", "Prefers rail travel", "Needs hotel booking"],
    feedback: "These details describe preferences, but they do not uniquely identify the HCP."
  }
];

export function Room2({ onComplete }: Room2Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [showLaptop, setShowLaptop] = useState(false);
  const [laptopUnlocked, setLaptopUnlocked] = useState(false);

  const handleSelect = (id: string) => {
    if (isSuccess) return;
    
    setSelectedId(id);
    setAttempts([...attempts, id]);
    
    const combo = combinations.find(c => c.id === id);
    if (!combo) return;

    setFeedback(combo.feedback);

    if (id === "B") {
      setIsSuccess(true);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toUpperCase() === "IDENTIFY") {
      setLaptopUnlocked(true);
      setTimeout(() => {
        onComplete(attempts);
      }, 2000);
    } else {
      setPassword("");
    }
  };

  if (showLaptop) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={laptopUnlocked ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: laptopUnlocked ? 1 : 0.5 }}
          className="relative flex h-[400px] w-full max-w-2xl flex-col items-center justify-center rounded-xl border-8 border-zinc-800 bg-zinc-950 shadow-2xl"
        >
          <div className="absolute top-0 h-4 w-full bg-zinc-900" />
          <div className="absolute bottom-0 h-8 w-full bg-zinc-800" />
          
          <div className="z-10 w-full max-w-xs space-y-6 text-center">
            <div className="space-y-2">
              <div className="mx-auto h-12 w-12 rounded-full border border-cyan-900 bg-cyan-950/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <h2 className="font-mono text-xl text-cyan-400 tracking-widest uppercase">System Locked</h2>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full border-b border-zinc-700 bg-transparent py-2 pr-10 text-center font-mono text-lg tracking-widest text-zinc-100 outline-none transition-colors focus:border-cyan-500 uppercase"
                  autoFocus
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-cyan-400 transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl space-y-8">
        
        <div className="rounded border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl backdrop-blur-sm text-center">
          <p className="font-mono text-lg text-cyan-400">
            Which combination is most likely to identify a specific HCP?
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {combinations.map((combo, i) => (
            <motion.div 
              key={combo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleSelect(combo.id)}
              className={cn(
                "group cursor-pointer overflow-hidden rounded border bg-zinc-900 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl",
                selectedId === combo.id ? "border-cyan-600 shadow-cyan-900/20" : "border-zinc-800",
                isSuccess && selectedId !== combo.id && "opacity-50 grayscale"
              )}
            >
              <div className="mb-4 border-b border-zinc-800 pb-2">
                <h3 className="font-serif text-xl font-bold text-zinc-100">{combo.title}</h3>
              </div>
              <ul className="space-y-3">
                {combo.details.map((detail, j) => (
                  <li key={j} className="flex items-start space-x-2 font-mono text-sm text-zinc-400">
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-700 group-hover:bg-cyan-600" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {feedback && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "mx-auto max-w-2xl rounded border p-6 text-center shadow-2xl",
              isSuccess ? "border-cyan-800/50 bg-cyan-950/30" : "border-red-900/50 bg-red-950/30"
            )}
          >
            <p className="font-mono text-sm leading-relaxed text-zinc-300">{feedback}</p>
            
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 space-y-6 border-t border-cyan-900/50 pt-6"
              >
                <div className="space-y-2">
                  <p className="font-mono text-2xl font-bold tracking-[0.5em] text-cyan-400 animate-pulse">
                    IDENTIFY
                  </p>
                  <p className="font-mono text-xs text-cyan-600 uppercase tracking-widest">
                    Use the password fragment to unlock the laptop on the desk and continue your investigation.
                  </p>
                </div>
                
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  onClick={() => setShowLaptop(true)}
                  className="group relative overflow-hidden border border-cyan-700 bg-cyan-950/50 px-8 py-3 font-mono text-sm tracking-widest text-cyan-300 transition-all hover:border-cyan-400 hover:text-cyan-100 uppercase"
                >
                  <div className="absolute inset-0 bg-cyan-900/40 translate-y-full transition-transform group-hover:translate-y-0" />
                  <span className="relative">Continue Investigation</span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
