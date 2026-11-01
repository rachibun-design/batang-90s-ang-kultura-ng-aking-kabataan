import React, { useState } from 'react';
import { TIME_CAPSULE_EVENTS } from '../data/museumData';
import { EraPeriod, TimeCapsuleItem } from '../types/museum';
import { X, Calendar, Clock, Layers, Sparkles } from 'lucide-react';

interface TimeCapsuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TimeCapsuleModal: React.FC<TimeCapsuleModalProps> = ({ isOpen, onClose }) => {
  const [selectedEra, setSelectedEra] = useState<string>('all');

  if (!isOpen) return null;

  const eras: { id: string; label: string }[] = [
    { id: 'all', label: 'All Eras (1990–2000s)' },
    { id: 'Early 1990s', label: 'Early 1990s (1990–1993)' },
    { id: 'Mid-1990s', label: 'Mid-1990s (1994–1996)' },
    { id: 'Late 1990s', label: 'Late 1990s (1997–1999)' },
    { id: 'Early 2000s', label: 'Early 2000s (2000–2002)' },
    { id: 'Y2K Era', label: 'Y2K Era Focus' },
  ];

  const filteredEvents =
    selectedEra === 'all'
      ? TIME_CAPSULE_EVENTS
      : TIME_CAPSULE_EVENTS.filter((ev) => ev.era === selectedEra);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF7EE] border-2 border-stone-400 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-stone-300 bg-white/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-lg shadow-xs">
              ⏳
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-retro-title text-amber-950">
                Digital Time Capsule (1990 – 2000s)
              </h3>
              <p className="text-xs font-mono-retro text-stone-600">
                Chronology of the Cultural Transition from Analog Play to Early Digital Connectivity
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Era Navigation Filter Pills */}
        <div className="p-3 px-5 bg-white border-b border-stone-300 flex items-center gap-2 overflow-x-auto text-xs font-mono-retro">
          <span className="text-stone-500 font-bold shrink-0">Filter by Era:</span>
          {eras.map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors border ${
                selectedEra === era.id
                  ? 'bg-amber-500 text-stone-950 border-amber-600 font-bold'
                  : 'bg-stone-50 text-stone-600 border-stone-300 hover:bg-stone-100'
              }`}
            >
              {era.label}
            </button>
          ))}
        </div>

        {/* Timeline Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="relative border-l-2 border-amber-400 pl-6 sm:pl-8 space-y-6">
            {filteredEvents.map((item) => (
              <div key={item.id} className="relative group">
                {/* Timeline Node Point */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-amber-500 border-4 border-white shadow-sm flex items-center justify-center" />

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-300 shadow-xs space-y-2 hover:border-amber-400 transition">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono-retro font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      Year {item.year} · {item.era}
                    </span>
                    <span className="text-[11px] font-mono-retro text-stone-500">
                      {item.category}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold font-retro-title text-amber-950">
                    {item.title}
                  </h4>
                  <p className="text-xs font-handwritten font-bold text-amber-800">
                    {item.tagalogTitle}
                  </p>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="pt-2 border-t border-stone-200 text-xs text-stone-600 leading-relaxed">
                    <strong className="text-stone-800 font-mono-retro">Cultural Significance: </strong>
                    {item.culturalContext}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 px-6 border-t-2 border-stone-300 bg-white/90 text-xs font-mono-retro text-stone-600">
          <span>Batang 90s Historical Time Capsule Archive</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
