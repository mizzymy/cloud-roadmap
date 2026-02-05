import React, { useState } from 'react';
import { MetricTracking, Course } from '../types';
import { ClockIcon, CheckCircleIcon } from './Icons';

interface Props {
    course: Course;
    onUpdate: (updates: Partial<Course>) => void;
}

export const MetricTracker: React.FC<Props> = ({ course, onUpdate }) => {
    const tracking = course.tracking;
    if (!tracking) return null;

    const [inputValue, setInputValue] = useState<string>('');

    const handleAdd = (amount: number) => {
        const newCurrent = tracking.current + amount;
        const newHistory = [
            ...tracking.history,
            { date: new Date().toISOString(), value: amount }
        ];

        onUpdate({
            ...course,
            tracking: {
                ...tracking,
                current: newCurrent,
                history: newHistory
            }
        });
        setInputValue('');
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseInt(inputValue);
        if (!isNaN(val) && val !== 0) {
            handleAdd(val);
        }
    };

    const progressPct = tracking.target
        ? Math.min(100, (tracking.current / tracking.target) * 100)
        : 0;

    const isTime = tracking.mode === 'TIME';

    return (
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-6">

            {/* Header Stats */}
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">
                        {isTime ? 'Time Invested' : 'Progress'}
                    </h3>
                    <div className="text-4xl font-bold text-white flex items-baseline gap-2">
                        {tracking.current}
                        <span className="text-lg text-slate-500 font-normal">{tracking.unit}</span>
                    </div>
                </div>
                {tracking.target && (
                    <div className="text-right">
                        <div className="text-slate-400 text-xs uppercase mb-1">Goal</div>
                        <div className="text-xl font-mono text-white">/ {tracking.target}</div>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            {tracking.target && (
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative">
                    <div
                        className={`h-full transition-all duration-700 ${progressPct >= 100 ? 'bg-green-500' : 'bg-aws-orange'}`}
                        style={{ width: `${progressPct}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md">
                        {Math.round(progressPct)}%
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-3">
                <div className="text-xs text-slate-500 uppercase font-semibold">Quick Log</div>
                <div className="grid grid-cols-3 gap-3">
                    {isTime ? (
                        <>
                            <button onClick={() => handleAdd(15)} className="bg-slate-800 hover:bg-slate-700 text-white rounded-lg py-3 font-medium transition flex flex-col items-center">
                                <span className="text-xs text-slate-400">+15</span>
                                <span>mins</span>
                            </button>
                            <button onClick={() => handleAdd(30)} className="bg-slate-800 hover:bg-slate-700 text-white rounded-lg py-3 font-medium transition flex flex-col items-center">
                                <span className="text-xs text-slate-400">+30</span>
                                <span>mins</span>
                            </button>
                            <button onClick={() => handleAdd(60)} className="bg-slate-800 hover:bg-slate-700 text-white rounded-lg py-3 font-medium transition flex flex-col items-center">
                                <span className="text-xs text-slate-400">+1</span>
                                <span>hour</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => handleAdd(5)} className="bg-slate-800 hover:bg-slate-700 text-white rounded-lg py-3 font-medium transition flex flex-col items-center">
                                <span className="text-xs text-slate-400">+5</span>
                                <span>words</span>
                            </button>
                            <button onClick={() => handleAdd(10)} className="bg-slate-800 hover:bg-slate-700 text-white rounded-lg py-3 font-medium transition flex flex-col items-center">
                                <span className="text-xs text-slate-400">+10</span>
                                <span>words</span>
                            </button>
                            <button onClick={() => handleAdd(25)} className="bg-slate-800 hover:bg-slate-700 text-white rounded-lg py-3 font-medium transition flex flex-col items-center">
                                <span className="text-xs text-slate-400">+25</span>
                                <span>words</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Manual Input */}
            <form onSubmit={handleManualSubmit} className="flex gap-2 bg-slate-800 p-2 rounded-lg border border-slate-700">
                <input
                    type="number"
                    placeholder="Custom amount..."
                    className="bg-transparent px-2 text-white placeholder-slate-500 focus:outline-none flex-1"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" disabled={!inputValue} className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white px-4 py-2 rounded font-medium transition">
                    Log
                </button>
            </form>

            {/* History Table (Mini) */}
            <div className="pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-500 uppercase font-semibold mb-3">Recent Activity</div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {tracking.history.length === 0 && <div className="text-slate-600 text-sm italic">No activity yet. Start tracking!</div>}
                    {[...tracking.history].reverse().map((entry, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                            <span className="text-slate-400">{new Date(entry.date).toLocaleDateString()} {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            <span className={entry.value > 0 ? 'text-green-400' : 'text-red-400'}>
                                {entry.value > 0 ? '+' : ''}{entry.value} {tracking.unit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
