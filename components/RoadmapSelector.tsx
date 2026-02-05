import React, { useState } from 'react';
import { useRoadmap } from '../context/RoadmapContext';
import { PlusIcon, TrashIcon } from './Icons';

export const RoadmapSelector: React.FC = () => {
    const { roadmaps, selectRoadmap, createRoadmap, deleteRoadmap } = useRoadmap();
    const [isCreating, setIsCreating] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        await createRoadmap(newTitle, 'BLUE', 'Custom roadmap');
        setNewTitle('');
        setIsCreating(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-8 relative overflow-hidden selection:bg-aws-orange/30">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent opacity-50 z-0"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-aws-orange/5 rounded-full blur-[100px] z-0"></div>

            <div className="relative z-10 w-full max-w-5xl">
                <header className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-aws-orange to-red-600 rounded-2xl shadow-lg shadow-orange-500/20 mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Access Terminal</h1>
                    <p className="text-slate-400 text-lg">Select a learning roadmap to initialize workspace.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* New Roadmap Card */}
                    <button
                        onClick={() => setIsCreating(true)}
                        className="group relative flex flex-col items-center justify-center h-64 bg-slate-900/50 backdrop-blur-sm border-2 border-dashed border-slate-700/50 rounded-2xl hover:border-aws-orange/50 hover:bg-slate-900/80 transition-all duration-300"
                    >
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform mb-4 group-hover:bg-aws-orange/20">
                            <PlusIcon className="w-6 h-6 text-slate-400 group-hover:text-aws-orange" />
                        </div>
                        <span className="font-medium text-slate-400 group-hover:text-white transition-colors">Initialize New Protocol</span>
                    </button>

                    {/* Existing Roadmaps */}
                    {roadmaps.map(roadmap => (
                        <div key={roadmap.id} className="group relative bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-aws-orange/30 hover:shadow-2xl hover:shadow-aws-orange/5 transition-all duration-300 flex flex-col h-64">
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => { e.stopPropagation(); deleteRoadmap(roadmap.id); }}
                                    className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-500 transition-colors"
                                    title="Archive Protocol"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>

                            <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br ${roadmap.theme === 'ORANGE' ? 'from-aws-orange to-red-600 shadow-orange-500/10' : 'from-blue-500 to-indigo-600 shadow-blue-500/10'} shadow-lg`}>
                                <span className="text-white font-bold text-lg">{roadmap.title.substring(0, 2).toUpperCase()}</span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{roadmap.title}</h3>
                            <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-1">{roadmap.description}</p>

                            <button
                                onClick={() => selectRoadmap(roadmap.id)}
                                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-colors border border-white/5 flex items-center justify-center gap-2 group-hover:border-aws-orange/20"
                            >
                                <span>Launch Workspace</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Create Modal Overlay */}
                {isCreating && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                            <h2 className="text-2xl font-bold text-white mb-2">Initialize Protocol</h2>
                            <p className="text-slate-400 text-sm mb-6">Create a new learning roadmap to track your progress.</p>

                            <form onSubmit={handleCreate}>
                                <div className="space-y-4 mb-8">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Protocol Name</label>
                                        <input
                                            autoFocus
                                            type="text"
                                            value={newTitle}
                                            onChange={e => setNewTitle(e.target.value)}
                                            placeholder="e.g. Python Mastery"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-aws-orange/50 focus:ring-1 focus:ring-aws-orange/50 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreating(false)}
                                        className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!newTitle.trim()}
                                        className="flex-1 px-4 py-3 bg-aws-orange hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/20"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
