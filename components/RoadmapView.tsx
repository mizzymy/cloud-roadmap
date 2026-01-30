
import React from 'react';
import { Phase, PhaseStatus, Course } from '../types';
import { CheckCircleIcon, BrainIcon, LinkIcon, TrashIcon } from './Icons';

interface Props {
  phases: Phase[];
  onPhaseUpdate: (id: string, updates: Partial<Phase>) => void;
  onSelectCourse: (course: Course) => void;
}

const RoadmapView: React.FC<Props> = ({ phases, onPhaseUpdate, onSelectCourse }) => {
  const toggleMilestone = (phaseId: string, currentStatus: boolean) => {
    onPhaseUpdate(phaseId, {
      milestone: {
        ...phases.find(p => p.id === phaseId)!.milestone,
        completed: !currentStatus
      }
    });
  };

  return (
    <div className="space-y-8 p-2 md:p-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Career Roadmap</h2>
        <div className="bg-aws-dark px-4 py-2 rounded-full border border-aws-orange/20 text-aws-orange text-xs md:text-sm font-semibold">
          Target: £100k+ Architect
        </div>
      </div>

      <div className="relative border-l-2 border-slate-700 ml-3 md:ml-4 space-y-12">
        {phases.map((phase, index) => {
            const isActive = phase.status === PhaseStatus.ACTIVE;
            const isCompleted = phase.status === PhaseStatus.COMPLETED;
            
            return (
              <div key={phase.id} className={`mb-10 ml-6 md:ml-10 relative group ${phase.status === PhaseStatus.LOCKED ? 'opacity-60' : ''}`}>
                {/* Timeline Dot */}
                <div className={`absolute -left-[38px] md:-left-[54px] top-2 w-5 h-5 md:w-7 md:h-7 rounded-full border-4 flex items-center justify-center bg-slate-900 transition-colors z-10
                  ${isCompleted ? 'border-green-500' : isActive ? 'border-aws-orange' : 'border-slate-600'}`}>
                  {isCompleted && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full" />}
                  {isActive && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-aws-orange rounded-full animate-pulse" />}
                </div>

                {/* Content Card */}
                <div className={`bg-slate-850 rounded-xl p-4 md:p-6 border transition-all duration-300
                    ${isActive ? 'border-aws-orange shadow-[0_0_15px_rgba(255,153,0,0.1)]' : 'border-slate-700 hover:border-slate-600'}
                `}>
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] md:text-xs font-mono text-slate-400 uppercase tracking-wider border border-slate-700 px-2 py-0.5 rounded">
                          {phase.timeframe}
                        </span>
                        {isActive && <span className="bg-aws-orange text-slate-900 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded">CURRENT PHASE</span>}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">{phase.title}</h3>
                      <p className="text-slate-400 text-xs md:text-sm mb-4">{phase.goal}</p>
                    </div>
                    <div className="text-right hidden md:block">
                       <span className="text-sm text-slate-400 block">Commitment</span>
                       <span className="text-white font-mono">{phase.weeklyCommitment}</span>
                    </div>
                  </div>

                  {/* Courses */}
                  <div className="mt-6 space-y-3">
                    <h4 className="text-xs md:text-sm font-semibold text-slate-300 uppercase tracking-wide">Strategy & Resources</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.courses.map(course => (
                        <button 
                          key={course.id} 
                          onClick={() => onSelectCourse(course)}
                          className="flex items-center p-3 rounded-lg bg-slate-750 hover:bg-slate-700 transition border border-slate-700 hover:border-aws-orange/50 group text-left w-full"
                        >
                          <div className={`w-2 h-10 rounded-l-lg mr-3
                            ${course.provider === 'Coursera' ? 'bg-blue-500' : course.provider === 'Cantrill' ? 'bg-purple-500' : 'bg-green-500'}
                          `}></div>
                          <div className="flex-1 overflow-hidden min-w-0">
                            <div className="text-xs text-slate-400">{course.provider}</div>
                            <div className="text-sm font-medium text-white group-hover:text-aws-light truncate">{course.title}</div>
                          </div>
                          <div className="text-slate-500 group-hover:text-white px-2">
                            →
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Milestone */}
                  <div className="mt-6 pt-4 border-t border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] md:text-xs text-slate-500 uppercase mb-1">Milestone / Exam</div>
                      {phase.milestone.url ? (
                        <a 
                            href={phase.milestone.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-white font-medium hover:text-aws-orange transition-colors flex items-center gap-2 group/link underline decoration-slate-600 hover:decoration-aws-orange underline-offset-4 text-sm md:text-base"
                        >
                            {phase.milestone.name}
                            <span className="text-slate-500 group-hover/link:text-aws-orange transition-colors">
                                <LinkIcon className="w-4 h-4" />
                            </span>
                        </a>
                      ) : (
                        <div className="text-white font-medium text-sm md:text-base">{phase.milestone.name}</div>
                      )}
                      
                      <div className="text-xs text-slate-400 mt-2">
                        Date: {phase.milestone.date} • Cost: {phase.milestone.cost}
                      </div>
                    </div>
                    
                    {/* Toggle Button with Clear Reset State */}
                    <button 
                      onClick={() => toggleMilestone(phase.id, phase.milestone.completed)}
                      className={`w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all font-medium text-sm group
                        ${phase.milestone.completed 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50' 
                          : 'bg-slate-750 text-slate-300 border border-slate-600 hover:border-white hover:bg-slate-700'}`}
                    >
                      {phase.milestone.completed ? (
                         <>
                            {/* Icon changes on hover using group-hover */}
                            <span className="group-hover:hidden"><CheckCircleIcon className="w-5 h-5" /></span>
                            <span className="hidden group-hover:block"><TrashIcon className="w-5 h-5" /></span>
                            
                            <span className="group-hover:hidden">Certified</span>
                            <span className="hidden group-hover:inline">Reset / Undo</span>
                         </>
                      ) : (
                         <>
                            <CheckCircleIcon className="w-5 h-5" />
                            Mark Complete
                         </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default RoadmapView;
