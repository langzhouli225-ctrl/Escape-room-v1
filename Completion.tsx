import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface CompletionProps {
  name: string;
}

export function Completion({ name }: CompletionProps) {
  const [typedText, setTypedText] = useState("");
  const [typingFinished, setTypingFinished] = useState(false);
  
  const fullMessage = `Three cases.
One careful investigator.

You identified personal data, recognized indirect identification, and stopped unnecessary information from leaving the office.

The case files are sealed.`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullMessage.slice(0, i));
      i++;
      if (i > fullMessage.length) {
        clearInterval(interval);
        setTypingFinished(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [fullMessage]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950/90 p-12 shadow-2xl backdrop-blur-md text-center"
      >
        <div className="space-y-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-900 bg-cyan-950/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
          >
            <div className="h-12 w-12 rounded-full bg-cyan-400/20 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          </motion.div>

          <div className="min-h-[200px] flex items-center justify-center">
            <p className="whitespace-pre-line font-mono text-sm leading-relaxed text-zinc-300 max-w-lg mx-auto">
              {typedText}
              {!typingFinished && <span className="animate-pulse">_</span>}
            </p>
          </div>

          {typingFinished && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="pt-8 border-t border-zinc-800"
            >
              <h1 className="font-serif text-4xl font-bold text-cyan-400 mb-2">
                {name}
              </h1>
              <p className="font-mono text-xs text-zinc-500 tracking-[0.3em] uppercase">
                Certified Privacy Detective
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
