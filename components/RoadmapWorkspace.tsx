import React, { useState, useEffect } from 'react';
import RoadmapView from './RoadmapView';
import ScheduleView from './ScheduleView';
import { ToolsView } from './ToolsView';
import CourseDetail from './CourseDetail';
import SettingsView from './SettingsView';
import { UserStats } from './Gamification';
import { AccountabilityTracker } from './AccountabilityTracker';
import { RewardsView } from './RewardsView';
import { Phase, Resource, Course, UserProfile, AppSettings, PresetLink } from '../types';
import { HomeIcon, MapIcon, CalendarIcon, ToolIcon, ClockIcon, SettingsIcon } from './Icons';
import { FocusDashboard } from './FocusDashboard';
import { ProjectionWidget } from './ProjectionWidget';
import { useRoadmap } from '../context/RoadmapContext';

type View = 'DASHBOARD' | 'ROADMAP' | 'SCHEDULE' | 'TOOLS' | 'FOCUS' | 'COURSE_DETAIL' | 'SETTINGS' | 'REWARDS';

export const RoadmapWorkspace: React.FC = () => {
    const { activeRoadmap, updateActiveRoadmap, selectRoadmap } = useRoadmap();

    const [currentView, setCurrentView] = useState<View>('DASHBOARD');
    const [isImmersive, setIsImmersive] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

    // Derive state from activeRoadmap to avoid local duplication + sync issues
    if (!activeRoadmap) return null;

    // PROFILE ISOLATION: Use unique key based on roadmap ID
    const profileKey = `cloudflow_profile_${activeRoadmap.id}`;



    // PROFILE ISOLATION: Use unique key based on roadmap ID
    const [userProfile, setUserProfile] = useState<UserProfile>(() => {
        const saved = localStorage.getItem(profileKey);
        // Fallback for migration: check generic profile if this is legacy roadmap
        if (!saved && activeRoadmap.id === 'legacy-cloud-roadmap') {
            const legacy = localStorage.getItem('cloudflow_profile_legacy-cloud-roadmap');
            if (legacy) return JSON.parse(legacy);
        }

        if (saved) return JSON.parse(saved);

        // Default new profile
        return {
            xp: 0,
            level: 1,
            streak: 1,
            lastLogin: new Date().toISOString(),
            startDate: activeRoadmap.config.startDate,
            deadline: activeRoadmap.config.deadline || Date.now() + 31536000000
        };
    });

    const [settings, setSettings] = useState<AppSettings>(() => {
        const saved = localStorage.getItem('cloudflow_settings'); // Global settings
        return saved ? JSON.parse(saved) : {
            username: 'Learner',
            notificationsEnabled: false,
            reminderTime: '19:00',
            soundEnabled: true
        };
    });

    // DYNAMIC PHASE SCHEDULING
    // This fixes the "Days Behind" bug by ignoring hardcoded dates in INITIAL_PHASES
    // and calculating them relative to the user's actual start date.
    const phases = React.useMemo(() => {
        // 1. Calculate effective start date (use NOW if 0 progress to prevent immediate "behind")
        const totalCompleted = activeRoadmap.phases.reduce((sum, p) =>
            sum + p.courses.reduce((s, c) =>
                s + c.modules.reduce((mSum, m) =>
                    mSum + m.lessons.filter((l) => l.isCompleted).length, 0), 0), 0);

        // If no progress, treat today as day 0. Otherwise use stored start date.
        const effectiveStartMs = totalCompleted === 0 ? Date.now() : userProfile.startDate;

        let current = new Date(effectiveStartMs);
        const durations = [5, 7, 4, 13]; // Month durations for the 4 phases

        return activeRoadmap.phases.map((p, i) => {
            // If custom roadmap doesn't follow standard 4-phase duration, fall back to existing dates if available, or default to 1 month
            // For standard roadmap (4 phases), use the fixed durations.
            const duration = (i < durations.length) ? durations[i] : 1;

            const phaseStartMs = current.getTime();
            const startStr = current.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });

            const end = new Date(current);
            end.setMonth(end.getMonth() + duration);

            const displayEnd = new Date(end);
            displayEnd.setDate(0); // Go to last day of previous month? No, day 0 of this month is last day of prev.
            // Wait, logic in App.tsx was:
            // end.setMonth(end.getMonth() + duration);
            // displayEnd = new Date(end); displayEnd.setDate(0);

            // Let's stick to simple logic: Add duration months.
            const phaseEndMs = end.getTime();
            const endStr = end.toLocaleString('default', { month: 'short', year: 'numeric' });
            const milestoneDate = end.toLocaleString('default', { month: 'long', year: 'numeric' });

            current = end; // Next phase starts where this one ends

            return {
                ...p,
                phaseStartMs,
                phaseEndMs,
                timeframe: `${startStr} – ${endStr}`,
                milestone: {
                    ...p.milestone,
                    date: milestoneDate
                }
            };
        });
    }, [activeRoadmap.phases, userProfile.startDate]);

    const resources = activeRoadmap.resources;
    const presetLinks = activeRoadmap.presetLinks;

    // PROFILE ISOLATION: Use unique key based on roadmap ID


    // Sync Profile
    useEffect(() => {
        localStorage.setItem(profileKey, JSON.stringify(userProfile));
    }, [userProfile, profileKey]);

    // Sync Settings
    useEffect(() => {
        localStorage.setItem('cloudflow_settings', JSON.stringify(settings));
    }, [settings]);


    // Handlers helpers
    const handlePhaseUpdate = (id: string, updates: Partial<Phase>) => {
        // Only update specific phase in the array
        const newPhases = phases.map(p => p.id === id ? { ...p, ...updates } : p);
        updateActiveRoadmap({ phases: newPhases });
    };

    const handleUpdateCourse = (updatedCourse: Course) => {
        const newPhases = phases.map(phase => ({
            ...phase,
            courses: phase.courses.map(c => c.id === updatedCourse.id ? updatedCourse : c)
        }));
        updateActiveRoadmap({ phases: newPhases });
    };

    const handleToggleCourse = (courseId: string) => {
        const newPhases = phases.map(phase => ({
            ...phase,
            courses: phase.courses.map(c =>
                c.id === courseId ? { ...c, isEnabled: c.isEnabled === undefined ? false : !c.isEnabled } : c
            )
        }));
        updateActiveRoadmap({ phases: newPhases });
    };

    const handleRemoveCourse = (courseId: string) => {
        const newPhases = phases.map(phase => ({
            ...phase,
            courses: phase.courses.filter(c => c.id !== courseId)
        }));
        updateActiveRoadmap({ phases: newPhases });
    };

    const handleAddCustomCourse = (phaseId: string, newCourse: Course) => {
        const newPhases = phases.map(phase => {
            if (phase.id === phaseId) {
                return { ...phase, courses: [...phase.courses, { ...newCourse, isCustom: true, isEnabled: true }] };
            }
            return phase;
        });
        updateActiveRoadmap({ phases: newPhases });
    };

    const handleAddResource = (res: Resource) => {
        updateActiveRoadmap({ resources: [...resources, res] });
    };

    const handleDeleteResource = (id: string) => {
        updateActiveRoadmap({ resources: resources.filter(r => r.id !== id) });
    };

    const handleUpdatePreset = (id: string, partial: Partial<PresetLink>) => {
        updateActiveRoadmap({ presetLinks: presetLinks.map(p => p.id === id ? { ...p, ...partial } : p) });
    };

    const handleResetPresets = () => {
        // reset logic if needed, context usually handles defaults
    };

    const handleResetProgress = () => {
        // Reset Profile
        setUserProfile(prev => ({ ...prev, xp: 0, level: 1, startDate: Date.now() }));
        window.location.reload();
    };

    // ... (Stats helpers)
    const calculateTotalTasks = () => {
        let count = 0;
        phases.forEach(p => p.courses.forEach(c => {
            if (c.isEnabled === false) return;
            c.modules.forEach(m => count += m.lessons.length);
        }));
        return count;
    };

    const calculateCompletedTasks = () => {
        let count = 0;
        phases.forEach(p => p.courses.forEach(c => {
            if (c.isEnabled === false) return;
            c.modules.forEach(m => m.lessons.forEach(l => {
                if (l.isCompleted) count++;
            }));
        }));
        return count;
    };

    const getSelectedCourse = (): Course | null => {
        for (const phase of phases) {
            const found = phase.courses.find(c => c.id === selectedCourseId);
            if (found) return found;
        }
        return null;
    };

    const handleSelectCourse = (course: Course) => {
        setSelectedCourseId(course.id);
        setCurrentView('COURSE_DETAIL');
    };

    const NavItem = ({ view, icon: Icon, label }: { view: View, icon: any, label: string }) => (
        <button
            onClick={() => setCurrentView(view)}
            className={`relative flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-300 mb-1 group overflow-hidden
        ${currentView === view
                    ? 'bg-gradient-to-r from-aws-orange/20 to-transparent text-white font-medium shadow-[inset_3px_0_0_0_#FF9900]'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:shadow-[inset_3px_0_0_0_rgba(255,255,255,0.2)]'}`}
        >
            <Icon className={`w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110 ${currentView === view ? 'text-aws-orange drop-shadow-sm' : 'text-slate-500 group-hover:text-white'}`} />
            <span className="relative z-10">{label}</span>
            {currentView === view && <div className="absolute inset-0 bg-aws-orange/5 animate-pulse"></div>}
        </button>
    );

    const MobileNav = ({ currentView, onChange }: { currentView: View, onChange: (v: View) => void }) => (
        <div className="md:hidden fixed bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl flex justify-around p-2 z-50 shadow-2xl safe-pb">
            <button onClick={() => onChange('DASHBOARD')} className={`flex flex-col items-center p-2 rounded-xl transition-all ${currentView === 'DASHBOARD' ? 'text-aws-orange bg-white/5' : 'text-slate-400 hover:text-white'}`}>
                <HomeIcon className="w-5 h-5" />
            </button>
            <button onClick={() => onChange('ROADMAP')} className={`flex flex-col items-center p-2 rounded-xl transition-all ${currentView === 'ROADMAP' ? 'text-aws-orange bg-white/5' : 'text-slate-400 hover:text-white'}`}>
                <MapIcon className="w-5 h-5" />
            </button>
            <button onClick={() => onChange('FOCUS')} className={`flex flex-col items-center p-2 rounded-xl transition-all ${currentView === 'FOCUS' ? 'text-aws-orange bg-white/5' : 'text-slate-400 hover:text-white'}`}>
                <ClockIcon className="w-5 h-5" />
            </button>
            <button onClick={() => onChange('TOOLS')} className={`flex flex-col items-center p-2 rounded-xl transition-all ${currentView === 'TOOLS' ? 'text-aws-orange bg-white/5' : 'text-slate-400 hover:text-white'}`}>
                <ToolIcon className="w-5 h-5" />
            </button>
            <button onClick={() => onChange('SETTINGS')} className={`flex flex-col items-center p-2 rounded-xl transition-all ${currentView === 'SETTINGS' ? 'text-aws-orange bg-white/5' : 'text-slate-400 hover:text-white'}`}>
                <SettingsIcon className="w-5 h-5" />
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden selection:bg-aws-orange/30">

            {/* Sidebar (Desktop) */}
            {!isImmersive && (
                <aside className="w-72 bg-slate-900/80 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col hidden md:flex z-20 shadow-2xl relative">
                    <button onClick={() => selectRoadmap('')} className="mb-10 px-2 flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition">
                        <div className="w-10 h-10 bg-gradient-to-br from-aws-orange to-red-600 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                            <span className="font-bold text-white">OS</span>
                        </div>
                        <div className="text-left">
                            <h1 className="text-md font-bold text-white tracking-tight leading-none">{activeRoadmap.title}</h1>
                            <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-1">Foundations</div>
                        </div>
                        <div className="ml-auto text-slate-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></div>
                    </button>

                    <nav className="flex-1 space-y-2">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2">Menu</div>
                        <NavItem view="DASHBOARD" icon={HomeIcon} label="Dashboard" />
                        <NavItem view="ROADMAP" icon={MapIcon} label="Roadmap" />
                        <NavItem view="SCHEDULE" icon={CalendarIcon} label="Schedule" />
                        <NavItem view="TOOLS" icon={ToolIcon} label="Tools" />
                        <NavItem view="FOCUS" icon={ClockIcon} label="Focus" />
                    </nav>

                    <div className="mt-auto space-y-4">
                        <NavItem view="SETTINGS" icon={SettingsIcon} label="Settings" />
                    </div>
                </aside>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen relative min-w-0 z-10 transition-colors duration-500">

                {!isImmersive && (
                    <div className="bg-slate-950/80 backdrop-blur-lg border-b border-white/5 p-4 md:px-8 flex justify-between items-center z-30 sticky top-0 transition-all">
                        {/* Mobile Header logic... */}
                        <div className="md:hidden flex items-center gap-2">
                            <button onClick={() => selectRoadmap('')} className="w-8 h-8 bg-gradient-to-br from-aws-orange to-red-500 rounded-lg flex items-center justify-center">
                                <span className="font-bold text-white text-xs">OS</span>
                            </button>
                            <span className="font-bold text-lg text-white">CloudFlow</span>
                        </div>

                        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
                            <span className="text-white bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                {currentView}
                            </span>
                        </div>
                        <UserStats profile={userProfile} onClick={() => setCurrentView('REWARDS')} />
                    </div>
                )}

                <div className={`flex-1 min-w-0 ${isImmersive ? 'h-screen' : 'overflow-x-hidden overflow-y-auto pb-32 md:pb-0 scroll-smooth'}`}>
                    {currentView === 'DASHBOARD' && (
                        <div className="p-8 space-y-8">
                            {/* Dashboard Content */}
                            <header>
                                <h2 className="text-3xl font-bold text-white">Welcome, {settings.username}</h2>
                                <p className="text-slate-400">Continuing: <span className="text-aws-orange">{activeRoadmap.title}</span></p>
                            </header>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-3">
                                    <AccountabilityTracker phases={phases} startDate={userProfile.startDate} deadline={userProfile.deadline} />
                                </div>
                                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-slate-850 p-6 rounded-xl border border-slate-700 hover:border-aws-orange/30 transition">
                                        <div className="text-slate-400 text-sm mb-1">Total Lessons</div>
                                        <div className="text-2xl font-bold text-white">{calculateCompletedTasks()} / {calculateTotalTasks()}</div>
                                        <div className="w-full bg-slate-700 h-1.5 mt-4 rounded-full">
                                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(calculateCompletedTasks() / calculateTotalTasks()) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-aws-orange/30 transition">
                                        <div className="text-slate-400 text-sm mb-1">XP Earned</div>
                                        <div className="text-2xl font-bold text-white">{userProfile.xp} XP</div>
                                        <div className="text-xs text-green-400 mt-2">Level {userProfile.level}</div>
                                    </div>
                                </div>
                                <div className="lg:col-span-3">
                                    <ProjectionWidget phases={phases} startDate={userProfile.startDate} />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentView === 'ROADMAP' && (
                        <div className="max-w-4xl mx-auto p-6">
                            <RoadmapView
                                phases={phases}
                                onPhaseUpdate={handlePhaseUpdate}
                                onSelectCourse={handleSelectCourse}
                                onToggleCourse={handleToggleCourse}
                                onRemoveCourse={handleRemoveCourse}
                                onAddCourse={handleAddCustomCourse}
                            />
                        </div>
                    )}

                    {currentView === 'COURSE_DETAIL' && getSelectedCourse() && (
                        <CourseDetail
                            course={getSelectedCourse()!}
                            userProfile={userProfile}
                            onUpdateCourse={handleUpdateCourse}
                            onUpdateProfile={setUserProfile}
                            onBack={() => setCurrentView('ROADMAP')}
                        />
                    )}

                    {currentView === 'TOOLS' && (
                        <ToolsView
                            resources={resources}
                            onAddResource={handleAddResource}
                            onDeleteResource={handleDeleteResource}
                            presetLinks={presetLinks}
                            onUpdatePreset={handleUpdatePreset}
                            onResetPresets={handleResetPresets}
                            phases={phases}
                        />
                    )}

                    {currentView === 'SCHEDULE' && <div className="max-w-6xl mx-auto"><ScheduleView /></div>}
                    {currentView === 'FOCUS' && <div className="p-8 h-full"><FocusDashboard onToggleImmersive={setIsImmersive} /></div>}

                    {currentView === 'SETTINGS' && (
                        <SettingsView settings={settings} onSave={setSettings} onReset={handleResetProgress} />
                    )}
                </div>
                {!isImmersive && <MobileNav currentView={currentView} onChange={setCurrentView} />}
            </main>
        </div>
    );
};
