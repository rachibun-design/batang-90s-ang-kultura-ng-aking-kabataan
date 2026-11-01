import React, { useState } from 'react';
import { GALLERIES_META, ALL_ARTIFACTS } from '../data/museumData';
import { GalleryId, Artifact } from '../types/museum';
import { ArrowLeft, BookOpen, Filter } from 'lucide-react';

interface GalleryViewProps {
  galleryId: GalleryId;
  onBack: () => void;
  onSelectArtifact: (art: Artifact) => void;
  onSwitchGallery: (galleryId: GalleryId) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  galleryId,
  onBack,
  onSelectArtifact,
  onSwitchGallery,
}) => {
  const meta = GALLERIES_META[galleryId];
  const artifacts = ALL_ARTIFACTS.filter((a) => a.galleryId === galleryId);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  const filteredArtifacts =
    selectedPeriod === 'all'
      ? artifacts
      : artifacts.filter((a) => a.period === selectedPeriod);

  const allGalleries = Object.values(GALLERIES_META);

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Gallery Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-300 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono-retro font-bold text-amber-900 hover:text-amber-700 bg-white px-3 py-1.5 rounded-lg border border-stone-300 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Galleries</span>
        </button>

        {/* Gallery Quick Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono-retro">
          {allGalleries.map((g) => (
            <button
              key={g.id}
              onClick={() => onSwitchGallery(g.id)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap transition border ${
                g.id === galleryId
                  ? 'bg-amber-500 text-stone-950 border-amber-600 font-bold'
                  : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
              }`}
            >
              {g.number}. {g.title.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Banner for Current Gallery */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-stone-300 shadow-lg bg-stone-900">
        <div className="relative h-64 sm:h-80 w-full">
          <img
            src={meta.heroImage}
            alt={meta.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        </div>

        <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
          <div className="flex items-center gap-2 text-xs font-mono-retro font-bold text-amber-400">
            <span>GALLERY {meta.number}</span>
            <span>·</span>
            <span>{meta.theme}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-retro-title leading-tight">
            {meta.title}
          </h1>
          <p className="text-base sm:text-lg font-handwritten font-bold text-amber-300">
            {meta.tagalogTitle}
          </p>
          <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed pt-1">
            {meta.description}
          </p>
        </div>
      </div>

      {/* Curatorial Note Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3">
        <BookOpen className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-mono-retro font-bold uppercase tracking-wider text-amber-900">
            Curatorial Field Note:
          </span>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
            {meta.curatorNote}
          </p>
        </div>
      </div>

      {/* Filter and Count Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-300 pb-3">
        <div className="text-xs font-mono-retro font-bold text-stone-700">
          Showing {filteredArtifacts.length} of {artifacts.length} Exhibits
        </div>

        {/* Filter by Era */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono-retro">
          <span className="text-stone-500 font-bold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Era:
          </span>
          {['all', 'Early 1990s', 'Mid-1990s', 'Late 1990s', 'Early 2000s'].map((era) => (
            <button
              key={era}
              onClick={() => setSelectedPeriod(era)}
              className={`px-2.5 py-1 rounded-lg border transition ${
                selectedPeriod === era
                  ? 'bg-amber-500 text-stone-950 border-amber-600 font-bold'
                  : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
              }`}
            >
              {era === 'all' ? 'All Eras' : era}
            </button>
          ))}
        </div>
      </div>

      {/* Artifacts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtifacts.map((art) => (
          <div
            key={art.id}
            onClick={() => onSelectArtifact(art)}
            className="group bg-white rounded-2xl border-2 border-stone-300 shadow-sm hover:shadow-md hover:border-amber-400 transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Artifact Image */}
            <div className="relative h-48 w-full overflow-hidden bg-stone-900 border-b border-stone-200">
              <img
                src={art.imageUrl}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-mono-retro font-bold px-2 py-0.5 rounded">
                {art.period}
              </div>
              <div className="absolute top-2 right-2 bg-amber-400 text-stone-950 text-[10px] font-mono-retro font-bold px-2 py-0.5 rounded shadow-xs">
                {art.badgeTag}
              </div>
            </div>

            {/* Artifact Meta */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-lg font-bold font-retro-title text-amber-950 group-hover:text-amber-700 transition-colors">
                  {art.title}
                </h3>
                <p className="text-xs font-handwritten font-bold text-amber-800">
                  {art.tagalogTitle}
                </p>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mt-2">
                  {art.description}
                </p>
              </div>

              {/* Inspect Button */}
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-mono-retro">
                <span className="text-amber-800 font-bold group-hover:underline">
                  Inspect Exhibit →
                </span>
                <span className="text-[10px] text-stone-400">
                  {art.interestingFacts.length} trivia items
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
