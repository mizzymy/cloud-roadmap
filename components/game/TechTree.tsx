import React from 'react';
import { Shield, Zap, TrendingUp, DollarSign, Crosshair, Box } from 'lucide-react';
import { GameStats } from './useGameRewards';

interface Props {
    stats: GameStats;
    onPurchase: (id: string, cost: number) => boolean;
    onClose: () => void;
}

interface TechNode {
    id: string;
    name: string;
    description: string;
    cost: (level: number) => number;
    effect: (level: number) => string;
    maxLevel: number;
    icon: React.ReactNode;
}

const TECH_NODES: TechNode[] = [
    {
        id: 'SAVINGS_PLAN',
        name: 'Savings Plan',
        description: 'Increase starting budget for every mission.',
        cost: (lvl) => 2 + lvl,
        effect: (lvl) => `+$${lvl * 100} Starting Budget`,
        maxLevel: 10,
        icon: <DollarSign size={24} className="text-green-400" />
    },
    {
        id: 'EDGE_LOCATIONS',
        name: 'Edge Locations',
        description: 'Expand the reach of your security perimeter.',
        cost: (lvl) => 3 + (lvl * 2),
        effect: (lvl) => `+${lvl * 5}% Tower Range`,
        maxLevel: 5,
        icon: <Crosshair size={24} className="text-blue-400" />
    },
    {
        id: 'PROVISIONED_CONCURRENCY',
        name: 'Warm Pools',
        description: 'Reduce latency for rapid response units.',
        cost: (lvl) => 5 + (lvl * 2),
        effect: (lvl) => `+${lvl * 5}% Fire Rate`,
        maxLevel: 5,
        icon: <Zap size={24} className="text-yellow-400" />
    }
];

export const TechTree: React.FC<Props> = ({ stats, onPurchase, onClose }) => {
    return (
        <div className="absolute inset-0 bg-slate-900/95 z-50 p-8 flex flex-col backdrop-blur-xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                <div>
                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                        <Box className="text-purple-500" />
                        ARCHITECTURE LABORATORY
                    </h2>
                    <p className="text-slate-400 italic">Spend Architecture Points to permanently upgrade defenses.</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-xs text-slate-500 uppercase tracking-widest">Available Points</div>
                        <div className="text-4xl font-mono font-bold text-amber-400">{stats.architecturePoints} AP</div>
                    </div>
                    <button onClick={onClose} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-bold transition-colors">
                        RETURN TO OPERATION
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TECH_NODES.map(node => {
                    const currentLevel = stats.upgrades[node.id] || 0;
                    const nextCost = node.cost(currentLevel);
                    const isMaxed = currentLevel >= node.maxLevel;
                    const canAfford = stats.architecturePoints >= nextCost;

                    return (
                        <div key={node.id} className="bg-slate-800 border border-slate-600 rounded-xl p-6 flex flex-col shadow-xl hover:border-slate-500 transition-all group relative overflow-hidden">
                            {/* Background Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-900/50 pointer-events-none"></div>

                            <div className="flex justify-between items-start mb-4 relative">
                                <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 group-hover:border-purple-500/50 transition-colors">
                                    {node.icon}
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-slate-500 uppercase font-bold">Level</div>
                                    <div className="text-2xl font-mono text-white">{currentLevel} <span className="text-slate-600 text-base">/ {node.maxLevel}</span></div>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-200 mb-2 relative">{node.name}</h3>
                            <p className="text-sm text-slate-400 mb-6 flex-1 relative">{node.description}</p>

                            <div className="bg-slate-900/50 p-3 rounded-lg mb-6 border border-slate-700/50 relative">
                                <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Current Effect</div>
                                <div className="text-green-400 font-mono font-bold">{node.effect(currentLevel)}</div>
                            </div>

                            <button
                                onClick={() => !isMaxed && canAfford && onPurchase(node.id, nextCost)}
                                disabled={isMaxed || !canAfford}
                                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all relative
                                    ${isMaxed
                                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                        : canAfford
                                            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/20'
                                            : 'bg-slate-700 text-slate-500 opacity-50 cursor-not-allowed'
                                    }`}
                            >
                                {isMaxed ? 'MAXIMUM LEVEL' : (
                                    <>
                                        RESEARCH
                                        <span className="bg-black/30 px-2 py-0.5 rounded text-xs ml-1 flex items-center gap-1">
                                            {nextCost} AP
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
