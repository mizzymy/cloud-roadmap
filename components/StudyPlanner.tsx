
import React, { useState, useEffect, useMemo } from 'react';
import { Phase, StudyWorkbook, StudyTask, Priority } from '../types';
import { 
  CheckSquareIcon, FileTextIcon, LayoutIcon, TagIcon, 
  TrashIcon, PlusIcon, CheckCircleIcon, FolderIcon, 
  ChevronRightIcon, XIcon, SaveIcon, ArrowLeftIcon
} from './Icons';

interface Props {
  phases: Phase[];
  onClose: () => void;
}

const generateWorkbooksFromPhases = (phases: Phase[]): StudyWorkbook[] => {
  const workbooks: StudyWorkbook[] = [];
  
  phases.forEach(phase => {
    // 1. Create a workbook for the Phase/Exam itself
    workbooks.push({
      id: `wb-${phase.id}`,
      linkedEntityId: phase.id,
      title: `${phase.milestone.name} Prep`,
      type: 'EXAM',
      provider: 'AWS',
      tasks: [],
      notes: `# ${phase.milestone.name} Preparation\n\nTarget Date: ${phase.milestone.date}\n\n## Key Objectives\n- [ ] Review Exam Guide\n- [ ] Take Practice Exam 1`,
      lastUpdated: Date.now()
    });

    // 2. Create workbooks for each Course
    phase.courses.forEach(course => {
      workbooks.push({
        id: `wb-${course.id}`,
        linkedEntityId: course.id,
        title: course.title,
        type: 'COURSE',
        provider: course.provider,
        tasks: [],
        notes: `# ${course.title}\n\nProvider: ${course.provider}\n\n## Course Notes\nStart typing here...`,
        lastUpdated: Date.now()
      });
    });
  });

  return workbooks;
};

export const StudyPlanner: React.FC<Props> = ({ phases, onClose }) => {
  // --- STATE ---
  const [workbooks, setWorkbooks] = useState<StudyWorkbook[]>(() => {
    const saved = localStorage.getItem('cloudflow_workbooks');
    if (saved) return JSON.parse(saved);
    return generateWorkbooksFromPhases(phases);
  });

  const [activeWorkbookId, setActiveWorkbookId] = useState<string>(workbooks[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'TASKS' | 'NOTES'>('TASKS');
  
  // Mobile Navigation State: 'LIST' implies sidebar visible, 'DETAIL' implies content visible
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  
  // Persist workbooks
  useEffect(() => {
    localStorage.setItem('cloudflow_workbooks', JSON.stringify(workbooks));
  }, [workbooks]);

  const activeWorkbook = useMemo(() => 
    workbooks.find(w => w.id === activeWorkbookId), 
  [workbooks, activeWorkbookId]);

  // --- ACTIONS ---

  const handleAddTask = (title: string, priority: Priority) => {
    if (!activeWorkbook) return;
    const newTask: StudyTask = {
      id: Date.now().toString(),
      title,
      priority,
      completed: false,
      createdAt: Date.now()
    };
    
    const updated = workbooks.map(wb => 
      wb.id === activeWorkbook.id 
        ? { ...wb, tasks: [newTask, ...wb.tasks], lastUpdated: Date.now() } 
        : wb
    );
    setWorkbooks(updated);
  };

  const handleToggleTask = (taskId: string) => {
    if (!activeWorkbook) return;
    const updated = workbooks.map(wb => 
      wb.id === activeWorkbook.id 
        ? { 
            ...wb, 
            tasks: wb.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t),
            lastUpdated: Date.now()
          } 
        : wb
    );
    setWorkbooks(updated);
  };

  const handleDeleteTask = (taskId: string) => {
    if (!activeWorkbook) return;
    const updated = workbooks.map(wb => 
      wb.id === activeWorkbook.id 
        ? { ...wb, tasks: wb.tasks.filter(t => t.id !== taskId), lastUpdated: Date.now() } 
        : wb
    );
    setWorkbooks(updated);
  };

  const handleUpdateNotes = (content: string) => {
    if (!activeWorkbook) return;
    const updated = workbooks.map(wb => 
      wb.id === activeWorkbook.id 
        ? { ...wb, notes: content, lastUpdated: Date.now() } 
        : wb
    );
    setWorkbooks(updated);
  };

  // --- UI HELPERS ---

  const getProviderColor = (provider: string) => {
    if (provider.includes('Cantrill')) return 'text-purple-400 bg-purple-400/10 border-purple-500/20';
    if (provider.includes('Coursera')) return 'text-blue-400 bg-blue-400/10 border-blue-500/20';
    return 'text-aws-orange bg-aws-orange/10 border-aws-orange/20';
  };

  const getPriorityColor = (p: Priority) => {
    if (p === 'HIGH') return 'text-red-400 bg-red-900/30 border-red-500/30';
    if (p === 'MEDIUM') return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/30';
    return 'text-slate-400 bg-slate-800 border-slate-700';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-0 md:p-8 animate-in fade-in duration-200">
      
      {/* Main Container */}
      <div className="w-full h-full max-w-7xl bg-slate-900 md:rounded-2xl border border-slate-700 shadow-2xl flex overflow-hidden flex-col md:flex-row">
        
        {/* --- SIDEBAR --- 
            On mobile: Visible only when showMobileSidebar is true.
            On desktop: Always visible.
        */}
        <div className={`w-full md:w-80 bg-slate-950 border-r border-slate-800 flex-col h-full ${showMobileSidebar ? 'flex' : 'hidden md:flex'}`}>
           <div className="p-5 border-b border-slate-800 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                 <div className="p-2 bg-aws-orange rounded-lg">
                    <LayoutIcon className="w-5 h-5 text-slate-900" />
                 </div>
                 <h2 className="font-bold text-white tracking-tight">Workbooks</h2>
              </div>
              <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
                 <XIcon className="w-6 h-6" />
              </button>
           </div>

           <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {phases.map(phase => {
                 // Filter workbooks belonging to this phase
                 const phaseWorkbooks = workbooks.filter(wb => 
                    wb.linkedEntityId === phase.id || 
                    phase.courses.some(c => c.id === wb.linkedEntityId)
                 );
                 
                 if (phaseWorkbooks.length === 0) return null;

                 return (
                   <div key={phase.id}>
                      <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-2 px-2">
                         {phase.title.split(':')[0]}
                      </div>
                      <div className="space-y-1">
                         {phaseWorkbooks.map(wb => {
                            const completedTasks = wb.tasks.filter(t => t.completed).length;
                            const totalTasks = wb.tasks.length;
                            const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
                            const isActive = activeWorkbookId === wb.id;

                            return (
                               <button 
                                 key={wb.id}
                                 onClick={() => {
                                    setActiveWorkbookId(wb.id);
                                    setShowMobileSidebar(false); // Hide sidebar on mobile selection
                                 }}
                                 className={`w-full text-left p-3 rounded-lg border transition-all duration-200 group relative overflow-hidden
                                    ${isActive 
                                       ? 'bg-slate-800 border-aws-orange/50 shadow-lg shadow-black/20' 
                                       : 'bg-transparent border-transparent hover:bg-slate-900 hover:border-slate-800'
                                    }`}
                               >
                                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-aws-orange"></div>}
                                  
                                  <div className="flex justify-between items-start mb-1">
                                     <span className={`text-sm font-medium line-clamp-1 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                        {wb.title}
                                     </span>
                                     {wb.type === 'EXAM' && <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded">EXAM</span>}
                                  </div>
                                  
                                  {/* Micro Progress Bar */}
                                  <div className="flex items-center gap-2 mt-2">
                                     <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                                     </div>
                                     <span className="text-[9px] text-slate-500 font-mono">{Math.round(progress)}%</span>
                                  </div>
                               </button>
                            );
                         })}
                      </div>
                   </div>
                 );
              })}
           </div>
        </div>

        {/* --- MAIN CONTENT --- 
            On mobile: Visible only when showMobileSidebar is false.
            On desktop: Always visible.
        */}
        <div className={`flex-1 flex-col h-full relative bg-slate-900/50 ${!showMobileSidebar ? 'flex' : 'hidden md:flex'}`}>
           
           {/* Top Bar */}
           <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4 md:px-6 bg-slate-900/80 backdrop-blur-sm z-10 shrink-0">
              <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                 {/* Mobile Back Button */}
                 <button onClick={() => setShowMobileSidebar(true)} className="md:hidden text-slate-400 hover:text-white shrink-0">
                    <ArrowLeftIcon className="w-5 h-5" />
                 </button>

                 {activeWorkbook && (
                    <>
                       <div className={`p-1.5 md:p-2 rounded-lg border text-[10px] md:text-xs font-bold shrink-0 ${getProviderColor(activeWorkbook.provider)}`}>
                          {activeWorkbook.provider}
                       </div>
                       <h1 className="text-base md:text-xl font-bold text-white truncate">{activeWorkbook.title}</h1>
                    </>
                 )}
              </div>
              <div className="flex items-center gap-3 md:gap-4 shrink-0">
                 <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
                    <button 
                       onClick={() => setActiveTab('TASKS')}
                       className={`px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all flex items-center gap-2
                          ${activeTab === 'TASKS' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                       <CheckSquareIcon className="w-4 h-4" /> <span className="hidden sm:inline">Tasks</span>
                    </button>
                    <button 
                       onClick={() => setActiveTab('NOTES')}
                       className={`px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all flex items-center gap-2
                          ${activeTab === 'NOTES' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                       <FileTextIcon className="w-4 h-4" /> <span className="hidden sm:inline">Notes</span>
                    </button>
                 </div>
                 <button onClick={onClose} className="hidden md:flex p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition">
                    <XIcon className="w-6 h-6" />
                 </button>
              </div>
           </div>

           {/* Content Area */}
           <div className="flex-1 overflow-hidden relative">
              
              {activeWorkbook ? (
                 <>
                   {/* TASKS VIEW */}
                   {activeTab === 'TASKS' && (
                      <div className="absolute inset-0 overflow-y-auto p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-300">
                         <div className="max-w-4xl mx-auto space-y-6">
                            
                            {/* Task Input */}
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm sticky top-0 z-20 shadow-lg">
                               <TaskInput onAdd={handleAddTask} />
                            </div>

                            {/* Task Lists */}
                            <div className="space-y-4">
                               <TaskList 
                                  title="In Progress" 
                                  tasks={activeWorkbook.tasks.filter(t => !t.completed)} 
                                  onToggle={handleToggleTask} 
                                  onDelete={handleDeleteTask}
                                  getPriorityColor={getPriorityColor}
                               />
                               
                               {activeWorkbook.tasks.some(t => t.completed) && (
                                  <div className="pt-8">
                                     <TaskList 
                                        title="Completed" 
                                        tasks={activeWorkbook.tasks.filter(t => t.completed)} 
                                        onToggle={handleToggleTask} 
                                        onDelete={handleDeleteTask}
                                        getPriorityColor={getPriorityColor}
                                        isCompletedList
                                     />
                                  </div>
                               )}
                            </div>
                         </div>
                      </div>
                   )}

                   {/* NOTES VIEW */}
                   {activeTab === 'NOTES' && (
                      <div className="absolute inset-0 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
                         <div className="flex-1 p-4 md:p-6 overflow-y-auto">
                            <div className="max-w-4xl mx-auto h-full flex flex-col">
                               <textarea
                                  value={activeWorkbook.notes}
                                  onChange={(e) => handleUpdateNotes(e.target.value)}
                                  className="w-full h-full bg-transparent text-slate-300 text-base md:text-lg leading-relaxed focus:outline-none resize-none placeholder-slate-600 font-mono"
                                  placeholder="# Start writing your notes here..."
                                  spellCheck={false}
                               />
                            </div>
                         </div>
                         <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/50 text-right">
                            <span className="text-xs text-slate-500 flex items-center justify-end gap-2">
                               <SaveIcon className="w-3 h-3" /> Auto-saved {new Date(activeWorkbook.lastUpdated).toLocaleTimeString()}
                            </span>
                         </div>
                      </div>
                   )}
                 </>
              ) : (
                 <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <LayoutIcon className="w-12 h-12 mb-4 opacity-50" />
                    <p>Select a workbook to begin.</p>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const TaskInput: React.FC<{ onAdd: (t: string, p: Priority) => void }> = ({ onAdd }) => {
   const [title, setTitle] = useState('');
   const [priority, setPriority] = useState<Priority>('MEDIUM');

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim()) return;
      onAdd(title, priority);
      setTitle('');
   };

   return (
      <form onSubmit={handleSubmit} className="flex gap-2">
         <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..." 
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 md:px-4 py-3 text-sm md:text-base text-white focus:outline-none focus:border-aws-orange transition"
         />
         <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-2 md:px-3 py-3 text-xs md:text-sm text-slate-300 focus:outline-none"
         >
            <option value="HIGH">High</option>
            <option value="MEDIUM">Med</option>
            <option value="LOW">Low</option>
         </select>
         <button 
            type="submit" 
            className="bg-aws-orange hover:bg-orange-500 text-slate-900 px-3 md:px-4 rounded-lg font-bold transition flex items-center justify-center"
         >
            <PlusIcon className="w-5 h-5" />
         </button>
      </form>
   );
};

const TaskList: React.FC<{ 
   title: string, 
   tasks: StudyTask[], 
   onToggle: (id: string) => void, 
   onDelete: (id: string) => void,
   getPriorityColor: (p: Priority) => string,
   isCompletedList?: boolean
}> = ({ title, tasks, onToggle, onDelete, getPriorityColor, isCompletedList }) => {
   
   if (tasks.length === 0) {
      return isCompletedList ? null : (
         <div className="text-center py-10 border-2 border-dashed border-slate-800 rounded-xl">
            <p className="text-slate-500 text-sm">No tasks pending. Nice work!</p>
         </div>
      );
   }

   return (
      <div>
         <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 pl-1">{title} ({tasks.length})</h3>
         <div className="space-y-2">
            {tasks.map(task => (
               <div key={task.id} className="group flex items-center gap-3 bg-slate-800 p-3 rounded-lg border border-slate-700 hover:border-slate-600 transition shadow-sm">
                  <button 
                     onClick={() => onToggle(task.id)}
                     className={`w-5 h-5 rounded border flex items-center justify-center transition shrink-0
                        ${task.completed ? 'bg-green-500 border-green-500' : 'border-slate-500 hover:border-aws-orange'}`}
                  >
                     {task.completed && <CheckCircleIcon className="w-4 h-4 text-slate-900" />}
                  </button>
                  
                  <span className={`flex-1 text-sm ${task.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                     {task.title}
                  </span>

                  {!task.completed && (
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0 ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                     </span>
                  )}

                  <button 
                     onClick={() => onDelete(task.id)}
                     className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition shrink-0"
                  >
                     <TrashIcon className="w-4 h-4" />
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
};
