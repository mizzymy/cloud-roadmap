import React, { useState, useEffect } from 'react';
import { FlagIcon, CheckCircleIcon, CalendarIcon, ActivityIcon } from '../Icons';

interface RunLogEntry {
    id: string;
    date: string;
    distance: string;
    pace: string;
    time: string;
    painScore: number;
}

export const RacePrepView: React.FC = () => {
    const defaultGear = [
        { id: 1, item: 'Trail Running Shoes (Deep lugs)', completed: false },
        { id: 2, item: 'Moisture-Wicking Base Layer', completed: false },
        { id: 3, item: 'Hydration Vest / Pack', completed: false },
        { id: 4, item: 'Anti-Chafing Balm', completed: false },
        { id: 5, item: 'Energy Gels (Min. 3)', completed: false },
        { id: 6, item: 'Change of clothes & towel for after', completed: false }
    ];

    const [gearChecklist, setGearChecklist] = useState(defaultGear);
    const [runLogs, setRunLogs] = useState<RunLogEntry[]>([]);
    
    // New log form state
    const [newDistance, setNewDistance] = useState('');
    const [newPace, setNewPace] = useState('');
    const [newTime, setNewTime] = useState('');
    const [newPainScore, setNewPainScore] = useState(1);

    // Initial load from localStorage
    useEffect(() => {
        const savedGear = localStorage.getItem('fitness_roadmap_gear');
        if (savedGear) {
            try {
                setGearChecklist(JSON.parse(savedGear));
            } catch (e) { console.error('Failed to parse gear', e); }
        }

        const savedLogs = localStorage.getItem('fitness_roadmap_run_logs');
        if (savedLogs) {
            try {
                setRunLogs(JSON.parse(savedLogs));
            } catch (e) { console.error('Failed to parse logs', e); }
        }
    }, []);

    const toggleGear = (id: number) => {
        const newChecklist = gearChecklist.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
        setGearChecklist(newChecklist);
        localStorage.setItem('fitness_roadmap_gear', JSON.stringify(newChecklist));
    };

    const addRunLog = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDistance || !newPace || !newTime) return;

        const newLog: RunLogEntry = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            distance: newDistance,
            pace: newPace,
            time: newTime,
            painScore: newPainScore
        };

        const updatedLogs = [newLog, ...runLogs];
        setRunLogs(updatedLogs);
        localStorage.setItem('fitness_roadmap_run_logs', JSON.stringify(updatedLogs));

        // Reset form
        setNewDistance('');
        setNewPace('');
        setNewTime('');
        setNewPainScore(1);
    };

    const deleteLog = (id: string) => {
        const updatedLogs = runLogs.filter(log => log.id !== id);
        setRunLogs(updatedLogs);
        localStorage.setItem('fitness_roadmap_run_logs', JSON.stringify(updatedLogs));
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <FlagIcon className="w-8 h-8 text-orange-500" />
                    Race Prep & Log
                </h2>
                <p className="text-slate-400 mt-2">Gear up. Prepare for the mud. Conquer the obstacles safely.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Event Countdown */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-orange-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
                    
                    <div className="flex items-center gap-2 mb-6">
                        <CalendarIcon className="w-5 h-5 text-orange-500" />
                        <span className="font-semibold text-orange-400 uppercase tracking-widest text-sm">Next Event</span>
                    </div>

                    <h3 className="text-4xl font-black text-white italic tracking-tighter mb-2">TOUGH MUDDER 10K</h3>
                    <p className="text-slate-400 text-sm mb-8">South West, UK • August 12, 2026</p>

                    <div className="flex gap-4">
                        <div className="bg-slate-950 rounded-xl p-4 flex-1 text-center border border-slate-700">
                            <div className="text-3xl font-black text-white">45</div>
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Days</div>
                        </div>
                        <div className="bg-slate-950 rounded-xl p-4 flex-1 text-center border border-slate-700">
                            <div className="text-3xl font-black text-white">20</div>
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Obstacles</div>
                        </div>
                    </div>
                </div>

                {/* Gear Checklist */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Gear Checklist</h3>
                        <span className="text-sm text-slate-500 bg-slate-800 px-3 py-1 rounded-full">
                            {gearChecklist.filter(g => g.completed).length}/{gearChecklist.length}
                        </span>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto">
                        {gearChecklist.map(gear => (
                            <div 
                                key={gear.id} 
                                onClick={() => toggleGear(gear.id)}
                                className={`flex items-center gap-4 p-4 rounded-xl border transition cursor-pointer ${gear.completed ? 'bg-slate-800/50 border-slate-700 opacity-60' : 'bg-slate-800 border-slate-600 hover:border-orange-500/50'}`}
                            >
                                <div className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full border-2 ${gear.completed ? 'bg-green-500 border-green-500 text-slate-900' : 'border-slate-500'}`}>
                                    {gear.completed && <CheckCircleIcon className="w-4 h-4" />}
                                </div>
                                <span className={`font-medium ${gear.completed ? 'line-through text-slate-400' : 'text-white'}`}>{gear.item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Run & Pain Logger */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <ActivityIcon className="w-6 h-6 text-orange-500" />
                        Run & Joint Health Logger
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">Track your runs from Strava and actively monitor your knee pain load.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Add Log Form */}
                    <div className="p-6 bg-slate-950 lg:border-r border-slate-800">
                        <form onSubmit={addRunLog} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Distance (km)</label>
                                <input required type="number" step="0.01" value={newDistance} onChange={e => setNewDistance(e.target.value)} placeholder="e.g. 1.76" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition"/>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pace (min/km)</label>
                                <input required type="text" value={newPace} onChange={e => setNewPace(e.target.value)} placeholder="e.g. 7:39" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition"/>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Time</label>
                                <input required type="text" value={newTime} onChange={e => setNewTime(e.target.value)} placeholder="e.g. 13:25" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition"/>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Knee Pain Score (1-10)</label>
                                <div className="flex items-center gap-4">
                                    <input required type="range" min="1" max="10" value={newPainScore} onChange={e => setNewPainScore(parseInt(e.target.value))} className="flex-1 accent-orange-500"/>
                                    <span className={`font-bold w-6 text-center ${newPainScore > 6 ? 'text-red-500' : newPainScore > 3 ? 'text-orange-400' : 'text-green-400'}`}>{newPainScore}</span>
                                </div>
                            </div>
                            <button type="submit" className="w-full mt-4 bg-orange-500 hover:bg-orange-400 text-slate-900 font-bold py-3 px-4 rounded-xl transition">
                                Add Run Log
                            </button>
                        </form>
                    </div>

                    {/* Log History */}
                    <div className="p-6 lg:col-span-2 bg-slate-900">
                        {runLogs.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12">
                                <ActivityIcon className="w-12 h-12 mb-4 opacity-50" />
                                <p>No runs logged yet. Get out there!</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                                {runLogs.map(log => (
                                    <div key={log.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center group">
                                        <div className="flex gap-6">
                                            <div>
                                                <div className="text-xs text-slate-400 uppercase font-bold">{log.date}</div>
                                                <div className="text-xl font-black text-white">{log.distance} <span className="text-sm font-normal text-slate-400">km</span></div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 uppercase font-bold">Pace</div>
                                                <div className="text-lg font-bold text-white">{log.pace}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 uppercase font-bold">Time</div>
                                                <div className="text-lg font-bold text-white">{log.time}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-400 uppercase font-bold">Pain</div>
                                                <div className={`text-lg font-bold ${log.painScore > 6 ? 'text-red-500' : log.painScore > 3 ? 'text-orange-400' : 'text-green-400'}`}>
                                                    {log.painScore}/10
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => deleteLog(log.id)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition">
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
