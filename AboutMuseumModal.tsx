import React from 'react';
import { X, BookOpen, Heart, Sparkles, ShieldCheck, Compass } from 'lucide-react';

interface AboutMuseumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutMuseumModal: React.FC<AboutMuseumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#FAF7EE] border-2 border-stone-400 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-stone-300 bg-white/90">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-retro font-bold text-amber-800 uppercase tracking-widest mb-0.5">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Curatorial Statement & Museum Identity</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-retro-title text-amber-950">
              About BATANG 90s
            </h3>
            <p className="text-xs font-handwritten font-bold text-amber-800">
              Ang Kultura ng Aking Kabataan (1990s — Early 2000s)
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
          <section className="space-y-2">
            <h4 className="text-sm font-bold font-retro-title text-amber-950">
              1. Museum Mission & Cultural Archive
            </h4>
            <p>
              <strong>BATANG 90s</strong> is not a traditional institutional archive; it is an open, participatory digital journey documenting the culture, material objects, entertainment, and everyday life of Filipino youth from the 1990s through the early 2000s.
            </p>
            <p>
              Our objective is to document and celebrate the everyday experiences that defined a generation—from street games like Teks and Sipa on sunlit neighborhood pavements, favorite snacks from the corner sari-sari store, to the distinctive screech of dial-up modems and texting on early Nokia mobile phones.
            </p>
          </section>

          <section className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 space-y-2">
            <h4 className="text-sm font-bold font-retro-title text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              2. Recognizing Regional & Socioeconomic Diversity
            </h4>
            <p>
              The museum recognizes that growing up in the '90s was never uniform across the archipelago. Lived experiences differed substantially between urban hubs like Metro Manila and provincial towns across Luzon, the Visayas, and Mindanao.
            </p>
            <p>
              Not every household had a personal computer, a Sony Walkman, or a color TV set; in practice, communal generosity and sharing—watching afternoon cartoons through a neighbor’s open window, passing around cold soft drinks in plastic bags, and neighborhood sari-sari store credit—truly bonded this generation together.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="text-sm font-bold font-retro-title text-amber-950">
              3. Methodology: Documented Facts & Living Memories
            </h4>
            <p>
              Across every exhibit, we deliberately differentiate <strong>Documented Historical Facts</strong> (verifiable release dates, manufacturing history, and broadcasting milestones) from <strong>Personal Memories</strong> (lived oral histories, street slang, and affective childhood recollections).
            </p>
          </section>

          <section className="p-4 rounded-2xl bg-white border border-stone-300 space-y-2">
            <h4 className="text-sm font-bold font-retro-title text-stone-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              4. Technology & Privacy (Static Architecture)
            </h4>
            <p>
              This virtual museum is engineered entirely using modern open web standards (React, TypeScript, Tailwind CSS, and Web Audio API) with zero backend server dependencies or private API keys required, ensuring complete compatibility with free, seamless deployment on <strong>GitHub Pages</strong>.
            </p>
            <p>
              All personal childhood reflections submitted to the Community Memory Wall remain securely preserved inside your own browser storage (localStorage).
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 px-6 border-t-2 border-stone-300 bg-white/90 text-xs font-mono-retro text-stone-600">
          <span>BATANG 90s Cultural Archive Initiative</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl border border-amber-600 transition"
          >
            Continue Museum Tour
          </button>
        </div>
      </div>
    </div>
  );
};
