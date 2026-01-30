import React, { useState, useEffect } from 'react';
import { Resource, Phase } from '../types';
import { PlusIcon, LinkIcon, ClockIcon, PlayIcon, LayoutIcon, ChevronRightIcon } from './Icons';
import { StudyPlanner } from './StudyPlanner';
import { INITIAL_PHASES } from '../constants';

interface Props {
  resources: Resource[];
  onAddResource: (r: Resource) => void;
  onDeleteResource: (id: string) => void;
  // We need to pass phases down to the tools view now to initialize the workbook
  phases?: Phase[]; 
}

// Fallback if phases aren't passed (though they should be from App.tsx)
const defaultPhases = INITIAL_PHASES;

export const FocusTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');

  useEffect(() => {
    let interval: number | null = null;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound here ideally
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = (newMode: 'FOCUS' | 'BREAK') => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(newMode === 'FOCUS' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-slate-850 p-6 rounded-xl border border-slate-700 shadow-lg min-w-0 max-w-full">
      <div className="flex items-center gap-2 mb-4 text-aws-light">
        <ClockIcon className="w-5 h-5" />
        <h3 className="font-semibold">Focus Timer</h3>
      </div>
      <div className="text-center mb-6">
        <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-white tracking-wider mb-2">
          {formatTime(timeLeft)}
        </div>
        <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest">{mode} MODE</div>
      </div>
      <div className="flex gap-2 justify-center">
        <button 
          onClick={toggleTimer}
          className={`flex-1 py-2 rounded-lg font-medium transition ${isActive ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => resetTimer('FOCUS')} className="px-3 py-2 bg-slate-700 rounded-lg text-slate-300 text-xs">25m</button>
        <button onClick={() => resetTimer('BREAK')} className="px-3 py-2 bg-slate-700 rounded-lg text-slate-300 text-xs">5m</button>
      </div>
    </div>
  );
};

const ResourceList: React.FC<Omit<Props, 'phases'>> = ({ resources, onAddResource, onDeleteResource }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'LINKS' | 'FILES'>('LINKS');

  const handleAdd = () => {
    if (!newTitle) return;
    onAddResource({
      id: Date.now().toString(),
      title: newTitle,
      url: newUrl,
      type: activeTab === 'LINKS' ? 'LINK' : 'FILE',
      tags: []
    });
    setNewTitle('');
    setNewUrl('');
  };

  return (
    <div className="bg-slate-850 p-4 md:p-6 rounded-xl border border-slate-700 h-[500px] md:h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-white text-lg">Resource Hub</h3>
        <div className="flex bg-slate-900 rounded-lg p-1">
          <button 
            onClick={() => setActiveTab('LINKS')}
            className={`px-3 py-1 rounded text-xs font-medium transition ${activeTab === 'LINKS' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
          >
            Links
          </button>
          <button 
            onClick={() => setActiveTab('FILES')}
            className={`px-3 py-1 rounded text-xs font-medium transition ${activeTab === 'FILES' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
          >
            Local Files
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
        {resources.filter(r => (activeTab === 'LINKS' ? r.type === 'LINK' : r.type === 'FILE')).map(res => (
          <div key={res.id} className="flex justify-between items-center bg-slate-800 p-3 rounded border border-slate-700 group hover:border-slate-500 transition">
            <div className="flex items-center gap-3 overflow-hidden">
               <div className="p-2 bg-slate-700 rounded">
                 <LinkIcon className="w-4 h-4 text-slate-400" />
               </div>
               <div className="truncate">
                 <div className="text-sm font-medium text-white truncate">{res.title}</div>
                 <a href={res.url} target="_blank" rel="noreferrer" className="text-xs text-aws-orange hover:underline truncate block">
                   {res.url || 'No URL'}
                 </a>
               </div>
            </div>
            <button onClick={() => onDeleteResource(res.id)} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400">
              &times;
            </button>
          </div>
        ))}
        {resources.length === 0 && (
          <div className="text-center text-slate-500 py-10 text-sm italic">
            No {activeTab.toLowerCase()} added yet.
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-700">
        <input 
          type="text" 
          placeholder="Title (e.g., 'Terraform Cheatsheet')" 
          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white mb-2 focus:outline-none focus:border-aws-orange"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder={activeTab === 'LINKS' ? "https://..." : "file:///C:/Users/..."} 
            className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-aws-orange"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <button 
            onClick={handleAdd}
            className="bg-aws-orange hover:bg-orange-500 text-slate-900 px-4 rounded font-bold transition flex items-center justify-center"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
        {activeTab === 'FILES' && <p className="text-[10px] text-slate-500 mt-2">* Use file:/// path for local files (Browser security may vary)</p>}
      </div>
    </div>
  );
};

export const ToolsView: React.FC<Props> = ({ resources, onAddResource, onDeleteResource, phases = defaultPhases }) => {
  const [showPlanner, setShowPlanner] = useState(false);

  return (
    <>
      <div className="p-4 md:p-8 h-full max-w-7xl mx-auto space-y-6">
         
         {/* Study Planner Hero Card */}
         <div className="w-full bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-6 flex items-center justify-between group cursor-pointer hover:border-aws-orange/50 transition-all shadow-xl"
              onClick={() => setShowPlanner(true)}
         >
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 group-hover:border-aws-orange transition-colors">
                    <LayoutIcon className="w-8 h-8 text-aws-orange" />
                </div>
                <div>
                   <h2 className="text-xl md:text-2xl font-bold text-white mb-1">CloudFlow Workbook</h2>
                   <p className="text-slate-400 text-sm">Comprehensive study planner, to-dos, and notes for every exam.</p>
                </div>
             </div>
             <div className="bg-aws-orange text-slate-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 group-hover:bg-white transition-colors">
                Launch <ChevronRightIcon className="w-5 h-5" />
             </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
           <div className="h-fit space-y-6">
             <FocusTimer />
             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
               <h3 className="font-bold text-white mb-2">Quick Scratchpad</h3>
               <textarea className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-aws-orange" placeholder="Jot down a quick thought..."></textarea>
             </div>
           </div>
           <div className="h-full lg:h-[calc(100vh-280px)]">
             <ResourceList resources={resources} onAddResource={onAddResource} onDeleteResource={onDeleteResource} />
           </div>
         </div>
      </div>

      {/* Full Screen Overlay for Study Planner */}
      {showPlanner && (
        <StudyPlanner phases={phases} onClose={() => setShowPlanner(false)} />
      )}
    </>
  );
};