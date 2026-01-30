
import React, { useEffect, useState } from 'react';
import { UserProfile, Achievement } from '../types';
import { Trophy, Target, Calendar, Award, Lock, CheckCircle, ChevronLeft, Shield } from 'lucide-react';

interface RewardsViewProps {
    userProfile: UserProfile;
    onBack: () => void;
}

// Mock Achievements Data (In a real app, this would come from a database or constants file)
const ALL_ACHIEVEMENTS: Achievement[] = [
    { id: '1', title: 'First Steps', description: 'Complete your first module', xpReward: 100, icon: '🚀', category: 'LEARNING', progress: 100, maxProgress: 100 },
    { id: '2', title: 'Code Warrior', description: 'Complete 10 Labs', xpReward: 500, icon: '💻', category: 'MASTERY', progress: 3, maxProgress: 10 },
    { id: '3', title: 'Consistency King', description: 'Maintain a 7-day streak', xpReward: 300, icon: '🔥', category: 'STREAK', progress: 1, maxProgress: 7 },
    { id: '4', title: 'Quiz Master', description: 'Score 100% on a quiz', xpReward: 200, icon: '🎯', category: 'MASTERY', progress: 0, maxProgress: 1 },
    { id: '5', title: 'Cloud Architect', description: 'Finish the AWS Course', xpReward: 5000, icon: '☁️', category: 'LEARNING', progress: 15, maxProgress: 100 },
    { id: '6', title: 'Night Owl', description: 'Study after midnight', xpReward: 150, icon: '🦉', category: 'STREAK', isSecret: true, progress: 0, maxProgress: 1 },
    // Locked ones for demo
    { id: '7', title: 'Network Ninja', description: 'Complete VPC Module', xpReward: 400, icon: '🕸️', category: 'MASTERY', progress: 0, maxProgress: 1 },
    { id: '8', title: 'Security Sentinel', description: 'Complete IAM Security Ops', xpReward: 450, icon: '🛡️', category: 'MASTERY', progress: 0, maxProgress: 1 },
];

export const RewardsView: React.FC<RewardsViewProps> = ({ userProfile, onBack }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        setIsVisible(true);
    }, []);

    // Level Logic
    const xpForNextLevel = userProfile.level * 1000;
    const currentLevelProgress = userProfile.xp % 1000; // Simplified for demo (assuming fixed 1000 per level base or similar)
    // Re-calculate closer to what UserStats does:
    // UserStats: progress = (profile.xp % 1000) / 1000 * 100; (Assuming 1000 per level for simplicity based on UserStats code)
    // Let's stick to the 1000 XP flat curve implied by existing code for consistency, or scale it.
    // Existing code: profile.level * 1000 is displayed as max.
    const levelMaxXp = userProfile.level * 1000;
    // Wait, UserStats says: {profile.xp} / {profile.level * 1000}
    // This implies cumulative XP? If level 1 max is 1000. Level 2 max is 2000?
    // If I have 1500 XP. Level 2. 1500 / 2000.

    const percentComplete = (userProfile.xp / levelMaxXp) * 100;

    // Rank Logic
    const getRank = (level: number) => {
        if (level < 3) return { title: 'Apprentice', icon: '🌱', color: 'from-green-400 to-emerald-600' };
        if (level < 7) return { title: 'Practitioner', icon: '⚡', color: 'from-blue-400 to-indigo-600' };
        if (level < 15) return { title: 'Architect', icon: '🏗️', color: 'from-purple-400 to-fuchsia-600' };
        return { title: 'Cloud Master', icon: '👑', color: 'from-aws-orange to-red-600' };
    };

    const rank = getRank(userProfile.level);

    return (
        <div className={`fixed inset-0 z-50 bg-slate-950 text-white overflow-y-auto transition-transform duration-500 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>

            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-aws-orange/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-6xl mx-auto p-6 md:p-12 pb-32">
                {/* Header / Nav */}
                <button
                    onClick={onBack}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
                >
                    <div className="p-2 rounded-full bg-slate-900 group-hover:bg-slate-800 border border-slate-800 group-hover:border-slate-700 transition-all">
                        <ChevronLeft className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Back to Dashboard</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Hero & Stats */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Hero Card */}
                        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
                            <div className={`absolute inset-0 bg-gradient-to-br ${rank.color} opacity-10`}></div>

                            {/* Rotating Badge */}
                            <div className="relative mb-6 group cursor-pointer">
                                <div className={`absolute inset-0 bg-gradient-to-r ${rank.color} blur-2xl opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                                {/* Hexagon Shape CSS */}
                                <div
                                    className={`w-32 h-32 flex items-center justify-center bg-gradient-to-br ${rank.color} shadow-lg relative z-10 transition-transform duration-700 group-hover:rotate-[360deg]`}
                                    style={{ clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)' }}
                                >
                                    <span className="text-5xl font-black text-white drop-shadow-md">{userProfile.level}</span>
                                </div>
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-950 px-3 py-1 rounded-full border border-slate-700 z-20 whitespace-nowrap">
                                    <span className="text-xs font-bold uppercase tracking-wider text-aws-orange">Level {userProfile.level}</span>
                                </div>
                            </div>

                            <h1 className="text-3xl font-bold mb-1">{rank.title}</h1>
                            <p className="text-slate-400 text-sm mb-6 flex items-center gap-2">
                                Current Rank <span className="text-xl">{rank.icon}</span>
                            </p>

                            {/* Progress Bar */}
                            <div className="w-full">
                                <div className="flex justify-between text-xs text-slate-400 mb-2 font-mono">
                                    <span>{userProfile.xp} XP</span>
                                    <span>{levelMaxXp} XP</span>
                                </div>
                                <div className="h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800 relative">
                                    {/* Striped Animated Bar */}
                                    <div
                                        className={`h-full bg-gradient-to-r ${rank.color} relative overflow-hidden transition-all duration-1000 ease-out`}
                                        style={{ width: `${Math.min(percentComplete, 100)}%` }}
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[spin_3s_linear_infinite_reverse]" style={{ animation: 'moveStripes 1s linear infinite' }}></div>
                                    </div>
                                </div>
                                <div className="mt-2 text-xs text-slate-500 text-right">
                                    {Math.round(levelMaxXp - userProfile.xp)} XP to Level {userProfile.level + 1}
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Streak', value: `${userProfile.streak} Days`, icon: Calendar },
                                { label: 'Total XP', value: userProfile.xp.toLocaleString(), icon: Target },
                                { label: 'Badges', value: '3/12', icon: Award }, // Mock data
                                { label: 'Certs', value: '0', icon: Trophy },     // Mock data
                            ].map((stat, i) => (
                                <div key={i} className="bg-slate-900/40 backdrop-blur border border-slate-800 p-4 rounded-2xl hover:bg-slate-800/60 transition-colors group">
                                    <stat.icon className="w-5 h-5 text-slate-400 mb-2 group-hover:text-aws-orange transition-colors" />
                                    <div className="text-xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs text-slate-500 uppercase font-semibold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Trophy Cabinet */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Award className="w-6 h-6 text-aws-orange" />
                                Achievements
                            </h2>
                            <div className="text-sm text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                                Total Unlocked: <span className="text-white font-bold">1</span> / 8
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ALL_ACHIEVEMENTS.map((ach) => {
                                // For demo, assume only first one is unlocked
                                const isUnlocked = ach.id === '1';

                                return (
                                    <div
                                        key={ach.id}
                                        className={`relative group p-4 rounded-xl border transition-all duration-300 ${isUnlocked
                                                ? 'bg-slate-900 border-aws-orange/30 hover:border-aws-orange hover:shadow-[0_0_20px_rgba(255,153,0,0.1)]'
                                                : 'bg-slate-900/30 border-slate-800 opacity-70 hover:opacity-100'
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon Box */}
                                            <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-2xl shadow-inner ${isUnlocked
                                                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
                                                    : 'bg-slate-950 border border-slate-800 grayscale'
                                                }`}>
                                                {isUnlocked ? ach.icon : <Lock className="w-5 h-5 text-slate-600" />}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className={`font-bold ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>{ach.title}</h3>
                                                    {isUnlocked && <CheckCircle className="w-4 h-4 text-green-500" />}
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ach.description}</p>

                                                {/* XP Reward or Cost */}
                                                <div className="mt-3 flex items-center justify-between">
                                                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${isUnlocked ? 'bg-aws-orange/10 text-aws-orange' : 'bg-slate-800 text-slate-500'
                                                        }`}>
                                                        +{ach.xpReward} XP
                                                    </span>
                                                    {!isUnlocked && (
                                                        <span className="text-[10px] text-slate-600 uppercase font-semibold">Locked</span>
                                                    )}
                                                </div>

                                                {/* Mini Progress (Mock) */}
                                                {!isUnlocked && ach.maxProgress && (
                                                    <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-slate-600" style={{ width: `${(ach.progress || 0) / ach.maxProgress * 100}%` }}></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>

            {/* Animation Styles */}
            <style>{`
        @keyframes moveStripes {
          0% { background-position: 0 0; }
          100% { background-position: 28px 28px; }
        }
      `}</style>
        </div>
    );
};
