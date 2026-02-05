import React, { useState, useEffect, useMemo } from 'react';
import { Phase } from '../types';
import { ClockIcon, CalendarIcon, MapIcon, PlayIcon } from './Icons';
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

const ALL_EXAMS = [
    PHASE_1_EXAM_1, PHASE_1_EXAM_2, PHASE_1_EXAM_3, PHASE_1_EXAM_4,
    PHASE_2_EXAM_1, PHASE_2_EXAM_2, PHASE_2_EXAM_3, PHASE_2_EXAM_4,
    PHASE_3_EXAM_1, PHASE_3_EXAM_2, PHASE_3_EXAM_3, PHASE_3_EXAM_4,
    PHASE_4_EXAM_1, PHASE_4_EXAM_2, PHASE_4_EXAM_3, PHASE_4_EXAM_4,
];

interface Props {
    phases: Phase[];
    startDate: number;
}

const parseDuration = (duration: string): number => {
    if (!duration) return 0;
    const time = parseInt(duration);
    if (duration.includes('h')) return time * 60;
    if (duration.includes('m')) return time;
    return 0;
};

export const ProjectionWidget: React.FC<Props> = ({ phases, startDate }) => {
    const [mode, setMode] = useState<'CURRENT' | 'MANUAL'>('CURRENT');
    const [manualHours, setManualHours] = useState<number>(() => {
        const saved = localStorage.getItem('cloudflow_manual_hours');
        return saved ? parseFloat(saved) : 2;
    });

    useEffect(() => {
        localStorage.setItem('cloudflow_manual_hours', manualHours.toString());
    }, [manualHours]);

    const stats = useMemo(() => {
        // --- GLOBAL STATS (Entire Roadmap) ---
        let globalTotalMinutes = 0;
        let globalCompletedMinutes = 0;

        phases.forEach(p => {
            p.courses.forEach(c => {
                c.modules.forEach(m => {
                    m.lessons.forEach(l => {
                        const mins = parseDuration(l.duration);
                        globalTotalMinutes += mins;
                        if (l.isCompleted) globalCompletedMinutes += mins;
                    });
                });
            });
        });

        // Add Exams to Global Total
        const totalExamMinutes = ALL_EXAMS.reduce((acc, exam) => acc + exam.timeLimitMinutes, 0);
        globalTotalMinutes += totalExamMinutes;
        // NOTE: We aren't tracking exam completion persistently yet, 
        // so we treat all exams as "Outstanding Work" for the projection to be safe/conservative.

        const globalRemainingMinutes = globalTotalMinutes - globalCompletedMinutes;


        // --- ACTIVE SCOPE STATS (Current Course/Phase) ---
        // Find the first phase/course that isn't fully complete
        let activeScopeName = "All Courses Complete";
        let activeTotalMinutes = 0;
        let activeCompletedMinutes = 0;

        // Logic: Find first incomplete course
        let foundActive = false;
        for (const p of phases) {
            for (const c of p.courses) {
                const isComplete = c.modules.every(m => m.lessons.every(l => l.isCompleted));
                if (!isComplete) {
                    activeScopeName = c.title; // Set current target name

                    // Calc stats just for this course
                    c.modules.forEach(m => {
                        m.lessons.forEach(l => {
                            const mins = parseDuration(l.duration);
                            activeTotalMinutes += mins;
                            if (l.isCompleted) activeCompletedMinutes += mins;
                        });
                    });

                    foundActive = true;
                    break;
                }
            }
            if (foundActive) break;
        }

        // If everything is done, just default to last course to avoid divide by zero or empty UI
        if (!foundActive && phases.length > 0) {
            const lastCourse = phases[phases.length - 1].courses[phases[phases.length - 1].courses.length - 1];
            if (lastCourse) {
                activeScopeName = lastCourse.title + " (Complete)";
                activeTotalMinutes = 1; // avoid /0
                activeCompletedMinutes = 1;
            }
        }

        const activeRemainingMinutes = activeTotalMinutes - activeCompletedMinutes;


        // --- PACE CALCULATIONS ---
        const now = Date.now();
        const daysElapsed = Math.max(1, (now - startDate) / (1000 * 60 * 60 * 24)); // Minimum 1 day

        // Current Pace (Global Velocity)
        // We use the global velocity (average speed across entire journey) to predict the specific course too.
        // This smooths out irregularities.
        const currentPaceMinPerDay = globalCompletedMinutes / daysElapsed;
        const effectiveCurrentPace = currentPaceMinPerDay === 0 ? 60 : currentPaceMinPerDay; // Default 1h/day if new

        // Manual Pace
        const manualPaceMinPerDay = manualHours * 60;


        // --- PROJECTIONS ---

        // 1. GLOBAL (Total Roadmap)
        const daysRemainingGlobalCurrent = globalRemainingMinutes / effectiveCurrentPace;
        const daysRemainingGlobalManual = globalRemainingMinutes / manualPaceMinPerDay;

        const dateGlobalCurrent = new Date(now + daysRemainingGlobalCurrent * 24 * 60 * 60 * 1000);
        const dateGlobalManual = new Date(now + daysRemainingGlobalManual * 24 * 60 * 60 * 1000);

        // 2. ACTIVE (Current Course)
        const daysRemainingActiveCurrent = activeRemainingMinutes / effectiveCurrentPace;
        const daysRemainingActiveManual = activeRemainingMinutes / manualPaceMinPerDay;

        const dateActiveCurrent = new Date(now + daysRemainingActiveCurrent * 24 * 60 * 60 * 1000);
        const dateActiveManual = new Date(now + daysRemainingActiveManual * 24 * 60 * 60 * 1000);


        return {
            global: {
                total: globalTotalMinutes,
                remaining: globalRemainingMinutes,
                dateCurrent: dateGlobalCurrent,
                dateManual: dateGlobalManual,
                daysCurrent: daysRemainingGlobalCurrent
            },
            active: {
                name: activeScopeName,
                total: activeTotalMinutes,
                remaining: activeRemainingMinutes,
                dateCurrent: dateActiveCurrent,
                dateManual: dateActiveManual,
                daysCurrent: daysRemainingActiveCurrent
            },
            pace: {
                current: effectiveCurrentPace,
                manual: manualPaceMinPerDay,
                daysElapsed
            }
        };
    }, [phases, startDate, manualHours]);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getRelativeTime = (date: Date) => {
        const months = (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30.416);
        if (months < 1) {
            const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            return `${days} Days`;
        }
        if (months > 24) {
            return `${(months / 12).toFixed(1)} Years`;
        }
        return `${months.toFixed(1)} Months`;
    };

    const activeDate = mode === 'CURRENT' ? stats.active.dateCurrent : stats.active.dateManual;
    const globalDate = mode === 'CURRENT' ? stats.global.dateCurrent : stats.global.dateManual;

    return (
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 shadow-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/20 transition-all"></div>

            <div className="relative z-10">
                {/* Header & Toggle */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-purple-400" />
                            Smart Projections
                        </h3>
                        <p className="text-slate-400 text-xs mt-1">
                            Estimated completion based on {mode === 'CURRENT' ? 'your historical velocity' : 'your daily commitment'}.
                        </p>
                    </div>

                    <div className="flex bg-slate-950 rounded-lg p-1 border border-white/5 self-start sm:self-auto">
                        <button
                            onClick={() => setMode('CURRENT')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${mode === 'CURRENT' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Avg Pace
                        </button>
                        <button
                            onClick={() => setMode('MANUAL')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${mode === 'MANUAL' ? 'bg-aws-orange text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Desired Pace
                        </button>
                    </div>
                </div>

                {/* Split Projection View */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mb-6">

                    {/* 1. CURRENT TARGET */}
                    <div className="bg-slate-950/50 rounded-xl p-5 border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="p-1.5 bg-blue-500/20 rounded text-blue-400"><PlayIcon className="w-3.5 h-3.5" /></div>
                                    <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">Current Course</div>
                                </div>
                                <div className="text-sm font-medium text-slate-300 line-clamp-2 h-10 mb-2" title={stats.active.name}>
                                    {stats.active.name}
                                </div>
                            </div>

                            <div>
                                <div className={`text-3xl font-black tracking-tight ${mode === 'CURRENT' ? 'text-white' : 'text-aws-orange'}`}>
                                    {formatDate(activeDate)}
                                </div>
                                <div className="text-xs text-slate-500 mt-1 font-mono">
                                    in ~{getRelativeTime(activeDate)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. TOTAL ROADMAP */}
                    <div className="bg-slate-950/50 rounded-xl p-5 border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="p-1.5 bg-purple-500/20 rounded text-purple-400"><MapIcon className="w-3.5 h-3.5" /></div>
                                    <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">Full Roadmap</div>
                                </div>
                                <div className="text-sm font-medium text-slate-300 mb-2">
                                    Includes all courses + {(stats.global.remaining / 60).toFixed(0)}h of exams
                                </div>
                            </div>

                            <div>
                                <div className={`text-3xl font-black tracking-tight ${mode === 'CURRENT' ? 'text-white' : 'text-aws-orange'}`}>
                                    {formatDate(globalDate)}
                                </div>
                                <div className="text-xs text-slate-500 mt-1 font-mono">
                                    in ~{getRelativeTime(globalDate)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer / Controls */}
                <div className="border-t border-white/5 pt-4">
                    {mode === 'MANUAL' ? (
                        <div>
                            <label className="flex justify-between text-xs font-bold text-slate-300 mb-3">
                                <span>Adjust Daily Commitment</span>
                                <span className="text-aws-orange">{manualHours} Hours / Day</span>
                            </label>
                            <input
                                type="range"
                                min="0.5"
                                max="12"
                                step="0.5"
                                value={manualHours}
                                onChange={(e) => setManualHours(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-aws-orange"
                            />
                            <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                                <span>30m</span>
                                <span>12h</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center text-xs text-slate-500">
                            <div>
                                Based on your avg velocity: <span className="text-white font-mono">{(stats.pace.current / 60).toFixed(1)}h/day</span>
                            </div>
                            <div className="italic">
                                Since {new Date(startDate).toLocaleDateString()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
