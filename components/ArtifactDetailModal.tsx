import React from 'react';
import { Artifact } from '../types/museum';
import { ALL_ARTIFACTS } from '../data/museumData';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  Info,
  CheckCircle2,
  Calendar,
  Layers,
  MessageSquareQuote,
  ArrowRight,
} from 'lucide-react';

interface ArtifactDetailModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  onSelectArtifact: (art: Artifact) => void;
}

export const ArtifactDetailModal: React.FC<ArtifactDetailModalProps> = ({
  artifact,
  onClose,
  onSelectArtifact,
}) => {
  if (!artifact) return null;

  // Previous & Next Artifact Navigation
  const currentIndex = ALL_ARTIFACTS.findIndex((a) => a.id === artifact.id);
  const prevArtifact = ALL_ARTIFACTS[(currentIndex - 1 + ALL_ARTIFACTS.length) % ALL_ARTIFACTS.length];
  const nextArtifact = ALL_ARTIFACTS[(currentIndex + 1) % ALL_ARTIFACTS.length];

  // Related Artifacts
  const relatedArtifacts = ALL_ARTIFACTS.filter((a) =>
    artifact.relatedArtifactIds.includes(a.id)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#FAF7EE] border-2 border-stone-400 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-900">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b-2 border-stone-300 bg-white/90">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-retro font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-300">
              {artifact.category.toUpperCase()}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono-retro text-stone-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{artifact.period} ({artifact.yearRange})</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next Nav */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-300">
              <button
                onClick={() => onSelectArtifact(prevArtifact)}
                title={`Previous: ${prevArtifact.title}`}
                className="p-1 hover:bg-white rounded transition text-stone-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectArtifact(nextArtifact)}
                title={`Next: ${nextArtifact.title}`}
                className="p-1 hover:bg-white rounded transition text-stone-700"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200 transition"
              aria-label="Close Artifact Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Hero Banner with Artifact Image and Titles */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-4 sm:p-5 rounded-2xl border border-stone-300 shadow-sm">
            <div className="md:col-span-5 h-56 sm:h-64 rounded-xl overflow-hidden border border-stone-300 bg-stone-950 relative group">
              <img
                src={artifact.imageUrl}
                alt={artifact.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-mono-retro p-1.5 rounded">
                Archival Plate · Batang 90s Museum
              </div>
            </div>

            <div className="md:col-span-7 space-y-2.5">
              <span className="text-xs font-mono-retro font-bold text-amber-700 uppercase tracking-widest">
                Official Exhibit Registry
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-retro-title text-amber-950">
                {artifact.title}
              </h2>
              <p className="text-base font-handwritten font-bold text-amber-800">
                {artifact.tagalogTitle} — {artifact.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-1">
                {artifact.description}
              </p>
            </div>
          </div>

          {/* Section 1: Cultural & Historical Background */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-300 space-y-2">
            <h3 className="text-xs font-mono-retro font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              Cultural & Historical Background
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {artifact.culturalBackground}
            </p>
          </div>

          {/* Section 2: How It Was Used / Experienced */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-300 space-y-2">
            <h3 className="text-xs font-mono-retro font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              How It Was Used & Experienced
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {artifact.howItWasUsed}
            </p>
          </div>

          {/* Rules and Terminology (if present) */}
          {artifact.rulesAndTerminology && artifact.rulesAndTerminology.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-2">
              <h3 className="text-xs font-mono-retro font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" />
                Rules & Playground Terminology
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-800">
                {artifact.rulesAndTerminology.map((rule, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-white border border-amber-200">
                    {rule}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interesting Facts & Trivia */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-300 space-y-2.5">
            <h3 className="text-xs font-mono-retro font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              Interesting Facts & Historical Trivia
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
              {artifact.interestingFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Methodological Transparency: Documented Facts vs. Personal Memories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Documented Historical Facts */}
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1.5 text-xs">
              <span className="font-mono-retro font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                Documented Historical Record
              </span>
              <p className="text-stone-700 leading-relaxed">
                {artifact.documentedFacts}
              </p>
            </div>

            {/* General Recollection & Personal Memory */}
            <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1.5 text-xs">
              <span className="font-mono-retro font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquareQuote className="w-3.5 h-3.5 text-rose-600" />
                Childhood Memory & Oral Account
              </span>
              <p className="text-stone-700 italic leading-relaxed font-serif">
                {artifact.personalMemories}
              </p>
            </div>
          </div>

          {/* Related Artifacts Carousel/Grid */}
          {relatedArtifacts.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-stone-300">
              <h3 className="text-xs font-mono-retro font-bold uppercase tracking-wider text-stone-700">
                Related Museum Exhibits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArtifacts.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectArtifact(rel)}
                    className="text-left p-3 rounded-xl bg-white border border-stone-300 hover:border-amber-500 transition group flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-amber-800">
                        {rel.title}
                      </h4>
                      <p className="text-[10px] text-stone-500 font-mono-retro">
                        {rel.category}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t-2 border-stone-300 bg-white/90 text-xs font-mono-retro text-stone-600">
          <div className="flex items-center gap-2">
            <span>Collection: BATANG 90s</span>
            <span>·</span>
            <span>Ang Kultura ng Aking Kabataan</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
