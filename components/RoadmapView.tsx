
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
            <div key={phase.id} className={`mb-10 ml-6 md:ml-10 relative group ${phase.status === PhaseStatus.LOCKED ? 'opacity-50 blur-[1px] hover:blur-0 transition-all duration-500' : ''}`}>
              {/* Timeline Dot */}
              <div className={`absolute -left-[38px] md:-left-[54px] top-2 w-5 h-5 md:w-7 md:h-7 rounded-full border-4 flex items-center justify-center bg-slate-950 transition-all duration-500 z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]
                  ${isCompleted ? 'border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : isActive ? 'border-aws-orange shadow-[0_0_20px_rgba(255,153,0,0.4)] scale-110' : 'border-slate-700'}`}>
                {isCompleted && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]" />}
                {isActive && <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-aws-orange rounded-full animate-pulse shadow-[0_0_10px_rgba(255,153,0,0.8)]" />}
              </div>

              {/* Connecting Line Glow for Active Phase */}
              {isActive && <div className="absolute -left-[29px] md:-left-[45px] top-9 bottom-[-40px] w-0.5 bg-gradient-to-b from-aws-orange to-transparent opacity-50 block md:hidden"></div>}

              {/* Content Card */}
              <div className={`rounded-xl p-4 md:p-6 border transition-all duration-500 relative overflow-hidden
                    ${isActive
                  ? 'bg-slate-900/60 backdrop-blur-xl border-aws-orange/50 shadow-[0_0_30px_rgba(255,153,0,0.1)]'
                  : 'bg-slate-900/30 backdrop-blur-md border-white/5 hover:border-white/10 hover:bg-slate-900/50'}
                `}>
                {isActive && <div className="absolute top-0 right-0 w-32 h-32 bg-aws-orange/10 blur-[50px] rounded-full pointer-events-none -mr-10 -mt-10"></div>}

                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 relative z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] md:text-xs font-mono text-slate-400 uppercase tracking-wider border border-white/10 px-2 py-0.5 rounded bg-slate-950/30">
                        {phase.timeframe}
                      </span>
                      {isActive && <span className="bg-aws-orange text-slate-900 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded shadow-[0_0_10px_rgba(255,153,0,0.4)] animate-pulse-glow">CURRENT PHASE</span>}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 tracking-tight">{phase.title}</h3>
                    <p className="text-slate-400 text-xs md:text-sm mb-4 leading-relaxed">{phase.goal}</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <span className="text-sm text-slate-400 block uppercase tracking-wider text-[10px] font-bold">Commitment</span>
                    <span className="text-white font-mono text-lg">{phase.weeklyCommitment}</span>
                  </div>
                </div>

                {/* Courses */}
                <div className="mt-6 space-y-3 relative z-10">
                  <h4 className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <span>Strategy & Resources</span>
                    <div className="h-px flex-1 bg-white/5"></div>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.courses.map(course => (
                      <button
                        key={course.id}
                        onClick={() => onSelectCourse(course)}
                        className="flex items-center p-3 rounded-xl bg-slate-800/40 hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-aws-orange/30 group text-left w-full hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <div className={`w-1.5 h-8 rounded-full mr-3 shadow-[0_0_8px_rgba(0,0,0,0.5)]
                            ${course.provider === 'Coursera' ? 'bg-blue-500 shadow-blue-500/30' : course.provider === 'Cantrill' ? 'bg-purple-500 shadow-purple-500/30' : 'bg-green-500 shadow-green-500/30'}
                          `}></div>
                        <div className="flex-1 overflow-hidden min-w-0">
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">{course.provider}</div>
                          <div className="text-sm font-medium text-slate-200 group-hover:text-white truncate transition-colors">{course.title}</div>
                        </div>
                        <div className="text-slate-600 group-hover:text-aws-orange px-2 transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Milestone */}
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
                  <div>
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase mb-1 font-bold tracking-wider">Milestone / Exam</div>
                    {phase.milestone.url ? (
                      <a
                        href={phase.milestone.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-bold hover:text-aws-orange transition-colors flex items-center gap-2 group/link underline decoration-slate-700 hover:decoration-aws-orange underline-offset-4 text-sm md:text-base decoration-2"
                      >
                        {phase.milestone.name}
                        <span className="text-slate-500 group-hover/link:text-aws-orange transition-colors md:opacity-0 md:group-hover/link:opacity-100 md:-translate-x-2 md:group-hover/link:translate-x-0 duration-300">
                          <LinkIcon className="w-4 h-4" />
                        </span>
                      </a>
                    ) : (
                      <div className="text-white font-bold text-sm md:text-base">{phase.milestone.name}</div>
                    )}

                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                      <span className="bg-slate-800/50 px-2 py-0.5 rounded border border-white/5">{phase.milestone.date}</span>
                      <span>•</span>
                      <span>{phase.milestone.cost}</span>
                    </div>
                  </div>

                  {/* Toggle Button with Clear Reset State */}
                  <button
                    onClick={() => toggleMilestone(phase.id, phase.milestone.completed)}
                    className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg transition-all font-medium text-sm group relative overflow-hidden
                        ${phase.milestone.completed
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30'
                        : 'bg-white/5 text-slate-300 border border-white/10 hover:border-aws-orange/50 hover:bg-aws-orange/10 hover:text-white'}`}
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
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
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
