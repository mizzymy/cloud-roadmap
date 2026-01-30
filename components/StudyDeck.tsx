
import React, { useState, useEffect } from 'react';
import { PHASE_1_CONTENT, StudyCard } from './data/studyContent';
import { PHASE_2_CONTENT } from './data/phase2-content';
import { PHASE_3_CONTENT } from './data/phase3-content';
import { PHASE_4_CONTENT } from './data/phase4-content';
import { ClockIcon, BrainIcon, ChevronRightIcon, CheckCircleIcon, XIcon, ArrowLeftIcon } from './Icons';

// --- Reusing Focus Timer Logic ---
const Timer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');

    useEffect(() => {
        let interval: number | null = null;
        if (isActive && timeLeft > 0) {
            interval = window.setInterval(() => {
                setTimeLeft(t => t - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = (newMode: 'FOCUS' | 'BREAK') => {
        setIsActive(false);
        setMode(newMode);
        setTimeLeft(newMode === 'FOCUS' ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="bg-slate-900/50 backdrop-blur-md p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-2 min-w-[200px]">
            <div className="flex items-center gap-2 text-aws-light text-xs font-bold uppercase tracking-wider">
                <ClockIcon className="w-4 h-4" />
                {mode} TIMER
            </div>
            <div className="text-3xl font-mono font-bold text-white tracking-widest">
                {formatTime(timeLeft)}
            </div>
            <div className="flex gap-2 w-full">
                <button
                    onClick={toggleTimer}
                    className={`flex-1 py-1 px-2 rounded text-xs font-bold transition ${isActive ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}
                >
                    {isActive ? 'PAUSE' : 'START'}
                </button>
                <button onClick={() => resetTimer('FOCUS')} className="px-2 py-1 bg-white/5 rounded text-slate-400 hover:text-white text-xs border border-white/5 hover:border-white/20">25m</button>
                <button onClick={() => resetTimer('BREAK')} className="px-2 py-1 bg-white/5 rounded text-slate-400 hover:text-white text-xs border border-white/5 hover:border-white/20">5m</button>
            </div>
        </div>
    );
};

export const StudyDeck: React.FC = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showQuizResult, setShowQuizResult] = useState(false);
    const [selectedPhase, setSelectedPhase] = useState<'PHASE_1' | 'PHASE_2' | 'PHASE_3' | 'PHASE_4'>('PHASE_1');
    const [shuffledContent, setShuffledContent] = useState<StudyCard[]>([]);

    // Initialize and shuffle content on mount or phase change
    useEffect(() => {
        let content;
        if (selectedPhase === 'PHASE_1') content = PHASE_1_CONTENT;
        else if (selectedPhase === 'PHASE_2') content = PHASE_2_CONTENT;
        else if (selectedPhase === 'PHASE_3') content = PHASE_3_CONTENT;
        else content = PHASE_4_CONTENT;

        const shuffled = [...content].sort(() => Math.random() - 0.5);
        setShuffledContent(shuffled);
        setCurrentCardIndex(0);
        setIsFlipped(false);
        setShowQuizResult(false);
    }, [selectedPhase]);

    const currentCard = shuffledContent[currentCardIndex];

    const handleNext = () => {
        setIsFlipped(false);
        setSelectedOption(null);
        setShowQuizResult(false);
        setCurrentCardIndex((prev) => (prev + 1) % shuffledContent.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setSelectedOption(null);
        setShowQuizResult(false);
        setCurrentCardIndex((prev) => (prev - 1 + shuffledContent.length) % shuffledContent.length);
    };

    const handleFlip = () => {
        if (currentCard.type === 'FLASHCARD') {
            setIsFlipped(!isFlipped);
        }
    };

    const handleOptionSelect = (index: number) => {
        if (showQuizResult) return; // Prevent changing after result shown
        setSelectedOption(index);
        setShowQuizResult(true);
    };

    const getPhaseTitle = (phase: 'PHASE_1' | 'PHASE_2' | 'PHASE_3' | 'PHASE_4') => {
        if (phase === 'PHASE_1') return 'Phase 1: Cloud Practitioner';
        if (phase === 'PHASE_2') return 'Phase 2: Solutions Architect';
        if (phase === 'PHASE_3') return 'Phase 3: SA Professional';
        return 'Phase 4: Security Specialty';
    };

    if (!currentCard) return <div className="text-white text-center p-10">Loading Study Deck...</div>;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Header with Stats and Timer */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-4 mb-1">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <BrainIcon className="w-6 h-6 text-aws-orange" />
                            Active Recall Deck
                        </h2>

                        {/* Phase Selector */}
                        <div className="relative group z-30">
                            <button className="flex items-center gap-2 px-3 py-1 bg-slate-800 border border-white/10 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:border-aws-orange/50 transition whitespace-nowrap">
                                {getPhaseTitle(selectedPhase)}
                                <ChevronRightIcon className="w-3 h-3 rotate-90" />
                            </button>
                            <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900 border border-white/10 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-left z-50">
                                <button
                                    onClick={() => setSelectedPhase('PHASE_1')}
                                    className={`w-full text-left px-4 py-3 text-xs hover:bg-slate-800 transition flex items-center justify-between ${selectedPhase === 'PHASE_1' ? 'text-aws-orange bg-white/5' : 'text-slate-400'}`}
                                >
                                    Phase 1: Cloud Practitioner
                                    {selectedPhase === 'PHASE_1' && <CheckCircleIcon className="w-3 h-3" />}
                                </button>
                                <button
                                    onClick={() => setSelectedPhase('PHASE_2')}
                                    className={`w-full text-left px-4 py-3 text-xs hover:bg-slate-800 transition flex items-center justify-between ${selectedPhase === 'PHASE_2' ? 'text-aws-orange bg-white/5' : 'text-slate-400'}`}
                                >
                                    Phase 2: Solutions Architect
                                    {selectedPhase === 'PHASE_2' && <CheckCircleIcon className="w-3 h-3" />}
                                </button>
                                <button
                                    onClick={() => setSelectedPhase('PHASE_3')}
                                    className={`w-full text-left px-4 py-3 text-xs hover:bg-slate-800 transition flex items-center justify-between ${selectedPhase === 'PHASE_3' ? 'text-aws-orange bg-white/5' : 'text-slate-400'}`}
                                >
                                    Phase 3: SA Professional
                                    {selectedPhase === 'PHASE_3' && <CheckCircleIcon className="w-3 h-3" />}
                                </button>
                                <button
                                    onClick={() => setSelectedPhase('PHASE_4')}
                                    className={`w-full text-left px-4 py-3 text-xs hover:bg-slate-800 transition flex items-center justify-between ${selectedPhase === 'PHASE_4' ? 'text-aws-orange bg-white/5' : 'text-slate-400'}`}
                                >
                                    Phase 4: Security Specialty
                                    {selectedPhase === 'PHASE_4' && <CheckCircleIcon className="w-3 h-3" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm">
                        {shuffledContent.length} Cards •
                        {selectedPhase === 'PHASE_1' && ' Foundational'}
                        {selectedPhase === 'PHASE_2' && ' Associate Level'}
                        {selectedPhase === 'PHASE_3' && ' Professional Level'}
                        {selectedPhase === 'PHASE_4' && ' Specialty Level'}
                    </p>
                </div>
                <Timer />
            </div>

            {/* Main Card Area */}
            <div className="relative [perspective:1000px] min-h-[400px]">
                {/* Progress Bar */}
                <div className="absolute -top-3 left-0 right-0 h-1 bg-slate-800 rounded-full overflow-hidden z-20">
                    <div className="h-full bg-aws-orange transition-all duration-300" style={{ width: `${((currentCardIndex + 1) / shuffledContent.length) * 100}%` }}></div>
                </div>

                {/* Card Container - Fixed 3D Context */}
                <div
                    className={`relative w-full h-[400px] transition-all duration-500 [transform-style:preserve-3d] cursor-pointer`}
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    onClick={currentCard.type === 'FLASHCARD' ? handleFlip : undefined}
                >
                    {/* FRONT (Question) */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col justify-between shadow-2xl hover:border-aws-orange/30 transition-colors group z-20">
                        <div className="flex justify-between items-start">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded border ${currentCard.type === 'QUIZ' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30'}`}>
                                {currentCard.type === 'QUIZ' ? 'MULTIPLE CHOICE' : 'FLASHCARD'}
                            </span>
                            <span className="text-slate-500 text-xs font-mono">#{currentCardIndex + 1} / {shuffledContent.length}</span>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <span className="text-aws-orange text-xs font-bold uppercase tracking-widest mb-4">{currentCard.category.replace('_', ' ')}</span>
                            <h3 className="text-xl md:text-3xl font-bold text-white leading-tight select-none">
                                {currentCard.question}
                            </h3>
                        </div>

                        {currentCard.type === 'FLASHCARD' && (
                            <div className="text-center text-slate-500 text-xs uppercase tracking-widest animate-pulse mt-4">
                                Click to Flip
                            </div>
                        )}

                        {currentCard.type === 'QUIZ' && (
                            <div className="w-full space-y-2 mt-6" onClick={(e) => e.stopPropagation()}>
                                {currentCard.options?.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(idx)}
                                        disabled={showQuizResult}
                                        className={`w-full p-3 rounded-lg border text-left text-sm transition-all flex justify-between items-center group/btn
                                ${showQuizResult
                                                ? idx === currentCard.correctOptionIndex
                                                    ? 'bg-green-500/20 border-green-500 text-white'
                                                    : idx === selectedOption
                                                        ? 'bg-red-500/20 border-red-500 text-white'
                                                        : 'bg-slate-800/50 border-white/5 text-slate-500 opacity-50'
                                                : 'bg-slate-800/50 border-white/10 hover:bg-white/5 hover:border-aws-orange/50 text-slate-200'
                                            }
                            `}
                                    >
                                        <span>{opt}</span>
                                        {showQuizResult && idx === currentCard.correctOptionIndex && <CheckCircleIcon className="w-4 h-4 text-green-400" />}
                                        {showQuizResult && idx === selectedOption && idx !== currentCard.correctOptionIndex && <XIcon className="w-4 h-4 text-red-400" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* BACK (Answer - Only for Flashcard) - Completely hidden if Quiz */}
                    {currentCard.type === 'FLASHCARD' && (
                        <div
                            className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-800/80 backdrop-blur-xl border border-aws-orange/30 rounded-2xl p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20"
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-bold px-2 py-1 rounded bg-green-500/20 text-green-300 border border-green-500/30">
                                    ANSWER
                                </span>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center text-center overflow-y-auto">
                                <p className="text-lg md:text-2xl font-medium text-white mb-6 select-none">
                                    {currentCard.answer}
                                </p>
                                {currentCard.explanation && (
                                    <div className="bg-slate-900/50 p-4 rounded-lg text-sm text-slate-300 border border-white/5 mx-4">
                                        <span className="text-aws-orange font-bold mr-2">Why?</span>
                                        {currentCard.explanation}
                                    </div>
                                )}
                            </div>

                            <div className="text-center text-slate-500 text-xs uppercase tracking-widest mt-4">
                                Click to Flip Back
                            </div>
                        </div>
                    )}
                </div>

                {/* Quiz Explanation Overlay (Shown below options for Quiz cards) */}
                {currentCard.type === 'QUIZ' && showQuizResult && (
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 text-sm text-slate-300 animate-in fade-in slide-in-from-bottom-4 shadow-xl z-30">
                        <p><span className="text-aws-orange font-bold mr-2">Explanation:</span> {currentCard.explanation}</p>
                    </div>
                )}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center">
                <button
                    onClick={handlePrev}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition disabled:opacity-50"
                >
                    <ArrowLeftIcon className="w-5 h-5" /> Previous
                </button>

                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            let content;
                            if (selectedPhase === 'PHASE_1') content = PHASE_1_CONTENT;
                            else if (selectedPhase === 'PHASE_2') content = PHASE_2_CONTENT;
                            else if (selectedPhase === 'PHASE_3') content = PHASE_3_CONTENT;
                            else content = PHASE_4_CONTENT;

                            const shuffled = [...content].sort(() => Math.random() - 0.5);
                            setShuffledContent(shuffled);
                            setCurrentCardIndex(0);
                            setIsFlipped(false);
                            setShowQuizResult(false);
                        }}
                        className="px-4 py-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition text-xs font-bold uppercase tracking-wider"
                    >
                        Shuffle
                    </button>
                </div>

                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-aws-orange hover:bg-orange-500 text-slate-900 font-bold transition shadow-lg shadow-orange-500/20"
                >
                    Next <ChevronRightIcon className="w-5 h-5" />
                </button>
            </div>

        </div>
    );
};
