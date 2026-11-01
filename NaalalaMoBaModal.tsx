import React, { useState } from 'react';
import { ALL_ARTIFACTS } from '../data/museumData';
import { Artifact } from '../types/museum';
import { X, Shuffle, ArrowRight } from 'lucide-react';

interface NaalalaMoBaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArtifact: (art: Artifact) => void;
}

export const NaalalaMoBaModal: React.FC<NaalalaMoBaModalProps> = ({
  isOpen,
  onClose,
  onSelectArtifact,
}) => {
  const [randomItem, setRandomItem] = useState<Artifact>(() => {
    const idx = Math.floor(Math.random() * ALL_ARTIFACTS.length);
    return ALL_ARTIFACTS[idx];
  });

  if (!isOpen) return null;

  const handlePickAnother = () => {
    let nextIdx = Math.floor(Math.random() * ALL_ARTIFACTS.length);
    if (ALL_ARTIFACTS[nextIdx].id === randomItem.id) {
      nextIdx = (nextIdx + 1) % ALL_ARTIFACTS.length;
    }
    setRandomItem(ALL_ARTIFACTS[nextIdx]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-lg bg-[#FAF7EE] border-2 border-rose-300 rounded-3xl shadow-2xl p-6 text-stone-900 overflow-hidden">
        {/* Top Decorative Tape */}
        <div className="w-32 h-4 bg-rose-200/80 -top-2 left-1/2 -translate-x-1/2 absolute rotate-1 shadow-xs" />

        <div className="flex items-center justify-between border-b border-stone-300 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <div>
              <h3 className="text-lg font-bold font-retro-title text-rose-950 leading-tight">
                Do You Remember This? (Naalala Mo Ba?)
              </h3>
              <p className="text-xs font-mono-retro text-rose-700">
                Random Nostalgia Discovery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Card */}
        <div className="space-y-4">
          <div className="relative h-52 w-full rounded-2xl overflow-hidden border border-stone-300 bg-stone-900 shadow-sm">
            <img
              src={randomItem.imageUrl}
              alt={randomItem.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-amber-400 text-stone-950 text-[10px] font-mono-retro font-bold px-2 py-0.5 rounded shadow-xs">
              {randomItem.period}
            </div>
            <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[11px] p-2 rounded-lg font-mono-retro">
              {randomItem.category}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold font-retro-title text-amber-950">
              {randomItem.title}
            </h4>
            <p className="text-sm font-handwritten font-bold text-amber-800">
              {randomItem.tagalogTitle}
            </p>
            <p className="text-xs text-stone-700 mt-2 leading-relaxed">
              {randomItem.description}
            </p>
          </div>

          {/* Oral Memory Snippet */}
          <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs italic text-stone-700 font-serif">
            {randomItem.personalMemories}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handlePickAnother}
              className="flex-1 py-2.5 px-4 bg-white hover:bg-stone-100 text-stone-800 font-mono-retro font-bold text-xs rounded-xl border border-stone-300 transition flex items-center justify-center gap-2"
            >
              <Shuffle className="w-3.5 h-3.5 text-stone-500" />
              <span>Pick Another! (Isa Pa!)</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectArtifact(randomItem);
              }}
              className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono-retro font-bold text-xs rounded-xl border border-amber-600 transition flex items-center justify-center gap-2 shadow-xs"
            >
              <span>View Full Exhibit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
