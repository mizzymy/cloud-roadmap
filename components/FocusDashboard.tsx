
import React, { useState } from 'react';
import { StudyDeck } from './StudyDeck';
import { ExamApp } from './ExamApp';
import { BrainIcon, ClockIcon } from './Icons';
import { PHASE_1_EXAM_1 } from './data/exams/phase1-exam1';
import { PHASE_1_EXAM_2 } from './data/exams/phase1-exam2';
import { PHASE_1_EXAM_3 } from './data/exams/phase1-exam3';
import { PHASE_1_EXAM_4 } from './data/exams/phase1-exam4';
import { PHASE_2_EXAM_1 } from './data/exams/phase2-exam1';
import { PHASE_2_EXAM_2 } from './data/exams/phase2-exam2';
import { PHASE_2_EXAM_3 } from './data/exams/phase2-exam3';
import { PHASE_2_EXAM_4 } from './data/exams/phase2-exam4';
import { PHASE_3_EXAM_1 } from './data/exams/phase3-exam1';
import { PHASE_3_EXAM_2 } from './data/exams/phase3-exam2';
import { PHASE_3_EXAM_3 } from './data/exams/phase3-exam3';
import { PHASE_3_EXAM_4 } from './data/exams/phase3-exam4';
import { PHASE_4_EXAM_1 } from './data/exams/phase4-exam1';
import { PHASE_4_EXAM_2 } from './data/exams/phase4-exam2';
import { PHASE_4_EXAM_3 } from './data/exams/phase4-exam3';
import { PHASE_4_EXAM_4 } from './data/exams/phase4-exam4';

import CloudDefender from './game/CloudDefender';

type FocusMode = 'DASHBOARD' | 'DECK' | 'EXAM_SELECT' | 'EXAM_RUNNER' | 'CLOUD_DEFENDER';

interface FocusDashboardProps {
    onToggleImmersive?: (active: boolean) => void;
}

export const FocusDashboard: React.FC<FocusDashboardProps> = ({ onToggleImmersive }) => {
    const [mode, setMode] = useState<FocusMode>('DASHBOARD');
    const [selectedExam, setSelectedExam] = useState<any>(null);
    const [selectedPhase, setSelectedPhase] = useState<'PHASE_1' | 'PHASE_2' | 'PHASE_3' | 'PHASE_4'>('PHASE_1');

    if (mode === 'CLOUD_DEFENDER') {
        return (
            <div className="flex flex-col h-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl relative">
                <div className="absolute top-4 left-4 z-[100]">
                    <button
                        onClick={() => {
                            setMode('DASHBOARD');
                            onToggleImmersive?.(false);
                        }}
                        className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest bg-slate-800/90 hover:bg-slate-700 px-4 py-2 rounded-full border border-slate-600 shadow-lg backdrop-blur-md transition-all flex items-center gap-2"
                    >
                        <span className="text-lg">←</span> EXIT MISSION
                    </button>
                </div>
                <div className="flex-1 h-full">
                    <CloudDefender />
                </div>
            </div>
        );
    }

    if (mode === 'EXAM_RUNNER' && selectedExam) {
        return <ExamApp exam={selectedExam} onExit={() => setMode('DASHBOARD')} />;
    }

    if (mode === 'DECK') {
        return (
            <div className="relative">
                <button
                    onClick={() => setMode('DASHBOARD')}
                    className="absolute md:-top-10 -top-12 left-0 text-slate-400 hover:text-white text-sm flex items-center gap-1 z-50 px-2 py-1 bg-slate-900/50 rounded-lg"
                >
                    ← Back to Dashboard
                </button>
                <StudyDeck />
            </div>
        )
    }

    if (mode === 'EXAM_SELECT') {
        let exams;
        if (selectedPhase === 'PHASE_1') exams = [PHASE_1_EXAM_1, PHASE_1_EXAM_2, PHASE_1_EXAM_3, PHASE_1_EXAM_4];
        else if (selectedPhase === 'PHASE_2') exams = [PHASE_2_EXAM_1, PHASE_2_EXAM_2, PHASE_2_EXAM_3, PHASE_2_EXAM_4];
        else if (selectedPhase === 'PHASE_3') exams = [PHASE_3_EXAM_1, PHASE_3_EXAM_2, PHASE_3_EXAM_3, PHASE_3_EXAM_4];
        else exams = [PHASE_4_EXAM_1, PHASE_4_EXAM_2, PHASE_4_EXAM_3, PHASE_4_EXAM_4];

        return (
            <div className="max-w-4xl mx-auto mt-4 px-4 pb-20">
                <button
                    onClick={() => setMode('DASHBOARD')}
                    className="text-slate-400 hover:text-white text-sm flex items-center gap-1 mb-6"
                >
                    ← Back to Dashboard
                </button>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Select Exam Simulator</h2>
                    <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-white/5">
                        <button
                            onClick={() => setSelectedPhase('PHASE_1')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition ${selectedPhase === 'PHASE_1' ? 'bg-aws-orange text-slate-900' : 'text-slate-400 hover:text-white'}`}
                        >
                            Phase 1 (CLF)
                        </button>
                        <button
                            onClick={() => setSelectedPhase('PHASE_2')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition ${selectedPhase === 'PHASE_2' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Phase 2 (SAA)
                        </button>
                        <button
                            onClick={() => setSelectedPhase('PHASE_3')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition ${selectedPhase === 'PHASE_3' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Phase 3 (SAP)
                        </button>
                        <button
                            onClick={() => setSelectedPhase('PHASE_4')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition ${selectedPhase === 'PHASE_4' ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Phase 4 (SCS)
                        </button>
                    </div>
                </div>

                <div className="grid gap-4">
                    {exams.map(exam => (
                        <div
                            key={exam.id}
                            onClick={() => {
                                if (confirm(`Start ${exam.title}? You will have ${exam.timeLimitMinutes} minutes.`)) {
                                    setSelectedExam(exam);
                                    setMode('EXAM_RUNNER');
                                }
                            }}
                            className="bg-slate-900 border border-white/5 hover:border-red-500/50 p-6 rounded-xl cursor-pointer hover:bg-slate-800 transition flex justify-between items-center group"
                        >
                            <div>
                                <div className="text-red-400 text-xs font-bold uppercase tracking-wider mb-1">{exam.code}</div>
                                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition">{exam.title}</h3>
                                <p className="text-slate-400 text-sm mt-1">{exam.description}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-white font-mono font-bold">{exam.questions.length} Qs</div>
                                <div className="text-slate-500 text-sm">{exam.timeLimitMinutes} Mins</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-8 px-4">
            <header className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-2">Focus Center</h2>
                <p className="text-slate-400">Choose your study mode. Build muscle memory or test your readiness.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active Recall Card */}
                <div
                    onClick={() => setMode('DECK')}
                    className="group bg-slate-900/50 hover:bg-slate-800/80 border border-white/5 hover:border-aws-orange/50 p-6 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-aws-orange/10 rounded-full blur-3xl group-hover:bg-aws-orange/20 transition-all"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-aws-orange to-red-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                            <BrainIcon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Active Recall</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Spaced repetition flashcards and quizzes.
                        </p>
                        <div className="flex items-center gap-2 text-aws-orange text-xs font-bold uppercase tracking-wider">
                            Start Session →
                        </div>
                    </div>
                </div>

                {/* Exam Sim Card */}
                <div
                    onClick={() => setMode('EXAM_SELECT')}
                    className="group bg-slate-900/50 hover:bg-slate-800/80 border border-white/5 hover:border-blue-500/50 p-6 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                            <ClockIcon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Exam Simulator</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Real-world mock scenarios and scoring.
                        </p>
                        <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                            Select Exam →
                        </div>
                    </div>
                </div>

                {/* GAME MODE: CLOUD DEFENDER */}
                <div
                    onClick={() => {
                        setMode('CLOUD_DEFENDER');
                        onToggleImmersive?.(true);
                    }}
                    className="group bg-slate-900/50 hover:bg-slate-800/80 border border-white/5 hover:border-green-500/50 p-6 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Cloud Defender</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Gamified Defense. Protect the architecture to learn.
                        </p>
                        <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider">
                            Deploy →
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
