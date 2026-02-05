import React, { useState, useEffect, useMemo } from 'react';
import { Phase } from '../types';
import { ClockIcon, CalendarIcon } from './Icons';

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
        let totalMinutes = 0;
        let completedMinutes = 0;

        phases.forEach(p => {
            p.courses.forEach(c => {
                c.modules.forEach(m => {
                    m.lessons.forEach(l => {
                        const mins = parseDuration(l.duration);
                        totalMinutes += mins;
                        if (l.isCompleted) completedMinutes += mins;
                    });
                });
            });
        });

        const remainingMinutes = totalMinutes - completedMinutes;
        const now = Date.now();
        const daysElapsed = Math.max(1, (now - startDate) / (1000 * 60 * 60 * 24)); // Minimum 1 day to avoid Infinity

        // Current Pace Calculation
        const currentPaceMinPerDay = completedMinutes / daysElapsed;
        // Handle edge case where user has 0 progress (assume a default reasonable pace or show infinite)
        // Defaulting to 1 hour/day if 0 progress to show *something* initially
        const effectiveCurrentPace = currentPaceMinPerDay === 0 ? 60 : currentPaceMinPerDay;

        const daysRemainingCurrent = remainingMinutes / effectiveCurrentPace;

        // Manual Pace Calculation
        const manualPaceMinPerDay = manualHours * 60;
        const daysRemainingManual = remainingMinutes / manualPaceMinPerDay;

        const projectedDateCurrent = new Date(now + daysRemainingCurrent * 24 * 60 * 60 * 1000);
        const projectedDateManual = new Date(now + daysRemainingManual * 24 * 60 * 60 * 1000);

        return {
            totalMinutes,
            completedMinutes,
            remainingMinutes,
            daysElapsed,
            currentPaceMinPerDay,
            daysRemainingCurrent,
            daysRemainingManual,
            projectedDateCurrent,
            projectedDateManual
        };
    }, [phases, startDate, manualHours]);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const getRelativeTime = (date: Date) => {
        const months = (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30.416); // Approx months
        if (months < 1) {
            const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            return `${days} Days`;
        }
        return `${months.toFixed(1)} Months`;
    };

    return (
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/5 shadow-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/20 transition-all"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5 text-purple-400" />
                            Completion Projection
                        </h3>
                        <p className="text-slate-400 text-xs mt-1">
                            Est. Finish Date based on your pace.
                        </p>
                    </div>

                    <div className="flex bg-slate-950 rounded-lg p-1 border border-white/5">
                        <button
                            onClick={() => setMode('CURRENT')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${mode === 'CURRENT' ? 'bg-purple-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Current Pace
                        </button>
                        <button
                            onClick={() => setMode('MANUAL')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${mode === 'MANUAL' ? 'bg-aws-orange text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            "What If" Mode
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">

                    {/* Visual Date Display */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">
                            {mode === 'CURRENT' ? 'FORECASTED FINISH LINE' : 'TARGET FINISH LINE'}
                        </div>
                        <div className={`text-4xl md:text-5xl font-black mb-2 tracking-tight ${mode === 'CURRENT' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-aws-orange to-yellow-400'}`}>
                            {formatDate(mode === 'CURRENT' ? stats.projectedDateCurrent : stats.projectedDateManual)}
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                            <div className="text-sm font-mono text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
                                In approx {getRelativeTime(mode === 'CURRENT' ? stats.projectedDateCurrent : stats.projectedDateManual)}
                            </div>
                            {mode === 'CURRENT' && stats.currentPaceMinPerDay > 0 && (
                                <div className="text-xs text-slate-500">
                                    Aug Pace: {(stats.currentPaceMinPerDay / 60).toFixed(1)} hrs/day
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Controls / Stats */}
                    <div className="w-full md:w-64 bg-slate-950/50 rounded-xl p-4 border border-white/5">
                        {mode === 'CURRENT' ? (
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                                        <span>Total Content</span>
                                        <span className="text-white">{(stats.totalMinutes / 60).toFixed(0)} Hrs</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-purple-500 h-full" style={{ width: `${(stats.completedMinutes / stats.totalMinutes) * 100}%` }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                                        <span>Work Remaining</span>
                                        <span className="text-white">{(stats.remainingMinutes / 60).toFixed(0)} Hrs</span>
                                    </div>
                                </div>
                                <div className="text-[10px] text-slate-500 italic mt-2 border-t border-white/5 pt-2">
                                    * Based on your average velocity since {new Date(startDate).toLocaleDateString()}.
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="flex justify-between text-xs font-bold text-slate-300 mb-3">
                                        <span>Daily Commitment</span>
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
                                <div className="text-[10px] text-slate-500 italic mt-2 border-t border-white/5 pt-2">
                                    * Adjusting this slider recalculates the estimated completion date instantly.
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
