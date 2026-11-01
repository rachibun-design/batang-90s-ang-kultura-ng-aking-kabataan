import React, { useState } from 'react';
import { ALL_ARTIFACTS, GALLERIES_META } from '../data/museumData';
import { Artifact, GalleryId } from '../types/museum';
import { Search, Filter, X, ArrowRight } from 'lucide-react';

interface SearchResultsViewProps {
  query: string;
  onClearQuery: () => void;
  onSelectArtifact: (art: Artifact) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  query,
  onClearQuery,
  onSelectArtifact,
}) => {
  const [selectedGallery, setSelectedGallery] = useState<string>('all');
  const [selectedEra, setSelectedEra] = useState<string>('all');

  const normalizedQuery = query.toLowerCase().trim();

  const results = ALL_ARTIFACTS.filter((art) => {
    const matchesQuery =
      !normalizedQuery ||
      art.title.toLowerCase().includes(normalizedQuery) ||
      art.tagalogTitle.toLowerCase().includes(normalizedQuery) ||
      art.description.toLowerCase().includes(normalizedQuery) ||
      art.culturalBackground.toLowerCase().includes(normalizedQuery) ||
      art.category.toLowerCase().includes(normalizedQuery);

    const matchesGallery = selectedGallery === 'all' || art.galleryId === selectedGallery;
    const matchesEra = selectedEra === 'all' || art.period === selectedEra;

    return matchesQuery && matchesGallery && matchesEra;
  });

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-stone-300 pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-retro-title text-amber-950 flex items-center gap-2">
            <Search className="w-6 h-6 text-amber-600" />
            <span>Search Results & Museum Archives</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono-retro mt-1">
            {query ? `Searching for: "${query}"` : 'Browsing all museum artifacts'} · Found {results.length} matches
          </p>
        </div>

        {query && (
          <button
            onClick={onClearQuery}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-retro font-bold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Search</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-2xl border border-stone-300 text-xs font-mono-retro">
        <span className="font-bold text-stone-500 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>

        {/* Gallery Dropdown */}
        <select
          value={selectedGallery}
          onChange={(e) => setSelectedGallery(e.target.value)}
          className="bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1 text-stone-800"
        >
          <option value="all">All Galleries</option>
          {Object.values(GALLERIES_META).map((g) => (
            <option key={g.id} value={g.id}>
              {g.number}. {g.title}
            </option>
          ))}
        </select>

        {/* Era Dropdown */}
        <select
          value={selectedEra}
          onChange={(e) => setSelectedEra(e.target.value)}
          className="bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1 text-stone-800"
        >
          <option value="all">All Eras</option>
          <option value="Early 1990s">Early 1990s</option>
          <option value="Mid-1990s">Mid-1990s</option>
          <option value="Late 1990s">Late 1990s</option>
          <option value="Early 2000s">Early 2000s</option>
          <option value="Y2K Era">Y2K Era</option>
        </select>
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArtifact(art)}
              className="bg-white rounded-2xl border-2 border-stone-300 shadow-sm hover:shadow-md hover:border-amber-400 transition cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-44 w-full overflow-hidden bg-stone-900">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 left-2 bg-stone-900/80 text-white text-[10px] font-mono-retro px-2 py-0.5 rounded font-bold">
                  {art.period}
                </div>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold font-retro-title text-amber-950">
                    {art.title}
                  </h3>
                  <p className="text-xs font-handwritten font-bold text-amber-800">
                    {art.tagalogTitle}
                  </p>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                    {art.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs font-mono-retro">
                  <span className="text-amber-800 font-bold">Inspect Exhibit →</span>
                  <span className="text-stone-400 text-[10px]">{art.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-300 p-6 space-y-3">
          <p className="text-2xl">🔍</p>
          <h3 className="text-lg font-bold font-retro-title text-amber-950">
            No Artifacts Found
          </h3>
          <p className="text-xs text-stone-600">
            Try searching for other keywords like "teks", "nokia", "candy", or "anime".
          </p>
          <button
            onClick={onClearQuery}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono-retro font-bold text-xs rounded-xl transition"
          >
            Show All Exhibits
          </button>
        </div>
      )}
    </div>
  );
};
