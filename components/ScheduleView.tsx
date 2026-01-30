import React from 'react';

const WEEKDAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WEEKLY_SLOTS = [
  { time: '19:00 - 20:00', task: 'Coursera Video (2-3 videos)', type: 'LIGHT' as const },
  { time: '19:00 - 20:00', task: 'Coursera Video (2-3 videos)', type: 'LIGHT' as const },
  { time: '19:00 - 20:00', task: 'Coursera Video (2-3 videos)', type: 'LIGHT' as const },
  { time: '19:00 - 20:00', task: 'Coursera Video (2-3 videos)', type: 'LIGHT' as const },
  { time: 'Rest Day', task: 'Decompress (No Study)', type: 'REST' as const },
  { time: '09:00 - 12:00', task: 'Cantrill Labs (Heavy Lifting)', type: 'HEAVY' as const },
  { time: '18:00 - 20:00', task: 'Review & Plan Next Week', type: 'REVIEW' as const },
];

function getMondayOfWeek(d: Date): Date {
  const monday = new Date(d);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  monday.setDate(d.getDate() - diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

const ScheduleView: React.FC = () => {
  const now = new Date();
  const monday = getMondayOfWeek(now);
  const schedule = WEEKLY_SLOTS.map((slot, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dayName = WEEKDAY_NAMES[i];
    const dateLabel = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
    return { dayName, dateLabel, date, isToday, ...slot };
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'LIGHT': return 'bg-blue-500/10 border-blue-500/50 text-blue-400';
      case 'HEAVY': return 'bg-aws-orange/10 border-aws-orange/50 text-aws-orange';
      case 'REVIEW': return 'bg-purple-500/10 border-purple-500/50 text-purple-400';
      case 'REST': return 'bg-slate-700/30 border-slate-600 text-slate-500';
      default: return 'bg-slate-800';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">The "Working Man's" Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {schedule.map((slot) => (
          <div
            key={slot.date.toISOString()}
            className={`p-5 rounded-xl border ${getTypeColor(slot.type)} flex flex-col justify-between ${slot.isToday ? 'ring-2 ring-aws-orange ring-offset-2 ring-offset-slate-950' : ''}`}
          >
             <div>
               <div className="flex items-center gap-2 flex-wrap">
                 <h3 className="text-lg font-bold text-white">{slot.dayName}</h3>
                 {slot.isToday && (
                   <span className="text-xs font-semibold px-2 py-0.5 rounded bg-aws-orange text-slate-950">Today</span>
                 )}
               </div>
               <div className="text-sm font-mono opacity-80 mb-1">{slot.dateLabel}</div>
               <div className="text-sm font-mono opacity-80 mb-4">{slot.time}</div>
             </div>
             <div className="bg-slate-900/50 p-3 rounded-lg text-sm backdrop-blur-sm">
               {slot.task}
             </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="font-bold text-white mb-2">Why this works?</h3>
        <p className="text-slate-400">
          Most people burn out because they try to study 3 hours every night after a hard day of manual labor. 
          This schedule gives you <span className="text-aws-orange font-bold">micro-doses</span> during the week to keep momentum, 
          and saves the heavy brain work for Saturday morning when you are fresh.
        </p>
      </div>
    </div>
  );
};

export default ScheduleView;
