import React from 'react';

const ScheduleView: React.FC = () => {
  const schedule = [
    { day: 'Monday', time: '19:00 - 20:00', task: 'Coursera Video (2-3 videos)', type: 'LIGHT' },
    { day: 'Tuesday', time: '19:00 - 20:00', task: 'Coursera Video (2-3 videos)', type: 'LIGHT' },
    { day: 'Wednesday', time: '19:00 - 20:00', task: 'Coursera Video (2-3 videos)', type: 'LIGHT' },
    { day: 'Thursday', time: '19:00 - 20:00', task: 'Coursera Video (2-3 videos)', type: 'LIGHT' },
    { day: 'Friday', time: 'Rest Day', task: 'Decompress (No Study)', type: 'REST' },
    { day: 'Saturday', time: '09:00 - 12:00', task: 'Cantrill Labs (Heavy Lifting)', type: 'HEAVY' },
    { day: 'Sunday', time: '18:00 - 20:00', task: 'Review & Plan Next Week', type: 'REVIEW' },
  ];

  const getTypeColor = (type: string) => {
    switch(type) {
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
          <div key={slot.day} className={`p-5 rounded-xl border ${getTypeColor(slot.type)} flex flex-col justify-between`}>
             <div>
               <h3 className="text-lg font-bold text-white mb-1">{slot.day}</h3>
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
