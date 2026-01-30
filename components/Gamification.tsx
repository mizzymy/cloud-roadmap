
import React from 'react';
import { UserProfile } from '../types';

export const UserStats: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const xpForNextLevel = 1000;
  const progress = (profile.xp % xpForNextLevel) / xpForNextLevel * 100;

  return (
    <div className="flex items-center gap-2 md:gap-4 bg-slate-900 p-1.5 md:p-2 rounded-lg border border-slate-800 shadow-sm">
      {/* Mobile: Hidden, Desktop: Visible details */}
      <div className="hidden md:flex flex-col items-end">
        <div className="text-xs text-slate-400 font-semibold uppercase">Level {profile.level}</div>
        <div className="font-bold text-white text-sm">Apprentice</div>
      </div>
      
      {/* Hexagon Level Badge */}
      <div className="w-8 h-8 md:w-10 md:h-10 bg-aws-orange text-slate-900 font-bold flex items-center justify-center rounded hexagon clip-path-polygon text-sm md:text-base shadow-inner">
        {profile.level}
      </div>

      {/* XP Bar: Compact on mobile */}
      <div className="flex flex-col w-20 md:w-32">
        <div className="flex justify-between text-[8px] md:text-[10px] text-slate-400 mb-1">
          <span className="font-bold">XP</span>
          <span>{profile.xp} / {profile.level * 1000}</span>
        </div>
        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-aws-orange transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      {/* Streak: Compact with Icon */}
      <div className="pl-2 md:pl-4 border-l border-slate-800 flex items-center justify-center">
         <div className="text-center">
            <div className="text-sm md:text-lg leading-none">🔥</div>
            <div className="text-[9px] md:text-[10px] text-slate-400 font-mono mt-0.5">{profile.streak}<span className="hidden md:inline"> DAYS</span></div>
         </div>
      </div>
    </div>
  );
};
