import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface Room1Props {
  onComplete: (attempts: string[]) => void;
}

const fields = [
  { id: "event_name", label: "Event Name", value: "Gastroenterology Scientific Exchange 2025", isPI: false },
  { id: "event_date", label: "Event Date", value: "18 Nov 2025", isPI: false },
  { id: "venue", label: "Venue", value: "Chengdu Jinjiang Conference Center", isPI: false },
  { id: "coordinator", label: "Event Coordinator", value: "Medical Affairs Team", isPI: false },
  { id: "phone", label: "Phone Number", value: "+86 138 4423 8888", isPI: true },
  { id: "email", label: "Email Address", value: "wang_li@wchospital.cn", isPI: true },
  { id: "etms", label: "ETMS Code", value: "ETMS-HCP-04721", isPI: true },
  { id: "bank", label: "Bank Account", value: "6217 0001 8823 1234", isPI: true },
];

export function Room1({ onComplete }: Room1Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFieldClick = (id: string) => {
    if (isSuccess) return;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
    } else if (selectedIds.length < 4) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length !== 4) return;
    
    const attemptLog = selectedIds.join("|");
    setAttempts([...attempts, attemptLog]);

    // Check if the selected fields are exactly the 4 PI fields
    const piFields = fields.filter(f => f.isPI).map(f => f.id);
    const isCorrectSelection = selectedIds.length === 4 && selectedIds.every(id => piFields.includes(id));

    if (isCorrectSelection) {
      setFeedback("Correct. These items directly identify the HCP.");
      setIsSuccess(true);
      setTimeout(() => {
        onComplete([...attempts, attemptLog]);
      }, 3000);
    } else {
      setFeedback("Some of the selected information describes the event rather than the individual, or the code is incorrect.");
      setSelectedIds([]);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        
        <div className="rounded border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl backdrop-blur-sm">
          <p className="font-mono text-sm text-cyan-400">
            &gt; Select 4 pieces of information that directly identify the HCP. 
            <br/>&gt; Each selection reveals a code digit. Once 4 digits are collected, unlock the drawer.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* The Document */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative overflow-hidden rounded bg-[#e8e4d9] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Paper texture overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            
            <div className="mb-8 border-b-2 border-zinc-800 pb-4">
              <h2 className="font-serif text-2xl font-bold text-zinc-900">HCP Engagement Planning Sheet</h2>
              <p className="font-mono text-xs text-zinc-600">CONFIDENTIAL // INTERNAL USE ONLY</p>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => {
                const isSelected = selectedIds.includes(field.id);
                // Deterministic pseudo-random digit based on index for the puzzle
                const digit = (index * 3 + 7) % 10; 
                
                return (
                  <div 
                    key={field.id}
                    onClick={() => handleFieldClick(field.id)}
                    className={cn(
                      "group relative flex cursor-pointer items-center justify-between border-b border-zinc-300/50 py-2 transition-colors",
                      isSelected ? "bg-yellow-200/50" : "hover:bg-zinc-200/50"
                    )}
                  >
                    <div className="flex w-full items-center justify-between px-2">
                      <span className="font-sans text-sm font-semibold text-zinc-700">{field.label}</span>
                      <span className="font-mono text-sm text-zinc-900">{field.value}</span>
                    </div>
                    
                    {/* The revealed digit */}
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full border border-red-800 bg-red-100 font-mono text-xs font-bold text-red-800 shadow-sm"
                        style={{ transform: `rotate(${Math.random() * 20 - 10}deg)` }}
                      >
                        {digit}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* The Drawer Lock */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center space-y-6 rounded border border-zinc-800 bg-zinc-950 p-8 shadow-2xl"
          >
            <div className="text-center">
              <h3 className="font-mono text-lg text-zinc-400 uppercase tracking-widest">Desk Drawer Lock</h3>
              <div className="mt-4 flex justify-center space-x-2">
                {selectedIds.map((id, i) => {
                  const fieldIndex = fields.findIndex(f => f.id === id);
                  const digit = (fieldIndex * 3 + 7) % 10;
                  return (
                    <div key={i} className="flex h-12 w-10 items-center justify-center border border-zinc-700 bg-zinc-900 font-mono text-xl text-red-500 shadow-inner">
                      {digit}
                    </div>
                  );
                })}
                {Array.from({ length: Math.max(0, 4 - selectedIds.length) }).map((_, i) => (
                  <div key={`empty-${i}`} className="flex h-12 w-10 items-center justify-center border border-zinc-800 bg-zinc-900/50 font-mono text-xl text-zinc-700 shadow-inner">
                    -
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <button
                type="submit"
                disabled={selectedIds.length !== 4 || isSuccess}
                className="w-full border border-zinc-700 bg-zinc-800 py-3 font-mono text-sm uppercase tracking-widest text-zinc-300 transition-colors hover:bg-zinc-700 disabled:opacity-50"
              >
                Unlock
              </button>
            </form>

            {feedback && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "rounded border p-3 text-center font-mono text-sm",
                  isSuccess ? "border-green-800/50 bg-green-900/20 text-green-400" : "border-red-800/50 bg-red-900/20 text-red-400"
                )}
              >
                {feedback}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
