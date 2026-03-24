import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { Trash2 } from "lucide-react";

interface Room3Props {
  onComplete: (attempts: string[]) => void;
}

const exportFields = [
  { id: "attendee_id", label: "Attendee ID", value: "HCP-2025-0834", shouldRemove: false },
  { id: "city", label: "City", value: "Chengdu", shouldRemove: false },
  { id: "arrival", label: "Arrival Time", value: "17 Nov 2025 – 14:30", shouldRemove: false },
  { id: "checkin", label: "Hotel Check-in Date", value: "17 Nov 2025", shouldRemove: false },
  { id: "diet", label: "Dietary Requirement", value: "Vegetarian", shouldRemove: false },
  { id: "mobile", label: "Mobile Number", value: "+86 138 4423 8888", shouldRemove: false },
  { id: "specialty", label: "Specialty", value: "Gastroenterology", shouldRemove: true },
  { id: "history", label: "Congress Speaking History", value: "Speaker – Provincial IBD Forum (Oct 2025)", shouldRemove: true },
  { id: "score", label: "Internal Engagement Score", value: "8.7 / 10", shouldRemove: true },
  { id: "note", label: "Internal CRM note", value: '"High scientific influence, low digital responsiveness"', shouldRemove: true },
  { id: "pickup", label: "Airport Pickup Needed", value: "Yes", shouldRemove: false },
];

export function Room3({ onComplete }: Room3Props) {
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState<string[]>([]);

  const handleRemove = (id: string) => {
    if (isSuccess) return;
    
    if (removedIds.includes(id)) {
      setRemovedIds(removedIds.filter(x => x !== id));
    } else {
      setRemovedIds([...removedIds, id]);
    }
  };

  const handleClearDataset = () => {
    const attemptLog = removedIds.join("|");
    setAttempts([...attempts, attemptLog]);

    const fieldsToRemove = exportFields.filter(f => f.shouldRemove).map(f => f.id);
    const isCorrectSelection = removedIds.length === fieldsToRemove.length && removedIds.every(id => fieldsToRemove.includes(id));

    if (isCorrectSelection) {
      setFeedback("Correct. Only the data necessary for the agency's task should be shared. The dataset has been cleared.");
      setIsSuccess(true);
      setTimeout(() => {
        onComplete([...attempts, attemptLog]);
      }, 4000);
    } else {
      const removedNecessary = removedIds.some(id => !fieldsToRemove.includes(id));
      if (removedNecessary) {
        setFeedback("Some of the removed information is required for event logistics.");
      } else {
        setFeedback("There are still unnecessary fields that expose additional personal data.");
      }
      setTimeout(() => {
        setRemovedIds([]);
        setFeedback("");
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        
        <div className="rounded border border-cyan-900/50 bg-cyan-950/20 p-6 shadow-xl backdrop-blur-sm">
          <p className="font-mono text-sm text-cyan-400">
            &gt; Found a file containing HCP PI that is about to be sent to the logistics agency.
            <br/>&gt; Remove 4 fields they should not receive.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="overflow-hidden rounded-md border border-zinc-800 bg-[#0a0a0a] shadow-2xl"
        >
          {/* Fake laptop screen header */}
          <div className="flex items-center space-x-2 border-b border-zinc-800 bg-zinc-900 px-4 py-2">
            <div className="flex space-x-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-4 font-mono text-xs text-zinc-500">export_logistics_final.csv</div>
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Field Name</div>
              <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Value</div>
              <div className="w-8"></div>
            </div>

            <div className="space-y-1">
              {exportFields.map((field) => {
                const isRemoved = removedIds.includes(field.id);
                
                return (
                  <motion.div 
                    key={field.id}
                    layout
                    className={cn(
                      "group flex items-center justify-between rounded px-2 py-2 transition-colors",
                      isRemoved ? "bg-red-950/20 opacity-30 grayscale" : "hover:bg-zinc-900"
                    )}
                  >
                    <div className="w-1/3 font-mono text-sm text-zinc-400">
                      {isRemoved ? <del>{field.label}</del> : field.label}
                    </div>
                    <div className="w-1/2 font-mono text-sm text-zinc-300 truncate">
                      {isRemoved ? <del>{field.value}</del> : field.value}
                    </div>
                    <div className="w-8 flex justify-end">
                      <button
                        onClick={() => handleRemove(field.id)}
                        disabled={isSuccess}
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded transition-colors",
                          isRemoved 
                            ? "text-red-500 hover:bg-red-950/50" 
                            : "text-zinc-600 hover:bg-zinc-800 hover:text-red-400"
                        )}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-center space-y-4 border-t border-zinc-800 pt-6">
              <button
                onClick={handleClearDataset}
                disabled={isSuccess || removedIds.length === 0}
                className="group relative overflow-hidden rounded border border-cyan-800 bg-cyan-950/30 px-8 py-3 font-mono text-sm uppercase tracking-widest text-cyan-400 transition-all hover:border-cyan-500 hover:bg-cyan-900/50 disabled:opacity-50"
              >
                <span className="relative z-10">Clear Dataset for Release</span>
              </button>

              {feedback && (
                <div 
                  key={attempts.length}
                  className={cn(
                    "rounded border px-6 py-3 text-center font-mono text-sm animate-[pulse_0.5s_ease-in-out]",
                    isSuccess ? "border-green-800/50 bg-green-950/30 text-green-400" : "border-red-800/50 bg-red-950/30 text-red-400"
                  )}
                >
                  {feedback}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
