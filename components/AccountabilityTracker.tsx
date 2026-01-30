
import React, { useMemo, useState } from 'react';
import { ClockIcon, MapIcon, CalendarIcon, CheckCircleIcon, PlayIcon } from './Icons';
import { Phase } from '../types';

interface Props {
    startDate: number;
    deadline: number;
    phases: Phase[];
}

// Weights representing equal distribution for visual uniformity [1,1,1,1]
// This fixes the "gaps" caused by time-weighted distribution.
const PHASE_WEIGHTS = [1, 1, 1, 1];
const TOTAL_WEIGHT = PHASE_WEIGHTS.reduce((a, b) => a + b, 0);

export const AccountabilityTracker: React.FC<Props> = ({ startDate, deadline, phases }) => {
    const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

    // Helper to parse dates from timeframe strings
    const getPhaseDates = (timeframe: string) => {
        const parts = timeframe.split(/[–-]/).map(s => s.trim());
        const start = new Date(`1 ${parts[0]}`).getTime();
        const endMonth = new Date(`1 ${parts[1]}`);
        const end = new Date(endMonth.getFullYear(), endMonth.getMonth() + 1, 0).getTime();
        return { start, end };
    };

    // ---------------------------------------------------------------------------
    // 1. INTELLIGENT SCHEDULE TRACKING (Mission Control)
    // ---------------------------------------------------------------------------
    const missionControl = useMemo(() => {
        const now = Date.now();

        // Find Active Phase (First phase with incomplete milestone)
        // Fallback to last phase if all complete
        const activePhase = phases.find(p => !p.milestone.completed) || phases[phases.length - 1];

        // Find Active Course within that Phase
        const activeCourse = activePhase.courses.find(c => {
            const isComplete = c.modules.every(m => m.lessons.every(l => l.isCompleted));
            return !isComplete;
        });

        // Determine current "Target" Name & Type
        let targetName = activeCourse ? activeCourse.title : activePhase.milestone.name;
        let targetType = activeCourse ? 'COURSE' : 'EXAM';
        let targetProvider = activeCourse ? activeCourse.provider : 'AWS Certification';

        // Parse Phase Timeframe for Schedule Math (use exact timestamps when present)
        const phaseStart = activePhase.phaseStartMs ?? getPhaseDates(activePhase.timeframe).start;
        const phaseEnd = activePhase.phaseEndMs ?? getPhaseDates(activePhase.timeframe).end;
        const startStr = activePhase.timeframe.split(/[–-]/)[0].trim();

        // Calculate Work Progress
        let phaseTotalTasks = 0;
        let phaseCompletedTasks = 0;
        activePhase.courses.forEach(c => {
            c.modules.forEach(m => {
                phaseTotalTasks += m.lessons.length;
                phaseCompletedTasks += m.lessons.filter(l => l.isCompleted).length;
            });
        });

        const totalDuration = phaseEnd - phaseStart;
        const elapsed = now - phaseStart;

        // Metrics
        const workPct = phaseTotalTasks > 0 ? (phaseCompletedTasks / phaseTotalTasks) : 0;
        const timePctRaw = totalDuration > 0 ? (elapsed / totalDuration) : 0;
        const timePct = Math.min(1, Math.max(0, timePctRaw));

        // Schedule Delta
        const pctDifference = workPct - timePctRaw;
        const msDifference = pctDifference * totalDuration;
        const daysDifference = Math.round(msDifference / (1000 * 60 * 60 * 24));

        // Status Determination
        let status: 'AHEAD' | 'BEHIND' | 'ON_TRACK' | 'NOT_STARTED' = 'ON_TRACK';

        if (elapsed < 0) {
            status = 'NOT_STARTED';
        } else {
            if (daysDifference > 2) {
                status = 'AHEAD';
            } else if (daysDifference < -2) {
                status = 'BEHIND';
            } else {
                status = 'ON_TRACK';
            }
        }

        const daysRemaining = Math.ceil((phaseEnd - now) / (1000 * 60 * 60 * 24));

        return {
            activePhaseTitle: activePhase.title,
            targetName,
            targetType,
            targetProvider,
            phaseStart,
            phaseEnd,
            startStr,
            workPct: workPct * 100,
            timePct: timePct * 100,
            daysDifference,
            daysRemaining,
            status,
            phaseTotalTasks,
            phaseCompletedTasks
        };

    }, [phases]);


    // ---------------------------------------------------------------------------
    // 2. GLOBAL VISUALIZER LOGIC (Dual-Track Timeline)
    // ---------------------------------------------------------------------------
    const { weightedProgress, milestones, phaseSegments, visualTimeProgress } = useMemo(() => {
        // 1. Calculate tasks per phase first
        const phaseStats = phases.map(p => {
            let t = 0;
            let c = 0;
            p.courses.forEach(course => {
                course.modules.forEach(m => {
                    m.lessons.forEach(l => {
                        t++;
                        if (l.isCompleted) c++;
                    })
                })
            });
            return { total: t, completed: c };
        });

        // 2. Build Milestones, Progress, and Time Cursor
        let currentVisualStart = 0;
        let accumulatedWeightedProgress = 0;
        let calculatedTimeProgress = 0;
        const now = Date.now();

        const m: { position: number; label: string; type: 'COURSE' | 'PHASE'; completed: boolean; ready?: boolean }[] = [];
        const segments: { id: string; title: string; startPct: number; widthPct: number; }[] = [];

        phases.forEach((phase, idx) => {
            // Visual Width Calculation (Uniform)
            const weight = PHASE_WEIGHTS[idx] || 1;
            const phaseWidth = (weight / TOTAL_WEIGHT) * 100;
            const stats = phaseStats[idx];

            // A. Work Progress (Orange Fill)
            const phaseProgressRatio = stats.total > 0 ? (stats.completed / stats.total) : 0;
            accumulatedWeightedProgress += phaseProgressRatio * phaseWidth;

            // B. Time Progress (Blue Ghost)
            const start = phase.phaseStartMs ?? getPhaseDates(phase.timeframe).start;
            const end = phase.phaseEndMs ?? getPhaseDates(phase.timeframe).end;
            if (now > end) {
                calculatedTimeProgress += phaseWidth;
            } else if (now >= start && now <= end) {
                const pct = (now - start) / (end - start);
                calculatedTimeProgress += (pct * phaseWidth);
            }

            // C. Milestones (Courses & Phase End)
            let phaseTaskCursor = 0;

            phase.courses.forEach(course => {
                let courseTaskCount = 0;
                let courseCompletedCount = 0;
                course.modules.forEach(mod => {
                    courseTaskCount += mod.lessons.length;
                    courseCompletedCount += mod.lessons.filter(l => l.isCompleted).length;
                });

                phaseTaskCursor += courseTaskCount;

                const relativePos = (phaseTaskCursor / stats.total) * phaseWidth;
                const absolutePos = currentVisualStart + relativePos;

                const isCourseStrictlyComplete = courseTaskCount > 0 && courseCompletedCount === courseTaskCount;

                if (courseTaskCount > 0) {
                    m.push({
                        position: absolutePos,
                        label: course.title,
                        type: 'COURSE',
                        completed: isCourseStrictlyComplete
                    });
                }
            });

            const phaseEndPos = currentVisualStart + phaseWidth;
            const isCourseworkDone = stats.total > 0 && stats.completed === stats.total;

            m.push({
                position: phaseEndPos,
                label: `${phase.milestone.name}`,
                type: 'PHASE',
                completed: phase.milestone.completed,
                ready: isCourseworkDone && !phase.milestone.completed
            });

            segments.push({
                id: phase.id,
                title: phase.title.split(':')[0],
                startPct: currentVisualStart,
                widthPct: phaseWidth
            });

            currentVisualStart += phaseWidth;
        });

        return {
            weightedProgress: accumulatedWeightedProgress,
            milestones: m,
            phaseSegments: segments,
            visualTimeProgress: Math.min(100, Math.max(0, calculatedTimeProgress))
        };

    }, [phases]);


    return (
        <div className="space-y-6">

            {/* MISSION CONTROL */}
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,153,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,153,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-aws-orange/10 rounded-full blur-[80px] pointer-events-none animate-pulse"></div>

                <div className="p-4 md:p-8 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${missionControl.targetType === 'EXAM' ? 'bg-aws-orange/20 text-aws-orange' : 'bg-blue-500/20 text-blue-400'}`}>
                                    {missionControl.targetType === 'EXAM' ? <MapIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                                </div>
                                <div className="text-xs font-bold tracking-wider text-slate-400 uppercase">Current Objective</div>
                            </div>
                            <div>
                                <div className="text-xs text-aws-orange font-mono mb-1">{missionControl.targetProvider}</div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow-lg">{missionControl.targetName}</h2>
                            </div>
                            <div className="flex items-center gap-6 pt-2">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Items Completed</div>
                                    <div className="text-xl font-mono text-white">{missionControl.phaseCompletedTasks} <span className="text-slate-500 text-sm">/ {missionControl.phaseTotalTasks}</span></div>
                                </div>
                                <div className="w-px h-10 bg-white/10"></div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Time Remaining</div>
                                    <div className={`text-xl font-mono ${missionControl.daysRemaining < 0 ? 'text-red-400' : 'text-white'}`}>{missionControl.daysRemaining < 0 ? '0' : missionControl.daysRemaining} <span className="text-slate-500 text-sm">Days</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 lg:max-w-md bg-slate-950/60 rounded-xl p-5 border border-white/5 flex flex-col justify-between shadow-inner">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Schedule Status</div>
                                    {missionControl.status === 'NOT_STARTED' && <div className="text-lg font-bold text-slate-400 flex items-center gap-2"><span className="text-xl">⏳</span> Starts {missionControl.startStr}</div>}
                                    {missionControl.status === 'ON_TRACK' && <div className="text-lg font-bold text-green-400 flex items-center gap-2 drop-shadow-md"><CheckCircleIcon className="w-5 h-5" /> On Track</div>}
                                    {missionControl.status === 'AHEAD' && <div className="text-lg font-bold text-blue-400 flex items-center gap-2 drop-shadow-md"><CheckCircleIcon className="w-5 h-5" /> + {missionControl.daysDifference} Days Ahead</div>}
                                    {missionControl.status === 'BEHIND' && <div className="text-lg font-bold text-red-500 flex items-center gap-2 drop-shadow-md"><span className="text-xl">⚠️</span> - {Math.abs(missionControl.daysDifference)} Days Behind</div>}
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Phase Progress</div>
                                    <div className="text-lg font-mono text-white">{missionControl.workPct.toFixed(0)}%</div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-[10px] text-slate-400 mb-2 uppercase tracking-wider"><span>Timeline Elapsed</span><span>{missionControl.timePct.toFixed(0)}%</span></div>
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                                        <div className={`h-full ${missionControl.status === 'BEHIND' ? 'bg-red-500/50' : 'bg-slate-500/50'}`} style={{ width: `${missionControl.timePct}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] text-slate-400 mb-2 uppercase tracking-wider"><span>Work Completed</span><span>{missionControl.workPct.toFixed(0)}%</span></div>
                                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5 relative">
                                        <div className={`h-full transition-all duration-1000 relative overflow-hidden ${missionControl.status === 'BEHIND' ? 'bg-red-500' : missionControl.status === 'AHEAD' ? 'bg-blue-500' : 'bg-gradient-to-r from-green-500 to-emerald-400'}`} style={{ width: `${missionControl.workPct}%` }}>
                                            <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ transform: 'skewX(-20deg)' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-950/40 border-t border-white/5 p-3 px-8 flex items-center justify-between text-xs text-slate-400 font-mono backdrop-blur-sm">
                    <div className="flex items-center gap-2"><CalendarIcon className="w-3 h-3" /><span>PHASE: {missionControl.activePhaseTitle.toUpperCase()}</span></div>
                    <div>{new Date(missionControl.phaseStart).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })} — {new Date(missionControl.phaseEnd).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</div>
                </div>
            </div>

            {/* GLOBAL TIMELINE VISUALIZER */}
            <div className="p-4 rounded-xl border border-white/5 bg-slate-900/30 backdrop-blur-md relative overflow-visible group transition-all duration-500 hover:border-white/10">
                <div className="relative select-none mx-[-16px] px-[16px] md:mx-0 md:px-0 overflow-x-auto pb-4" onClick={() => setActiveTooltip(null)}>
                    {/* 
               UPDATED PADDING: 
               pt-48 (was 32) -> increased top padding (+5% visually) 
               pb-56 (was 64) -> reduced bottom padding (5% visually shorter)
            */}
                    <div className="min-w-[800px] md:min-w-0 relative pt-48 pb-56 px-8">

                        {/* 1. Segmented Background Track */}
                        <div className="flex w-full h-3 rounded-full overflow-hidden bg-slate-950/80 border border-white/10 relative z-10 shadow-inner">
                            {phaseSegments.map(seg => (
                                <div key={seg.id} style={{ width: `${seg.widthPct}%` }} className="h-full border-r border-white/5 last:border-0 relative">
                                    {/* Segment Label */}
                                    <div className="absolute -top-12 left-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider truncate max-w-full">
                                        {seg.title.replace("Phase ", "P")}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 2. Progress Fill Layer - Position updated to top-48 matches padding */}
                        <div
                            className="absolute top-48 left-8 right-8 h-3 rounded-full shadow-[0_0_25px_rgba(255,153,0,0.3)] transition-all duration-1000 ease-out z-20 pointer-events-none bg-gradient-to-r from-aws-orange via-amber-500 to-orange-500"
                            style={{ width: `calc(${weightedProgress}% - 2px)` }}
                        >
                            <div className="absolute inset-0 w-full h-full bg-white/20 skew-x-12 animate-shimmer"></div>
                        </div>

                        {/* 3. Expected Time Ghost - Now mapped to visual segments correctly */}
                        <div
                            className="absolute top-40 bottom-40 w-0.5 bg-blue-500/50 z-30 pointer-events-none"
                            style={{ left: `${visualTimeProgress}%` }}
                        >
                            <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
                        </div>

                        {/* 4. Milestones - Dual Track System */}
                        {/* Position updated to top-48 to match track. Fixed alignment to left-8 right-8 */}
                        <div className="absolute top-48 left-8 right-8 h-3 z-40 pointer-events-none">
                            {milestones.map((m, idx) => {
                                const isPhase = m.type === 'PHASE';

                                // Increased Separation: top-24/bottom-24 (6rem / 96px spacing) was 16
                                const verticalClass = isPhase ? 'top-24' : 'bottom-24';
                                // Stems extended to h-24 to reach the line
                                const stemClass = isPhase ? 'top-0 h-24' : 'bottom-0 h-24';

                                // Always Central Tooltips
                                const tooltipPositionClass = isPhase
                                    ? "top-full mt-2 left-1/2 -translate-x-1/2 origin-top"
                                    : "bottom-full mb-2 left-1/2 -translate-x-1/2 origin-bottom";

                                return (
                                    <div
                                        key={idx}
                                        className="absolute pointer-events-auto cursor-pointer"
                                        style={{ left: `${m.position}%` }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveTooltip(activeTooltip === idx ? null : idx);
                                        }}
                                    >
                                        {/* Stem connecting marker to bar */}
                                        <div className={`absolute left-0 w-px bg-slate-700 ${stemClass} -translate-x-1/2 transition-colors group-hover/marker:bg-slate-500`}></div>

                                        {/* Marker Icon */}
                                        <div className={`absolute ${verticalClass} left-0 -translate-x-1/2 flex flex-col items-center group/marker`}>
                                            <div className={`transition-all duration-300 transform hover:scale-110
                                    ${isPhase
                                                    ? `w-8 h-8 flex items-center justify-center rounded-full border-2 shadow-lg ${m.completed ? 'bg-slate-900 border-green-400 text-green-400' : 'bg-slate-950 border-slate-700 text-slate-600'}`
                                                    : `w-3 h-3 rounded-full border-2 ${m.completed ? 'bg-white border-aws-orange' : 'bg-slate-900 border-slate-600 hover:border-aws-orange'}`
                                                }`}
                                            >
                                                {isPhase && <span className="text-[10px]">{m.completed ? '🏆' : '🔒'}</span>}
                                            </div>

                                            {/* Tooltip */}
                                            <div className={`absolute ${tooltipPositionClass} transition-all duration-200 bg-slate-900 text-xs text-white p-3 rounded-lg border border-slate-700 whitespace-nowrap shadow-2xl z-50
                                    ${activeTooltip === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                                `}>
                                                <div className="font-bold flex items-center gap-2 mb-1">
                                                    {isPhase
                                                        ? <span className={m.completed ? "text-green-400" : "text-yellow-400"}>{m.completed ? "★ CERTIFIED" : "★ EXAM MILESTONE"}</span>
                                                        : <span className="text-blue-400">📘 COURSE</span>}
                                                </div>
                                                <div className="text-slate-200">{m.label}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
