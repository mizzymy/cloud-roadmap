
import React, { useState, useEffect } from 'react';
import RoadmapView from './components/RoadmapView';
import ScheduleView from './components/ScheduleView';
import { ToolsView } from './components/ToolsView';
import CourseDetail from './components/CourseDetail';
import AICoach from './components/AICoach';
import SettingsView from './components/SettingsView';
import { UserStats } from './components/Gamification';
import { AccountabilityTracker } from './components/AccountabilityTracker';
import { INITIAL_PHASES } from './constants';
import { Phase, Resource, Course, UserProfile, AppSettings } from './types';
import { HomeIcon, MapIcon, CalendarIcon, ToolIcon, BrainIcon, SettingsIcon } from './components/Icons';

type View = 'DASHBOARD' | 'ROADMAP' | 'SCHEDULE' | 'TOOLS' | 'COACH' | 'COURSE_DETAIL' | 'SETTINGS';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('DASHBOARD');
  
  // Data State
  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('cloudflow_resources');
    return saved ? JSON.parse(saved) : [];
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cloudflow_profile');
    const defaultProfile: UserProfile = { 
      xp: 0, 
      level: 1, 
      streak: 1, 
      lastLogin: new Date().toISOString(),
      startDate: Date.now(), 
      deadline: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365 * 2.5)).getTime() // approx 2.5 years
    };
    
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaultProfile,
        ...parsed,
        startDate: parsed.startDate || defaultProfile.startDate,
        deadline: parsed.deadline || defaultProfile.deadline
      };
    }
    return defaultProfile;
  });

  // Phases State with Dynamic Date Calculation
  const [phases, setPhases] = useState<Phase[]>(() => {
    // 1. Get saved progress (for completion marks)
    const savedString = localStorage.getItem('cloudflow_phases');
    let basePhases = INITIAL_PHASES;
    
    if (savedString) {
      const saved = JSON.parse(savedString);
      // Merge saved status/completion into INITIAL_PHASES structure
      basePhases = INITIAL_PHASES.map(ip => {
         const found = saved.find((s: Phase) => s.id === ip.id);
         if (found) {
             return {
                 ...ip,
                 status: found.status,
                 courses: ip.courses.map(c => {
                     const savedCourse = found.courses.find((sc: Course) => sc.id === c.id);
                     return savedCourse ? { ...c, completedModules: savedCourse.completedModules, modules: savedCourse.modules } : c;
                 }),
                 milestone: { ...ip.milestone, completed: found.milestone.completed }
             };
         }
         return ip;
      });
    }

    // 2. Effective start: use today when no progress, else stored startDate
    const totalCompleted = basePhases.reduce((sum, p) =>
      sum + p.courses.reduce((s, c) =>
        s + c.modules.reduce((mSum, m) =>
          mSum + m.lessons.filter((l) => l.isCompleted).length, 0), 0), 0);
    const effectiveStartMs = totalCompleted === 0 ? Date.now() : userProfile.startDate;
    const startDate = new Date(effectiveStartMs);
    const durations = [5, 7, 4, 13]; // Duration in months for Phase 1, 2, 3, 4
    let current = new Date(startDate);
    
    return basePhases.map((p, i) => {
        const duration = durations[i];
        
        const phaseStartMs = current.getTime();
        const startStr = current.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' });
        
        const end = new Date(current);
        end.setMonth(end.getMonth() + duration);
        
        const displayEnd = new Date(end);
        displayEnd.setDate(0);
        const phaseEndMs = new Date(displayEnd.getFullYear(), displayEnd.getMonth() + 1, 0).getTime();
        const endStr = displayEnd.toLocaleString('default', { month: 'short', year: 'numeric' });
        
        const milestoneDate = displayEnd.toLocaleString('default', { month: 'long', year: 'numeric' });
        
        current = end;
        
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
  });

  // Settings State
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('cloudflow_settings');
    return saved ? JSON.parse(saved) : {
        username: 'Future Architect',
        notificationsEnabled: false,
        reminderTime: '19:00',
        soundEnabled: true
    };
  });

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Persistence
  useEffect(() => { localStorage.setItem('cloudflow_phases', JSON.stringify(phases)); }, [phases]);
  useEffect(() => { localStorage.setItem('cloudflow_resources', JSON.stringify(resources)); }, [resources]);
  useEffect(() => { localStorage.setItem('cloudflow_profile', JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => { localStorage.setItem('cloudflow_settings', JSON.stringify(settings)); }, [settings]);

  // When user has no progress, persist "today" as start date so phases and "days behind" stay correct
  useEffect(() => {
    const totalCompleted = phases.reduce((sum, p) =>
      sum + p.courses.reduce((s, c) =>
        s + c.modules.reduce((mSum, m) =>
          mSum + m.lessons.filter((l) => l.isCompleted).length, 0), 0), 0);
    if (totalCompleted === 0) {
      setUserProfile((prev) => ({ ...prev, startDate: Date.now() }));
    }
  }, []);

  // Notification Logic
  useEffect(() => {
    if (!settings.notificationsEnabled) return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      if (currentTime === settings.reminderTime && now.getSeconds() < 30) {
         if (Notification.permission === 'granted') {
             const lastFired = sessionStorage.getItem('last_reminder_date');
             const today = new Date().toDateString();
             
             if (lastFired !== today) {
                new Notification("Time to Grind! 🛠️", {
                    body: `Hey ${settings.username}, your future self is waiting. Let's get some AWS study in.`,
                    icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                });
                sessionStorage.setItem('last_reminder_date', today);
             }
         } else if (Notification.permission !== 'denied') {
             Notification.requestPermission();
         }
      }
    }, 30000); 

    return () => clearInterval(interval);
  }, [settings]);

  // Handlers
  const handlePhaseUpdate = (id: string, updates: Partial<Phase>) => {
    setPhases(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    setPhases(prev => prev.map(phase => ({
      ...phase,
      courses: phase.courses.map(c => c.id === updatedCourse.id ? updatedCourse : c)
    })));
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourseId(course.id);
    setCurrentView('COURSE_DETAIL');
  };

  const handleAddResource = (res: Resource) => {
    setResources(prev => [...prev, res]);
  };

  const handleDeleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id));
  };

  const handleResetProgress = () => {
    // Reset to initial structure but keep start date relative to NOW for a fresh start
    const resetProfile = { 
      xp: 0, 
      level: 1, 
      streak: 1, 
      lastLogin: new Date().toISOString(),
      startDate: Date.now(),
      deadline: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365 * 2.5)).getTime()
    };
    
    setUserProfile(resetProfile);
    setResources([]);
    
    // Force reload to recalculate phases based on new start date
    localStorage.removeItem('cloudflow_phases');
    window.location.reload();
  };

  // Stats Calculation for Quick Stats Widget
  const calculateTotalTasks = () => {
    let count = 0;
    phases.forEach(p => p.courses.forEach(c => c.modules.forEach(m => count += m.lessons.length)));
    return count;
  };

  const calculateCompletedTasks = () => {
    let count = 0;
    phases.forEach(p => p.courses.forEach(c => c.modules.forEach(m => m.lessons.forEach(l => {
      if (l.isCompleted) count++;
    }))));
    return count;
  };

  const getSelectedCourse = (): Course | null => {
    for (const phase of phases) {
      const found = phase.courses.find(c => c.id === selectedCourseId);
      if (found) return found;
    }
    return null;
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View, icon: any, label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl transition-all duration-200 mb-1 group
        ${currentView === view 
          ? 'bg-aws-orange text-slate-900 font-bold shadow-lg shadow-orange-500/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
    >
      <Icon className={`w-5 h-5 ${currentView === view ? 'text-slate-900' : 'text-slate-500 group-hover:text-white'}`} />
      <span>{label}</span>
    </button>
  );

  const MobileNav = ({ currentView, onChange }: { currentView: View, onChange: (v: View) => void }) => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around p-2 pb-safe z-50 shadow-2xl">
      <button onClick={() => onChange('DASHBOARD')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${currentView === 'DASHBOARD' ? 'text-aws-orange bg-slate-800/50' : 'text-slate-400'}`}>
          <HomeIcon className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Home</span>
      </button>
      <button onClick={() => onChange('ROADMAP')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${currentView === 'ROADMAP' ? 'text-aws-orange bg-slate-800/50' : 'text-slate-400'}`}>
          <MapIcon className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Roadmap</span>
      </button>
       <button onClick={() => onChange('COACH')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${currentView === 'COACH' ? 'text-aws-orange bg-slate-800/50' : 'text-slate-400'}`}>
          <BrainIcon className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Coach</span>
      </button>
      <button onClick={() => onChange('TOOLS')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${currentView === 'TOOLS' ? 'text-aws-orange bg-slate-800/50' : 'text-slate-400'}`}>
          <ToolIcon className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Tools</span>
      </button>
      <button onClick={() => onChange('SETTINGS')} className={`flex flex-col items-center p-2 rounded-lg transition-colors ${currentView === 'SETTINGS' ? 'text-aws-orange bg-slate-800/50' : 'text-slate-400'}`}>
          <SettingsIcon className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Settings</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex overflow-hidden">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col hidden md:flex z-20 shadow-xl">
        <div className="mb-8 px-2 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-aws-orange to-red-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">CloudFlow</h1>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem view="DASHBOARD" icon={HomeIcon} label="Dashboard" />
          <NavItem view="ROADMAP" icon={MapIcon} label="Roadmap" />
          <NavItem view="SCHEDULE" icon={CalendarIcon} label="Schedule" />
          <NavItem view="TOOLS" icon={ToolIcon} label="Tools & Files" />
          <NavItem view="COACH" icon={BrainIcon} label="AI Mentor" />
        </nav>

        <div className="mt-auto">
             <NavItem view="SETTINGS" icon={SettingsIcon} label="Settings" />
             <div className="mt-4 p-4 bg-slate-800 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400 uppercase font-semibold mb-2">Next Exam</div>
                <div className="font-bold text-white mb-1">AWS Cloud Prac.</div>
                <div className="text-sm text-aws-orange">Target: {phases[0].milestone.date}</div>
             </div>
        </div>
      </aside>

      {/* Main Content - min-w-0 so it can shrink to viewport on mobile (fixes overflow for long course titles) */}
      <main className="flex-1 flex flex-col h-screen relative min-w-0">
        {/* Top Bar with User Stats */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center z-10 sticky top-0 md:relative">
          <div className="md:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-aws-orange to-red-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="font-bold text-lg text-white">CloudFlow</span>
          </div>
          <div className="hidden md:block text-slate-500 text-sm">
             {currentView === 'DASHBOARD' ? "Overview" : 
              currentView === 'COURSE_DETAIL' ? "Study Mode" : 
              currentView.charAt(0) + currentView.slice(1).toLowerCase()}
          </div>
          <div className="flex items-center gap-4">
             {settings.notificationsEnabled && (
                <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Reminders On ({settings.reminderTime})
                </div>
             )}
             <UserStats profile={userProfile} />
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-x-hidden overflow-y-auto pb-24 md:pb-0 scroll-smooth">
          {currentView === 'DASHBOARD' && (
            <div className="p-4 md:p-8 max-w-7xl mx-auto">
              <header className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome back, {settings.username}.</h2>
                <p className="text-slate-400 text-sm md:text-base">Current Phase: <span className="text-aws-orange font-semibold">The "Soft" Foundation</span></p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 
                 {/* Tracker Widget - Now Full Width (col-span-3) */}
                 <div className="lg:col-span-3">
                   <AccountabilityTracker 
                      startDate={userProfile.startDate} 
                      deadline={userProfile.deadline} 
                      phases={phases}
                   />
                 </div>

                 {/* Quick Stats - Full Width Row */}
                 <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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

                 {/* Active Phase Preview */}
                 <div className="lg:col-span-3 bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-aws-orange/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                        <h3 className="text-lg font-bold text-white">Continue Studying</h3>
                        <button onClick={() => setCurrentView('ROADMAP')} className="text-xs bg-slate-700 px-3 py-1 rounded text-white hover:bg-slate-600">All Courses</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {phases[0].courses.map(c => {
                          const completed = c.modules.reduce((acc, m) => acc + m.lessons.filter(l => l.isCompleted).length, 0);
                          const total = c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
                          
                          return (
                          <div key={c.id} className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-lg border border-slate-700/50 hover:bg-slate-950 transition cursor-pointer" onClick={() => handleSelectCourse(c)}>
                             <div className={`w-1 h-8 rounded ${c.provider === 'Coursera' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                             <div className="flex-1 overflow-hidden">
                               <div className="text-sm font-medium text-white truncate">{c.title}</div>
                               <div className="text-xs text-slate-500 flex gap-2">
                                 <span>{c.provider}</span>
                                 <span className="text-slate-400">• {pct}% Complete</span>
                               </div>
                             </div>
                             <button className="px-3 py-1 bg-aws-orange/20 text-aws-orange text-xs rounded hover:bg-aws-orange hover:text-slate-900 transition whitespace-nowrap">
                               Resume
                             </button>
                          </div>
                        )})}
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {currentView === 'ROADMAP' && (
            <div className="max-w-4xl mx-auto p-2 md:p-6">
              <RoadmapView 
                phases={phases} 
                onPhaseUpdate={handlePhaseUpdate} 
                onSelectCourse={handleSelectCourse}
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

          {currentView === 'SCHEDULE' && (
            <div className="max-w-6xl mx-auto">
              <ScheduleView />
            </div>
          )}

          {currentView === 'TOOLS' && (
             <ToolsView 
                resources={resources} 
                onAddResource={handleAddResource} 
                onDeleteResource={handleDeleteResource}
                phases={phases}
             />
          )}

          {currentView === 'COACH' && (
            <div className="p-4 h-full max-w-4xl mx-auto flex flex-col pb-4">
              <AICoach />
            </div>
          )}

          {currentView === 'SETTINGS' && (
             <SettingsView 
                settings={settings}
                onSave={setSettings}
                onReset={handleResetProgress}
             />
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNav currentView={currentView} onChange={setCurrentView} />
      </main>
    </div>
  );
};

export default App;
