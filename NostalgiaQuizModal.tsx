import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/museumData';
import { QuizQuestion } from '../types/museum';
import { X, Trophy, HelpCircle, CheckCircle2, RotateCcw, ArrowRight, Award } from 'lucide-react';

interface NostalgiaQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NostalgiaQuizModal: React.FC<NostalgiaQuizModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optIndex: number, points: number) => {
    if (selectedOptionIndex !== null) return; // already picked for this question
    setSelectedOptionIndex(optIndex);
    setTotalScore((prev) => prev + points);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setTotalScore(0);
    setIsFinished(false);
  };

  const getResultBadge = () => {
    if (totalScore >= 21) {
      return {
        title: 'Certified Batang 90s Legendary Master! 🏆',
        desc: 'No doubt about it! The 1990s run deep in your veins. From the cha-to flip in street Teks to tuning the TV antenna for afternoon anime, you mastered every corner of Filipino childhood.',
        badge: 'bg-amber-100 text-amber-900 border-amber-400',
      };
    }
    if (totalScore >= 15) {
      return {
        title: 'Certified Street & TV Gamer! 🎮',
        desc: 'A solid, unforgettable childhood! You often came home dusty from neighborhood games before dusk, drank ice-cold soda from a plastic bag, and never missed Tagalog-dubbed anime.',
        badge: 'bg-emerald-100 text-emerald-900 border-emerald-400',
      };
    }
    if (totalScore >= 9) {
      return {
        title: 'Y2K Cyber Tambay Explorer! 💾',
        desc: 'You caught the pivotal leap into the digital age! You likely hung out on mIRC at local internet cafes, played Snake on a Nokia 5110, and traded custom ringtones.',
        badge: 'bg-sky-100 text-sky-900 border-sky-400',
      };
    }
    return {
      title: 'Batang Milenyo Apprentice! ✨',
      desc: 'You have a curious appreciation for 90s Filipino youth culture! Explore our six exhibition galleries to uncover the everyday street games, analog media, and childhood lore you missed.',
      badge: 'bg-stone-100 text-stone-900 border-stone-300',
    };
  };

  const result = getResultBadge();

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-xl bg-[#FAF7EE] border-2 border-stone-400 rounded-3xl shadow-2xl p-5 sm:p-6 text-stone-900 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-stone-300 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-retro-title text-amber-950 leading-tight">
                How Complete Was Your '90s Childhood?
              </h3>
              <p className="text-[11px] font-mono-retro text-stone-500">
                Interactive Batang 90s Nostalgia Quiz
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isFinished ? (
          /* Question View */
          <div className="space-y-4">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs font-mono-retro text-stone-500">
              <span>Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>Score: {totalScore} pts</span>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-300 shadow-xs space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-stone-900 font-retro-title leading-snug">
                {currentQ.question}
              </h4>
              <p className="text-xs font-mono-retro text-amber-800 font-semibold">
                {currentQ.tagalogPrompt}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const showFeedback = selectedOptionIndex !== null;

                return (
                  <button
                    key={idx}
                    disabled={showFeedback}
                    onClick={() => handleSelectOption(idx, opt.points)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-sans transition-all flex flex-col gap-1 ${
                      isSelected
                        ? opt.points > 1
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                          : 'bg-amber-50 border-amber-500 text-amber-950'
                        : showFeedback
                        ? 'bg-stone-50 border-stone-200 text-stone-400'
                        : 'bg-white border-stone-300 hover:border-amber-400 hover:bg-amber-50/50 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt.label}</span>
                      {isSelected && opt.points > 0 && (
                        <span className="text-xs font-mono-retro font-bold text-emerald-700 shrink-0">
                          +{opt.points} pts
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <span className="text-[11px] font-sans text-stone-600 italic pt-1 border-t border-stone-200/60">
                        {opt.explanation}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            {selectedOptionIndex !== null && (
              <div className="pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono-retro font-bold text-xs rounded-xl border border-amber-600 transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>
                    {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'See Results!'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Results View */
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-700 flex items-center justify-center mx-auto text-3xl shadow-sm">
              🎖️
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono-retro text-stone-500 uppercase tracking-widest font-bold">
                Total Score: {totalScore} / 24
              </span>
              <h4 className="text-2xl font-bold font-retro-title text-amber-950">
                {result.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 max-w-md mx-auto leading-relaxed">
                {result.desc}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                onClick={handleRestart}
                className="py-2.5 px-5 bg-white hover:bg-stone-100 text-stone-800 font-mono-retro font-bold text-xs rounded-xl border border-stone-300 transition flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={onClose}
                className="py-2.5 px-5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono-retro font-bold text-xs rounded-xl border border-amber-600 transition shadow-xs"
              >
                Return to Museum
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
