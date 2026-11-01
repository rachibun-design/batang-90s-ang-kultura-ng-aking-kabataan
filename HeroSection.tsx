import React from 'react';
import { Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import { ALL_ARTIFACTS } from '../data/museumData';
import { Artifact } from '../types/museum';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenRandomMemory: () => void;
  onOpenQuiz: () => void;
  onSelectArtifact: (art: Artifact) => void;
  onToggleAudio: () => void;
  isAudioPlaying: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onOpenRandomMemory,
  onOpenQuiz,
  onSelectArtifact,
}) => {
  const sampleArtifact = ALL_ARTIFACTS[0]; // Teks Cards

  return (
    <section className="relative overflow-hidden py-10 lg:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Decorative Washi Tape & Stamp Accents */}
      <div className="absolute top-4 left-6 hidden md:block washi-tape px-4 py-1 text-[11px] font-handwritten font-bold text-amber-950 uppercase tracking-widest z-10">
        ★ 1990s Cultural Archive ★
      </div>
      <div className="absolute top-6 right-8 hidden lg:block rotate-3 bg-rose-100 border-2 border-rose-300 text-rose-900 text-xs px-3 py-1 font-mono-retro rounded-md shadow-xs">
        Bawal ang Pikon! (No Sore Losers!)
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Brand, Official Tagline, and English Manifesto */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-mono-retro font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Digital Cultural Archive · 1990s — Early 2000s</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-retro-title tracking-tight text-amber-950 leading-[1.1]">
              BATANG 90s
            </h1>
            <p className="text-2xl sm:text-3xl font-handwritten font-bold text-amber-700 tracking-wide">
              Ang Kultura ng Aking Kabataan
            </p>
          </div>

          {/* Official Introductory Copy in English */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border-2 border-stone-300/80 shadow-md space-y-3 font-sans relative">
            <div className="w-12 h-3 bg-amber-300/70 absolute -top-1.5 left-8 -rotate-2" />
            <p className="text-base sm:text-lg font-bold text-stone-900 font-retro-title">
              Welcome to BATANG 90s.
            </p>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              A digital museum documenting and celebrating the objects, entertainment, traditions, trends, and everyday experiences that shaped Filipino childhood from the 1990s through the early 2000s.
            </p>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              From neighborhood street games and classroom baon snacks to broadcast television, favorite treats, handheld gadgets, and our first moments connecting to the internet.
            </p>
            <p className="text-xs sm:text-sm font-mono-retro font-bold text-amber-800 pt-1">
              Explore the collections. Discover the stories. Relive the culture.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExplore}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-bold rounded-xl shadow-md border-2 border-amber-600 transition flex items-center gap-2 text-sm sm:text-base font-retro-title"
            >
              <span>EXPLORE THE MUSEUM</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenRandomMemory}
              className="px-5 py-3 bg-white hover:bg-stone-50 active:scale-95 text-rose-800 font-bold rounded-xl shadow-sm border-2 border-rose-300 transition flex items-center gap-2 text-sm font-mono-retro"
            >
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>Naalala Mo Ba?</span>
            </button>

            <button
              onClick={onOpenQuiz}
              className="px-4 py-3 bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-950 font-bold rounded-xl border border-amber-300 transition flex items-center gap-2 text-sm font-mono-retro"
            >
              <HelpCircle className="w-4 h-4 text-amber-800" />
              <span>Take 90s Quiz</span>
            </button>
          </div>

          {/* Cultural Pillars Metric Pills */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-300/80 text-center">
            <div className="p-3 bg-white/70 rounded-xl border border-stone-200">
              <span className="block text-xl font-bold font-retro-title text-amber-900">6</span>
              <span className="text-[11px] font-mono-retro text-stone-600">Curated Galleries</span>
            </div>
            <div className="p-3 bg-white/70 rounded-xl border border-stone-200">
              <span className="block text-xl font-bold font-retro-title text-amber-900">25+</span>
              <span className="text-[11px] font-mono-retro text-stone-600">Authentic Exhibits</span>
            </div>
            <div className="p-3 bg-white/70 rounded-xl border border-stone-200">
              <span className="block text-xl font-bold font-retro-title text-amber-900">1990–2000s</span>
              <span className="text-[11px] font-mono-retro text-stone-600">Documented Era</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Nostalgia Polaroid Showcase & "Naalala Mo Ba?" Card */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Polaroid Card */}
          <div className="relative bg-white p-4 sm:p-5 rounded-2xl shadow-xl border-2 border-stone-300 rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Washi tape on top of polaroid */}
            <div className="w-24 h-4 bg-amber-300/80 -top-2 left-1/2 -translate-x-1/2 absolute rotate-1 shadow-xs" />

            <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-stone-200 bg-stone-900">
              <img
                src="/src/assets/images/ph_street_games_90s_1793533619002.jpg"
                alt="Batang 90s Street Games"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg p-2 text-white text-[11px] font-mono-retro flex items-center justify-between">
                <span>Neighborhood Street Games</span>
                <span className="text-amber-400">October 1995</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-retro-title text-amber-950">
                  Teks, Pogs & Street Games
                </h3>
                <p className="text-xs font-handwritten text-stone-600 font-bold">
                  Street childhood before smartphones and Wi-Fi
                </p>
              </div>
              <button
                onClick={() => onSelectArtifact(sampleArtifact)}
                className="px-3 py-1.5 text-xs font-mono-retro font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg border border-amber-300 transition"
              >
                Inspect Exhibit
              </button>
            </div>
          </div>

          {/* Random Nostalgia Spotlight Card (Naalala Mo Ba?) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-rose-100 border-2 border-amber-300 shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                ✨
              </div>
              <div>
                <span className="text-[10px] font-mono-retro uppercase tracking-wider text-rose-800 font-bold">
                  Random Memory Spotlight
                </span>
                <h4 className="text-sm font-bold text-stone-900 font-retro-title">
                  Naalala Mo Ba?
                </h4>
                <p className="text-xs text-stone-600 line-clamp-1">
                  Click to discover a random childhood memory or artifact!
                </p>
              </div>
            </div>

            <button
              onClick={onOpenRandomMemory}
              className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-mono-retro font-bold text-xs rounded-xl shadow-xs shrink-0 transition active:scale-95"
            >
              Discover
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
