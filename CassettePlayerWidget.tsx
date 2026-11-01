import React, { useState } from 'react';
import { AUDIO_TRACKS } from '../data/museumData';
import { AudioTrack } from '../types/museum';
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  X,
  Disc3,
  SkipForward,
  SkipBack,
  Sliders,
} from 'lucide-react';

interface CassettePlayerWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  activeTrackId: string | null;
  onPlayTrack: (trackId: string) => void;
  onPauseTrack: () => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
}

export const CassettePlayerWidget: React.FC<CassettePlayerWidgetProps> = ({
  isOpen,
  onClose,
  isPlaying,
  activeTrackId,
  onPlayTrack,
  onPauseTrack,
  volume,
  onVolumeChange,
}) => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  if (!isOpen) return null;

  const currentTrack: AudioTrack =
    AUDIO_TRACKS.find((t) => t.id === activeTrackId) ||
    AUDIO_TRACKS[selectedTrackIndex];

  const handleNextTrack = () => {
    const nextIdx = (selectedTrackIndex + 1) % AUDIO_TRACKS.length;
    setSelectedTrackIndex(nextIdx);
    onPlayTrack(AUDIO_TRACKS[nextIdx].id);
  };

  const handlePrevTrack = () => {
    const prevIdx = (selectedTrackIndex - 1 + AUDIO_TRACKS.length) % AUDIO_TRACKS.length;
    setSelectedTrackIndex(prevIdx);
    onPlayTrack(AUDIO_TRACKS[prevIdx].id);
  };

  const togglePlay = () => {
    if (isPlaying) {
      onPauseTrack();
    } else {
      onPlayTrack(currentTrack.id);
    }
  };

  return (
    <div
      role="region"
      aria-label="Walkman Audio Player"
      className="fixed bottom-24 right-6 z-40 w-full max-w-[390px] bg-slate-900/95 border-2 border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl text-slate-100 p-4 flex flex-col gap-3 font-mono-retro animate-in slide-in-from-bottom-5 duration-200"
    >
      {/* Player Top Header: Walkman Branding & Close */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" />
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
            SONY WALKMAN WM-90
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
            AUTO REVERSE
          </span>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            aria-label="Close Walkman"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cassette Tape Window & Spinning Reels */}
      <div className="relative w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between overflow-hidden shadow-inner">
        {/* Cassette Label Header */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-1">
          <span className="text-amber-300 font-bold">SIDE A / OPM 90s</span>
          <span className="text-[10px] text-slate-400">TYPE I (NORMAL)</span>
        </div>

        {/* Dual Tape Spools with Animated Rotation */}
        <div className="flex items-center justify-around my-auto">
          {/* Left Spool */}
          <div className="relative w-14 h-14 rounded-full border-4 border-amber-600/70 bg-amber-950/30 flex items-center justify-center">
            <div
              className={`w-7 h-7 rounded-full border-2 border-white/60 bg-slate-900 flex items-center justify-center ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '2.5s' }}
            >
              {/* Spoke teeth */}
              <div className="w-1 h-6 bg-white/70 absolute" />
              <div className="w-6 h-1 bg-white/70 absolute" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950 z-10" />
            </div>
          </div>

          {/* Magnetic Tape Bridge Bar */}
          <div className="w-16 h-2 bg-amber-900/60 rounded-full border border-amber-700/40" />

          {/* Right Spool */}
          <div className="relative w-14 h-14 rounded-full border-4 border-amber-600/70 bg-amber-950/30 flex items-center justify-center">
            <div
              className={`w-7 h-7 rounded-full border-2 border-white/60 bg-slate-900 flex items-center justify-center ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '2.5s' }}
            >
              <div className="w-1 h-6 bg-white/70 absolute" />
              <div className="w-6 h-1 bg-white/70 absolute" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950 z-10" />
            </div>
          </div>
        </div>

        {/* Currently Playing Track Label */}
        <div className="text-center truncate text-[11px] font-bold text-emerald-400 bg-slate-900/90 py-0.5 px-2 rounded border border-slate-800">
          {isPlaying ? 'PLAYING: ' : 'STOPPED: '} {currentTrack.title}
        </div>
      </div>

      {/* Track Selector List */}
      <div className="flex flex-col gap-1 max-h-24 overflow-y-auto text-xs pr-1">
        {AUDIO_TRACKS.map((t, idx) => {
          const isActive = t.id === currentTrack.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTrackIndex(idx);
                onPlayTrack(t.id);
              }}
              className={`text-left p-1.5 rounded transition-colors flex items-center justify-between text-[11px] ${
                isActive
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 font-semibold'
                  : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="truncate pr-2">
                {idx + 1}. {t.title}
              </span>
              <span className="text-[10px] text-slate-400 shrink-0">{t.duration}</span>
            </button>
          );
        })}
      </div>

      {/* Tape Deck Mechanical Control Buttons */}
      <div className="grid grid-cols-4 gap-1.5 pt-1">
        <button
          onClick={handlePrevTrack}
          className="p-2 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 transition flex items-center justify-center border border-slate-700"
          title="Previous Track"
        >
          <SkipBack className="w-4 h-4 text-slate-300" />
        </button>

        <button
          onClick={togglePlay}
          className={`p-2 text-xs rounded-lg font-bold active:scale-95 transition flex items-center justify-center border ${
            isPlaying
              ? 'bg-amber-500 text-slate-950 border-amber-400'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
          }`}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={onPauseTrack}
          className="p-2 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 transition flex items-center justify-center border border-slate-700"
          title="Stop Tape"
        >
          <Square className="w-4 h-4 text-slate-300" />
        </button>

        <button
          onClick={handleNextTrack}
          className="p-2 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 transition flex items-center justify-center border border-slate-700"
          title="Next Track"
        >
          <SkipForward className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      {/* Volume Slider & Analog VU Meter */}
      <div className="flex items-center gap-3 pt-1 text-xs text-slate-400">
        <button
          onClick={() => onVolumeChange(volume === 0 ? 0.7 : 0)}
          className="hover:text-white"
        >
          {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="flex-1 accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
        />
        <span className="text-[10px] font-mono w-8 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
};
