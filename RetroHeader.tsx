import React, { useState } from 'react';
import { GalleryId } from '../types/museum';
import {
  Sparkles,
  Tv,
  Disc3,
  Calendar,
  HelpCircle,
  Heart,
  Search,
  Menu,
  X,
} from 'lucide-react';

interface RetroHeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onSelectGallery: (galleryId: GalleryId) => void;
  onOpenRandomMemory: () => void;
  onOpenQuiz: () => void;
  onOpenTimeCapsule: () => void;
  onOpenAbout: () => void;
  onOpenDesktop: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  isCrtActive: boolean;
  onToggleCrt: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const RetroHeader: React.FC<RetroHeaderProps> = ({
  currentView,
  onNavigate,
  onSelectGallery,
  onOpenRandomMemory,
  onOpenQuiz,
  onOpenTimeCapsule,
  onOpenAbout,
  onOpenDesktop,
  isAudioPlaying,
  onToggleAudio,
  isCrtActive,
  onToggleCrt,
  searchQuery,
  onSearchChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGalleriesDropdownOpen, setIsGalleriesDropdownOpen] = useState(false);

  const galleriesList: { id: GalleryId; name: string }[] = [
    { id: 'larong-kalye', name: '01. Street Games (Larong Kalye)' },
    { id: 'buhay-eskwela', name: '02. School Days (Buhay Eskwela)' },
    { id: 'telebisyon-aliwan', name: '03. Television & Media (Telebisyon)' },
    { id: 'tindahan-pagkain', name: '04. Snacks & Stores (Tindahan)' },
    { id: 'y2k-era', name: '05. Welcome to the Y2K Era' },
    { id: 'araw-araw-90s', name: '06. Everyday 90s Life (Araw-Araw)' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7EE]/95 border-b-2 border-stone-300 shadow-sm backdrop-blur-md">
      {/* Top Notice / Ribbon */}
      <div className="bg-amber-400 text-stone-900 text-xs py-1 px-4 text-center font-medium font-mono-retro border-b border-amber-500/30 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-stone-900" />
        <span>The Official Digital Cultural Archive of Filipino Childhood (1990s — Early 2000s)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Lockup: Kept strictly as specified */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="text-left group transition-transform active:scale-95"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold font-retro-title tracking-tight text-amber-950 group-hover:text-amber-800 transition-colors">
                BATANG 90s
              </span>
              <span className="text-[10px] font-mono-retro bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded border border-amber-300">
                1990–2000s
              </span>
            </div>
            <p className="text-[11px] font-handwritten text-stone-700 tracking-wide -mt-0.5 font-bold">
              Ang Kultura ng Aking Kabataan
            </p>
          </button>
        </div>

        {/* Primary Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-stone-700">
          <button
            onClick={() => onNavigate('home')}
            className={`hover:text-amber-900 transition-colors ${
              currentView === 'home' ? 'text-amber-900 font-bold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Home
          </button>

          {/* Galleries Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setIsGalleriesDropdownOpen(!isGalleriesDropdownOpen)}
              onMouseEnter={() => setIsGalleriesDropdownOpen(true)}
              className="flex items-center gap-1 hover:text-amber-900 transition-colors py-1"
            >
              <span>Exhibition Galleries</span>
              <span className="text-[10px]">▼</span>
            </button>

            {isGalleriesDropdownOpen && (
              <div
                onMouseLeave={() => setIsGalleriesDropdownOpen(false)}
                className="absolute top-full left-0 w-64 bg-white border-2 border-stone-300 rounded-xl shadow-xl p-2 z-50 flex flex-col gap-1 text-xs font-medium animate-in fade-in duration-150"
              >
                {galleriesList.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      onSelectGallery(g.id);
                      setIsGalleriesDropdownOpen(false);
                    }}
                    className="text-left px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-amber-900 transition-colors text-stone-700"
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenTimeCapsule}
            className="hover:text-amber-900 transition-colors flex items-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5 text-stone-500" />
            <span>Time Capsule</span>
          </button>

          <button
            onClick={onOpenRandomMemory}
            className="hover:text-amber-900 transition-colors flex items-center gap-1 text-rose-700 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Naalala Mo Ba?</span>
          </button>

          <button
            onClick={() => onNavigate('memories')}
            className="hover:text-amber-900 transition-colors flex items-center gap-1"
          >
            <Heart className="w-3.5 h-3.5 text-stone-500" />
            <span>Memory Wall</span>
          </button>

          <button
            onClick={onOpenQuiz}
            className="hover:text-amber-900 transition-colors flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-900 px-2.5 py-1 rounded-md border border-amber-300"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>90s Quiz</span>
          </button>

          <button
            onClick={onOpenAbout}
            className="hover:text-amber-900 transition-colors text-xs text-stone-600"
          >
            About the Museum
          </button>
        </nav>

        {/* Right Quick Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Search Input */}
          <div className="relative hidden md:block w-36 lg:w-44">
            <input
              type="text"
              placeholder="Search artifacts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full text-xs bg-white border border-stone-300 rounded-lg pl-7 pr-2.5 py-1.5 focus:outline-none focus:border-amber-500 text-stone-800 placeholder-stone-400 font-mono-retro"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2 top-2" />
          </div>

          {/* Retro Y2K Desktop Mode Button */}
          <button
            onClick={onOpenDesktop}
            title="Open Y2K Windows Desktop Experience"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono-retro font-bold bg-teal-100 text-teal-900 hover:bg-teal-200 border border-teal-300 rounded-lg transition-colors shadow-xs"
          >
            <span>🖥️</span>
            <span className="hidden xl:inline">Win98 Y2K</span>
          </button>

          {/* Walkman Cassette Toggle */}
          <button
            onClick={onToggleAudio}
            className={`px-2.5 py-1.5 text-xs font-mono-retro rounded-lg border transition-colors flex items-center gap-1.5 ${
              isAudioPlaying
                ? 'bg-amber-500 text-stone-950 border-amber-600 font-bold shadow-xs'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
            title="Retro Walkman Audio Synthesizer"
          >
            <Disc3 className={`w-3.5 h-3.5 ${isAudioPlaying ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isAudioPlaying ? 'Playing' : 'Walkman'}</span>
          </button>

          {/* CRT Scanline Filter Toggle */}
          <button
            onClick={onToggleCrt}
            className={`p-1.5 text-xs rounded-lg border transition-colors ${
              isCrtActive
                ? 'bg-stone-900 text-amber-300 border-stone-700'
                : 'bg-white text-stone-500 border-stone-300 hover:bg-stone-50'
            }`}
            title={isCrtActive ? 'Disable CRT Scanline Filter' : 'Enable CRT Scanline Filter'}
          >
            <Tv className="w-4 h-4" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-stone-700 hover:text-stone-900 bg-white border border-stone-300 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7EE] border-b-2 border-stone-300 p-4 space-y-3 font-medium text-sm text-stone-800 animate-in slide-in-from-top-2">
          <input
            type="text"
            placeholder="Search artifacts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full text-xs bg-white border border-stone-300 rounded-lg px-3 py-2 text-stone-800 mb-2"
          />
          <div className="grid grid-cols-2 gap-2 text-xs font-mono-retro">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="text-left p-2 rounded bg-white border border-stone-200"
            >
              🏠 Home
            </button>
            <button
              onClick={() => {
                onOpenRandomMemory();
                setIsMobileMenuOpen(false);
              }}
              className="text-left p-2 rounded bg-rose-50 text-rose-800 border border-rose-200 font-bold"
            >
              ✨ Naalala Mo Ba?
            </button>
            <button
              onClick={() => {
                onNavigate('memories');
                setIsMobileMenuOpen(false);
              }}
              className="text-left p-2 rounded bg-white border border-stone-200"
            >
              💌 Memory Wall
            </button>
            <button
              onClick={() => {
                onOpenQuiz();
                setIsMobileMenuOpen(false);
              }}
              className="text-left p-2 rounded bg-amber-50 text-amber-900 border border-amber-200 font-bold"
            >
              🎯 90s Quiz
            </button>
            <button
              onClick={() => {
                onOpenTimeCapsule();
                setIsMobileMenuOpen(false);
              }}
              className="text-left p-2 rounded bg-white border border-stone-200"
            >
              ⏳ Time Capsule
            </button>
            <button
              onClick={() => {
                onOpenDesktop();
                setIsMobileMenuOpen(false);
              }}
              className="text-left p-2 rounded bg-teal-50 text-teal-900 border border-teal-200 font-bold"
            >
              🖥️ Y2K Desktop
            </button>
          </div>

          <div className="pt-2 border-t border-stone-300">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 font-mono-retro">
              Exhibition Galleries:
            </p>
            <div className="grid grid-cols-1 gap-1 text-xs">
              {galleriesList.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    onSelectGallery(g.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-1 px-2 rounded hover:bg-amber-100 text-stone-700"
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
