import React from 'react';
import { GALLERIES_META, ALL_ARTIFACTS } from '../data/museumData';
import { GalleryId } from '../types/museum';
import { ArrowRight, BookOpen } from 'lucide-react';

interface GalleriesSectionProps {
  onSelectGallery: (galleryId: GalleryId) => void;
}

export const GalleriesSection: React.FC<GalleriesSectionProps> = ({ onSelectGallery }) => {
  const galleries = Object.values(GALLERIES_META);

  return (
    <section id="galleries" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-stone-300 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-retro font-bold text-amber-800 uppercase tracking-widest mb-1">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>The Six Curated Exhibition Wings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-retro-title text-amber-950">
            Museum Collections & Galleries
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans mt-1 max-w-2xl">
            Explore every facet of Filipino childhood—from the warm concrete of neighborhood streets to the air-conditioned glow of early computer shops.
          </p>
        </div>

        <div className="text-xs font-mono-retro text-stone-500">
          6 Dedicated Wings · Fully Documented
        </div>
      </div>

      {/* Galleries Grid (6 Rich Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((gallery) => {
          const artifactsInGallery = ALL_ARTIFACTS.filter((a) => a.galleryId === gallery.id);

          return (
            <div
              key={gallery.id}
              className="group relative bg-white rounded-2xl border-2 border-stone-300 shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              {/* Top Accent Strip */}
              <div className={`p-1.5 px-4 flex items-center justify-between text-[11px] font-mono-retro font-bold border-b border-stone-200 ${gallery.badgeColor}`}>
                <span>GALLERY {gallery.number}</span>
                <span>{artifactsInGallery.length} Exhibits</span>
              </div>

              {/* Gallery Image */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-900 border-b border-stone-200">
                <img
                  src={gallery.heroImage}
                  alt={gallery.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-bold font-retro-title text-white tracking-wide">
                    {gallery.title}
                  </h3>
                  <p className="text-xs font-handwritten font-bold text-amber-300 tracking-wide">
                    {gallery.tagalogTitle}
                  </p>
                </div>
              </div>

              {/* Body Copy */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono-retro uppercase tracking-wider text-amber-800 font-bold block">
                    {gallery.theme}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {gallery.description}
                  </p>
                </div>

                {/* Sample Exhibits Chip Bar */}
                <div className="pt-2 border-t border-stone-200">
                  <span className="text-[10px] font-mono-retro text-stone-600 uppercase tracking-wider block mb-1.5 font-semibold">
                    Featured Artifacts:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {artifactsInGallery.slice(0, 3).map((art) => (
                      <span
                        key={art.id}
                        className="text-[10px] font-mono-retro bg-stone-100 text-stone-800 px-2 py-0.5 rounded border border-stone-200"
                      >
                        {art.title.split('(')[0].trim()}
                      </span>
                    ))}
                    {artifactsInGallery.length > 3 && (
                      <span className="text-[10px] font-mono-retro text-stone-600 px-1 py-0.5">
                        +{artifactsInGallery.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Explore Button */}
                <button
                  onClick={() => onSelectGallery(gallery.id)}
                  className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 active:scale-98 text-stone-950 font-bold rounded-xl text-xs font-mono-retro transition flex items-center justify-center gap-2 border border-amber-500 shadow-xs"
                >
                  <span>EXPLORE GALLERY {gallery.number}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
