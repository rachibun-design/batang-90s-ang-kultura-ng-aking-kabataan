import React, { useState, useEffect } from 'react';
import { SAMPLE_MEMORIES } from '../data/museumData';
import { MemorySubmission } from '../types/museum';
import { Heart, Send, MessageSquare, ShieldCheck } from 'lucide-react';

export const MemoryWallSection: React.FC = () => {
  const [memories, setMemories] = useState<MemorySubmission[]>(() => {
    try {
      const saved = localStorage.getItem('batang90s_memories');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return SAMPLE_MEMORIES;
  });

  const [authorInput, setAuthorInput] = useState('');
  const [memoryInput, setMemoryInput] = useState('');
  const [decadeInput, setDecadeInput] = useState<'Early 90s' | 'Mid 90s' | 'Late 90s' | 'Early 2000s'>('Mid 90s');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('batang90s_memories', JSON.stringify(memories));
    } catch {
      // local storage failure safe
    }
  }, [memories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoryInput.trim()) return;

    const newMemory: MemorySubmission = {
      id: `mem-${Date.now()}`,
      author: authorInput.trim() || 'Anonymous Batang 90s',
      memory: memoryInput.trim(),
      decade: decadeInput,
      timestamp: 'Just now',
      likes: 1,
    };

    setMemories([newMemory, ...memories]);
    setMemoryInput('');
    setAuthorInput('');
    setHasSubmitted(true);
    setTimeout(() => setHasSubmitted(false), 4000);
  };

  const handleLike = (id: string) => {
    setMemories(
      memories.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  const filteredMemories =
    activeFilter === 'all'
      ? memories
      : memories.filter((m) => m.decade === activeFilter);

  return (
    <section id="memories" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-stone-300 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-retro font-bold text-rose-800 uppercase tracking-widest mb-1">
            <Heart className="w-4 h-4 text-rose-600" />
            <span>Community Memory Collection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-retro-title text-amber-950">
            Mga Alaala Natin (Community Memory Wall)
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans mt-1 max-w-2xl">
            Share your own childhood story. Every street game, school recess snack, and family television memory is an invaluable piece of our shared cultural history.
          </p>
        </div>

        {/* Local Storage Privacy Badge */}
        <div className="flex items-center gap-1.5 p-2 px-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono-retro">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Device Privacy: Stored locally in your browser</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Submission Form (Scrapbook Post-it design) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border-2 border-stone-300 shadow-md space-y-4 relative">
          <div className="w-28 h-4 bg-amber-200/80 -top-2 left-8 absolute rotate-1 shadow-xs" />

          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold font-retro-title text-amber-950">
              Share Your Childhood Memory
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-mono-retro font-bold text-stone-700 mb-1">
                Display Name or Nickname (Optional):
              </label>
              <input
                type="text"
                value={authorInput}
                onChange={(e) => setAuthorInput(e.target.value)}
                placeholder="e.g. Kuya Mark (Tondo, Manila)"
                className="w-full text-xs font-sans bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-retro font-bold text-stone-700 mb-1">
                Time Period (Decade / Era):
              </label>
              <select
                value={decadeInput}
                onChange={(e) => setDecadeInput(e.target.value as any)}
                className="w-full text-xs font-mono-retro bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:border-amber-500"
              >
                <option value="Early 90s">Early 90s (1990–1993)</option>
                <option value="Mid 90s">Mid 90s (1994–1996)</option>
                <option value="Late 90s">Late 90s (1997–1999)</option>
                <option value="Early 2000s">Early 2000s (2000–2003)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono-retro font-bold text-stone-700 mb-1">
                Your Childhood Story:
              </label>
              <textarea
                rows={4}
                required
                value={memoryInput}
                onChange={(e) => setMemoryInput(e.target.value)}
                placeholder="What was your favorite neighborhood street game, corner store snack, or afternoon routine after school?"
                className="w-full text-xs font-sans bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-800 focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:scale-98 text-stone-950 font-mono-retro font-bold text-xs rounded-xl border border-amber-600 transition flex items-center justify-center gap-2 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Pin to Memory Wall (Submit Memory)</span>
            </button>

            {hasSubmitted && (
              <div className="p-2.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-mono-retro text-center animate-in fade-in">
                Thank you! Your memory has been pinned to your local memory wall.
              </div>
            )}

            <p className="text-[11px] text-stone-600 font-sans leading-normal">
              Note: Your submission is stored locally in your browser storage (localStorage) and is not publicly transmitted across servers.
            </p>
          </form>
        </div>

        {/* Right Column: Display of Memories Wall (Post-it style grid) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono-retro">
            {['all', 'Early 90s', 'Mid 90s', 'Late 90s', 'Early 2000s'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap border ${
                  activeFilter === tab
                    ? 'bg-amber-500 text-stone-950 border-amber-600 font-bold'
                    : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
                }`}
              >
                {tab === 'all' ? 'All Decades' : tab}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredMemories.map((mem) => (
              <div
                key={mem.id}
                className="bg-white p-4 rounded-2xl border border-stone-300 shadow-xs flex flex-col justify-between space-y-3 relative group hover:border-amber-400 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono-retro text-stone-500">
                    <span className="font-bold text-amber-800">{mem.decade}</span>
                    <span>{mem.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                    &ldquo;{mem.memory}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  <span className="text-xs font-handwritten font-bold text-stone-700 truncate max-w-[150px]">
                    — {mem.author}
                  </span>

                  <button
                    onClick={() => handleLike(mem.id)}
                    className="flex items-center gap-1 text-[11px] font-mono-retro text-rose-600 hover:text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 active:scale-95 transition"
                  >
                    <Heart className="w-3 h-3 fill-rose-500" />
                    <span>{mem.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
