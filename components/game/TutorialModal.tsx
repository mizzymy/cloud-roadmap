import React, { useState } from 'react';
import {
    Shield, Server, Database, Globe,
    Zap, Box, Trophy, Play,
    X, ChevronRight, ChevronLeft,
    AlertTriangle, Activity
} from 'lucide-react';

interface TutorialModalProps {
    onClose: () => void;
    onStartInteractive?: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ onClose, onStartInteractive }) => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Mission Briefing",
            icon: <Activity className="text-blue-400" />,
            content: (
                <div className="space-y-4 text-slate-300">
                    <p>
                        Welcome, Architect. Your primary objective is to maintain <b className="text-green-400">System Uptime</b>.
                    </p>
                    <p>
                        Malicious traffic is targeting your infrastructure. You must deploy AWS services to filter requests and protect your data.
                    </p>
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex items-center gap-4">
                        <div className="flex flex-col items-center">
                            <span className="text-xs uppercase tracking-widest text-slate-500">Health</span>
                            <span className="text-2xl font-mono font-bold text-green-400">100.00%</span>
                        </div>
                        <div className="flex-1 text-sm text-slate-400">
                            If this drops to <span className="text-red-400">0%</span>, the system fails and the mission is over.
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Threat Intelligence",
            icon: <AlertTriangle className="text-red-400" />,
            content: (
                <div className="space-y-4 text-slate-300">
                    <p>Identify and neutralize these incoming packet types:</p>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800 p-3 rounded border border-slate-700 flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-500 rounded-full shadow-lg shadow-red-500/50 flex items-center justify-center text-[10px] font-bold text-white">HP</div>
                            <div>
                                <div className="font-bold text-red-200">Request Bot</div>
                                <div className="text-xs text-slate-500">Basic spam traffic.</div>
                            </div>
                        </div>

                        <div className="bg-slate-800 p-3 rounded border border-slate-700 flex items-center gap-3">
                            <div className="w-6 h-6 bg-orange-400 rotate-45 rounded-sm shadow-lg shadow-orange-400/50"></div>
                            <div>
                                <div className="font-bold text-orange-200">DDoS Swarm</div>
                                <div className="text-xs text-slate-500">Fast, low health.</div>
                            </div>
                        </div>

                        <div className="bg-slate-800 p-3 rounded border border-slate-700 flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-600 rounded-md border-2 border-purple-400 shadow-lg shadow-purple-600/50"></div>
                            <div>
                                <div className="font-bold text-purple-200">SQL Snake</div>
                                <div className="text-xs text-slate-500">Tanky, high damage.</div>
                            </div>
                        </div>

                        <div className="bg-slate-800 p-3 rounded border border-slate-700 flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-600 rotate-45 border-2 border-emerald-400 shadow-lg shadow-emerald-500/50"></div>
                            <div>
                                <div className="font-bold text-emerald-200">Miner</div>
                                <div className="text-xs text-slate-500">Steals budget.</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Defense Services",
            icon: <Shield className="text-purple-400" />,
            content: (
                <div className="space-y-4 text-slate-300">
                    <p>Click any empty grid tile to deploy a service:</p>

                    <div className="space-y-2">
                        <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded">
                            <div className="p-2 bg-blue-500/20 rounded text-blue-400"><Server size={20} /></div>
                            <div className="flex-1">
                                <span className="font-bold text-blue-200">ALB (Load Balancer)</span>
                                <p className="text-xs text-slate-500">Single target rapid fire. Good basic defense.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded">
                            <div className="p-2 bg-purple-500/20 rounded text-purple-400"><Shield size={20} /></div>
                            <div className="flex-1">
                                <span className="font-bold text-purple-200">WAF (Firewall)</span>
                                <p className="text-xs text-slate-500">Area of effect damage. Essential for swarms.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-slate-800/50 p-2 rounded">
                            <div className="p-2 bg-orange-500/20 rounded text-orange-400"><Database size={20} /></div>
                            <div className="flex-1">
                                <span className="font-bold text-orange-200">RDS (Database)</span>
                                <p className="text-xs text-slate-500">Slow but high damage. Breaks armor.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Upgrades & Lab",
            icon: <Zap className="text-yellow-400" />,
            content: (
                <div className="space-y-4 text-slate-300">
                    <p>
                        To upgrade a tower, click it and select <span className="font-bold text-amber-500">VALIDATE UPGRADE</span>.
                    </p>
                    <div className="bg-amber-900/20 border border-amber-500/30 p-3 rounded text-sm text-amber-200">
                        ⚠️ <b>Warning:</b> Upgrades require passing an architecture quiz. Incorrect answers will lock the system for <span className="text-white font-bold">5-10s</span> and deduct <span className="text-red-400 font-bold">$50</span>.
                    </div>
                    <p>
                        Visit the <span className="inline-flex items-center gap-1 bg-slate-700 px-2 rounded text-white text-xs"><Box size={12} /> LAB</span> to buy global upgrades using XP <Trophy size={12} className="inline" />.
                    </p>
                </div>
            )
        }
    ];

    return (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-800 rounded-lg">{steps[step].icon}</div>
                        <h2 className="text-xl font-bold text-white">{steps[step].title}</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 overflow-y-auto bg-slate-900/50">
                    {steps[step].content}
                </div>

                {/* Footer / Navigation */}
                <div className="p-6 border-t border-slate-800 bg-slate-900 flex justify-between items-center">
                    <div className="flex gap-1">
                        {steps.map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-aws-orange w-4' : 'bg-slate-700'}`} />
                        ))}
                    </div>

                    <div className="flex gap-3">
                        {step === 0 && onStartInteractive && (
                            <button
                                onClick={onStartInteractive}
                                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-bold flex items-center gap-2 mr-auto"
                            >
                                <Play size={16} /> Skip to Training
                            </button>
                        )}

                        {step > 0 && (
                            <button
                                onClick={() => setStep(s => s - 1)}
                                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium flex items-center gap-2"
                            >
                                <ChevronLeft size={16} /> Back
                            </button>
                        )}

                        {step < steps.length - 1 ? (
                            <button
                                onClick={() => setStep(s => s + 1)}
                                className="px-4 py-2 rounded-lg bg-slate-200 text-slate-900 hover:bg-white font-bold flex items-center gap-2"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={() => onStartInteractive ? onStartInteractive() : onClose()}
                                className="px-6 py-2 rounded-lg bg-aws-orange text-white hover:bg-orange-500 font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20"
                            >
                                Start Guided Mission <Play size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
