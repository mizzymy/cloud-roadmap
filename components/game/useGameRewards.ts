import { useState, useEffect } from 'react';

export interface GameStats {
    totalXP: number;
    totalKills: number;
    highestWave: number;
    badges: string[]; // IDs of unlocked badges
    architecturePoints: number; // Currency for upgrades
    upgrades: Record<string, number>; // upgradeId -> level
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    requirement: (stats: GameStats) => boolean;
}

const BADGES: Badge[] = [
    {
        id: 'vpc_veteran',
        name: 'VPC Veteran',
        description: 'Reach Wave 5.',
        icon: '🛡️',
        requirement: (s) => s.highestWave >= 5
    },
    {
        id: 'zero_trust_hero',
        name: 'Zero Trust Hero',
        description: 'Eliminate 50 Enemies.',
        icon: '⚔️',
        requirement: (s) => s.totalKills >= 50
    },
    {
        id: 'architect_elite',
        name: 'Architect Elite',
        description: 'Reach Wave 10.',
        icon: '🏛️',
        requirement: (s) => s.highestWave >= 10
    }
];

const STORAGE_KEY = 'cloud_defender_stats_v1';

export const useGameRewards = () => {
    const [stats, setStats] = useState<GameStats>({
        totalXP: 0,
        totalKills: 0,
        highestWave: 0,
        badges: [],
        architecturePoints: 0,
        upgrades: {}
    });

    const [newUnlocks, setNewUnlocks] = useState<Badge[]>([]);

    // 1. Load from Storage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                // Merge with default to handle schema migrations
                setStats(prev => ({ ...prev, ...JSON.parse(stored) }));
            } catch (e) { console.error("Failed to load game stats", e); }
        }
    }, []);

    // 2. Persist to Storage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    }, [stats]);

    const addXP = (amount: number) => {
        setStats(prev => ({ ...prev, totalXP: prev.totalXP + amount }));
    };

    const recordWaveComplete = (wave: number) => {
        setStats(prev => {
            const next = {
                ...prev,
                highestWave: Math.max(prev.highestWave, wave),
                architecturePoints: prev.architecturePoints + 1 // +1 Point per wave
            };
            checkBadges(next);
            return next;
        });
        addXP(50 + (wave * 10)); // Bonus XP for waves
    };

    const recordKill = (enemyType: string) => {
        setStats(prev => {
            const next = {
                ...prev,
                totalKills: prev.totalKills + 1
            };
            checkBadges(next);
            return next;
        });
        addXP(10); // Base Kill XP
    };

    const checkBadges = (currentStats: GameStats) => {
        BADGES.forEach(badge => {
            if (!currentStats.badges.includes(badge.id)) {
                if (badge.requirement(currentStats)) {
                    // Unlock!
                    setStats(prev => ({
                        ...prev,
                        badges: [...prev.badges, badge.id],
                        architecturePoints: prev.architecturePoints + 5 // +5 Points for Badges
                    }));
                    setNewUnlocks(prev => [...prev, badge]);
                    addXP(500); // Big Badge Bonus
                }
            }
        });
    };

    const purchaseUpgrade = (id: string, cost: number) => {
        if (stats.architecturePoints >= cost) {
            setStats(prev => ({
                ...prev,
                architecturePoints: prev.architecturePoints - cost,
                upgrades: {
                    ...prev.upgrades,
                    [id]: (prev.upgrades[id] || 0) + 1
                }
            }));
            return true;
        }
        return false;
    };

    const clearNewUnlocks = () => setNewUnlocks([]);

    return { stats, addXP, recordWaveComplete, recordKill, purchaseUpgrade, newUnlocks, clearNewUnlocks };
};
