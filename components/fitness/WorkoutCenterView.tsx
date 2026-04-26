import React, { useState, useEffect } from 'react';
import { DumbbellIcon, PlayIcon, CheckCircleIcon } from '../Icons';

export const WorkoutCenterView: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(45); // seconds per set
    const [isRunning, setIsRunning] = useState(false);
    const [currentSet, setCurrentSet] = useState(1);
    const totalSets = 4;

    // Local Storage Persistence
    useEffect(() => {
        const savedSet = localStorage.getItem('fitness_roadmap_current_set');
        if (savedSet) {
            setCurrentSet(parseInt(savedSet, 10));
        }
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            // End of set logic or sound
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const toggleTimer = () => setIsRunning(!isRunning);
    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(45);
    };

    const nextSet = () => {
        if (currentSet < totalSets) {
            const next = currentSet + 1;
            setCurrentSet(next);
            localStorage.setItem('fitness_roadmap_current_set', next.toString());
            resetTimer();
        } else if (currentSet === totalSets) {
             const next = currentSet + 1;
             setCurrentSet(next);
             localStorage.setItem('fitness_roadmap_current_set', next.toString());
             resetTimer();
        }
    };

    const resetCircuit = () => {
        setCurrentSet(1);
        localStorage.setItem('fitness_roadmap_current_set', '1');
        resetTimer();
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
            <header className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/20 text-orange-500 mb-4">
                    <DumbbellIcon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-white">Workout Center</h2>
                <p className="text-slate-400 mt-2">Low-impact joint reconstruction. Focus on control and stability.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Circuit Timer */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
                    <h3 className="text-xl font-bold text-white mb-6">Set Timer</h3>
                    
                    <div className="relative flex justify-center items-center mb-8">
                        {/* Circular Timer Visual */}
                        <svg className="w-48 h-48 transform -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                            <circle 
                                cx="96" cy="96" r="88" 
                                stroke="currentColor" 
                                strokeWidth="8" 
                                fill="transparent" 
                                strokeDasharray={2 * Math.PI * 88}
                                strokeDashoffset={2 * Math.PI * 88 * (1 - timeLeft / 45)}
                                className={`${timeLeft <= 10 ? 'text-red-500' : 'text-orange-500'} transition-all ease-linear`} 
                                style={{ transitionDuration: isRunning ? '1s' : '0s' }}
                                strokeLinecap="round" 
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-6xl font-mono font-black text-white">{timeLeft}</span>
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">SECONDS</span>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full">
                        <button onClick={resetTimer} className="flex-1 py-3 text-slate-400 font-bold uppercase tracking-wider rounded-xl border border-slate-700 hover:bg-slate-800 transition">Reset</button>
                        <button onClick={toggleTimer} className={`flex-1 py-3 font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition ${isRunning ? 'bg-orange-500/20 text-orange-500 border border-orange-500/50' : 'bg-orange-500 text-slate-900 hover:bg-orange-400'}`}>
                            {isRunning ? 'Pause' : <><PlayIcon className="w-5 h-5 fill-current" /> Start</>}
                        </button>
                    </div>
                </div>

                {/* Workout Tracker */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Stability Circuit</h3>
                        <span className="bg-orange-500/20 text-orange-500 font-bold px-3 py-1 rounded-lg text-sm">
                            {currentSet > totalSets ? 'Complete' : `Set ${currentSet} / ${totalSets}`}
                        </span>
                    </div>

                    <div className="space-y-4 flex-1">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-700">
                            <h4 className="font-bold text-white mb-1">Single-Leg Glute Bridges</h4>
                            <p className="text-sm text-slate-400">12 reps/leg. Focus on glute activation, keep hips level.</p>
                        </div>
                        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                            <h4 className="font-bold text-white mb-1">Deadbugs</h4>
                            <p className="text-sm text-slate-400">20 reps alternating. Press lower back firm into floor.</p>
                        </div>
                        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                            <h4 className="font-bold text-white mb-1">Incline Pushups / Planks</h4>
                            <p className="text-sm text-slate-400">45 sec plank or 15 incline pushups. Core braced.</p>
                        </div>
                    </div>

                    {currentSet > totalSets ? (
                         <button onClick={resetCircuit} className="mt-6 w-full py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-bold rounded-xl transition flex items-center justify-center gap-2">
                             <CheckCircleIcon className="w-5 h-5" /> Circuit Complete - Reset?
                         </button>
                    ) : (
                        <button onClick={nextSet} className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition">
                            Log Set & Next
                        </button>
                    )}
                </div>
            </div>
            
        </div>
    );
};
