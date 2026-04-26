import React, { useState, useEffect } from 'react';
import { ScheduleConfig, GeneratedSlot, GeneratedDay, ScheduleSplit, ScheduleTopic } from '../types';
import { useRoadmap } from '../context/RoadmapContext';
import { getRoadmapDuration, getRoadmapCompletedDuration, formatDuration } from '../utils';
import { SettingsIcon, PlusIcon, TrashIcon, CheckCircleIcon } from './Icons';

// --- ICONS ---
// If SettingsIcon isn't in Icons, I'll use a generic SVG, but let's assume it is or just use a basic one.
const CogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

const DEFAULT_CONFIG: ScheduleConfig = {
  hoursPerWeek: 10,
  splitPreference: 'WORKING_MAN',
  topics: [
    { id: '1', name: 'Core Study (AWS/Cert)', color: 'bg-aws-orange text-slate-900 border-aws-orange/50', weight: 3 },
    { id: '2', name: 'Labs & Review', color: 'bg-purple-500/20 text-purple-400 border-purple-500/50', weight: 1 }
  ]
};

const WEEKDAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TOPIC_COLORS = [
  'bg-aws-orange/20 text-aws-orange border-aws-orange/50',
  'bg-blue-500/20 text-blue-400 border-blue-500/50',
  'bg-purple-500/20 text-purple-400 border-purple-500/50',
  'bg-green-500/20 text-green-400 border-green-500/50',
  'bg-pink-500/20 text-pink-400 border-pink-500/50',
];

const PREDEFINED_TOPICS = [
  { name: "AWS Cloud Architect", isExercise: false },
  { name: "Spanish Language", isExercise: false },
  { name: "Salesforce", isExercise: false },
  { name: "Tough Mudder (Couch to 5k)", isExercise: true }
];

function getMondayOfWeek(d: Date): Date {
  const monday = new Date(d);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  monday.setDate(d.getDate() - diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

// Algorithm to distribute hours
function generateWeeklySchedule(config: ScheduleConfig): GeneratedDay[] {
  const now = new Date();
  const monday = getMondayOfWeek(now);
  
  // Weights for days: Mon=0, Tue=1, ..., Sun=6
  let dayWeights = [1, 1, 1, 1, 1, 1, 1]; // EVEN
  if (config.splitPreference === 'WEEKEND_HEAVY') {
    dayWeights = [1, 1, 1, 1, 1, 4, 4];
  } else if (config.splitPreference === 'WEEKDAY_ONLY') {
    dayWeights = [2, 2, 2, 2, 2, 0, 0];
  } else if (config.splitPreference === 'WORKING_MAN') {
    dayWeights = [1, 1, 1, 1, 0, 4, 2];
  } else if (config.splitPreference === 'FRONT_LOADED') {
    dayWeights = [4, 3, 2, 1, 1, 0, 0];
  } else if (config.splitPreference === 'MWF_ONLY') {
    dayWeights = [1, 0, 1, 0, 1, 0, 0];
  } else if (config.splitPreference === 'TTS_ONLY') {
    dayWeights = [0, 1, 0, 1, 0, 1, 0];
  }

  const totalWeight = dayWeights.reduce((a, b) => a + b, 0);
  
  // Calculate raw hours per day
  let hoursPerDay = dayWeights.map(w => (w / totalWeight) * config.hoursPerWeek);
  
  // Round to nearest 0.5
  hoursPerDay = hoursPerDay.map(h => Math.round(h * 2) / 2);
  
  // Fix rounding errors to match exact hoursPerWeek
  let sumHours = hoursPerDay.reduce((a, b) => a + b, 0);
  let diff = config.hoursPerWeek - sumHours;
  
  // Iteratively add/subtract 0.5 to highest/lowest weights until difference is 0
  while (Math.abs(diff) > 0.1) {
      if (diff > 0) {
          let maxIdx = 0;
          let maxW = -1;
          for(let i=0; i<7; i++) {
              if (dayWeights[i] > maxW) { maxW = dayWeights[i]; maxIdx = i; }
          }
          hoursPerDay[maxIdx] += 0.5;
          diff -= 0.5;
      } else {
          let maxIdx = 0;
          let maxH = -1;
          for(let i=0; i<7; i++) {
              if (hoursPerDay[i] > maxH) { maxH = hoursPerDay[i]; maxIdx = i; }
          }
          if (hoursPerDay[maxIdx] >= 0.5) {
              hoursPerDay[maxIdx] -= 0.5;
              diff += 0.5;
          } else {
              break;
          }
      }
  }

  const exerciseTopics = config.topics.filter(t => t.isExercise || t.name.includes("Tough Mudder"));
  const studyTopics = config.topics.filter(t => !t.isExercise && !t.name.includes("Tough Mudder"));

  // 1. Calculate Daily Exercise vs Study Hours
  let dailyStudyHours = [0,0,0,0,0,0,0];
  let dailyExerciseHours = [0,0,0,0,0,0,0];
  let lastExerciseDayIndex = -2;

  for (let i = 0; i < 7; i++) {
      let duration = hoursPerDay[i];
      if (duration === 0) continue;

      if (exerciseTopics.length > 0 && i > lastExerciseDayIndex + 1) {
          const exDuration = Math.min(1, duration);
          dailyExerciseHours[i] = exDuration;
          duration -= exDuration;
          lastExerciseDayIndex = i;
      }
      dailyStudyHours[i] = duration;
  }

  // 2. Fractional Accumulation to distribute Study Topics proportionally
  const totalStudyHours = dailyStudyHours.reduce((a, b) => a + b, 0);
  const totalStudyBlocks = Math.round(totalStudyHours * 2);
  const studyTotalWeight = studyTopics.reduce((sum, t) => sum + t.weight, 0);
  
  let studyBlockQueue: ScheduleTopic[] = [];

  if (studyTotalWeight > 0 && totalStudyBlocks > 0) {
      let accumulators = studyTopics.map(t => t.weight);
      for (let i = 0; i < totalStudyBlocks; i++) {
          let maxIdx = 0;
          let maxVal = -Infinity;
          for (let j = 0; j < studyTopics.length; j++) {
              if (accumulators[j] > maxVal) {
                  maxVal = accumulators[j];
                  maxIdx = j;
              }
          }
          studyBlockQueue.push(studyTopics[maxIdx]);
          
          for (let j = 0; j < studyTopics.length; j++) {
              if (j === maxIdx) {
                  accumulators[j] -= studyTotalWeight;
              }
              accumulators[j] += studyTopics[j].weight;
          }
      }
  }

  // 3. Build the actual days
  const days: GeneratedDay[] = [];
  let blockQueueIndex = 0;

  const formatTime = (hourDecimal: number) => {
      let h = Math.floor(hourDecimal) % 24;
      let m = Math.round((hourDecimal % 1) * 60);
      if (m === 60) { h = (h + 1) % 24; m = 0; }
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const dayName = WEEKDAY_NAMES[i];
    const dateLabel = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    let duration = hoursPerDay[i];
    
    if (duration === 0) {
      days.push({
        date, dayName, dateLabel, isToday, 
        slots: [{
          durationHours: 0,
          time: 'Rest Day', task: 'Decompress (No Study)', type: 'REST'
        }]
      });
      continue;
    }

    let slots: GeneratedSlot[] = [];
    let startHour = (i >= 5) ? 9 : 19; 

    // Exercise
    if (dailyExerciseHours[i] > 0) {
       const exHours = dailyExerciseHours[i];
       const ex = exerciseTopics[0]; // simplistic selection
       
       slots.push({
         time: `${formatTime(startHour)} - ${formatTime(startHour + exHours)} (${exHours}h)`,
         task: ex.name,
         topicId: ex.id,
         color: ex.color,
         type: 'EXERCISE',
         durationHours: exHours
       });
       
       startHour += exHours; 
    }

    // Study
    if (dailyStudyHours[i] > 0) {
       const stHours = dailyStudyHours[i];
       const blocksToPull = Math.round(stHours * 2);
       
       let currentTopic: ScheduleTopic | null = null;
       let currentDuration = 0;

       const flushSlot = () => {
           if (currentTopic && currentDuration > 0) {
               slots.push({
                   time: `${formatTime(startHour)} - ${formatTime(startHour + currentDuration)} (${currentDuration}h)`,
                   task: currentTopic.name,
                   topicId: currentTopic.id,
                   color: currentTopic.color,
                   type: 'CUSTOM',
                   durationHours: currentDuration
               });
               startHour += currentDuration;
               currentDuration = 0;
           }
       };

       for (let b = 0; b < blocksToPull; b++) {
           let topic = studyBlockQueue[blockQueueIndex];
           blockQueueIndex++;

           // Fallback if no study topic is defined
           if (!topic) {
               topic = { id: 'general', name: 'General Study', color: 'bg-slate-700/30 text-slate-400 border-slate-600', weight: 1, isExercise: false };
           }

           if (currentTopic && currentTopic.id !== topic.id) {
               flushSlot();
               currentTopic = topic;
               currentDuration = 0.5;
           } else {
               currentTopic = topic;
               currentDuration += 0.5;
           }
       }
       flushSlot();
    }

    days.push({
      date, dayName, dateLabel, isToday, slots
    });
  }

  return days;
}


const ScheduleView: React.FC = () => {
  const { roadmaps } = useRoadmap();
  
  const [config, setConfig] = useState<ScheduleConfig>(() => {
    const saved = localStorage.getItem('cloudflow_schedule_config');
    if (saved) return JSON.parse(saved);
    return DEFAULT_CONFIG;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [schedule, setSchedule] = useState<GeneratedDay[]>([]);

  // Local state for editing
  const [editHours, setEditHours] = useState(config.hoursPerWeek);
  const [editSplit, setEditSplit] = useState<ScheduleSplit>(config.splitPreference);
  const [editTopics, setEditTopics] = useState<ScheduleTopic[]>(config.topics);

  useEffect(() => {
    setSchedule(generateWeeklySchedule(config));
  }, [config]);

  const handleSave = () => {
    const newConfig: ScheduleConfig = {
      hoursPerWeek: editHours,
      splitPreference: editSplit,
      topics: editTopics
    };
    setConfig(newConfig);
    localStorage.setItem('cloudflow_schedule_config', JSON.stringify(newConfig));
    setIsEditing(false);
  };

  const handleAddTopic = () => {
    const color = TOPIC_COLORS[editTopics.length % TOPIC_COLORS.length];
    setEditTopics([
      ...editTopics, 
      { id: Date.now().toString(), name: PREDEFINED_TOPICS[0].name, weight: 1, color, isExercise: PREDEFINED_TOPICS[0].isExercise }
    ]);
  };

  const handleUpdateTopic = (id: string, field: keyof ScheduleTopic, value: any) => {
    setEditTopics(editTopics.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleDeleteTopic = (id: string) => {
    setEditTopics(editTopics.filter(t => t.id !== id));
  };

const SPLITS: { value: ScheduleSplit, label: string, desc: string, weights: number[] }[] = [
  { value: 'WORKING_MAN', label: 'The "Working Man"', desc: 'Light Mon-Thu, Friday off, Heavy Saturday.', weights: [1, 1, 1, 1, 0, 4, 2] },
  { value: 'WEEKEND_HEAVY', label: 'Weekend Warrior', desc: 'Heavy Sat/Sun.', weights: [1, 1, 1, 1, 1, 4, 4] },
  { value: 'EVEN', label: 'Slow & Steady', desc: 'Evenly spread.', weights: [1, 1, 1, 1, 1, 1, 1] },
  { value: 'WEEKDAY_ONLY', label: 'Corporate Drone', desc: 'Mon-Fri only.', weights: [2, 2, 2, 2, 2, 0, 0] },
  { value: 'FRONT_LOADED', label: 'Front-Loaded', desc: 'Heavy Mon-Wed, tapering off.', weights: [4, 3, 2, 1, 1, 0, 0] },
  { value: 'MWF_ONLY', label: 'Mon/Wed/Fri', desc: 'Alternating weekdays.', weights: [1, 0, 1, 0, 1, 0, 0] },
  { value: 'TTS_ONLY', label: 'Tue/Thu/Sat', desc: 'Alternating alternate days.', weights: [0, 1, 0, 1, 0, 1, 0] },
];

  if (isEditing) {
    return (
      <div className="p-6 max-w-4xl mx-auto animate-in fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <CogIcon /> Configure Schedule
          </h2>
          <button 
            onClick={() => setIsEditing(false)}
            className="text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>
        </div>

        <div className="space-y-8 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
          
          {/* Hours per week */}
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Total Study Hours / Week</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="1" max="40" step="1"
                value={editHours}
                onChange={(e) => setEditHours(parseInt(e.target.value))}
                className="flex-1 accent-aws-orange"
              />
              <div className="text-2xl font-bold text-white w-20 text-center bg-slate-950 p-2 rounded-lg border border-slate-800">
                {editHours} <span className="text-sm text-slate-500 font-normal">hrs</span>
              </div>
            </div>
          </div>

          {/* Split Preference */}
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Weekly Split</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {SPLITS.map(split => {
                  const maxW = Math.max(...split.weights);
                  return (
                     <button
                        key={split.value}
                        onClick={() => setEditSplit(split.value)}
                        className={`text-left p-4 rounded-xl border transition-all flex flex-col gap-3
                           ${editSplit === split.value 
                              ? 'bg-slate-800 border-aws-orange ring-1 ring-aws-orange/50 shadow-lg' 
                              : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'}`}
                     >
                        <div>
                           <div className="font-bold text-white text-sm">{split.label}</div>
                           <div className="text-xs text-slate-500 line-clamp-1">{split.desc}</div>
                        </div>
                        <div className="flex gap-1 h-10 items-end mt-auto pt-2 border-t border-slate-800/50 w-full">
                           {split.weights.map((w, i) => (
                              <div key={i} className="flex-1 flex flex-col justify-end h-full gap-1">
                                 <div 
                                    className={`w-full rounded-sm transition-all duration-300 ${editSplit === split.value ? 'bg-aws-orange' : 'bg-slate-600'}`}
                                    style={{ height: w === 0 ? '4px' : `${(w / maxW) * 100}%`, opacity: w === 0 ? 0.3 : 1 }}
                                 />
                                 <div className="text-[8px] font-mono text-center text-slate-500">
                                    {['M','T','W','T','F','S','S'][i]}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </button>
                  );
               })}
            </div>
          </div>

          {/* Topics */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider">Topics to Study</label>
              <button 
                onClick={handleAddTopic}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1"
              >
                <PlusIcon className="w-4 h-4" /> Add Topic
              </button>
            </div>
            
            <div className="space-y-3">
              {editTopics.map((topic, index) => (
                <div key={topic.id} className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className={`w-4 h-4 rounded-full ${topic.color.split(' ')[0]}`}></div>
                  <div className="flex-1 flex gap-2 items-center">
                    <select 
                      value={PREDEFINED_TOPICS.find(p => p.name === topic.name) ? topic.name : 'Custom'}
                      onChange={(e) => {
                        if (e.target.value === 'Custom') {
                          handleUpdateTopic(topic.id, 'name', 'Custom Topic');
                          handleUpdateTopic(topic.id, 'isExercise', false);
                        } else {
                          handleUpdateTopic(topic.id, 'name', e.target.value);
                          const pt = PREDEFINED_TOPICS.find(p => p.name === e.target.value);
                          if (pt) {
                             handleUpdateTopic(topic.id, 'isExercise', pt.isExercise);
                          }
                        }
                      }}
                      className="bg-transparent text-white focus:outline-none font-medium cursor-pointer"
                    >
                      {PREDEFINED_TOPICS.map(pt => <option key={pt.name} value={pt.name} className="bg-slate-900">{pt.name}</option>)}
                      <option value="Custom" className="bg-slate-900">Custom...</option>
                    </select>
                    {!PREDEFINED_TOPICS.find(p => p.name === topic.name) && (
                      <input 
                        type="text" 
                        value={topic.name === 'Custom Topic' ? '' : topic.name}
                        onChange={(e) => handleUpdateTopic(topic.id, 'name', e.target.value)}
                        className="flex-1 bg-slate-900/50 border border-slate-700 px-3 py-1 rounded-lg text-white focus:outline-none focus:border-aws-orange placeholder-slate-600 font-medium text-sm transition"
                        placeholder="Enter custom topic..."
                        autoFocus
                      />
                    )}
                  </div>
                  <label className="flex items-center gap-1.5 text-xs text-slate-400 font-bold cursor-pointer bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition">
                    <input 
                      type="checkbox" 
                      checked={topic.isExercise || false}
                      onChange={(e) => handleUpdateTopic(topic.id, 'isExercise', e.target.checked)}
                      className="accent-aws-orange w-3 h-3"
                    />
                    EXERCISE
                  </label>
                  <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                     <span className="text-xs text-slate-500 font-bold uppercase">Weight:</span>
                     <select 
                        value={topic.weight}
                        onChange={(e) => handleUpdateTopic(topic.id, 'weight', parseInt(e.target.value))}
                        className="bg-transparent text-white font-mono focus:outline-none text-sm"
                     >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                     </select>
                  </div>
                  <button 
                    onClick={() => handleDeleteTopic(topic.id)}
                    className="text-slate-500 hover:text-red-400 transition p-2"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {editTopics.length === 0 && (
                 <div className="text-center p-6 border-2 border-dashed border-slate-800 rounded-xl text-slate-500 text-sm">
                   No topics added. Add one to prioritize your time!
                 </div>
              )}
            </div>
          </div>

          {/* Save Action */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button 
              onClick={handleSave}
              className="bg-aws-orange hover:bg-orange-500 text-slate-900 font-bold px-8 py-3 rounded-xl transition flex items-center gap-2 shadow-lg shadow-aws-orange/20"
            >
               <CheckCircleIcon className="w-5 h-5" /> Save & Generate Schedule
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW MODE ---
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
         <div>
            <h2 className="text-2xl font-bold text-white mb-1">Your Auto-Schedule</h2>
            <p className="text-slate-400 text-sm">
               Targeting <span className="text-white font-bold">{config.hoursPerWeek} hours</span> this week with a <span className="text-white font-bold">{config.splitPreference.replace('_', ' ')}</span> split.
            </p>
         </div>
         <button 
            onClick={() => {
               setEditHours(config.hoursPerWeek);
               setEditSplit(config.splitPreference);
               setEditTopics(config.topics);
               setIsEditing(true);
            }}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm shadow-sm"
         >
            <CogIcon /> Configure
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {schedule.map((day) => (
          <div
            key={day.date.toISOString()}
            className={`p-5 rounded-xl border flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl
               ${day.slots[0].type === 'REST' ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60' : 'bg-slate-900/80 border-slate-700 backdrop-blur-sm'} 
               ${day.isToday ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-105 z-10' : ''}`}
          >
             <div className="mb-4">
               <div className="flex items-center gap-2 flex-wrap mb-1">
                 <h3 className={`text-lg font-bold ${day.slots[0].type === 'REST' ? 'text-slate-600' : 'text-white'}`}>{day.dayName}</h3>
                 {day.isToday && (
                   <span className="text-xs font-bold px-2 py-0.5 rounded bg-white text-slate-900">TODAY</span>
                 )}
               </div>
               <div className="text-xs font-mono opacity-60">{day.dateLabel}</div>
             </div>

             <div className="flex flex-col gap-3">
               {day.slots.map((slot, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border ${slot.type === 'REST' ? 'border-transparent' : slot.color || 'border-slate-700'} ${slot.type === 'REST' ? '' : 'bg-opacity-20'}`}>
                     {slot.type !== 'REST' && (
                        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono mb-2 bg-black/30 border border-white/5 text-white/90">
                           <span className="opacity-70">⏱️</span> {slot.time}
                        </div>
                     )}
                     <div className={`${slot.type === 'REST' ? 'text-slate-500' : 'text-white font-bold'} text-sm leading-snug`}>
                        {slot.task}
                     </div>
                  </div>
               ))}
             </div>
          </div>
        ))}
      </div>
      
      {/* Completion Estimates */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(
          schedule.reduce((acc, day) => {
            day.slots.forEach(slot => {
              if (slot.type !== 'REST') {
                acc[slot.task] = (acc[slot.task] || 0) + slot.durationHours;
              }
            });
            return acc;
          }, {} as Record<string, number>)
        ).map(([topicName, hoursValue]) => {
          const hours = hoursValue as number;
          const matchedRoadmap = roadmaps.find(r => r.title.toLowerCase() === topicName.toLowerCase() || topicName.toLowerCase().includes(r.title.toLowerCase()) || r.title.toLowerCase().includes(topicName.toLowerCase()));
          
          if (!matchedRoadmap || hours === 0) return null;

          const totalMinutes = getRoadmapDuration(matchedRoadmap);
          const completedMinutes = getRoadmapCompletedDuration(matchedRoadmap);
          const remainingMinutes = totalMinutes - completedMinutes;
          
          const weeksRemaining = hours > 0 ? (remainingMinutes / 60) / hours : 0;
          const estimatedDate = new Date();
          estimatedDate.setDate(estimatedDate.getDate() + Math.ceil(weeksRemaining) * 7);
          const dateString = estimatedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
          
          return (
            <div key={topicName} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex items-start gap-4">
               <div className="p-3 bg-green-500/10 rounded-xl text-green-400 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </div>
              <div className="w-full">
                 <h3 className="font-bold text-white mb-1">{topicName} Projection</h3>
                 <p className="text-slate-400 text-sm mb-3">
                   At <strong className="text-slate-300">{hours.toFixed(1)} hours/week</strong>, here's your estimated completion.
                 </p>
                 <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>{formatDuration(completedMinutes)} completed</span>
                    <span>{formatDuration(totalMinutes)} total</span>
                 </div>
                 <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-green-500" style={{ width: `${totalMinutes > 0 ? (completedMinutes/totalMinutes)*100 : 0}%` }}></div>
                 </div>
                 <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
                    <div className="flex flex-col">
                       <span className="text-sm text-slate-400">Estimated remaining time: </span>
                       <span className="text-xs text-slate-500 font-medium">Target completion: {dateString}</span>
                    </div>
                    <span className="text-lg font-bold text-white">{Math.ceil(weeksRemaining)} weeks</span>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex items-start gap-4">
         <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
         </div>
        <div>
           <h3 className="font-bold text-white mb-1">How it works</h3>
           <p className="text-slate-400 text-sm leading-relaxed">
             This schedule auto-distributes your <strong className="text-slate-300">{config.hoursPerWeek} hours</strong> based on your <strong className="text-slate-300">{config.splitPreference.replace('_', ' ')}</strong> strategy. Topics are rotated into the schedule based on the weights you set. Higher weighted topics get more frequent blocks. Consistency is more important than intensity!
           </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
