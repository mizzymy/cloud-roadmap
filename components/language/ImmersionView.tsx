import React, { useState, useEffect } from 'react';
import { PlayIcon, CheckCircleIcon, EarthIcon, ActivityIcon } from '../Icons';

export const ImmersionView: React.FC = () => {
    const [dailyGoal, setDailyGoal] = useState(60); // minutes
    const [todayMinutes, setTodayMinutes] = useState(0);

    // Local Storage Persistence
    useEffect(() => {
        const savedMinutes = localStorage.getItem('language_roadmap_immersion_minutes');
        if (savedMinutes) {
            setTodayMinutes(parseInt(savedMinutes, 10));
        }
    }, []);

    const addMinutes = (mins: number) => {
        const newTotal = todayMinutes + mins;
        setTodayMinutes(newTotal);
        localStorage.setItem('language_roadmap_immersion_minutes', newTotal.toString());
    };

    const progress = Math.min((todayMinutes / dailyGoal) * 100, 100);

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <EarthIcon className="w-8 h-8 text-blue-400" />
                    Immersion Hub
                </h2>
                <p className="text-slate-400 mt-2">Input is the only way to acquire a language. Track your listening and reading.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Daily Goal card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-center flex flex-col items-center justify-center">
                    <div className="text-slate-400 text-sm mb-4">Today's Input</div>
                    
                    <div className="relative w-48 h-48 flex items-center justify-center mb-4">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                            <circle 
                                cx="96" cy="96" r="88" 
                                stroke="currentColor" 
                                strokeWidth="12" 
                                fill="transparent" 
                                strokeDasharray={2 * Math.PI * 88}
                                strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
                                className="text-blue-500 transition-all duration-1000 ease-out" 
                                strokeLinecap="round" 
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-white">{todayMinutes}</span>
                            <span className="text-sm text-slate-400">/ {dailyGoal} min</span>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-center">
                        <button onClick={() => addMinutes(15)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white transition">+15m</button>
                        <button onClick={() => addMinutes(30)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white transition">+30m</button>
                        <button onClick={() => addMinutes(60)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm text-white transition">+1h</button>
                    </div>
                </div>

                {/* Media Queue */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-white"><PlayIcon className="w-5 h-5 text-red-500" /> Media Queue</h3>
                    </div>
                    
                    <div className="space-y-4 flex-1 overflow-y-auto">
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 transition cursor-pointer flex gap-4">
                            <div className="w-16 h-16 bg-slate-800 rounded-lg flex-shrink-0 flex items-center justify-center">📺</div>
                            <div>
                                <h4 className="font-bold text-white">Casa de Papel (S1E4)</h4>
                                <p className="text-xs text-slate-400 mt-1">Netflix • 45m</p>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 transition cursor-pointer flex gap-4">
                            <div className="w-16 h-16 bg-slate-800 rounded-lg flex-shrink-0 flex items-center justify-center">🎧</div>
                            <div>
                                <h4 className="font-bold text-white">Radio Ambulante</h4>
                                <p className="text-xs text-slate-400 mt-1">Podcast • 30m</p>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 transition cursor-pointer flex gap-4 opacity-50">
                            <div className="w-16 h-16 bg-slate-800 rounded-lg flex-shrink-0 flex items-center justify-center relative">
                                📖
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg"><CheckCircleIcon className="w-6 h-6 text-green-400" /></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Harry Potter y la piedra...</h4>
                                <p className="text-xs text-slate-400 mt-1">Reading • Ch 2</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comprehension Strategies */}
                <div className="lg:col-span-2 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-lg font-bold text-blue-300 mb-4 flex items-center gap-2"><ActivityIcon className="w-5 h-5" /> Comprehension Tips</h3>
                    <ul className="text-sm text-slate-300 space-y-2 list-disc pl-5">
                        <li>Listen without subtitles first, then re-watch with target language subtitles.</li>
                        <li>Don't stop reading to look up every word. Try to infer from context.</li>
                        <li>Find material that is <strong>comprehensible</strong>—you should understand about 80% without a dictionary.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
