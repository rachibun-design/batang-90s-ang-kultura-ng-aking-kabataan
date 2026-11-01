import React, { useState } from 'react';
import { X, Minus, Square, Send, Volume2 } from 'lucide-react';
import { retroAudio } from '../audio/retroAudioEngine';

interface RetroDesktopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RetroDesktopModal: React.FC<RetroDesktopModalProps> = ({ isOpen, onClose }) => {
  const [activeWindow, setActiveWindow] = useState<'mirc' | 'dialup' | 'slambook' | 'minesweeper' | null>('mirc');
  const [dialupState, setDialupState] = useState<'idle' | 'dialing' | 'connected'>('idle');
  const [mircMessages, setMircMessages] = useState<string[]>([
    '*** Now talking in #philippines (Topic: Welcome Batang 90s! Respect Ops)',
    '<bagets_95> a/s/l pls?',
    '<alapaap_fan> 16/m/qc here. Who is an Eraserheads fan here?',
    '<netopia_boy> severe lag in Counter-Strike earlier haha',
    '<sweet_candy> f/15/cebu! Who is still awake?',
  ]);
  const [mircInput, setMircInput] = useState('');

  if (!isOpen) return null;

  const handleStartDialup = () => {
    setDialupState('dialing');
    retroAudio.playTrack('track-dialup-modem', () => {
      setDialupState('connected');
    });
  };

  const handleSendMirc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mircInput.trim()) return;
    setMircMessages((prev) => [...prev, `<GuestUser> ${mircInput.trim()}`]);
    setMircInput('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-4xl h-[88vh] bg-[#008080] border-4 border-stone-300 rounded-lg shadow-2xl flex flex-col justify-between overflow-hidden font-mono-retro text-stone-900 select-none">
        {/* Desktop Canvas */}
        <div className="relative flex-1 p-4 grid grid-cols-1 auto-rows-min gap-4 overflow-hidden">
          {/* Top Desktop Close Button */}
          <div className="absolute top-2 right-2 z-30">
            <button
              onClick={onClose}
              className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded border border-rose-300 shadow-sm flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Exit Desktop</span>
            </button>
          </div>

          {/* Desktop Icons Column */}
          <div className="w-24 flex flex-col gap-5 z-10">
            <button
              onClick={() => setActiveWindow('mirc')}
              className="flex flex-col items-center gap-1 p-1 hover:bg-white/20 rounded text-center group cursor-pointer"
            >
              <div className="w-10 h-10 bg-amber-200 border-2 border-stone-800 rounded flex items-center justify-center text-lg shadow-sm">
                💬
              </div>
              <span className="text-[11px] text-white font-bold leading-tight drop-shadow-md">
                mIRC 32-bit
              </span>
            </button>

            <button
              onClick={() => setActiveWindow('dialup')}
              className="flex flex-col items-center gap-1 p-1 hover:bg-white/20 rounded text-center group cursor-pointer"
            >
              <div className="w-10 h-10 bg-sky-200 border-2 border-stone-800 rounded flex items-center justify-center text-lg shadow-sm">
                🌐
              </div>
              <span className="text-[11px] text-white font-bold leading-tight drop-shadow-md">
                56k Dial-Up
              </span>
            </button>

            <button
              onClick={() => setActiveWindow('slambook')}
              className="flex flex-col items-center gap-1 p-1 hover:bg-white/20 rounded text-center group cursor-pointer"
            >
              <div className="w-10 h-10 bg-pink-200 border-2 border-stone-800 rounded flex items-center justify-center text-lg shadow-sm">
                📝
              </div>
              <span className="text-[11px] text-white font-bold leading-tight drop-shadow-md">
                SlamBook.txt
              </span>
            </button>
          </div>

          {/* Floating Window: mIRC */}
          {activeWindow === 'mirc' && (
            <div className="absolute top-8 left-28 right-4 bottom-14 sm:right-12 sm:bottom-16 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-stone-700 border-b-stone-700 shadow-2xl flex flex-col z-20">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-2 py-1 flex items-center justify-between text-xs font-bold">
                <span className="truncate">mIRC - [#philippines on Dalnet]</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setActiveWindow(null)} className="px-1.5 py-0.5 bg-stone-300 text-black border border-stone-500 font-bold hover:bg-stone-200">
                    ✕
                  </button>
                </div>
              </div>

              {/* Chat Viewport */}
              <div className="flex-1 bg-black p-3 text-xs overflow-y-auto text-emerald-400 font-mono space-y-1">
                {mircMessages.map((msg, i) => (
                  <div key={i} className={msg.startsWith('***') ? 'text-amber-400 font-bold' : ''}>
                    {msg}
                  </div>
                ))}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSendMirc} className="p-2 bg-stone-300 border-t border-stone-400 flex items-center gap-2">
                <input
                  type="text"
                  value={mircInput}
                  onChange={(e) => setMircInput(e.target.value)}
                  placeholder="Type message and press enter (e.g. asl pls?)..."
                  className="flex-1 text-xs bg-white border border-stone-600 px-2 py-1 font-mono text-black focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-stone-300 border-2 border-t-white border-l-white border-r-stone-700 border-b-stone-700 text-xs font-bold active:translate-y-0.5"
                >
                  Send
                </button>
              </form>
            </div>
          )}

          {/* Floating Window: Dial-Up Connect */}
          {activeWindow === 'dialup' && (
            <div className="absolute top-16 left-32 w-80 sm:w-96 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-stone-700 border-b-stone-700 shadow-2xl p-3 z-20 space-y-3">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-2 py-0.5 flex items-center justify-between text-xs font-bold -m-3 mb-3">
                <span>Connect Mozcom ISP (56k V.90)</span>
                <button onClick={() => setActiveWindow(null)} className="px-1 text-black bg-stone-300">✕</button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>User Name:</span>
                  <span className="font-bold">batang90s@mozcom.com</span>
                </div>
                <div className="flex justify-between">
                  <span>Dial Number:</span>
                  <span className="font-bold">890-4195</span>
                </div>
                <div className="p-2 bg-white border border-stone-500 font-mono text-[11px] text-stone-800">
                  Status:{' '}
                  {dialupState === 'idle' && 'Disconnected. Click Dial to connect.'}
                  {dialupState === 'dialing' && 'Connecting... Authenticating handshake tones.'}
                  {dialupState === 'connected' && 'Connected at 56,600 bps! Cyberspace unlocked.'}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-400">
                <button
                  onClick={handleStartDialup}
                  className="px-4 py-1 bg-stone-300 border-2 border-t-white border-l-white border-r-stone-700 border-b-stone-700 text-xs font-bold active:translate-y-0.5 flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{dialupState === 'dialing' ? 'Dialing...' : 'Dial Connect'}</span>
                </button>
                <button
                  onClick={() => {
                    retroAudio.stop();
                    setDialupState('idle');
                  }}
                  className="px-3 py-1 bg-stone-300 border-2 border-t-white border-l-white border-r-stone-700 border-b-stone-700 text-xs font-bold"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}

          {/* Floating Window: SlamBook */}
          {activeWindow === 'slambook' && (
            <div className="absolute top-12 left-28 right-6 bottom-16 bg-[#fffdf0] border-2 border-t-white border-l-white border-r-stone-700 border-b-stone-700 shadow-2xl p-4 z-20 flex flex-col font-handwritten">
              <div className="bg-gradient-to-r from-pink-800 to-rose-700 text-white px-2 py-0.5 flex items-center justify-between text-xs font-bold font-mono -m-4 mb-3">
                <span>Notepad - My 90s SlamBook.txt</span>
                <button onClick={() => setActiveWindow(null)} className="px-1 text-black bg-stone-300">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 text-base text-stone-800 leading-snug">
                <h4 className="text-xl font-bold text-rose-800">★ 1996 OFFICIAL CLASSROOM SLAMBOOK ★</h4>
                <p>1. Name / Nickname: <u>Mark / Mac-Mac</u></p>
                <p>2. Age / Birthday: <u>14 / October 12</u></p>
                <p>3. Favorite Subject: <u>Recess & Computer Lab</u></p>
                <p>4. Favorite Band: <u>Eraserheads & Rivermaya</u></p>
                <p>5. Secret Crush: <u>Initials only: "C.B." (from Section A)</u></p>
                <p>6. Motto in Life: <u>"Time is gold, do not waste it on homework."</u></p>
                <p>7. Dedication to owner: <u>"Keep up the good work! Don't forget me when you are famous. Friends 4ever!"</u></p>
              </div>
            </div>
          )}
        </div>

        {/* Windows Taskbar */}
        <div className="h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center justify-between px-2 text-xs font-bold z-30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveWindow(activeWindow ? null : 'mirc')}
              className="px-3 py-1 bg-stone-300 border-2 border-t-white border-l-white border-r-stone-700 border-b-stone-700 flex items-center gap-1.5 active:translate-y-0.5"
            >
              <span className="text-sm">🪟</span>
              <span>Start</span>
            </button>
            <div className="h-6 w-0.5 bg-stone-400" />
            <span className="text-stone-600 hidden sm:inline text-[11px]">
              Batang 90s Y2K Edition
            </span>
          </div>

          <div className="flex items-center gap-2 border-2 border-t-stone-700 border-l-stone-700 border-r-white border-b-white px-3 py-0.5 bg-stone-200 text-[11px]">
            <span>🔊</span>
            <span>12:00 AM (Y2K)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
