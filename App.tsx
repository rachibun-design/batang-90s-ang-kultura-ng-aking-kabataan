import React, { useState, useEffect, useCallback } from 'react';
import { GalleryId, Artifact } from './types/museum';
import { ALL_ARTIFACTS, GALLERIES_META } from './data/museumData';
import { RetroHeader } from './components/RetroHeader';
import { HeroSection } from './components/HeroSection';
import { GalleriesSection } from './components/GalleriesSection';
import { GalleryView } from './components/GalleryView';
import { ArtifactDetailModal } from './components/ArtifactDetailModal';
import { NaalalaMoBaModal } from './components/NaalalaMoBaModal';
import { MemoryWallSection } from './components/MemoryWallSection';
import { NostalgiaQuizModal } from './components/NostalgiaQuizModal';
import { TimeCapsuleModal } from './components/TimeCapsuleModal';
import { AboutMuseumModal } from './components/AboutMuseumModal';
import { RetroDesktopModal } from './components/RetroDesktopModal';
import { CassettePlayerWidget } from './components/CassettePlayerWidget';
import { SearchResultsView } from './components/SearchResultsView';
import { retroAudio } from './audio/retroAudioEngine';
import { Sparkles, Heart, HelpCircle, ArrowRight, Disc3 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'gallery' | 'memories' | 'search'>('home');
  const [selectedGalleryId, setSelectedGalleryId] = useState<GalleryId>('larong-kalye');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isRandomModalOpen, setIsRandomModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isTimeCapsuleOpen, setIsTimeCapsuleOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);

  // Audio & Atmosphere state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<string | null>('track-opm-rock');
  const [audioVolume, setAudioVolume] = useState(0.7);
  const [isCrtActive, setIsCrtActive] = useState(false);

  // Audio Handlers
  const handlePlayTrack = useCallback((trackId: string) => {
    setActiveTrackId(trackId);
    setIsAudioPlaying(true);
    retroAudio.playTrack(trackId, () => {
      setIsAudioPlaying(false);
    });
  }, []);

  const handlePauseTrack = useCallback(() => {
    retroAudio.stop();
    setIsAudioPlaying(false);
  }, []);

  const handleVolumeChange = useCallback((vol: number) => {
    setAudioVolume(vol);
    retroAudio.setVolume(vol);
  }, []);

  // Navigation Handlers
  const handleSelectGallery = (gId: GalleryId) => {
    setSelectedGalleryId(gId);
    setCurrentView('gallery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setCurrentView('search');
    } else if (currentView === 'search') {
      setCurrentView('home');
    }
  };

  const handleSelectArtifact = (art: Artifact) => {
    setSelectedArtifact(art);
    retroAudio.playFloppySnap();
  };

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Escape') {
        setSelectedArtifact(null);
        setIsRandomModalOpen(false);
        setIsQuizModalOpen(false);
        setIsTimeCapsuleOpen(false);
        setIsAboutModalOpen(false);
        setIsDesktopModalOpen(false);
        setIsAudioOpen(false);
      } else if (e.key.toLowerCase() === 'c') {
        setIsCrtActive((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen paper-pattern text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-950 ${isCrtActive ? 'crt-overlay' : ''}`}>
      {/* Navigation Header */}
      <RetroHeader
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view as any);
          if (view === 'home') setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectGallery={handleSelectGallery}
        onOpenRandomMemory={() => setIsRandomModalOpen(true)}
        onOpenQuiz={() => setIsQuizModalOpen(true)}
        onOpenTimeCapsule={() => setIsTimeCapsuleOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onOpenDesktop={() => setIsDesktopModalOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={() => setIsAudioOpen((prev) => !prev)}
        isCrtActive={isCrtActive}
        onToggleCrt={() => setIsCrtActive((prev) => !prev)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Main Content Router */}
      <main className="pb-20">
        {currentView === 'home' && (
          <>
            {/* Hero Section with Official Branding & Manifesto */}
            <HeroSection
              onExplore={() => {
                const el = document.getElementById('galleries');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenRandomMemory={() => setIsRandomModalOpen(true)}
              onOpenQuiz={() => setIsQuizModalOpen(true)}
              onSelectArtifact={handleSelectArtifact}
              onToggleAudio={() => setIsAudioOpen(true)}
              isAudioPlaying={isAudioPlaying}
            />

            {/* The 6 Exhibition Galleries Section */}
            <GalleriesSection onSelectGallery={handleSelectGallery} />

            {/* Featured Artifacts Spotlight Carousel/Grid */}
            <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-stone-300 pb-3">
                <div>
                  <span className="text-xs font-mono-retro font-bold text-amber-800 uppercase tracking-widest">
                    Visitor Favorites & Highlights
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-retro-title text-amber-950">
                    Featured Artifacts of Filipino Childhood
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedGalleryId('larong-kalye');
                    setCurrentView('gallery');
                  }}
                  className="text-xs font-mono-retro font-bold text-amber-800 hover:text-amber-600 flex items-center gap-1"
                >
                  <span>View All 25+ Exhibits</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {ALL_ARTIFACTS.slice(0, 4).map((art) => (
                  <div
                    key={art.id}
                    onClick={() => handleSelectArtifact(art)}
                    className="group bg-white rounded-2xl border-2 border-stone-300 p-3 shadow-xs hover:shadow-md hover:border-amber-400 transition cursor-pointer flex flex-col justify-between space-y-3"
                  >
                    <div className="relative h-44 w-full rounded-xl overflow-hidden bg-stone-900 border border-stone-200">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-stone-900/80 text-white text-[10px] font-mono-retro font-bold px-2 py-0.5 rounded">
                        {art.period}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold font-retro-title text-amber-950 group-hover:text-amber-700 transition-colors">
                        {art.title}
                      </h4>
                      <p className="text-xs font-handwritten font-bold text-amber-800 truncate">
                        {art.tagalogTitle}
                      </p>
                      <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                        {art.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono-retro">
                      <span className="text-amber-800 font-bold group-hover:underline">
                        Inspect Exhibit →
                      </span>
                      <span className="text-stone-400 text-[10px]">{art.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Interactive Community Memory Wall Section */}
            <MemoryWallSection />
          </>
        )}

        {currentView === 'gallery' && (
          <GalleryView
            galleryId={selectedGalleryId}
            onBack={() => setCurrentView('home')}
            onSelectArtifact={handleSelectArtifact}
            onSwitchGallery={(gId) => setSelectedGalleryId(gId)}
          />
        )}

        {currentView === 'memories' && <MemoryWallSection />}

        {currentView === 'search' && (
          <SearchResultsView
            query={searchQuery}
            onClearQuery={() => {
              setSearchQuery('');
              setCurrentView('home');
            }}
            onSelectArtifact={handleSelectArtifact}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 px-4 sm:px-6 border-t-4 border-amber-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-retro-title text-amber-400">
                BATANG 90s
              </span>
              <span className="text-xs font-mono-retro bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                1990s — Early 2000s
              </span>
            </div>
            <p className="text-sm font-handwritten font-bold text-amber-200">
              Ang Kultura ng Aking Kabataan
            </p>
            <p className="text-xs text-stone-400 max-w-md leading-relaxed font-sans">
              An interactive digital cultural journey documenting the everyday life, toys, street games, entertainment, and traditions of Filipino youth from the 1990s through the early 2000s.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs font-mono-retro">
            <h5 className="font-bold text-amber-300 uppercase tracking-wider">
              Exhibition Galleries
            </h5>
            <ul className="space-y-1 text-stone-400">
              <li>
                <button onClick={() => handleSelectGallery('larong-kalye')} className="hover:text-amber-200">
                  01. Larong Kalye (Street Games)
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectGallery('buhay-eskwela')} className="hover:text-amber-200">
                  02. Buhay Eskwela (School Life)
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectGallery('telebisyon-aliwan')} className="hover:text-amber-200">
                  03. Telebisyon at Aliwan (TV & Media)
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectGallery('tindahan-pagkain')} className="hover:text-amber-200">
                  04. Tindahan at Pagkain (Sari-Sari Snacks)
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectGallery('y2k-era')} className="hover:text-amber-200">
                  05. Welcome to Y2K (Cyber Age)
                </button>
              </li>
              <li>
                <button onClick={() => handleSelectGallery('araw-araw-90s')} className="hover:text-amber-200">
                  06. Araw-Araw noong 90s (Everyday Life)
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs font-mono-retro">
            <h5 className="font-bold text-amber-300 uppercase tracking-wider">
              Interactive Experiences
            </h5>
            <ul className="space-y-1 text-stone-400">
              <li>
                <button onClick={() => setIsRandomModalOpen(true)} className="hover:text-amber-200">
                  ✨ Memory Flashback (Naalala Mo Ba?)
                </button>
              </li>
              <li>
                <button onClick={() => setIsQuizModalOpen(true)} className="hover:text-amber-200">
                  🎯 Nostalgia Quiz
                </button>
              </li>
              <li>
                <button onClick={() => setIsTimeCapsuleOpen(true)} className="hover:text-amber-200">
                  ⏳ Digital Time Capsule
                </button>
              </li>
              <li>
                <button onClick={() => setIsDesktopModalOpen(true)} className="hover:text-amber-200">
                  🖥️ Y2K Windows Desktop
                </button>
              </li>
              <li>
                <button onClick={() => setIsAboutModalOpen(true)} className="hover:text-amber-200">
                  📖 About the Museum
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-retro text-stone-500 gap-2">
          <span>Curated with Pinoy Pride · Open Cultural Archive Initiative</span>
          <span>Deployable anywhere via GitHub Pages · Pure Static Architecture</span>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Artifact Detail View Modal */}
      <ArtifactDetailModal
        artifact={selectedArtifact}
        onClose={() => setSelectedArtifact(null)}
        onSelectArtifact={handleSelectArtifact}
      />

      {/* 2. Naalala Mo Ba? Modal */}
      <NaalalaMoBaModal
        isOpen={isRandomModalOpen}
        onClose={() => setIsRandomModalOpen(false)}
        onSelectArtifact={handleSelectArtifact}
      />

      {/* 3. Nostalgia Quiz Modal */}
      <NostalgiaQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />

      {/* 4. Digital Time Capsule Modal */}
      <TimeCapsuleModal
        isOpen={isTimeCapsuleOpen}
        onClose={() => setIsTimeCapsuleOpen(false)}
      />

      {/* 5. About the Museum Modal */}
      <AboutMuseumModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* 6. Y2K Windows 98 Retro Desktop Modal */}
      <RetroDesktopModal
        isOpen={isDesktopModalOpen}
        onClose={() => setIsDesktopModalOpen(false)}
      />

      {/* 7. Walkman Cassette Player Widget */}
      <CassettePlayerWidget
        isOpen={isAudioOpen}
        onClose={() => setIsAudioOpen(false)}
        isPlaying={isAudioPlaying}
        activeTrackId={activeTrackId}
        onPlayTrack={handlePlayTrack}
        onPauseTrack={handlePauseTrack}
        volume={audioVolume}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
}
